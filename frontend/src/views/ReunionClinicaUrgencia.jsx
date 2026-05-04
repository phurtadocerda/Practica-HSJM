import React from 'react';
import { Activity, FolderOpen, Download } from 'lucide-react';
import PageHeader from '../components/PageHeader'; // Importamos el componente unificado

const ReunionClinicaUrgencia = () => {
  // Lista de documentos
  const documentos = [
    { titulo: "SECUENCIA DE INTUBACION RAPIDA", link: "http://10.5.131.63/intranet/urgencia/ir.pptx" },
    { titulo: "ORGANIZACIÓN DURANTE RCP 2", link: "http://10.5.131.63/intranet/urgencia/2.pptx" },
    { titulo: "ACTUALIZACION PCR AHA", link: "http://10.5.131.63/intranet/urgencia/3.pptx" },
    { titulo: "MANEJO INICIAL DEL POLITRAUMA", link: "http://10.5.131.63/intranet/urgencia/4manejo.pptx" },
    { titulo: "PCR traumático", link: "http://10.5.131.63/intranet/urgencia/5.pptx" },
    { titulo: "TRAUMA RAQUIMEDULAR", link: "http://10.5.131.63/intranet/urgencia/6RAQUIMEDULAR.pptx" },
    { titulo: "CONVULSIONES EN PEDIATRIA", link: "http://10.5.131.63/intranet/urgencia/7.pptx" },
    { titulo: "TRAUMA OCULAR", link: "http://10.5.131.63/intranet/urgencia/8.pptx" },
    { titulo: "ACV ISQUEMICO Y HEMORRAGICO", link: "http://10.5.131.63/intranet/urgencia/9.pptx" },
    { titulo: "TROMBOEMBOLISMO PULMONAR", link: "http://10.5.131.63/intranet/urgencia/10.pptx" },
    { titulo: "MIOPERICARDITIS", link: "http://10.5.131.63/intranet/urgencia/11.pptx" }
  ];

  return (
    <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 min-h-[600px] w-full font-sans animate-in fade-in zoom-in duration-500">
      
    
      <PageHeader 
        title={<>Reunión Clínica <span className="text-red-600">Urgencia</span></>}
        badge="Documento de la información"
        badgeIcon={FolderOpen}
        icon={Activity}
        iconBg="bg-red-600"
        backPath="/inicio" 
      />

      {/* CUERPO: LISTA DE DESCARGAS */}
      <div className="max-w-5xl mx-auto pt-4">
        <h3 className="text-slate-700 font-black text-4xl mb-10 tracking-tight">Descargar Archivos:</h3>
        
        <ul className="space-y-6">
          {documentos.map((doc, idx) => (
            <li key={idx} className="group flex items-start gap-3">
              <div className="mt-1 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                <Download size={24} />
              </div>
              <a
                href={doc.link}
                download
                className="text-xl md:text-2xl font-bold text-black hover:text-red-600 underline underline-offset-8 decoration-1 transition-all uppercase tracking-tight"
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
          Área Crítica - Hospital San José de Melipilla
        </p>
      </div>

    </section>
  );
};

export default ReunionClinicaUrgencia;