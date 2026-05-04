import React from 'react';
import { Users, FileText, FolderOpen } from 'lucide-react';
import PageHeader from '../components/PageHeader';

const ParticipacionCiudadana = () => {
  const documentos = [
    { titulo: "Plan de Trabajo y cronograma de actividades Unidad de Participación HSJM_2025", link: "http://10.5.131.63/intranet/wp-content/uploads/2025/07/Plan-de-Trabajo-y-cronograma-de-actividades-Unidad-de-Participacion-HSJM_2025.pdf" },
    { titulo: "Plan Anual de acciones de Participación y cronograma de actividades +Resolución Enc.Participación Indicador EAR C.4.2", link: "http://10.5.131.63/intranet/wp-content/uploads/2023/06/Plan-Anual-de-acciones-de-Participacion-y-cronograma-de-actividades-Resolucion-Enc.Participacion-Indicador-EAR-C.4.2.pdf" },
    { titulo: "Informe anual de cumplimiento de resultados alcanzados entre CCU y Dirección", link: "http://10.5.131.63/intranet/wp-content/uploads/2026/02/Informe-anual-de-cumplimiento-de-resultados-alcanzados-entre-CCU-y-Direccion.pdf" }
  ];

  return (
    <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 min-h-[600px] w-full font-sans animate-in fade-in zoom-in duration-500">
      
      <PageHeader
        title={<>Participación <span className="text-emerald-500">Ciudadana</span></>}
        subtitle="Plan Anual de Acciones y Actividades"
        badge="Biblioteca"
        badgeIcon={FolderOpen}
        icon={Users}
        iconBg="bg-emerald-500"
        showBackButton={true}
        backPath="/inicio"
      />

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