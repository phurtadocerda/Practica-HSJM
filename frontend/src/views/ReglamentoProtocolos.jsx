import React from 'react';
import { ChevronLeft, ShieldCheck, FolderOpen, Download } from 'lucide-react';

const ReglamentoProtocolos = ({ onNavigate }) => {
  return (
    <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 min-h-[600px] w-full font-sans animate-in fade-in zoom-in duration-500">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12 border-b pb-8">
        <div>
          <button
            onClick={() => onNavigate('inicio')}
            className="bg-[#003876]/5 hover:bg-[#ffb81c] text-[#003876] px-5 py-2 rounded-full font-black flex items-center gap-2 transition-all mb-6 text-xs shadow-sm"
          >
            <ChevronLeft size={18} /> VOLVER AL INICIO
          </button>
          <div className="flex items-center gap-4">
            <div className="bg-indigo-700 p-3 rounded-2xl text-white shadow-lg">
              <ShieldCheck size={32} />
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-[#003876] uppercase italic tracking-tighter leading-none">
                Reglamento Interno <span className="text-indigo-700">y Protocolos</span>
              </h2>
            </div>
          </div>
        </div>
        <div className="hidden lg:flex items-center gap-2 text-slate-400 bg-slate-50 px-4 py-2 rounded-full text-xs font-bold border border-slate-100">
          <FolderOpen size={16} className="text-indigo-700" /> Documento de la información
        </div>
      </div>

      {/* CUERPO (IGUAL A TU IMAGEN) */}
      <div className="max-w-5xl mx-auto pt-4">
        <div className="flex items-center gap-3 group">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-indigo-700 transition-colors"></span>
          <a
            href="http://10.5.131.63/intranet/wp-content/uploads/2021/04/protocolo-de-resguardo-de-pertenencias-en-Servicio-de-Urgencias.pdf"
            target="_blank"
            rel="noreferrer"
            className="text-xl md:text-2xl font-bold text-black hover:text-indigo-700 underline underline-offset-8 decoration-1 transition-all"
          >
            Protocolo de resguardo de pertenencias en Servicio de Urgencias
          </a>
          <Download size={20} className="text-indigo-500 opacity-0 group-hover:opacity-100 transition-all" />
        </div>
      </div>

      {/* PIE DE PÁGINA */}
      <div className="mt-40 pt-8 border-t border-slate-100 text-center">
        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
          Hospital San José de Melipilla
        </p>
      </div>

    </section>
  );
};

export default ReglamentoProtocolos;