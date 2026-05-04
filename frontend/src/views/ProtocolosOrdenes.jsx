import React from 'react';
import { FileText, ClipboardList } from 'lucide-react';
import PageHeader from '../components/PageHeader';

const ProtocolosOrdenes = () => {
  return (
    <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 min-h-[600px] animate-in fade-in zoom-in duration-500 w-full">
      <PageHeader 
        title={<>Protocolos y <span className="text-cyan-600">Órdenes</span></>}
        subtitle="Hospital San José de Melipilla"
        badge="Imagenología"
        badgeIcon={FileText}
        icon={ClipboardList}
        iconBg="bg-cyan-600"
        backPath="/accesos"
        backLabel="VOLVER A ACCESOS"
      />
      <div className="pl-4 md:pl-10">
        <ul className="space-y-6">
          <ProtocoloLink text="CONSENTIMIENTO SCANNER Y RESONANCIA CON CONTRASTE" link="http://10.5.131.63/intranet/wp-content/uploads/2024/03/CONSENTIMIENTO-SCANNER-Y-RESONANCIA-CON-CONTRASTE.pdf" />
          <ProtocoloLink text="CUESTIONARIO SCANNER ACTUALIZADO" link="http://10.5.131.63/intranet/wp-content/uploads/2024/03/CUESTIONARIO-SCANNER-ACTUALIZADO.pdf" />
          <ProtocoloLink text="ENCUESTA DE RESONANCIA" link="http://10.5.131.63/intranet/wp-content/uploads/2024/03/ENCUESTA-DE-RESONANCIA.pdf" />
          <ProtocoloLink text="PREMEDICACION-HFB" link="http://10.5.131.63/intranet/wp-content/uploads/2024/03/PREMEDICACION-HFB.pdf" />
          <ProtocoloLink text="Preparaciones HSJM" link="http://10.5.131.63/intranet/wp-content/uploads/2024/03/Preparaciones-HSJM.docx" />
          <ProtocoloLink text="TAC-AUTORIZACION-crea-alta-ambulatorio" link="http://10.5.131.63/intranet/wp-content/uploads/2024/03/TAC-AUTORIZACION-crea-alta-ambulatorio.doc" />
          <ProtocoloLink text="TAC-AUTORIZACION-PCTES-crea-alta-hospitalizado" link="http://10.5.131.63/intranet/wp-content/uploads/2024/03/TAC-AUTORIZACION-PCTES-crea-alta-hospitalizado.doc" />
        </ul>
      </div>
    </section>
  );
};

const ProtocoloLink = ({ text, link }) => (
  <li className="list-none mb-4">
    <a 
      href={link || "#"} 
      target="_blank" 
      rel="noreferrer" 
      className="text-blue-700 font-bold underline underline-offset-4 decoration-1 hover:text-[#00a19a] text-sm md:text-lg uppercase tracking-wide block w-fit transition-all duration-300"
    >
      {text}
    </a>
  </li>
);

export default ProtocolosOrdenes;