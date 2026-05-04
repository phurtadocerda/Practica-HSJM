import React from 'react';
import { Network } from 'lucide-react';
import PageHeader from '../components/PageHeader';

const Organigrama = () => {
  return (
    <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 min-h-[600px] w-full font-sans animate-in fade-in zoom-in duration-500">
      <PageHeader
        title={<>Resolución Nuevo <span className="text-blue-800">Organigrama Institucional</span></>}
        icon={Network}
        iconBg="bg-blue-800"
        showBackButton={true}
        backPath="/inicio"
      />
      <div className="max-w-5xl mx-auto pt-4">
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
          <a 
            href="http://10.5.131.63/intranet/wp-content/uploads/2022/04/Resolucion_organigrama.pdf" 
            target="_blank" 
            rel="noreferrer" 
            className="text-2xl md:text-3xl font-bold text-black hover:text-blue-800 underline underline-offset-8 decoration-1 transition-colors uppercase"
          >
            RESOLUCIÓN ORGANIGRAMA
          </a>
        </div>
      </div>
    </section>
  );
};

export default Organigrama;