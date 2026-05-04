import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Plus, Trash2, X, Save } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import AddButton from '../components/AddButton';

const Concurso = ({ userRole }) => {
  const navigate = useNavigate();
  const isJefe = userRole === 'jefe';

  // 1. Estado para las noticias/tablas (Cargar de localStorage o usar iniciales)
  const [concursos, setConcursos] = useState(() => {
    const saved = localStorage.getItem('concursos_hsjm');
    const iniciales = [
      {
        id: 1,
        titulo: "Hospital San José de Melipilla Informa Proceso de Selección Interno para ADMINISTRATIVO(A) DE ESTADÍSTICA",
        plataforma: "Presencial...",
        cargo: "TÉCNICO EN EQUIPOS MÉDICOS",
        unidad: "Estadística",
        fechaDesde: "27/02/2026",
        fechaHasta: "05/03/2026",
        resolucionTexto: "Resolución N°002119",
        resolucionLink: "https://drive.google.com/file/d/14qK7gi2FCZu8UdrJohYA8bY6jm51SDxs/view"
      }
    ];
    return saved ? JSON.parse(saved) : iniciales;
  });

  // 2. Estado para el formulario
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    titulo: '', plataforma: '', cargo: '', unidad: '', 
    fechaDesde: '', fechaHasta: '', resolucionTexto: '', resolucionLink: ''
  });

  // 3. Guardar cambios permanentemente
  useEffect(() => {
    localStorage.setItem('concursos_hsjm', JSON.stringify(concursos));
  }, [concursos]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevoConcurso = { ...formData, id: Date.now() };
    setConcursos([nuevoConcurso, ...concursos]);
    setShowForm(false);
    setFormData({ titulo: '', plataforma: '', cargo: '', unidad: '', fechaDesde: '', fechaHasta: '', resolucionTexto: '', resolucionLink: '' });
  };

  const eliminarConcurso = (id) => {
    if (window.confirm("¿Estás seguro de eliminar este concurso?")) {
      setConcursos(concursos.filter(c => c.id !== id));
    }
  };

  return (
    <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 min-h-[600px] animate-in fade-in zoom-in duration-500 w-full">
      <PageHeader
        title={<>Concursos <span className="text-[#00a19a]">Internos</span></>}
        onBack={() => navigate('/accesos')}
        backLabel="VOLVER A ACCESOS"
        rightContent={
          isJefe && !showForm && (
            <AddButton onClick={() => setShowForm(true)} />
          )
        }
      />

      {/* FORMULARIO (Solo Jefe) */}
      {showForm && (
        <div className="mb-12 p-8 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 animate-in slide-in-from-top duration-500">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-black text-[#003876]">INGRESAR NUEVO PROCESO</h3>
            <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-red-500"><X /></button>
          </div>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input className="md:col-span-2 p-3 rounded-xl border outline-none focus:border-[#00a19a]" placeholder="Título del Concurso" required value={formData.titulo} onChange={e => setFormData({...formData, titulo: e.target.value})} />
            <input className="p-3 rounded-xl border outline-none" placeholder="Cargo" required value={formData.cargo} onChange={e => setFormData({...formData, cargo: e.target.value})} />
            <input className="p-3 rounded-xl border outline-none" placeholder="Unidad" required value={formData.unidad} onChange={e => setFormData({...formData, unidad: e.target.value})} />
            <input className="p-3 rounded-xl border outline-none" placeholder="Fecha Desde" required value={formData.fechaDesde} onChange={e => setFormData({...formData, fechaDesde: e.target.value})} />
            <input className="p-3 rounded-xl border outline-none" placeholder="Fecha Hasta" required value={formData.fechaHasta} onChange={e => setFormData({...formData, fechaHasta: e.target.value})} />
            <input className="p-3 rounded-xl border outline-none" placeholder="Texto Resolución (Ej: Resolución N°123)" required value={formData.resolucionTexto} onChange={e => setFormData({...formData, resolucionTexto: e.target.value})} />
            <input className="p-3 rounded-xl border outline-none" placeholder="Link de Resolución (Drive/PDF)" required value={formData.resolucionLink} onChange={e => setFormData({...formData, resolucionLink: e.target.value})} />
            <textarea className="md:col-span-2 p-3 rounded-xl border outline-none" placeholder="Plataforma / Detalles" required value={formData.plataforma} onChange={e => setFormData({...formData, plataforma: e.target.value})} />
            <button type="submit" className="md:col-span-2 bg-[#00a19a] text-white p-4 rounded-xl font-black flex items-center justify-center gap-2">
              <Save size={20}/> PUBLICAR CONCURSO
            </button>
          </form>
        </div>
      )}

      {/* LISTADO DE TABLAS */}
      {concursos.map((c) => (
        <div key={c.id} className="relative group">
          {/* Botón eliminar (Solo Jefe) */}
          {isJefe && (
            <button 
              onClick={() => eliminarConcurso(c.id)}
              className="absolute -top-2 -right-2 bg-red-500 text-white p-2 rounded-full shadow-lg z-10 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 size={16} />
            </button>
          )}
          <ConcursoTable {...c} />
        </div>
      ))}
    </section>
  );
};

const ConcursoTable = ({ titulo, plataforma, cargo, unidad, fechaDesde, fechaHasta, resolucionTexto, resolucionLink }) => (
  <div className="mb-12 animate-in fade-in duration-500">
    <div className="bg-white border border-slate-300 rounded-lg shadow-sm overflow-hidden mb-4 hover:shadow-md transition-shadow">
      <div className="p-4 border-b border-slate-300 bg-slate-50">
        <h3 className="text-base font-bold text-[#003876]">{titulo}</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600 border-collapse">
          <thead className="text-slate-500 font-semibold border-b border-slate-300 bg-white">
            <tr>
              <th className="p-4 border-r border-slate-200 font-medium whitespace-nowrap">Tipo de concurso</th>
              <th className="p-4 border-r border-slate-200 font-medium">Plataforma</th>
              <th className="p-4 border-r border-slate-200 font-medium">Cargo</th>
              <th className="p-4 border-r border-slate-200 font-medium">Unidad</th>
              <th className="p-4 font-medium whitespace-nowrap">Fecha de Difusión</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="p-4 border-r border-slate-200 align-top whitespace-nowrap">Concurso <br/> Interno</td>
              <td className="p-4 border-r border-slate-200 align-top max-w-md">{plataforma}</td>
              <td className="p-4 border-r border-slate-200 align-top font-bold text-[#003876]">{cargo}</td>
              <td className="p-4 border-r border-slate-200 align-top">{unidad}</td>
              <td className="p-4 align-top whitespace-nowrap">
                <span className="text-slate-400 font-bold text-xs uppercase">Desde</span> <br/> {fechaDesde}
                <br/><br/>
                <span className="text-slate-400 font-bold text-xs uppercase">Hasta</span> <br/> {fechaHasta}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div className="pl-4">
      <a href={resolucionLink || "#"} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[#00a19a] hover:text-[#003876] font-bold underline transition-colors w-fit">
        <FileText size={18} /> {resolucionTexto}
      </a>
    </div>
  </div>
);

export default Concurso;