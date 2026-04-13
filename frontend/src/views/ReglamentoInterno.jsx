import React from 'react';
import { ChevronLeft, FileText, Download, FolderOpen } from 'lucide-react';

const ReglamentoInterno = ({ onNavigate }) => {
  // Link real al PDF
  const linkReglamento = "http://10.5.131.63/intranet/wp-content/uploads/2026/01/994-Reglamento-Interno-Higiene-y-Seguridad.pdf";

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
            <div className="bg-blue-600 p-3 rounded-2xl text-white shadow-lg">
              <FileText size={32} />
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-[#003876] uppercase italic tracking-tighter leading-none">
                Reglamento <span className="text-blue-600">Interno Hsjm.</span>
              </h2>
            </div>
          </div>
        </div>
        <div className="hidden lg:flex items-center gap-2 text-slate-400 bg-slate-50 px-4 py-2 rounded-full text-xs font-bold border border-slate-100">
          <FolderOpen size={16} className="text-blue-600" /> Documento de la información
        </div>
      </div>

      {/* CUERPO DE LA PÁGINA (COMO LA IMAGEN) */}
      <div className="max-w-5xl mx-auto pt-10">
        <div className="flex items-center gap-4 group">
          {/* El link subrayado como en tu imagen */}
          <a
            href={linkReglamento}
            target="_blank"
            rel="noreferrer"
            className="text-2xl md:text-3xl font-bold text-black hover:text-blue-700 underline underline-offset-8 decoration-1 transition-colors"
          >
            Reglamento Interno
          </a>
          
          {/* Un pequeño ícono de descarga que aparece al pasar el mouse (opcional, para darle estilo) */}
          <Download size={24} className="text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
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

export default ReglamentoInterno;