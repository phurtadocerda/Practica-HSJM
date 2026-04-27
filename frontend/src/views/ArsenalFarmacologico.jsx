import React from 'react';
import { ChevronLeft, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // 1. Importamos el hook

const ArsenalFarmacologico = () => { // 2. Quitamos { onNavigate } de los props
  const navigate = useNavigate(); // 3. Inicializamos la navegación

  // === LINKS DEL ARSENAL ===
  const linkImagen = "http://10.5.131.63/intranet/wp-content/uploads/2020/01/Arsenal2020.pdf"; 
  const linkTexto = "http://10.5.131.63/intranet/wp-content/uploads/2025/01/Arsenal-Farmacologico-2025-HSJM.pdf";  

  return (
    <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 min-h-[600px] animate-in fade-in zoom-in duration-500 w-full font-sans relative mt-6">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b pb-8">
        <div>
          <button 
            onClick={() => navigate('/inicio')} // 4. Corregido para usar navigate
            className="bg-slate-100 hover:bg-[#ffb81c] text-[#003876] px-5 py-2 rounded-full font-black flex items-center gap-2 transition-all mb-6 text-sm shadow-sm"
          >
            <ChevronLeft size={18} strokeWidth={3} /> VOLVER A INICIO
          </button>
          <div className="flex items-center gap-4">
            <FileText className="text-[#00a19a] hidden md:block" size={48} />
            <h2 className="text-3xl md:text-5xl font-black text-slate-700 tracking-tighter uppercase italic">
              Arsenal <span className="text-[#003876]">Farmacológico</span>
            </h2>
          </div>
        </div>
      </div>

      {/* CONTENIDO CENTRAL */}
      <div className="max-w-4xl mx-auto flex flex-col items-start pt-8 pl-4 md:pl-12">
        
        {/* 1. LINK DE LA IMAGEN (ICONO PDF) */}
        <a 
          href={linkImagen} 
          target="_blank" 
          rel="noreferrer"
          className="group block mb-12 hover:scale-105 transition-transform duration-300 relative"
        >
          <div className="absolute -bottom-4 -right-4 w-full h-full bg-slate-200 rounded-full blur-md opacity-50 group-hover:opacity-80 transition-opacity"></div>
          
          <div className="bg-red-600 p-6 rounded-2xl shadow-xl relative transform -rotate-6 group-hover:rotate-0 transition-transform flex flex-col items-center justify-center w-32 h-40 border-l-8 border-red-800">
            <div className="absolute top-4 left-2 flex flex-col gap-2">
              <div className="w-2 h-2 rounded-full bg-red-800"></div>
              <div className="w-2 h-2 rounded-full bg-red-800"></div>
              <div className="w-2 h-2 rounded-full bg-red-800"></div>
            </div>
            <span className="text-white font-black text-3xl tracking-tighter mt-4 rotate-12">PDF</span>
          </div>
          
          <div className="w-full h-1 bg-[#00a19a] mt-6"></div>
        </a>

        {/* 2. LINK DEL TEXTO SUBRAYADO */}
        <a 
          href={linkTexto}
          target="_blank" 
          rel="noreferrer"
          className="text-2xl md:text-4xl font-black text-slate-800 hover:text-[#003876] transition-colors underline decoration-4 decoration-slate-800 hover:decoration-[#00a19a] underline-offset-[8px]"
        >
          Arsenal Farmacológico 2025 HSJM
        </a>

      </div>
    </section>
  );
};

export default ArsenalFarmacologico;