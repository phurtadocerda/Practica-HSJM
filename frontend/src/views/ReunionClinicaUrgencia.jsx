import React from 'react';
import { ChevronLeft, Activity, FolderOpen, Download } from 'lucide-react';

const ReunionClinicaUrgencia = ({ onNavigate }) => {
  // Lista de documentos con los enlaces corregidos (usando / en vez de \)
  const documentos = [
    { titulo: "SECUENCIA DE INTUBACION RAPIDA", link: "http://10.5.131.63/intranet/urgencia/ir.pptx" },
    { titulo: "ORGANIZACIÓN DURANTE RCP 2", link: "http://10.5.131.63/intranet/urgencia/2.pptx" },
    { titulo: "ACTUALIZACION PCR AHA", link: "http://10.5.131.63/intranet/urgencia/3.pptx" },
    { titulo: "MANEJO INICIAL DEL POLITRAUMA", link: "http://10.5.131.63/intranet/urgencia/4manejo.pptx" },
    { titulo: "PCR traumático", link: "http://10.5.131.63/intranet/urgencia/5.pptx" },
    { titulo: "TRAUMA RAQUIMEDULAR", link: "http://10.5.131.63/intranet/urgencia/6RAQUIMEDULAR.pptx" },
    { titulo: "CONVULSIONES EN PEDIATRIA", link: "http://10.5.131.63/intranet/urgencia/7.pptx" },
    { titulo: "TRAUMA OCULAR", link: "http://10.5.131.63/intranet/urgencia/8.pptx" },
    { titulo: "ACV ISQUEMICO Y HEMORRAGICO", link: "http://10.5.131.63/intranet/urgencia/9.pptx" },
    { titulo: "TROMBOEMBOLISMO PULMONAR", link: "http://10.5.131.63/intranet/urgencia/10.pptx" },
    { titulo: "MIOPERICARDITIS", link: "http://10.5.131.63/intranet/urgencia/11.pptx" }
  ];

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
            <div className="bg-red-600 p-3 rounded-2xl text-white shadow-lg">
              <Activity size={32} />
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-[#003876] uppercase italic tracking-tighter leading-none">
                Reunion Clínica <span className="text-red-600">Urgencia</span>
              </h2>
            </div>
          </div>
        </div>
        <div className="hidden lg:flex items-center gap-2 text-slate-400 bg-slate-50 px-4 py-2 rounded-full text-xs font-bold border border-slate-100">
          <FolderOpen size={16} className="text-red-600" /> Documento de la información
        </div>
      </div>

      {/* CUERPO: LISTA DE DESCARGAS */}
      <div className="max-w-5xl mx-auto pt-4">
        <h3 className="text-slate-700 font-black text-4xl mb-10 tracking-tight">Descargar Archivos:</h3>
        
        <ul className="space-y-6">
          {documentos.map((doc, idx) => (
            <li key={idx} className="group flex items-start gap-3">
              <div className="mt-1 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                <Download size={24} />
              </div>
              <a
                href={doc.link}
                download
                className="text-xl md:text-2xl font-bold text-black hover:text-red-600 underline underline-offset-8 decoration-1 transition-all uppercase tracking-tight"
              >
                {doc.titulo}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* PIE DE PÁGINA */}
      <div className="mt-32 pt-8 border-t border-slate-100 text-center">
        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
          Área Crítica - Hospital San José de Melipilla
        </p>
      </div>

    </section>
  );
};

export default ReunionClinicaUrgencia;