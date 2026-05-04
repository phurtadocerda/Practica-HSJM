import React from 'react';
import { FileText, FolderOpen } from 'lucide-react';
import PageHeader from '../components/PageHeader';

const EspecialidadOdontologia = () => { 
  
  const documentos = [
    { titulo: "Protocolo de gestión de agendamiento de especialidades Odontológicas", link: "http://10.5.131.63/intranet/wp-content/uploads/2022/12/Protocolo-de-gestion-de-agendamiento-de-especialidades-Odontologicas.pdf" },
    { titulo: "Protocolo de Atención de pacientes y gestión de citas del personal que realiza labores de Call Center", link: "http://10.5.131.63/intranet/wp-content/uploads/2022/12/Protocolo-de-Atencion-de-pacientes-y-gestion-de-citas-del-personal-que-realiza-labores-de-Call-Center.pdf" },
    { titulo: "Protocolo de contactabilidad de usuarios de lista de espera No Ges.", link: "http://10.5.131.63/intranet/wp-content/uploads/2022/12/Protocolo-de-contactabilidad-de-usuarios-de-lista-de-espera-No-Ges..pdf" }
  ];

  return (
    <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 min-h-[600px] w-full font-sans animate-in fade-in zoom-in duration-500">
      <PageHeader
        title={<>Especialidad <span className="text-teal-500">Odontología</span></>}
        subtitle={ "protocolos y gestión de agendamiento" }
        icon={FileText}
        iconBg="bg-teal-500"
        badge="Biblioteca"
        badgeIcon={FolderOpen}
        badgeIconColor="text-teal-500"
      />

      {/* LISTADO DE PROTOCOLOS */}
      <div className="max-w-5xl mx-auto">
        <div className="bg-slate-50 p-8 md:p-10 rounded-3xl border border-slate-100 shadow-sm">
          <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2 border-b border-slate-200 pb-4">
            <FileText size={16} className="text-teal-500" /> Protocolos Vigentes
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
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-teal-500 transition-colors shrink-0"></span>
                  {/* El texto del enlace */}
                  <span className="text-slate-700 font-bold underline decoration-slate-200 group-hover:decoration-teal-500 group-hover:text-teal-700 underline-offset-4 transition-all text-sm md:text-base tracking-wide">
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

export default EspecialidadOdontologia;