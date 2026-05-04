import React from 'react';
import { FileText, FolderOpen } from 'lucide-react';
import PageHeader from '../components/PageHeader';

const Resoluciones = () => {

  // Los documentos de tu imagen
  const documentos = [
    { titulo: "Resolución N° 143 del HSJM. Formulario de notificación de agresiones hacia los funcionarios de la Salud Publica", link: "http://10.5.131.63/intranet/wp-content/uploads/2023/01/Resolucion-N%C2%B0-143-del-HSJM.-Formulario-de-notificacion-de-agresiones-hacia-los-funcionarios-de-la-Salud-Publica.pdf" },
    { titulo: "Resolución N° 9889, Protocolo de Ingreso y egreso unidad de cuidado intermedio pediátrico", link: "http://10.5.131.63/intranet/wp-content/uploads/2025/11/9889.pdf" }
  ];

  return (
    <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 min-h-[600px] w-full font-sans animate-in fade-in zoom-in duration-500">
      
      <PageHeader
        title="Resoluciones Oficiales"
        subtitle="Documentación Legal y Protocolos Aprobados"
        badge={"Biblioteca"}
        badgeIcon={FolderOpen}
        icon={FileText}
        iconBg="bg-indigo-600"
        showBackButton={true}
        backPath="/inicio"
      />

      {/* LISTADO DE RESOLUCIONES */}
      <div className="max-w-5xl mx-auto">
        <div className="bg-indigo-50/30 p-8 md:p-10 rounded-3xl border border-indigo-100/50 shadow-sm">
          <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2 border-b border-indigo-100 pb-4">
            <FileText size={16} className="text-indigo-500" /> Resoluciones Vigentes
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

                  <span className="mt-2 w-2 h-2 rounded-full bg-slate-300 group-hover:bg-indigo-600 transition-colors shrink-0"></span>
                  {/* El texto del enlace */}
                  <span className="text-slate-700 font-bold underline decoration-slate-200 group-hover:decoration-indigo-500 group-hover:text-indigo-800 underline-offset-4 transition-all text-sm md:text-base tracking-wide">
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

export default Resoluciones;