import React from 'react';
import { ShieldAlert } from 'lucide-react';
import PageHeader from '../components/PageHeader';

const ReglamentoHigiene = () => {

  return (
    <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 min-h-[600px] w-full font-sans animate-in fade-in zoom-in duration-500">
      <PageHeader
        title="Reglamento Interno Higiene, Seguridad y Medioambiente"
        subtitle="Hospital San José de Melipilla"
        showBackButton={true}
        backPath="/inicio"
      />
      <div className="max-w-5xl mx-auto pt-4 space-y-8">
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
          <a 
            href="http://10.5.131.63/intranet/wp-content/uploads/2022/01/Reglamento-Interno-Higiene-y-Seguridad-HSJM-2021.pdf" 
            target="_blank" 
            rel="noreferrer" 
            className="text-2xl md:text-3xl font-bold text-black hover:text-cyan-600 underline underline-offset-8 decoration-1 transition-colors uppercase"
          >
            Reglamento Interno Higiene y Seguridad HSJM 2021
          </a>
        </div>
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
          <a 
            href="http://10.5.131.63/intranet/wp-content/uploads/2022/01/FIRMA-RECEPCION-DOCUMENTO.pdf" 
            target="_blank" 
            rel="noreferrer"
            className="text-2xl md:text-3xl font-bold text-black hover:text-cyan-600 underline underline-offset-8 decoration-1 transition-colors uppercase"
          >
            FIRMA RECEPCION DOCUMENTO
          </a>
        </div>
      </div>
    </section>
  );
};

export default ReglamentoHigiene;