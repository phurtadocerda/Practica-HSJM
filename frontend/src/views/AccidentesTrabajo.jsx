import React from 'react';
import { FolderOpen } from 'lucide-react';
import PageHeader from '../components/PageHeader';

const AccidentesTrabajo = () => {

  // Lista de documentos
  const documentos = [
    { titulo: "Unidad de salud Ocupacional y Gestión Ambiental", link: "http://10.5.131.63/intranet/Accidentes/USOAMBIENTAL.pdf" },
    { titulo: "Flujo de accidente trabajo", link: "http://10.5.131.63/intranet/Accidentes/FLUJOAT.pdf" },
    { titulo: "Flujo de accidente trabajo con exposición a fluidos", link: "http://10.5.131.63/intranet/Accidentes/FLUJO%20ACCIDENTES%20CON%20EXPOSICION%20A%20FLUIDOS%20CORPORALES%20(MUTUAL%202017).pdf" },
    { titulo: "DIAT", link: "http://10.5.131.63/intranet/Accidentes/DIAT-mutual.pdf" },
    { titulo: "Consentimiento informado VIH", link: "http://10.5.131.63/intranet/Accidentes/CONSENTIMIENTO%20VIH.PDF" },
    { titulo: "Rechazo de Atención", link: "http://10.5.131.63/intranet/Accidentes/Rechazo%20de%20Atenciones%20(MUTUAL).pdf" }
  ];

  return (
    <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 min-h-[600px] w-full font-sans animate-in fade-in zoom-in duration-500">
      
      <PageHeader
        title={<>Accidentes <span className="text-orange-500">de Trabajo</span></>}
        subtitle="Documentos y procedimientos"
        badge="Documentos de la información"
        badgeIcon={FolderOpen}
        badgeIconColor="text-orange-500"
      />

      {/* CUERPO */}
      <div className="max-w-5xl mx-auto pt-4">
        <h3 className="text-slate-500 italic font-bold text-lg mb-8">Ver Documentos:</h3>
        
        <ul className="space-y-5">
          {documentos.map((doc, idx) => (
            <li key={idx} className="flex items-center gap-3 group">
              {/* El puntito de la lista */}
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-orange-500 transition-colors"></span>
              
              {/* El link subrayado */}
              <a
                href={doc.link}
                target="_blank"
                rel="noreferrer"
                className="text-xl md:text-2xl font-bold text-black hover:text-orange-600 underline underline-offset-4 decoration-1 transition-colors"
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
          Hospital San José de Melipilla
        </p>
      </div>

    </section>
  );
};

export default AccidentesTrabajo;