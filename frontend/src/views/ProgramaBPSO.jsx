import React from 'react';
import PageHeader from '../components/PageHeader';

// === AQUÍ IMPORTAS TUS FOTOS DIRECTAMENTE ===
import foto1 from '../assets/afiche_bpso.png'; 
import foto2 from '../assets/foto_bpso_2.png'; 
import foto3 from '../assets/foto_bpso_3.png'; 

const ProgramaBPSO = () => {

  return (
    <section className="bg-white rounded-[3rem] p-6 md:p-10 shadow-2xl border border-slate-100 min-h-[600px] animate-in fade-in zoom-in duration-500 w-full font-sans">
      
      <PageHeader
        title="Programa BPSO"
        showBackButton={true}
        backPath="/accesos"
        backLabel="VOLVER A ACCESOS"
      />
      <div className="w-full max-w-3xl mx-auto flex flex-col items-center gap-8 pt-4">
        
        {/* FOTO 1 */}
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

        {/* ENLACE FINAL DESTACADO  */}
        <div className="w-full pt-8 pb-4 border-t border-slate-200 flex justify-center mt-2">
          <a 
            href="http://10.5.131.63/intranet/wp-content/uploads/2024/10/SISTEMA-DE-CLASIFICACION-LESIONES-POR-PRESION-1.pdf" 
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