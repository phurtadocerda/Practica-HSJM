import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';

const ArsenalFarmacologico = () => {
  const navigate = useNavigate();

  // === LINKS DEL ARSENAL ===
  const linkImagen = "http://10.5.131.63/intranet/wp-content/uploads/2020/01/Arsenal2020.pdf"; 
  const linkTexto = "http://10.5.131.63/intranet/wp-content/uploads/2025/01/Arsenal-Farmacologico-2025-HSJM.pdf";  

  return (
    <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 min-h-[600px] animate-in fade-in zoom-in duration-500 w-full font-sans relative mt-6">
      
      <PageHeader
        title={<>Arsenal <span className="text-cyan-600">Farmacológico</span></>}
        subtitle="Información de medicamentos"
        onBack={() => navigate('/inicio')}
        backLabel="VOLVER"
      />

      {/* CONTENIDO CENTRAL */}
      <div className="max-w-4xl mx-auto flex flex-col items-start pt-8 pl-4 md:pl-12">
        
        {/* LINK DE LA IMAGEN (ICONO PDF) */}
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

        {/* LINK DEL TEXTO SUBRAYADO */}
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