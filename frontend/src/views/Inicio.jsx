import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ShieldCheck, Database, Users, LogIn, Key } from 'lucide-react';

// ==========================================
// IMPORTACIÓN DE MODAL DE CUMPLEAÑOS
// ==========================================
import ModalCumpleanos from './ModalCumpleanos';

// ==========================================
// IMPORTACIÓN DE LOGOS DE LA RED DE SALUD
// ==========================================
import logoPortalEmpleos from '../assets/logoPortalEmpleos.png';
import logoTransparenciaActiva from '../assets/logoTransparenciaActiva.png';
import logoOIRS from '../assets/logoOIRS.png';
import logoSolicitudTransparencia from '../assets/logoSolicitudTransparencia.png';
import logoChileAtiendeLink from '../assets/logoChileAtiendeLink.png';
import logoMinsalTV from '../assets/logoMinsalTV.png';
import logoFarmaciasTurno from '../assets/logoFarmaciasTurno.png';
import logoMinsalLink from '../assets/logoMinsalLink.png';

const Inicio = ({ onNavigate, userName, images }) => {
  // Lógica del Carrusel
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === images?.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? images?.length - 1 : prev - 1));
  };

  // Cambio automático del carrusel cada 5 segundos
  useEffect(() => {
    if (!images || images.length === 0) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [images]);

  return (
    <div className="space-y-12 animate-in fade-in duration-500 w-full">
      
      {/* TARJETA ANIMADA DE CUMPLEAÑOS */}
      <ModalCumpleanos />

      {/* CARRUSEL DE INICIO */}
      <section className="bg-white rounded-2xl md:rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100 relative h-[450px] md:h-[650px] group transition-all duration-500">
        <div className="w-full h-full relative overflow-hidden">
          {images && images.map((img, index) => (
            <div key={index} className={`absolute inset-0 transition-all duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 scale-110 z-10' : 'opacity-0 scale-100 z-0'}`}>
              <img src={img} alt={`Hospital ${index + 1}`} className="w-full h-full object-cover" />
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10"></div>
          <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 text-white pr-6 z-20">
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-tight uppercase mb-2 drop-shadow-md">
              Bienvenido, {userName || 'Cristian'}
            </h2>
            <p className="text-base md:text-xl font-bold max-w-2xl leading-tight tracking-tight italic text-white/90 drop-shadow">
              Gestiona tu día en el Nuevo Hospital San José de Melipilla.
            </p>
          </div>
          <div className="flex absolute inset-0 items-center justify-between px-2 md:px-10 z-30 pointer-events-none">
            <button onClick={prevSlide} className="pointer-events-auto bg-white/40 md:bg-white/20  text-[#003876] p-3 md:p-6 rounded-full backdrop-blur-xl transition-all opacity-70 md:opacity-0 md:group-hover:opacity-100 shadow-lg">
              <ChevronLeft size={32} className="md:w-12 md:h-12" />
            </button>
            <button onClick={nextSlide} className="pointer-events-auto bg-white/40 md:bg-white/20  text-[#003876] p-3 md:p-6 rounded-full backdrop-blur-xl transition-all opacity-70 md:opacity-0 md:group-hover:opacity-100 shadow-lg"
  >             <ChevronRight size={32} className="md:w-12 md:h-12" />
            </button>
          </div>
        </div>
      </section>

      {/* HERRAMIENTAS PRINCIPALES */}
      <section>
        <div className="flex items-center gap-4 mb-10">
          <div className="bg-[#00a19a]/20 p-4 rounded-3xl text-[#00a19a]"><ShieldCheck size={48} /></div>
          <h3 className="text-3xl md:text-5xl font-black text-[#003876] tracking-tighter uppercase italic">Herramientas Principales</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
          <div onClick={() => onNavigate('portal')} className="cursor-pointer hover:scale-105 transition-transform">
            <QuickCard icon={<Database size={48} />} title="PORTAL DIGITAL" desc="Registros Clínicos" color="border-[#00a19a]" />
          </div>
          <div onClick={() => onNavigate('gremio')} className="cursor-pointer hover:scale-105 transition-transform">
            <QuickCard icon={<Users size={48} />} title="GREMIO" desc="Información Gremial" color="border-orange-500" />
          </div>
          <div onClick={() => onNavigate('capacitacion')} className="cursor-pointer hover:scale-105 transition-transform">
            <QuickCard icon={<LogIn size={48} />} title="CAPACITACION" desc="Plataforma Virtual" color="border-red-500" />
          </div>
          <div onClick={() => onNavigate('accesos')} className="cursor-pointer hover:scale-105 transition-transform">
            <QuickCard icon={<Key size={48} />} title="ACCESOS" desc="Sistemas Clínicos" color="border-[#ffb81c]" />
          </div>
        </div>
      </section>

      {/* RED DE SALUD MELIPILLA */}
      {/* <section className="bg-white/60 py-14 rounded-[3rem] px-6 md:px-12 shadow-xl border border-white mt-16">
        <h2 className="text-center text-[#003876] font-black text-3xl md:text-4xl uppercase tracking-widest mb-14 italic leading-none">
          Red de Salud Melipilla
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
          <TechnicalLink image={logoPortalEmpleos} title="" link="https://www.empleospublicos.cl" />
          <TechnicalLink image={logoTransparenciaActiva} title="" link="https://www.consejotransparencia.cl/transparencia-activa/" />
          <TechnicalLink image={logoOIRS} title="." link="https://oirs.minsal.cl/" />
          <TechnicalLink image={logoSolicitudTransparencia} title="" link="https://www.consejotransparencia.cl/solicitud-de-informacion/" />
          <TechnicalLink image={logoChileAtiendeLink} title="" link="https://www.chileatiende.gob.cl/" />
          <TechnicalLink image={logoMinsalTV} title="" link="https://www.minsal.cl/minsal-tv/" />
          <TechnicalLink image={logoFarmaciasTurno} title="" link="https://seremienlinea.minsal.cl/asdigital/index.php?mfarmacias" />
          <TechnicalLink image={logoMinsalLink} title="" link="https://www.minsal.cl" />
        </div>
      </section> */}
    </div>
  );
};

// --- COMPONENTES SECUNDARIOS ---
const QuickCard = ({ icon, title, desc, color }) => (
  <div className={`bg-white p-8 md:p-10 rounded-[2.5rem] border-b-8 ${color} shadow-lg flex flex-col items-center justify-center text-center h-full min-h-[240px]`}>
    <div className={`text-slate-600 mb-6 p-5 rounded-full bg-slate-50`}>{icon}</div>
    <h4 className="font-black text-[#003876] text-xl md:text-2xl uppercase tracking-tight mb-2">{title}</h4>
    <p className="text-slate-500 font-bold text-base">{desc}</p>
  </div>
);

const TechnicalLink = ({ image, title, link }) => (
  <a href={link} target="_blank" rel="noreferrer" className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md hover:scale-105 transition-all flex flex-col items-center justify-center gap-3 h-32 md:h-36 group">
    <img src={image} alt={title || "Enlace"} className="max-h-16 md:max-h-20 w-auto object-contain transition-transform grayscale hover:grayscale-0 opacity-80 hover:opacity-100" />
    {title && title !== "." && <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{title}</span>}
  </a>
);

export default Inicio;