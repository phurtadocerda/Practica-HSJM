import React from 'react';
import { FolderKanban } from 'lucide-react';
import PageHeader from '../components/PageHeader';

const GestionProyectos = () => {

  return (
    <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 min-h-[600px] w-full font-sans animate-in fade-in zoom-in duration-500">

      <PageHeader
        title={<>Gestión de <span className="text-indigo-600">Proyectos</span></>}
        icon={FolderKanban}
        iconBg='bg-indigo-600'
      />
      {/* CUERPO */}
      <div className="max-w-5xl mx-auto pt-4">
        <h3 className="text-slate-500 italic font-bold text-lg mb-8">Descargar:</h3>
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
          <a
            href="http://10.5.131.63/intranet/wp-content/uploads/2021/08/Gestion-de-proyectos-HSJM.docx"
            target="_blank"
            rel="noreferrer"
            className="text-2xl md:text-3xl font-bold text-black hover:text-indigo-600 underline underline-offset-8 decoration-1 transition-colors uppercase"
          >
            Gestion de proyectos HSJM
          </a>
        </div>
      </div>
    </section>
  );
};

export default GestionProyectos;