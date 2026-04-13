import React from 'react';
import { ChevronLeft, Users, FileText, FolderOpen } from 'lucide-react';

const ParticipacionCiudadana = ({ onNavigate }) => {
  // Los 3 documentos de tu imagen
  const documentos = [
    { titulo: "Plan de Trabajo y cronograma de actividades Unidad de Participación HSJM_2025", link: "http://10.5.131.63/intranet/wp-content/uploads/2025/07/Plan-de-Trabajo-y-cronograma-de-actividades-Unidad-de-Participacion-HSJM_2025.pdf" },
    { titulo: "Plan Anual de acciones de Participación y cronograma de actividades +Resolución Enc.Participación Indicador EAR C.4.2", link: "http://10.5.131.63/intranet/wp-content/uploads/2023/06/Plan-Anual-de-acciones-de-Participacion-y-cronograma-de-actividades-Resolucion-Enc.Participacion-Indicador-EAR-C.4.2.pdf" },
    { titulo: "Informe anual de cumplimiento de resultados alcanzados entre CCU y Dirección", link: "http://10.5.131.63/intranet/wp-content/uploads/2026/02/Informe-anual-de-cumplimiento-de-resultados-alcanzados-entre-CCU-y-Direccion.pdf" }
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
            <div className="bg-emerald-500 p-3 rounded-2xl text-white shadow-lg">
              <Users size={32} />
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-[#003876] uppercase italic tracking-tighter leading-none">
                Participación <span className="text-emerald-500">Ciudadana</span>
              </h2>
              <p className="text-slate-400 font-bold uppercase tracking-widest mt-2 text-sm">
                Plan Anual de Acciones y Actividades
              </p>
            </div>
          </div>
        </div>
        <div className="hidden lg:flex items-center gap-2 text-slate-400 bg-slate-50 px-4 py-2 rounded-full text-xs font-bold border border-slate-100">
          <FolderOpen size={16} className="text-emerald-500" /> Biblioteca
        </div>
      </div>

      {/* LISTADO DE DOCUMENTOS */}
      <div className="max-w-5xl mx-auto">
        <div className="bg-emerald-50/50 p-8 md:p-10 rounded-3xl border border-emerald-100/50 shadow-sm">
          <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2 border-b border-emerald-100 pb-4">
            <FileText size={16} className="text-emerald-500" /> Documentos Disponibles
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
                  {/* El puntito que cambia de color */}
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-slate-300 group-hover:bg-emerald-500 transition-colors shrink-0"></span>
                  {/* El texto del enlace */}
                  <span className="text-slate-700 font-bold underline decoration-slate-200 group-hover:decoration-emerald-500 group-hover:text-emerald-800 underline-offset-4 transition-all text-sm md:text-base tracking-wide">
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

export default ParticipacionCiudadana;