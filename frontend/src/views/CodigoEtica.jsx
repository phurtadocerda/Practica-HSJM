import React from 'react';
import { ChevronLeft, Scale, FileText, FolderOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // 1. Importamos el hook

const CodigoEtica = () => { // 2. Quitamos onNavigate
  const navigate = useNavigate(); // 3. Inicializamos el hook

  const documentos = [
    { titulo: "Código de Ética", link: "http://10.5.131.63/intranet/wp-content/uploads/2023/12/Codigo-de-Etica.pdf" }
  ];

  return (
    <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 min-h-[600px] w-full font-sans animate-in fade-in zoom-in duration-500">
      
      {/* HEADER DE LA SECCIÓN */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12 border-b pb-8">
        <div>
          <button
            onClick={() => navigate('/inicio')} // 4. CORRECCIÓN: Usamos navigate
            className="bg-[#003876]/5 hover:bg-[#ffb81c] text-[#003876] px-5 py-2 rounded-full font-black flex items-center gap-2 transition-all mb-6 text-xs shadow-sm"
          >
            <ChevronLeft size={18} /> VOLVER AL INICIO
          </button>
          <div className="flex items-center gap-4">
            <div className="bg-amber-500 p-3 rounded-2xl text-white shadow-lg">
              <Scale size={32} />
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-[#003876] uppercase italic tracking-tighter leading-none">
                Código de <span className="text-amber-500">Ética</span>
              </h2>
              <p className="text-slate-400 font-bold uppercase tracking-widest mt-2 text-sm">
                Valores y Principios Institucionales
              </p>
            </div>
          </div>
        </div>
        <div className="hidden lg:flex items-center gap-2 text-slate-400 bg-slate-50 px-4 py-2 rounded-full text-xs font-bold border border-slate-100">
          <FolderOpen size={16} className="text-amber-500" /> Biblioteca
        </div>
      </div>

      {/* DOCUMENTO ÚNICO */}
      <div className="max-w-5xl mx-auto">
        <div className="bg-amber-50/30 p-8 md:p-10 rounded-3xl border border-amber-100/50 shadow-sm">
          <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2 border-b border-amber-200 pb-4">
            <FileText size={16} className="text-amber-500" /> Documento Oficial
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
                  <span className="mt-2 w-2 h-2 rounded-full bg-slate-300 group-hover:bg-amber-500 transition-colors shrink-0"></span>
                  <span className="text-slate-700 font-bold underline decoration-slate-200 group-hover:decoration-amber-500 group-hover:text-amber-700 underline-offset-4 transition-all text-xl md:text-2xl tracking-wide">
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
          Compromiso con la Integridad - Hospital San José de Melipilla
        </p>
      </div>

    </section>
  );
};

export default CodigoEtica;