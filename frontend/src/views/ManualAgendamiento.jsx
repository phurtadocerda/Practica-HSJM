import React from 'react';
import { ChevronLeft, Calendar, Download } from 'lucide-react';

const ManualAgendamiento = ({ onNavigate }) => {
  return (
    <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 min-h-[600px] w-full font-sans animate-in fade-in zoom-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12 border-b pb-8">
        <div>
          <button onClick={() => onNavigate('inicio')} className="bg-[#003876]/5 hover:bg-[#ffb81c] text-[#003876] px-5 py-2 rounded-full font-black flex items-center gap-2 mb-6 text-xs transition-all">
            <ChevronLeft size={18} /> VOLVER AL INICIO
          </button>
          <div className="flex items-center gap-4">
            <div className="bg-emerald-600 p-3 rounded-2xl text-white shadow-lg"><Calendar size={32} /></div>
            <h2 className="text-4xl md:text-5xl font-black text-[#003876] uppercase italic tracking-tighter">Manual de <span className="text-emerald-600">Agendamiento</span></h2>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto pt-4">
        <a href="http://10.5.131.63/intranet/wp-content/uploads/2019/09/ManualA.docx" target="_blank" rel="noreferrer" className="text-2xl md:text-3xl font-bold text-black hover:text-emerald-600 underline underline-offset-8 decoration-1 transition-colors flex items-center gap-3 w-fit">
          Descargar <Download size={24} className="text-emerald-500" />
        </a>
      </div>
    </section>
  );
};

export default ManualAgendamiento;