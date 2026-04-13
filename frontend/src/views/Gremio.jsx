import React, { useState } from 'react';
import { ChevronLeft, Users, Newspaper, Calendar, ArrowRight, Clock, Tag } from 'lucide-react';
import logoHospital from '../assets/logo.png'; // Asegúrate de que la ruta sea correcta

const Gremio = ({ onNavigate }) => {
  // Estado para controlar qué noticia se está viendo: null (listado) o id de la noticia (detalle)
  const [selectedNoticeId, setSelectedNoticeId] = useState(null);

  // --- DATOS: LISTA DE NOTICIAS (Maqueta con datos de ejemplo) ---
  // Cuando tengas las noticias reales, solo debes editar este arreglo.
  const noticiasGremiales = [
    {
      id: 1,
      titulo: "seleccionado chileno le da un portazo a Colo Colo para ser su refuerzo",
      fecha: "30 de Marzo, 2026",
      hora: "10:30 AM",
      categoria: "Acuerdos",
      resumen: "El Cacique busca refuerzos y uno de los jugadores de la Roja apareció como alternativa. Sin embargo, cuando lo fueron a buscar no recibieron la respuesta que querían.",
      imagen: "https://via.placeholder.com/800x600?text=Reunión+Gremial+1",
      // Aquí irá el cuerpo completo de la noticia (puedes usar HTML básico si quieres)
      cuerpo: [
        "Colo Colo ha estado mirando refuerzos en el mercado de fichajes del fútbol chileno. A días del cierre del libro, el Cacique está buscando alternativas para potenciar su plantel y así pelear todos los desafíos que se le vienen por delante.",
        "La reunión, que contó con la participación de las directivas de FENATS, ASENF y la Subdirección de Recursos Humanos, abordó los criterios de evaluación y los plazos para la presentación de antecedentes.",
        "Según lo informado por los dirigentes, el proceso se iniciará formalmente la tercera semana de abril, para lo cual se habilitará una plataforma digital de carga de documentos. 'Nuestro objetivo es asegurar un proceso transparente y justo para todos los funcionarios que llevan años esperando su reconocimiento', señaló un vocero gremial.",
        "Se espera que en los próximos días se publique la resolución oficial con los detalles técnicos del proceso. El gremio hace un llamado a todos los asociados a mantener sus antecedentes actualizados en el sistema SIRH."
      ]
    },
    {
      id: 2,
      titulo: "Exitosa Jornada de Capacitación en Liderazgo y Trabajo en Equipo",
      fecha: "25 de Marzo, 2026",
      hora: "15:00 PM",
      categoria: "Formación",
      resumen: "Más de 50 funcionarios de diversas unidades participaron en el taller impartido por psicólogos organizacionales de la Mutual de Seguridad...",
      imagen: "https://via.placeholder.com/800x600?text=Capacitación+Gremial+2",
      cuerpo: [
        "Con gran convocatoria se realizó el pasado martes el taller 'Liderazgo Situacional y Cohesión de Equipo', organizado por la asociación gremial en colaboración con la Mutual de Seguridad.",
        "La actividad, que tuvo lugar en el auditorio del nuevo hospital, buscó entregar herramientas prácticas para mejorar la comunicación interna y el clima laboral en las unidades clínicas y administrativas.",
        "Los asistentes valoraron la instancia de encuentro y aprendizaje. 'Estas actividades nos permiten desconectarnos un momento de la presión asistencial y fortalecernos como equipo', comentó una enfermera supervisora.",
        "La directiva gremial confirmó que esta es la primera de un ciclo de capacitaciones que se impartirán durante el primer semestre, abordando temas como manejo del estrés y derechos laborales."
      ]
    },
    {
      id: 3,
      titulo: "Día del Trabajador de la Salud: Gran Convocatoria en Actividad de Camaradería",
      fecha: "20 de Marzo, 2026",
      hora: "09:00 AM",
      categoria: "Social",
      resumen: "Funcionarios y sus familias disfrutaron de una jornada de esparcimiento en el complejo deportivo municipal, con actividades recreativas y un almuerzo...",
      imagen: "https://via.placeholder.com/800x600?text=Actividad+Social+3",
      cuerpo: [
        "En un ambiente de alegría y compañerismo, el gremio celebró el Día del Trabajador de la Salud con una masiva jornada recreativa en el complejo deportivo municipal de Melipilla.",
        "La actividad, que se extendió durante todo el día sábado, contó con la participación de más de 300 personas, incluyendo funcionarios de planta, contrata y honorarios junto a sus familias.",
        "Hubo campeonatos de fútbol, juegos inflables para los niños y un almuerzo de camaradería. 'Es fundamental generar estos espacios de integración para recargar energías y reconocernos como la gran familia que somos', expresó la presidenta del gremio.",
        "La directiva agradeció el apoyo de la Caja de Compensación y de los comercios locales que colaboraron con premios para las rifas. Se espera repetir esta experiencia para las Fiestas Patrias."
      ]
    }
  ];

  // Obtener la noticia seleccionada
  const selectedNotice = noticiasGremiales.find(n => n.id === selectedNoticeId);

  // --- SUB-VISTA: DETALLE DE LA NOTICIA EXPANDIDA ---
  const renderDetalleNoticia = () => (
    <div className="animate-in fade-in duration-500 max-w-4xl mx-auto font-sans">
      
      {/* Botón de volver */}
      <button 
        onClick={() => setSelectedNoticeId(null)} 
        className="bg-slate-100 hover:bg-slate-200 text-[#003876] px-4 py-1.5 rounded-full font-bold flex items-center gap-2 mb-10 text-xs transition-all border border-slate-200 shadow-sm"
      >
        <ChevronLeft size={16} /> Volver al Listado de Noticias
      </button>

      {/* Cabecera de la noticia */}
      <header className="mb-10">
        <div className="flex items-center gap-4 mb-4 text-slate-500 font-bold text-xs uppercase tracking-wider">
          <div className="flex items-center gap-1.5"><Calendar size={14} className="text-orange-500" /> {selectedNotice.fecha}</div>
          <div className="flex items-center gap-1.5"><Clock size={14} /> {selectedNotice.hora}</div>
          <div className="flex items-center gap-1.5 bg-orange-50 text-orange-600 px-3 py-1 rounded-full"><Tag size={14} /> {selectedNotice.categoria}</div>
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-[#003876] mb-6 leading-tight tracking-tighter">
          {selectedNotice.titulo}
        </h1>
        <p className="text-lg md:text-xl font-medium text-slate-600 border-l-4 border-orange-400 pl-6 leading-relaxed italic bg-slate-50/50 py-4 rounded-r-xl">
          {selectedNotice.resumen}
        </p>
      </header>

      {/* Imagen principal */}
      <div className="aspect-[16/10] bg-slate-100 rounded-3xl overflow-hidden mb-12 shadow-xl border-4 border-white">
        <img 
          src={selectedNotice.imagen} 
          alt={selectedNotice.titulo} 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Cuerpo de la noticia */}
      <div className="space-y-6 text-slate-700 leading-relaxed text-base md:text-lg pl-0 md:pl-4">
        {selectedNotice.cuerpo.map((parrafo, index) => (
          <p key={index}>{parrafo}</p>
        ))}
      </div>

      {/* Firma del gremio */}
      <footer className="mt-16 pt-8 border-t border-slate-100 flex flex-col items-center gap-3 text-center">
        <img src={logoHospital} alt="Logo Hospital Melipilla" className="h-16 w-auto object-contain opacity-50" />
        <p className="font-bold text-sm text-slate-400 uppercase tracking-widest">Comunicación Gremial - HSJM</p>
      </footer>
    </div>
  );


  // --- SUB-VISTA: LISTADO DE NOTICIAS (Principal) ---
  const renderListadoNoticias = () => (
    <div className="max-w-5xl mx-auto space-y-10">
      {noticiasGremiales.map((noticia) => (
        <article 
          key={noticia.id}
          className="group flex flex-col md:flex-row bg-slate-50 rounded-[2.5rem] overflow-hidden border border-slate-100 hover:bg-white hover:shadow-2xl hover:border-orange-200 transition-all duration-500"
        >
          {/* Foto de la noticia */}
          <div className="md:w-2/5 h-64 md:h-auto overflow-hidden">
            <img 
              src={noticia.imagen} 
              alt={noticia.titulo} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
          </div>

          {/* Contenido de la noticia */}
          <div className="md:w-3/5 p-8 md:p-10 flex flex-col justify-center">
            <div className="flex items-center gap-2 text-orange-500 mb-4">
              <Calendar size={16} />
              <span className="text-xs font-black uppercase tracking-tighter">{noticia.fecha}</span>
            </div>
            
            <h3 className="text-2xl md:text-3xl font-black text-[#003876] mb-4 group-hover:text-orange-600 transition-colors leading-tight tracking-tighter">
              {noticia.titulo}
            </h3>
            
            <p className="text-slate-500 font-medium leading-relaxed mb-6">
              {noticia.resumen}
            </p>

            <button 
              onClick={() => setSelectedNoticeId(noticia.id)}
              className="flex items-center gap-2 text-[#003876] font-black text-sm uppercase tracking-wider group-hover:gap-4 transition-all"
            >
              Leer noticia completa <ArrowRight size={18} className="text-orange-500" />
            </button>
          </div>
        </article>
      ))}
    </div>
  );


  // --- RENDERIZADO RAÍZ DE LA PÁGINA ---
  return (
    <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 min-h-[600px] animate-in fade-in zoom-in duration-500 w-full font-sans">
      
      {/* HEADER DE LA SECCIÓN (Solo visible si NO estamos en el detalle) */}
      {!selectedNoticeId && (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12 border-b pb-8 animate-in fade-in duration-300">
          <div>
            <button 
              onClick={() => onNavigate('inicio')} 
              className="bg-slate-100 hover:bg-[#ffb81c] text-[#003876] px-5 py-2 rounded-full font-black flex items-center gap-2 transition-all mb-4 text-xs shadow-sm"
            >
              <ChevronLeft size={18} /> VOLVER AL INICIO
            </button>
            <div className="flex items-center gap-4">
              <Users className="text-[#003876] hidden md:block" size={48} />
              <div>
                <h2 className="text-4xl md:text-5xl font-black text-[#003876] uppercase italic tracking-tighter leading-none">
                  Noticias <span className="text-orange-500">Gremiales</span>
                </h2>
                <p className="text-slate-400 font-bold uppercase tracking-widest mt-2 text-sm">
                  Comunicación Directa con el Funcionario
                </p>
              </div>
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-2 text-[#003876] bg-orange-50 px-4 py-2 rounded-full text-xs font-bold border border-orange-100">
            <Newspaper size={16} className="text-orange-500" /> Informativo HSJM
          </div>
        </div>
      )}

      {/* CONTROL DE VISTAS (Listado o Detalle) */}
      {selectedNoticeId ? renderDetalleNoticia() : renderListadoNoticias()}

    </section>
  );
};

export default Gremio;