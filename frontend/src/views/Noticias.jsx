import React, { useState, useEffect } from 'react';
import { 
  Newspaper, CalendarDays, ChevronRight, ChevronLeft, 
  Plus, X, Megaphone, Activity, Users, FileText, Heart, Image as ImageIcon 
} from 'lucide-react';

// 1. AHORA RECIBIMOS EL ROL DESDE APP.JS
const Noticias = ({ userRole }) => {
  const [noticiaActiva, setNoticiaActiva] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  
  // FUNCIÓN INTELIGENTE PARA LOS ICONOS (Se asignan solos según la categoría)
  const obtenerIcono = (categoria) => {
    switch(categoria) {
      case 'Institucional': return <Megaphone size={20} className="text-[#003876]" />;
      case 'Campaña': return <Activity size={20} className="text-[#00a19a]" />;
      case 'Comunidad': return <Users size={20} className="text-[#ffb81c]" />;
      case 'Bienestar': return <Heart size={20} className="text-rose-500" />;
      case 'Clínico': return <FileText size={20} className="text-slate-500" />;
      default: return <Newspaper size={20} className="text-slate-400" />;
    }
  };

  // 1. CARGAMOS LAS NOTICIAS DESDE EL DISCO DURO (Si no hay, cargamos las de prueba)
  const [listaNoticias, setListaNoticias] = useState(() => {
    const noticiasGuardadas = localStorage.getItem('muralNoticiasHospital');
    if (noticiasGuardadas) {
      return JSON.parse(noticiasGuardadas); // Si hay guardadas, las recupera
    }
    // Si es la primera vez, carga estas por defecto:
    return [
      {
        id: 1,
        categoria: "Institucional",
        titulo: "Acreditación 2026: Comenzamos el proceso de autoevaluación",
        fecha: "1 de Abril, 2026",
        resumen: "El Hospital San José de Melipilla da inicio oficial al proceso preparatorio para la próxima reacreditación.",
        contenido: "Estimada comunidad hospitalaria:\n\nCon mucho orgullo damos inicio oficial a nuestro proceso de autoevaluación...\n\nDurante las próximas semanas, los equipos de Calidad estarán visitando los distintos servicios. Les pedimos su máxima colaboración.",
        imagen: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
      },
      {
        id: 2,
        categoria: "Campaña",
        titulo: "Inicio Vacunación Invierno 2026 para funcionarios",
        fecha: "28 de Marzo, 2026",
        resumen: "Acércate a Salud Ocupacional desde este lunes para recibir tu dosis contra la Influenza.",
        contenido: "A partir de este lunes, la Unidad de Salud Ocupacional dará inicio a la campaña...",
        imagen: null
      },
      {
        id: 3,
        categoria: "Comunidad",
        titulo: "Exitosa jornada de donación de sangre",
        fecha: "25 de Marzo, 2026",
        resumen: "Gracias al compromiso de 50 funcionarios, logramos superar la meta mensual.",
        contenido: "Queremos agradecer profundamente a los más de 50 funcionarios que donaron sangre...",
        imagen: null
      }
    ];
  });

  // 2. EL GUARDIÁN: Cada vez que 'listaNoticias' cambia, lo guarda en el disco duro automáticamente
  useEffect(() => {
    localStorage.setItem('muralNoticiasHospital', JSON.stringify(listaNoticias));
  }, [listaNoticias]);

  // 3. FORMULARIO
  const [nuevaNoticia, setNuevaNoticia] = useState({
    titulo: '', categoria: 'General', resumen: '', contenido: '', imagen: null
  });

  const manejarSubidaImagen = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setNuevaNoticia({ ...nuevaNoticia, imagen: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const agregarNoticia = (e) => {
    e.preventDefault();
    const noticiaACrear = {
      ...nuevaNoticia,
      id: Date.now(),
      fecha: new Intl.DateTimeFormat('es-CL', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date())
    };
    
    // Ponemos la nueva noticia al principio de la lista
    setListaNoticias([noticiaACrear, ...listaNoticias]);
    setIsModalOpen(false);
    setNuevaNoticia({ titulo: '', categoria: 'General', resumen: '', contenido: '', imagen: null });
  };

  // Función para borrar una noticia (Opcional, pero súper útil para probar)
  const borrarNoticia = (e, id) => {
    e.stopPropagation(); // Evita que se abra la noticia al intentar borrarla
    if(window.confirm("¿Seguro que deseas borrar esta noticia?")) {
      setListaNoticias(listaNoticias.filter(noticia => noticia.id !== id));
    }
  };

  return (
    <section className="bg-white rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 shadow-2xl border border-slate-100 min-h-[600px] w-full relative">
      
      {/* VISTA 1: CUADRÍCULA DE NOTICIAS */}
      {!noticiaActiva && (
        <div className="animate-in fade-in duration-500">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b pb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-[#00a19a]/10 p-3 rounded-2xl text-[#00a19a]">
                  <Newspaper size={32} />
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-[#003876] uppercase italic tracking-tighter leading-none">
                  Mural de Noticias
                </h2>
              </div>
              <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-xs pl-16">Información actualizada al día</p>
            </div>

            {/* CANDADO 1: Solo el Admin ve el botón de crear */}
            {userRole === 'admin' && (
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-[#003876] hover:bg-[#ffb81c] text-white hover:text-[#003876] px-6 py-3 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center gap-2 transition-all shadow-lg active:scale-95 shrink-0"
              >
                <Plus size={20} /> Publicar Noticia
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {listaNoticias.map((noticia) => (
              <div 
                key={noticia.id} 
                onClick={() => setNoticiaActiva(noticia)}
                className="bg-slate-50 hover:bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all cursor-pointer group flex flex-col h-full relative overflow-hidden"
              >
                {/* CANDADO 2: Solo el Admin puede borrar */}
                {userRole === 'admin' && (
                  <button 
                    onClick={(e) => borrarNoticia(e, noticia.id)}
                    className="absolute top-4 right-4 bg-red-100 text-red-600 hover:bg-red-500 hover:text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all z-10"
                    title="Borrar noticia"
                  >
                    <X size={16} strokeWidth={3} />
                  </button>
                )}

                {noticia.imagen ? (
                  <div className="w-full h-48 mb-6 overflow-hidden rounded-3xl shrink-0">
                    <img src={noticia.imagen} alt="Portada" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                ) : (
                  <div className="bg-white border border-slate-100 p-4 rounded-2xl shadow-sm w-fit mb-6 group-hover:scale-110 transition-transform shrink-0">
                    {obtenerIcono(noticia.categoria)}
                  </div>
                )}
                
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[#00a19a] font-black text-[10px] uppercase tracking-widest bg-[#00a19a]/10 px-3 py-1 rounded-full">
                    {noticia.categoria}
                  </span>
                  <span className="text-slate-400 text-[10px] font-bold italic">{noticia.fecha}</span>
                </div>
                
                <h4 className="text-[#003876] font-black text-xl leading-tight mb-4 group-hover:text-[#00a19a] transition-colors uppercase italic tracking-tighter line-clamp-2">
                  {noticia.titulo}
                </h4>
                
                <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3">
                  {noticia.resumen}
                </p>

                <div className="mt-auto pt-4 border-t border-slate-100 text-[#00a19a] font-black text-[11px] uppercase tracking-[0.2em] flex items-center gap-2 group-hover:gap-4 transition-all">
                  Leer más <ChevronRight size={16} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VISTA 2: LECTURA DE NOTICIA */}
      {noticiaActiva && (
        <div className="animate-in slide-in-from-right-8 duration-500">
          <button onClick={() => setNoticiaActiva(null)} className="mb-8 bg-slate-100 hover:bg-[#ffb81c] text-[#003876] px-5 py-2.5 rounded-full font-black flex items-center gap-2 transition-all text-xs uppercase tracking-widest shadow-sm">
            <ChevronLeft size={18} /> Volver al Mural
          </button>
          
          <div className="max-w-4xl mx-auto">
            {noticiaActiva.imagen && (
              <img src={noticiaActiva.imagen} alt="Portada" className="w-full h-64 md:h-96 object-cover rounded-[2.5rem] mb-10 shadow-lg" />
            )}

            <div className="flex items-center gap-3 mb-6">
              <span className="bg-[#00a19a]/10 text-[#00a19a] px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-2">
                {obtenerIcono(noticiaActiva.categoria)} {noticiaActiva.categoria}
              </span>
              <span className="text-slate-400 text-sm font-bold flex items-center gap-2">
                <CalendarDays size={16} /> {noticiaActiva.fecha}
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl font-black text-[#003876] leading-tight mb-8 tracking-tighter italic uppercase">
              {noticiaActiva.titulo}
            </h2>
            
            <div className="bg-slate-50 p-8 md:p-12 rounded-[2.5rem] border border-slate-100 shadow-inner">
              <p className="text-slate-600 text-lg leading-relaxed whitespace-pre-wrap font-medium">
                {noticiaActiva.contenido}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* MODAL / FORMULARIO: CREAR NOTICIA CON FOTO */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-[#003876]/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-[2.5rem] w-full max-w-2xl shadow-2xl overflow-hidden border-4 border-[#ffb81c] flex flex-col max-h-[90vh]">
            <div className="bg-[#003876] p-6 text-white flex justify-between items-center shrink-0">
              <h3 className="font-black uppercase italic tracking-tighter text-xl">Nueva Noticia Institucional</h3>
              <button onClick={() => setIsModalOpen(false)} className="bg-white/10 hover:bg-red-500 p-2 rounded-full transition-colors"><X size={20}/></button>
            </div>
            
            <form onSubmit={agregarNoticia} className="p-8 space-y-4 overflow-y-auto">
              
              <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center hover:border-[#00a19a] transition-colors relative cursor-pointer">
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={manejarSubidaImagen}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                {!nuevaNoticia.imagen ? (
                  <div className="flex flex-col items-center pointer-events-none">
                    <ImageIcon size={40} className="text-slate-300 mb-2" />
                    <span className="text-[#003876] font-black text-sm uppercase tracking-widest">Subir Foto de Portada</span>
                    <span className="text-slate-400 text-xs font-bold mt-1">Haz clic o arrastra una imagen (Opcional)</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <img src={nuevaNoticia.imagen} alt="Vista previa" className="h-32 rounded-xl object-cover mb-2 shadow-md" />
                    <span className="text-[#00a19a] font-black text-[10px] uppercase tracking-widest">¡Foto lista! (Clic para cambiar)</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-slate-400 mb-1 ml-2">Título de la noticia</label>
                <input required className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-3 font-bold text-[#003876] outline-none focus:border-[#00a19a] transition-all" 
                  value={nuevaNoticia.titulo} onChange={(e) => setNuevaNoticia({...nuevaNoticia, titulo: e.target.value})} />
              </div>
              
              <div>
                <label className="block text-[10px] font-black uppercase text-slate-400 mb-1 ml-2">Categoría</label>
                <select className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-3 font-bold text-[#003876] outline-none appearance-none"
                  value={nuevaNoticia.categoria} onChange={(e) => setNuevaNoticia({...nuevaNoticia, categoria: e.target.value})}>
                  <option>General</option><option>Institucional</option><option>Campaña</option><option>Clínico</option><option>Comunidad</option><option>Bienestar</option>
                </select>
              </div>
              
              <div>
                <label className="block text-[10px] font-black uppercase text-slate-400 mb-1 ml-2">Breve Resumen (Se verá en el mural)</label>
                <textarea required rows="2" className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-3 font-bold text-slate-600 outline-none focus:border-[#00a19a] transition-all"
                  value={nuevaNoticia.resumen} onChange={(e) => setNuevaNoticia({...nuevaNoticia, resumen: e.target.value})}></textarea>
              </div>
              
              <div>
                <label className="block text-[10px] font-black uppercase text-slate-400 mb-1 ml-2">Contenido Completo</label>
                <textarea required rows="5" className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-3 font-bold text-slate-600 outline-none focus:border-[#00a19a] transition-all"
                  value={nuevaNoticia.contenido} onChange={(e) => setNuevaNoticia({...nuevaNoticia, contenido: e.target.value})}></textarea>
              </div>
              
              {/* CANDADO 3: Solo el Admin ve el botón de guardar formulario */}
              {userRole === 'admin' && (
                <button type="submit" className="w-full bg-[#00a19a] hover:bg-[#003876] text-white py-4 rounded-2xl font-black uppercase tracking-[0.2em] shadow-lg transition-all active:scale-95 mt-4">
                  Publicar Noticia Ahora
                </button>
              )}
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default Noticias;