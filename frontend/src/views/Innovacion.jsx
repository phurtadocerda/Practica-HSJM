import React from 'react';
import { ChevronLeft } from 'lucide-react';

const Innovacion_pagina = ({ onNavigate }) => {
  // === CONFIGURACIÓN DE VIDEOS ===
  // Pon aquí las rutas reales de tus archivos .mp4
  const videoNaranja = "http://10.5.131.63/intranet/wp-content/uploads/2023/12/Innovacion.mp4?_=1";
  const videoMorado = "http://10.5.131.63/intranet/wp-content/uploads/2023/10/INNOVACION.mp4?_=2";

  return (
    <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 min-h-[800px] animate-in fade-in zoom-in duration-500 w-full font-sans">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 border-b pb-8">
        <div>
          <button 
            onClick={() => onNavigate('accesos')} 
            className="bg-slate-100 hover:bg-[#ffb81c] text-[#003876] px-5 py-2 rounded-full font-black flex items-center gap-2 transition-all mb-4 text-sm shadow-sm"
          >
            <ChevronLeft size={18} strokeWidth={3} /> VOLVER A ACCESOS
          </button>
          <h2 className="text-4xl md:text-5xl font-black text-slate-700 tracking-tighter uppercase italic mt-2">
            Innovación
          </h2>
        </div>
      </div>

      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* TEXTOS Y LINKS SUPERIORES (Copia fiel de tu imagen) */}
        <div className="space-y-6 text-lg">
          <div>
            <p className="font-bold text-slate-700">Video de Taller Intro Innovación Pública en siguiente link:</p>
            <a 
              href="https://drive.google.com/file/d/1Ia1Bixg6c6gSQp-AGk4t4tz_pu-VtLhR/view" 
              target="_blank" 
              rel="noreferrer"
              className="text-blue-700 underline break-all hover:text-blue-900"
            >
              https://drive.google.com/file/d/1la1Bixg6c6gSQp-AGk4t4tz_pu-VtLhR/view?usp=sharing
            </a>
          </div>

          <div>
            <p className="text-slate-700">Material de taller:</p>
            <a href="http://10.5.131.63/intranet/wp-content/uploads/2025/04/Taller-Intro-Innovacion-Publica-LabGob-HSJM.pdf" className="text-slate-900 font-bold underline hover:text-blue-700 block mt-1 italic">
              Taller Intro Innovación Pública – LabGob – HSJM
            </a>
          </div>
        </div>

        {/* SECCIÓN DE VIDEOS */}
        <div className="space-y-20">
          
          {/* VIDEO 1 (NARANJA) */}
          <div className="space-y-4">
            <a href="http://10.5.131.63/intranet/wp-content/uploads/2023/12/1-PARTE-SOBRE-INNOVACION-_JK_.pdf" className="text-slate-900 font-bold underline hover:text-blue-700 text-xl uppercase italic">
              1-PARTE-SOBRE-INNOVACIÓN-_JK_
            </a>
            <div className="aspect-video bg-orange-400 rounded-3xl overflow-hidden shadow-2xl border-4 border-white relative group">
              <video 
                src={videoNaranja} 
                controls 
                className="w-full h-full object-cover"
              >
                Tu navegador no soporta el video.
              </video>
            </div>
          </div>

          {/* VIDEO 2 (MORADO) Y LINKS INFERIORES */}
          <div className="space-y-8">
            <div className="aspect-video bg-purple-700 rounded-3xl overflow-hidden shadow-2xl border-4 border-white relative">
              <video 
                src={videoMorado} 
                controls 
                className="w-full h-full object-cover"
              >
                Tu navegador no soporta el video.
              </video>
            </div>

            <div className="space-y-4 pl-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full border border-slate-800 shrink-0"></div>
                <a href="http://10.5.131.63/intranet/wp-content/uploads/2023/05/1-PARTE-SOBRE-INNOVACION.pdf" className="font-bold text-slate-800 underline hover:text-blue-700 uppercase italic text-lg">
                  1 PARTE SOBRE INNOVACIÓN
                </a>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full border border-slate-800 shrink-0"></div>
                <a href="http://10.5.131.63/intranet/wp-content/uploads/2023/05/Presentacion-encuesta-JK.pdf" className="font-bold text-slate-800 underline hover:text-blue-700 uppercase italic text-lg">
                  Presentacion encuesta JK
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Innovacion_pagina;