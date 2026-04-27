// src/views/Inicio.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // <-- IMPORTANTE: Nuevo Hook
import { ChevronLeft, ChevronRight, ShieldCheck, Database, Users, LogIn, Key } from 'lucide-react';

import ModalCumpleanos from './ModalCumpleanos';

const Inicio = ({ userName, images }) => {
  const navigate = useNavigate(); // <-- Iniciamos el Hook
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === images?.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? images?.length - 1 : prev - 1));
  };

  useEffect(() => {
    if (!images || images.length === 0) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [images]);

  return (
    <div className="space-y-12 animate-in fade-in duration-500 w-full">
      <ModalCumpleanos />

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
            <button onClick={nextSlide} className="pointer-events-auto bg-white/40 md:bg-white/20  text-[#003876] p-3 md:p-6 rounded-full backdrop-blur-xl transition-all opacity-70 md:opacity-0 md:group-hover:opacity-100 shadow-lg">
              <ChevronRight size={32} className="md:w-12 md:h-12" />
            </button>
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-center gap-4 mb-10">
          <div className="bg-[#00a19a]/20 p-4 rounded-3xl text-[#00a19a]"><ShieldCheck size={48} /></div>
          <h3 className="text-3xl md:text-5xl font-black text-[#003876] tracking-tighter uppercase italic">Herramientas Principales</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
          {/* USANDO NAVIGATE EN VEZ DE ONNAVIGATE */}
          <div onClick={() => navigate('/portal')} className="cursor-pointer hover:scale-105 transition-transform">
            <QuickCard icon={<Database size={48} />} title="PORTAL DIGITAL" desc="Registros Clínicos" color="border-[#00a19a]" />
          </div>
          <div onClick={() => navigate('/gremio')} className="cursor-pointer hover:scale-105 transition-transform">
            <QuickCard icon={<Users size={48} />} title="GREMIO" desc="Información Gremial" color="border-orange-500" />
          </div>
          <div onClick={() => navigate('/capacitacion')} className="cursor-pointer hover:scale-105 transition-transform">
            <QuickCard icon={<LogIn size={48} />} title="CAPACITACION" desc="Plataforma Virtual" color="border-red-500" />
          </div>
          <div onClick={() => navigate('/accesos')} className="cursor-pointer hover:scale-105 transition-transform">
            <QuickCard icon={<Key size={48} />} title="ACCESOS" desc="Sistemas Clínicos" color="border-[#ffb81c]" />
          </div>
        </div>
      </section>
    </div>
  );
};

const QuickCard = ({ icon, title, desc, color }) => (
  <div className={`bg-white p-8 md:p-10 rounded-[2.5rem] border-b-8 ${color} shadow-lg flex flex-col items-center justify-center text-center h-full min-h-[240px]`}>
    <div className={`text-slate-600 mb-6 p-5 rounded-full bg-slate-50`}>{icon}</div>
    <h4 className="font-black text-[#003876] text-xl md:text-2xl uppercase tracking-tight mb-2">{title}</h4>
    <p className="text-slate-500 font-bold text-base">{desc}</p>
  </div>
);

export default Inicio;