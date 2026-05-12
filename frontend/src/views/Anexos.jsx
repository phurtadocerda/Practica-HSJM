import React, { useState, useEffect, useRef } from 'react';
import { Phone, Search, Loader2, Plus, Edit, Trash2, Save, X, Mail, Pencil, ChevronLeftIcon, ChevronRight, AlertCircle } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import api from '../api/axios';
import { toast } from 'sonner';
import AddButton from '../components/AddButton';
import SearchBar from '../components/SearchBar';

const Anexos = ({ userRole }) => {
  const isAdministrador = userRole === 'administrador';
  const [paginaActual, setPaginaActual] = useState(1);
  const registrosPorPagina = 10;
  const [busqueda, setBusqueda] = useState("");
  const [loading, setLoading] = useState(true);
  const errorToastShown = useRef(false);
  const [anexos, setAnexos] = useState([]);

  // ESTADO FORMULARIO Y EDICIÓN
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    anexo: '',
    unidad: '',
    usuario: '',
    cargo: '',
    email: '' // Estandarizado a email para Prisma
  });

  useEffect(() => {
    const cargarAnexos = async () => {
      try {
        const response = await api.get('/anexos');
        if (response.data.success) {
          setAnexos(response.data.anexos);
        }
      } catch (err) {
        console.error("Error al cargar anexos:", err);
        if (!errorToastShown.current) {
          toast.error("No se pudo conectar con el directorio");
          errorToastShown.current = true;
        }
      } finally {
        setLoading(false);
      }
    };
    cargarAnexos();
  }, []);

  // --- FUNCIONES LÓGICA DE UI ---

  const cancelarEdicion = () => {
    setShowAddForm(false);
    setEditingId(null);
    setFormData({ anexo: '', unidad: '', usuario: '', cargo: '', email: '' });
  };

  const handleEdit = (anexo) => {
    setEditingId(anexo.id);
    setFormData({
      anexo: anexo.anexo,
      unidad: anexo.unidad,
      usuario: anexo.usuario,
      cargo: anexo.cargo,
      email: anexo.email || ''
    });
    setShowAddForm(true); // Abre el formulario con los datos cargados
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  };

  // --- PETICIONES API ---

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        // EDICIÓN
        const response = await api.put(`/anexos/${editingId}`, formData);
        if (response.data.success) {
          setAnexos(anexos.map(a => a.id === editingId ? { ...a, ...formData } : a));
          toast.success("Registro actualizado");
        }
      } else {
        // CREACIÓN
        const response = await api.post('/anexos', formData);
        if (response.data.success) {
          setAnexos([response.data.anexo, ...anexos]);
          toast.success("Nuevo anexo creado");
        }
      }
      cancelarEdicion();
    } catch (err) {
      toast.error("Error al procesar la solicitud");
    }
  };

  const handleDelete = async (id) => {
    if (!id || !window.confirm("¿Estás seguro de eliminar este registro?")) return;
    try {
      const response = await api.delete(`/anexos/${id}`);
      if (response.data.success) {
        setAnexos(prev => prev.filter(a => a.id !== id));
        toast.success("Eliminado con éxito");
      }
    } catch (err) {
      toast.error("No se pudo eliminar el registro");
    }
  };

  // --- FILTRADO Y PAGINACIÓN ---
  const filteredAnexos = anexos.filter(anexo => {
    const busq = busqueda.toLowerCase();
    return (
      (anexo.unidad || "").toLowerCase().includes(busq) ||
      (anexo.usuario || "").toLowerCase().includes(busq) ||
      (anexo.anexo || "").includes(busq)
    );
  });

  const totalPaginas = Math.ceil(filteredAnexos.length / registrosPorPagina);
  const registrosActuales = filteredAnexos.slice((paginaActual - 1) * registrosPorPagina, paginaActual * registrosPorPagina);

  return (
    <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 min-h-screen w-full font-sans animate-in fade-in duration-500">
      <PageHeader
        title={<>Anexos <span className="text-blue-600">Telefónicos</span></>}
        subtitle="Directorio interno del Hospital"
        badgeIcon={Phone}
        rightContent={
          <div className="flex flex-col items-end gap-3">
            {isAdministrador && (
              <AddButton 
                onClick={() => {
                   if (showAddForm && !editingId) setShowAddForm(false); // Si esta vacío y abierto, cierra
                   else { cancelarEdicion(); setShowAddForm(true); } // Si no, limpia y abre para nuevo
                }} 
              />
            )}
            <SearchBar value={busqueda} onChange={(e) => { setBusqueda(e.target.value); setPaginaActual(1); }} />
          </div>
        }
      />

      {/* FORMULARIO ÚNICO (ADAPTATIVO) */}
      {showAddForm && (
        <div className={`mb-10 p-8 rounded-3xl border-2 border-dashed animate-in slide-in-from-top duration-500 ${editingId ? 'bg-blue-50 border-blue-200' : 'bg-slate-50 border-cyan-200'}`}>
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-black text-[#003876] uppercase tracking-tighter">
              {editingId ? 'Editando Registro' : 'Ingresar Nuevo Anexo'}
            </h3>
            <button onClick={cancelarEdicion} className="text-slate-400 hover:text-red-500 bg-white p-2 rounded-full shadow-sm"><X /></button>
          </div>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <input className="p-4 rounded-xl border-none shadow-sm focus:ring-2 focus:ring-cyan-500 outline-none" placeholder="N° Anexo" required value={formData.anexo} onChange={e => setFormData({ ...formData, anexo: e.target.value })} />
            <input className="p-4 rounded-xl border-none shadow-sm focus:ring-2 focus:ring-cyan-500 outline-none" placeholder="Unidad / Servicio" required value={formData.unidad} onChange={e => setFormData({ ...formData, unidad: e.target.value })} />
            <input className="p-4 rounded-xl border-none shadow-sm focus:ring-2 focus:ring-cyan-500 outline-none" placeholder="Nombre Usuario" required value={formData.usuario} onChange={e => setFormData({ ...formData, usuario: e.target.value })} />
            <input className="p-4 rounded-xl border-none shadow-sm focus:ring-2 focus:ring-cyan-500 outline-none" placeholder="Cargo" value={formData.cargo} onChange={e => setFormData({ ...formData, cargo: e.target.value })} />
            <input className="p-4 rounded-xl border-none shadow-sm focus:ring-2 focus:ring-cyan-500 outline-none md:col-span-2" placeholder="Correo Electrónico" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
            <button type="submit" className={`md:col-span-3 p-4 rounded-xl font-black flex items-center justify-center gap-2 transition-all shadow-lg uppercase text-white ${editingId ? 'bg-blue-600 hover:bg-blue-800' : 'bg-cyan-600 hover:bg-[#003876]'}`}>
              <Save size={20} /> {editingId ? 'Guardar Cambios' : 'Crear Registro'}
            </button>
          </form>
        </div>
      )}

      {/* TABLA */}
      <div className="overflow-x-auto bg-white rounded-2xl border border-slate-200 shadow-sm">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-[#003876]">
              <th className="p-4 font-black text-[11px] uppercase tracking-wider">Anexo</th>
              <th className="p-4 font-black text-[11px] uppercase tracking-wider">Unidad</th>
              <th className="p-4 font-black text-[11px] uppercase tracking-wider">Cargo</th>
              <th className="p-4 font-black text-[11px] uppercase tracking-wider">Usuario</th>
              <th className="p-4 font-black text-[11px] uppercase tracking-wider">E-mail</th>
              {isAdministrador && (<th className="p-4 font-black text-[11px] uppercase tracking-wider text-center">Gestión</th>)}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr>
                <td colSpan={isAdministrador ? 6 : 5} className="p-20 text-center">
                  <div className="flex flex-col items-center gap-3 text-slate-400 font-bold animate-pulse">
                    <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                    <span className="text-[10px] tracking-widest uppercase">Cargando Directorio...</span>
                  </div>
                </td>
              </tr>
            ) : registrosActuales.length === 0 ? (
              <tr>
                <td colSpan={isAdministrador ? 6 : 5} className="p-20 text-center">
                  <AlertCircle className="mx-auto mb-4 text-slate-300" size={48} />
                  <p className="text-slate-500 font-black uppercase text-xs tracking-widest">No se encontraron registros</p>
                </td>
              </tr>
            ) : (
              registrosActuales.map((anexo) => (
                <tr key={anexo.id} className="hover:bg-cyan-50/30 transition-colors group">
                  <td className="p-4 text-sm font-black text-cyan-600 ">{anexo.anexo}</td>
                  <td className="p-4 text-xs font-bold text-slate-500 uppercase">{anexo.unidad}</td>
                  <td className="p-4 text-xs text-slate-500 font-bold">{anexo.cargo}</td>
                  <td className="p-4 text-xs font-black text-[#003876] uppercase">{anexo.usuario}</td>
                  <td className="p-4">
                    {anexo.email && (
                      <a href={`mailto:${anexo.email}`} className="flex items-center gap-2 text-xs font-bold text-cyan-600 hover:text-[#003876] underline decoration-cyan-200 underline-offset-4">
                        <Mail size={14} /> {anexo.email}
                      </a>
                    )}
                  </td>
                  {isAdministrador && (
                    <td className="p-4 text-center">
                      <div className="flex justify-center gap-2">
                        <button onClick={() => handleEdit(anexo)} className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all"><Pencil size={14} /></button>
                        <button onClick={() => handleDelete(anexo.id)} className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINACIÓN */}
      <div className="mt-8 flex justify-center items-center gap-4">
        <button disabled={paginaActual === 1} onClick={() => setPaginaActual(paginaActual - 1)} className="flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-slate-200 text-[#003876] font-bold text-xs hover:bg-slate-50 disabled:opacity-30 transition-all">
          <ChevronLeftIcon size={16} /> ANTERIOR
        </button>
        <div className="bg-slate-100 px-6 py-2 rounded-xl text-[#003876] font-black text-xs">
          PÁGINA {paginaActual} DE {totalPaginas || 1}
        </div>
        <button disabled={paginaActual === totalPaginas || totalPaginas === 0} onClick={() => setPaginaActual(paginaActual + 1)} className="flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-slate-200 text-[#003876] font-bold text-xs hover:bg-slate-50 disabled:opacity-30 transition-all">
          SIGUIENTE <ChevronRight size={16} />
        </button>
      </div>
    </section>
  );
};

export default Anexos;