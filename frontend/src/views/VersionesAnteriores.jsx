import React, { useState, useEffect } from 'react';
import { FileText, History, Trash2, X, Save, Loader2, AlertCircle } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import AddButton from '../components/AddButton';
import SearchBar from '../components/SearchBar';
import api from '../api/axios';
import { toast } from 'sonner';

const VersionesAnteriores = ({ userRole }) => {
  const isAdministrador = userRole === 'administrador';
  const [searchTerm, setSearchTerm] = useState('');
  const [documentos, setDocumentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newDoc, setNewDoc] = useState({ nombre: '', url: '' });

  // Carga inicial desde la API
  const cargarDatos = async () => {
    try {
      const response = await api.get('/documentos/versionesAnteriores');
      if (response.data.success) {
        setDocumentos(response.data.documentos || []);
      }
    } catch (err) {
      console.error("Error al cargar historial:", err);
      toast.error("No se pudo conectar con el archivo histórico");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const handleAddDocument = async (e) => {
    e.preventDefault();
    if (!newDoc.nombre || !newDoc.url) return;

    try {
      // Aquí podrías implementar un POST a la API si decides habilitar la subida
      // Por ahora, mantenemos la lógica de visualización dinámica
      toast.info("Función de guardado conectada al flujo de administración");
      setShowForm(false);
    } catch (error) {
      toast.error("Error al guardar el documento");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este registro del archivo histórico?")) {
      try {
        await api.delete(`/documentos/${id}`);
        setDocumentos(documentos.filter(d => d.id !== id));
        toast.success("Documento eliminado del historial");
      } catch (error) {
        toast.error("No se pudo eliminar el registro");
      }
    }
  };

  const documentosFiltrados = documentos.filter(doc => 
    doc.titulo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 min-h-[800px] animate-in fade-in zoom-in duration-500 w-full font-sans relative">
      
      <PageHeader 
        title={<>Versiones <span className="text-[#00a19a]">Anteriores</span></>}
        subtitle="Histórico Institucional"
        icon={History}
        iconBg="bg-[#00a19a]"
        backPath="/inicio"
        backLabel="INICIO"
        rightContent={
          <div className="flex flex-col items-end gap-3">
            {isAdministrador && !showForm && (
              <AddButton onClick={() => setShowForm(true)} />
            )}
            <SearchBar 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar en historial..."
            />
          </div>
        }
      />

      {showForm && (
        <div className="mb-10 p-8 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 animate-in slide-in-from-top duration-500">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-black text-[#003876] uppercase">Ingresar Documento al Historial</h3>
            <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-red-500 bg-white p-2 rounded-full shadow-sm"><X /></button>
          </div>
          <form onSubmit={handleAddDocument} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input 
                required 
                className="p-4 rounded-xl border-none shadow-sm focus:ring-2 focus:ring-[#00a19a] outline-none" 
                placeholder="Nombre (Ej: AOC 1.1...)" 
                value={newDoc.nombre} 
                onChange={e => setNewDoc({...newDoc, nombre: e.target.value})} 
            />
            <input 
                required 
                className="p-4 rounded-xl border-none shadow-sm focus:ring-2 focus:ring-[#00a19a] outline-none" 
                placeholder="Nombre del archivo en servidor" 
                value={newDoc.url} 
                onChange={e => setNewDoc({...newDoc, url: e.target.value})} 
            />
            <button type="submit" className="md:col-span-2 bg-[#00a19a] text-white p-4 rounded-xl font-black flex items-center justify-center gap-2 hover:bg-[#003876] transition-all uppercase tracking-widest">
                <Save size={20}/> Guardar en Historial
            </button>
          </form>
        </div>
      )}

      <div className="max-w-7xl mx-auto pt-2">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <Loader2 className="w-12 h-12 text-[#00a19a] animate-spin" />
            <p className="text-slate-400 font-bold uppercase tracking-widest">Sincronizando archivo histórico...</p>
          </div>
        ) : documentosFiltrados.length === 0 ? (
          <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
            <AlertCircle className="mx-auto text-slate-300 mb-4" size={48} />
            <p className="text-xl font-bold text-slate-500 uppercase tracking-tight">No se encontraron registros en el historial</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {documentosFiltrados.map((doc) => (
                <div key={doc.id} className="relative group">
                <a 
                    href={`http://localhost:5000/uploads/${doc.url}`} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="flex items-start gap-3 p-5 rounded-2xl border border-slate-100 hover:border-[#ffb81c] hover:bg-white transition-all shadow-sm hover:shadow-xl bg-slate-50/50 h-full"
                >
                    <div className="bg-slate-200 p-2 rounded-lg shrink-0 group-hover:bg-[#ffb81c]/20 transition-all">
                        <FileText size={20} className="text-slate-500 group-hover:text-[#ffb81c]" />
                    </div>
                    <p className="text-[12px] font-black text-slate-500 group-hover:text-[#003876] uppercase leading-snug break-words">
                        {doc.titulo}
                    </p>
                </a>
                {isAdministrador && (
                    <button 
                        onClick={(e) => { e.preventDefault(); handleDelete(doc.id); }} 
                        className="absolute -top-2 -right-2 bg-red-600 text-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <Trash2 size={14} />
                    </button>
                )}
                </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default VersionesAnteriores;