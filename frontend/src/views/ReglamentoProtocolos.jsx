import React from 'react';
import { ShieldCheck, FolderOpen, Download } from 'lucide-react';
import PageHeader from '../components/PageHeader';

const ReglamentoProtocolos = () => {

  return (
    <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 min-h-[600px] w-full font-sans animate-in fade-in zoom-in duration-500">
      
      <PageHeader
        title="Reglamento Interno y Protocolos"
        subtitle="Hospital San José de Melipilla"
        badge={"Documento de la información"}
        badgeIcon={FolderOpen}
        icon={ShieldCheck}
        iconBg="bg-indigo-700"
        showBackButton={true}
        backPath="/inicio"
      />

      {/* CUERPO (IGUAL A TU IMAGEN) */}
      <div className="max-w-5xl mx-auto pt-4">
        <div className="flex items-center gap-3 group">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-indigo-700 transition-colors"></span>
          <a
            href="http://10.5.131.63/intranet/wp-content/uploads/2021/04/protocolo-de-resguardo-de-pertenencias-en-Servicio-de-Urgencias.pdf"
            target="_blank"
            rel="noreferrer"
            className="text-xl md:text-2xl font-bold text-black hover:text-indigo-700 underline underline-offset-8 decoration-1 transition-all"
          >
            Protocolo de resguardo de pertenencias en Servicio de Urgencias
          </a>
          <Download size={20} className="text-indigo-500 opacity-0 group-hover:opacity-100 transition-all" />
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

export default ReglamentoProtocolos;