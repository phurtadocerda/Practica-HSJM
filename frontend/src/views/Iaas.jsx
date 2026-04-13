import React from 'react';
import { ChevronLeft, ShieldCheck } from 'lucide-react';

const Iaas = ({ onNavigate }) => {
  // === CONFIGURACIÓN DEL VIDEO ===
  // Reemplaza esta URL por la ruta real de tu archivo .mp4 en el servidor
  const urlVideoIaas = "http://10.5.131.63/intranet/wp-content/uploads/2025/02/iaas-final_1CPdjwZy.mp4?_=1";

  return (
    <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 min-h-[700px] animate-in fade-in zoom-in duration-500 w-full font-sans relative">
      
      {/* HEADER CON BOTÓN VOLVER Y TÍTULO */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12 border-b pb-8">
        <div>
          <button 
            onClick={() => onNavigate('accesos')} 
            className="bg-slate-100 hover:bg-[#ffb81c] text-[#003876] px-5 py-2 rounded-full font-black flex items-center gap-2 transition-all mb-4 text-sm shadow-sm"
          >
            <ChevronLeft size={18} strokeWidth={3} /> VOLVER A ACCESOS
          </button>
          <div className="flex items-center gap-4 mt-2">
            <ShieldCheck className="text-[#00a19a]" size={40} />
            <h2 className="text-4xl md:text-5xl font-black text-slate-700 tracking-tighter uppercase italic">
              IAAS
            </h2>
          </div>
          <p className="text-slate-500 font-medium mt-2 pl-14">Infecciones Asociadas a la Atención de Salud</p>
        </div>
      </div>

      {/* CONTENEDOR DEL VIDEO CENTRAL */}
      <div className="max-w-6xl mx-auto">
        <div className="aspect-video bg-slate-950 rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white relative group">
          
          {/* Reproductor de Video Nativo */}
          <video 
            src={urlVideoIaas} 
            controls 
            className="w-full h-full object-cover"
            // controlsList="nodownload" // Descomenta esto si quieres bloquear la descarga
            poster="https://via.placeholder.com/1920x1080/003876/FFFFFF?text=Video+IAAS" // Imagen opcional antes de reproducir
          >
            Tu navegador no soporta la reproducción de video.
          </video>

          {/* Superposición decorativa al hacer hover (opcional) */}
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex items-center justify-center">
            <div className="bg-white/20 p-6 rounded-full backdrop-blur-sm">
                <ShieldCheck className="text-white" size={60} strokeWidth={1}/>
            </div>
          </div>
        </div>

        {/* Breve texto descriptivo opcional debajo del video */}
        <div className="mt-8 text-center bg-slate-50 p-6 rounded-2xl border border-slate-100 max-w-3xl mx-auto">
            <p className="text-slate-700 font-medium text-lg">
                Visualiza el video instructivo sobre los protocolos y medidas de prevención de Infecciones Asociadas a la Atención de Salud (IAAS) en nuestro establecimiento.
            </p>
        </div>
      </div>

    </section>
  );
};

export default Iaas;