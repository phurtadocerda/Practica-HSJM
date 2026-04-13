import React from 'react';
import { ChevronLeft } from 'lucide-react';

// === AQUÍ IMPORTAS TUS FOTOS DIRECTAMENTE ===
import foto1 from '../assets/afiche_bpso.png'; // Cambia 'afiche_bpso.png' por tu nombre real
import foto2 from '../assets/foto_bpso_2.png'; // Cambia 'foto_bpso_2.png' por tu nombre real
import foto3 from '../assets/foto_bpso_3.png'; // Cambia 'foto_bpso_3.png' por tu nombre real

const ProgramaBPSO = ({ onNavigate }) => {
  return (
    <section className="bg-white rounded-[3rem] p-6 md:p-10 shadow-2xl border border-slate-100 min-h-[600px] animate-in fade-in zoom-in duration-500 w-full font-sans">
      
      {/* HEADER CON BOTÓN VOLVER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b pb-4">
        <div>
          <button 
            onClick={() => onNavigate('accesos')} 
            className="bg-slate-100 hover:bg-[#ffb81c] text-[#003876] px-5 py-2 rounded-full font-black flex items-center gap-2 transition-all text-sm shadow-sm"
          >
            <ChevronLeft size={18} strokeWidth={3} /> VOLVER A ACCESOS
          </button>
          {/* TÍTULO MÁS PEQUEÑO */}
          <h2 className="text-3xl md:text-5xl font-black text-slate-700 tracking-tighter uppercase italic mt-4">Programa BPSO</h2>
        </div>
      </div>

      {/* CONTENEDOR CENTRAL: MÁS COMPACTO (max-w-3xl) */}
      <div className="w-full max-w-3xl mx-auto flex flex-col items-center gap-8 pt-4">
        
        {/* FOTO 1 (Afiche principal) - Limitamos el ancho con max-w-xl */}
        <div className="w-full max-w-xl">
          <img 
            src={foto1} 
            alt="Afiche BPSO" 
            className="w-full h-auto object-cover rounded-2xl shadow-md border border-slate-100" 
          />
        </div>

        {/* FOTO 2 */}
        <div className="w-full max-w-xl">
          <img 
            src={foto2} 
            alt="Actividad BPSO 1" 
            className="w-full h-auto object-cover rounded-2xl shadow-md border border-slate-100" 
          />
        </div>

        {/* FOTO 3 */}
        <div className="w-full max-w-xl">
          <img 
            src={foto3} 
            alt="Actividad BPSO 2" 
            className="w-full h-auto object-cover rounded-2xl shadow-md border border-slate-100" 
          />
        </div>

        {/* ENLACE FINAL DESTACADO - Letra y relleno más pequeños */}
        <div className="w-full pt-8 pb-4 border-t border-slate-200 flex justify-center mt-2">
          <a 
            href="http://10.5.131.63/intranet/wp-content/uploads/2024/10/SISTEMA-DE-CLASIFICACION-LESIONES-POR-PRESION-1.pdf" // <-- Pega tu link real aquí
            target="_blank" 
            rel="noreferrer"
            className="bg-slate-50 px-6 py-4 rounded-2xl w-full max-w-xl text-center text-[#003876] font-bold text-lg md:text-xl underline underline-offset-4 hover:text-[#00a19a] hover:bg-slate-100 transition-all uppercase shadow-sm border border-slate-200 block"
          >
            SISTEMA DE CLASIFICACIÓN LESIONES POR PRESION (1)
          </a>
        </div>

      </div>
    </section>
  );
};

export default ProgramaBPSO;