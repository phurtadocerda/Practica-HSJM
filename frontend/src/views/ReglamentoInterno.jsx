import React from 'react';
import { FileText, Download, FolderOpen } from 'lucide-react';
import PageHeader from '../components/PageHeader';

const ReglamentoInterno = () => {

  // Link real al PDF
  const linkReglamento = "http://10.5.131.63/intranet/wp-content/uploads/2026/01/994-Reglamento-Interno-Higiene-y-Seguridad.pdf";

  return (
    <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 min-h-[600px] w-full font-sans animate-in fade-in zoom-in duration-500">
      
      <PageHeader
        title="Reglamento Interno Hsjm."
        subtitle="Hospital San José de Melipilla"
        badge={"Documento de la información"}
        badgeIcon={FolderOpen}
        icon={FileText}
        iconBg="bg-blue-600"
        showBackButton={true}
        backPath="/inicio"
      />

      {/* CUERPO DE LA PÁGINA */}
      <div className="max-w-5xl mx-auto pt-10">
        <div className="flex items-center gap-4 group">
          <a
            href={linkReglamento}
            target="_blank"
            rel="noreferrer"
            className="text-2xl md:text-3xl font-bold text-black hover:text-blue-700 underline underline-offset-8 decoration-1 transition-colors"
          >
            Reglamento Interno
          </a>
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