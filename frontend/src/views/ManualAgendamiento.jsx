import React from 'react';
import { Calendar, Download } from 'lucide-react';
import PageHeader from '../components/PageHeader';

const ManualAgendamiento = () => { 

  return (
    <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 min-h-[600px] w-full font-sans animate-in fade-in zoom-in duration-500">
      
      <PageHeader
        title={<>Manual de <span className="text-emerald-600">Agendamiento</span></>}
        icon={Calendar}
        iconBg="bg-emerald-600"
      />
      
      <div className="max-w-5xl mx-auto pt-4">
        <a 
          href="http://10.5.131.63/intranet/wp-content/uploads/2019/09/ManualA.docx" 
          target="_blank" 
          rel="noreferrer" 
          className="text-2xl md:text-3xl font-bold text-black hover:text-emerald-600 underline underline-offset-8 decoration-1 transition-colors flex items-center gap-3 w-fit"
        >
          Descargar <Download size={24} className="text-emerald-500" />
        </a>
      </div>
    </section>
  );
};

export default ManualAgendamiento;