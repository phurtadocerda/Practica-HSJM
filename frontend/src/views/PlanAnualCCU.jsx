import React from 'react';
import { ChevronLeft, Calendar, FileText, FolderOpen } from 'lucide-react';

const PlanAnualCCU = ({ onNavigate }) => {
  const documentos = [
    { titulo: "Informe anual 2024 acuerdos CCU y Dirección HSJM", link: "http://10.5.131.63/intranet/wp-content/uploads/2025/01/Informe-anual-2024-acuerdos-CCU-y-Direccion-HSJM.pdf" }
  ];

  return (
    <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 min-h-[600px] w-full font-sans animate-in fade-in zoom-in duration-500">
      
      {/* HEADER DE LA SECCIÓN */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12 border-b pb-8">
        <div>
          <button
            onClick={() => onNavigate('inicio')}
            className="bg-[#003876]/5 hover:bg-[#ffb81c] text-[#003876] px-5 py-2 rounded-full font-black flex items-center gap-2 transition-all mb-6 text-xs shadow-sm"
          >
            <ChevronLeft size={18} /> VOLVER AL INICIO
          </button>
          <div className="flex items-center gap-4">
            <div className="bg-sky-500 p-3 rounded-2xl text-white shadow-lg">
              <Calendar size={32} />
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-[#003876] uppercase italic tracking-tighter leading-none">
                Plan Anual <span className="text-sky-500">2024 CCU</span>
              </h2>
              <p className="text-slate-400 font-bold uppercase tracking-widest mt-2 text-sm">
                Consejo Consultivo de Usuarios
              </p>
            </div>
          </div>
        </div>
        <div className="hidden lg:flex items-center gap-2 text-slate-400 bg-slate-50 px-4 py-2 rounded-full text-xs font-bold border border-slate-100">
          <FolderOpen size={16} className="text-sky-500" /> Biblioteca
        </div>
      </div>

      {/* DOCUMENTO ÚNICO */}
      <div className="max-w-5xl mx-auto">
        <div className="bg-sky-50/30 p-8 md:p-10 rounded-3xl border border-sky-100/50 shadow-sm">
          <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2 border-b border-sky-100 pb-4">
            <FileText size={16} className="text-sky-500" /> Informe de Acuerdos
          </h3>
          
          <ul className="space-y-6 pl-2 md:pl-4">
            {documentos.map((doc, idx) => (
              <li key={idx} className="list-none group">
                <a
                  href={doc.link}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start gap-3 w-fit"
                >
                  <span className="mt-2 w-2 h-2 rounded-full bg-slate-300 group-hover:bg-sky-500 transition-colors shrink-0"></span>
                  <span className="text-slate-700 font-bold underline decoration-slate-200 group-hover:decoration-sky-500 group-hover:text-sky-800 underline-offset-4 transition-all text-lg md:text-xl tracking-wide">
                    {doc.titulo}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* PIE DE PÁGINA */}
      <div className="mt-20 pt-8 border-t border-slate-100 text-center">
        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
          Documentación Oficial - Hospital San José de Melipilla
        </p>
      </div>

    </section>
  );
};

export default PlanAnualCCU;