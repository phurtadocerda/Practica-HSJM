import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, Users, ArrowRight, Plus, Trash2, Pencil, Save, X, Upload, Image as ImageIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Gremio = ({ userRole }) => { // Recibe el rol desde App.js -> AppRoutes
  const navigate = useNavigate();
  
  // VERIFICACIÓN: Si el rol que viene es 'jefe', activamos los poderes
  const isJefe = userRole === 'jefe';
  
  const fileInputRef = useRef(null);

  // --- ESTADO DE NOTICIAS ---
  const [noticias, setNoticias] = useState(() => {
    const saved = localStorage.getItem('noticias_gremiales');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [selectedNoticeId, setSelectedNoticeId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ titulo: '', categoria: '', resumen: '', imagen: '', cuerpo: '' });

  useEffect(() => {
    localStorage.setItem('noticias_gremiales', JSON.stringify(noticias));
  }, [noticias]);

  const selectedNotice = noticias.find(n => n.id === selectedNoticeId);

  // --- FUNCIONES DE JEFE ---
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFormData({ ...formData, imagen: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cuerpoArray = formData.cuerpo.split('\n').filter(p => p.trim() !== '');
    
    if (editingId) {
      setNoticias(noticias.map(n => n.id === editingId ? { ...n, ...formData, cuerpo: cuerpoArray } : n));
    } else {
      const nueva = {
        id: Date.now(),
        ...formData,
        fecha: new Date().toLocaleDateString('es-CL'),
        cuerpo: cuerpoArray
      };
      setNoticias([nueva, ...noticias]);
    }
    closeForm();
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({ titulo: '', categoria: '', resumen: '', imagen: '', cuerpo: '' });
  };

  const handleEdit = (e, noticia) => {
    e.stopPropagation();
    setEditingId(noticia.id);
    setFormData({ ...noticia, cuerpo: noticia.cuerpo.join('\n') });
    setShowForm(true);
  };

  const handleDelete = (e, id) => {
    e.stopPropagation();
    if (window.confirm("¿Deseas eliminar esta noticia definitivamente?")) {
      setNoticias(noticias.filter(n => n.id !== id));
    }
  };

  // --- RENDERIZADO ---
  if (showForm) {
    return (
      <div className="max-w-4xl mx-auto bg-slate-50 p-8 rounded-3xl border border-slate-200 mt-6 shadow-inner animate-in fade-in">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-black text-[#003876]">{editingId ? 'EDITAR NOTICIA' : 'NUEVA PUBLICACIÓN'}</h2>
          <button onClick={closeForm} className="text-slate-400 hover:text-red-500 transition-colors"><X /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input required placeholder="Título" value={formData.titulo} onChange={e => setFormData({...formData, titulo: e.target.value})} className="w-full p-4 rounded-2xl border-none shadow-sm focus:ring-2 focus:ring-orange-500 outline-none" />
          <div className="flex items-center gap-6 p-4 bg-white rounded-2xl shadow-sm border-2 border-dashed border-slate-100">
              <div className="w-24 h-24 bg-slate-50 rounded-xl overflow-hidden border flex items-center justify-center">
                  {formData.imagen ? <img src={formData.imagen} alt='' className="w-full h-full object-cover" /> : <ImageIcon className="text-slate-200" size={40}/>}
              </div>
              <button type="button" onClick={() => fileInputRef.current.click()} className="bg-[#003876] text-white px-5 py-2 rounded-xl font-bold text-xs flex items-center gap-2">
                  <Upload size={16}/> SELECCIONAR FOTO
              </button>
              <input type="file" ref={fileInputRef} hidden onChange={handleImageUpload} accept="image/*" />
          </div>
          <textarea required placeholder="Resumen corto..." rows="2" value={formData.resumen} onChange={e => setFormData({...formData, resumen: e.target.value})} className="w-full p-4 rounded-2xl border-none shadow-sm outline-none" />
          <textarea required placeholder="Contenido (Enter para nuevos párrafos)..." rows="8" value={formData.cuerpo} onChange={e => setFormData({...formData, cuerpo: e.target.value})} className="w-full p-4 rounded-2xl border-none shadow-sm outline-none" />
          <button type="submit" className="w-full bg-orange-500 text-white p-4 rounded-2xl font-black shadow-lg flex items-center justify-center gap-2 uppercase">
              <Save /> PUBLICAR
          </button>
        </form>
      </div>
    );
  }

  if (selectedNoticeId) {
    return (
      <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
        <button onClick={() => setSelectedNoticeId(null)} className="mb-8 bg-slate-100 text-[#003876] px-4 py-2 rounded-full font-bold flex items-center gap-2 text-xs border shadow-sm">
          <ChevronLeft size={16} /> VOLVER
        </button>
        <h1 className="text-4xl font-black text-[#003876] mb-6">{selectedNotice.titulo}</h1>
        <div className="aspect-video bg-slate-100 rounded-3xl overflow-hidden mb-8 shadow-xl">
          <img src={selectedNotice.imagen} alt="News" className="w-full h-full object-cover" />
        </div>
        <div className="space-y-6 text-slate-700 text-lg leading-relaxed">
          {selectedNotice.cuerpo.map((p, i) => <p key={i}>{p}</p>)}
        </div>
      </div>
    );
  }

  return (
    <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 min-h-[600px] w-full font-sans relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12 border-b pb-8">
        <div>
          <button onClick={() => navigate('/inicio')} className="bg-slate-100 hover:bg-[#ffb81c] text-[#003876] px-5 py-2 rounded-full font-black flex items-center gap-2 mb-4 text-xs transition-all shadow-sm">
            <ChevronLeft size={18} /> INICIO
          </button>
          <div className="flex items-center gap-4">
            <Users className="text-[#003876] hidden md:block" size={48} />
            <h2 className="text-4xl md:text-5xl font-black text-[#003876] uppercase italic tracking-tighter">Noticias <span className="text-orange-500">Gremiales</span></h2>
          </div>
        </div>
        {/* BOTÓN SOLO PARA EL JEFE (RUT 21245882-1) */}
        {isJefe && (
          <button onClick={() => setShowForm(true)} className="bg-[#003876] text-white px-6 py-3 rounded-full font-black flex items-center gap-2 shadow-lg hover:scale-105 transition-all">
            <Plus size={20} /> AÑADIR NOTICIA
          </button>
        )}
      </div>

      <div className="max-w-5xl mx-auto space-y-10">
        {noticias.length === 0 ? (
          <p className="text-center text-slate-400 font-bold py-20 uppercase tracking-widest border-2 border-dashed rounded-3xl">No hay noticias publicadas</p>
        ) : (
          noticias.map((noticia) => (
            <article key={noticia.id} onClick={() => setSelectedNoticeId(noticia.id)} className="group flex flex-col md:flex-row bg-slate-50 rounded-[2.5rem] overflow-hidden border hover:bg-white hover:shadow-2xl transition-all duration-500 relative cursor-pointer">
              {isJefe && (
                <div className="absolute top-4 right-4 flex gap-2 z-10">
                  <button onClick={(e) => handleEdit(e, noticia)} className="bg-white/90 p-2 rounded-full text-blue-600 shadow-sm border hover:bg-blue-600 hover:text-white transition-all"><Pencil size={18} /></button>
                  <button onClick={(e) => handleDelete(e, noticia.id)} className="bg-white/90 p-2 rounded-full text-red-600 shadow-sm border hover:bg-red-600 hover:text-white transition-all"><Trash2 size={18} /></button>
                </div>
              )}
              <div className="md:w-2/5 h-64 md:h-auto overflow-hidden">
                <img src={noticia.imagen} alt="News" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="md:w-3/5 p-8 flex flex-col justify-center">
                <span className="text-orange-500 text-xs font-black uppercase mb-2">{noticia.fecha}</span>
                <h3 className="text-2xl font-black text-[#003876] mb-4 group-hover:text-orange-600 transition-colors leading-tight">{noticia.titulo}</h3>
                <p className="text-slate-500 line-clamp-3 mb-6 font-medium">{noticia.resumen}</p>
                <div className="flex items-center gap-2 text-[#003876] font-black text-sm uppercase">Leer más <ArrowRight size={18} className="text-orange-500" /></div>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
};

export default Gremio;