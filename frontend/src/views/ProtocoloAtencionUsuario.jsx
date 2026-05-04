import React from 'react';
import { FileText, ExternalLink } from 'lucide-react';
import PageHeader from '../components/PageHeader';

const ProtocoloAtencionUsuario = () => {

  // === LINKS DE LOS DOCUMENTOS ===
  const documentos = [
    { titulo: "Protocolo de Atencion al Usuario 2022", url: "http://10.5.131.63/intranet/wp-content/uploads/2022/10/Protocolo-de-Atencion-al-Usuario-2022.pdf" },
    { titulo: "Díptico Protocolo Usuario", url: "http://10.5.131.63/intranet/wp-content/uploads/2022/10/Protocolo-de-atencion-al-Usuario.-2022.pdf" },
  ];

  return (
    <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 min-h-[600px] animate-in fade-in zoom-in duration-500 w-full font-sans relative mt-6">
      
      <PageHeader
        title="Protocolo de Atención al Usuario"
        subtitle="Hospital San José de Melipilla"
        showBackButton={true}
        backPath="/inicio"
      />

      {/* CONTENIDO CENTRAL */}
      <div className="max-w-4xl mx-auto pt-4">
        
        <div className="flex flex-col gap-6">
          {documentos.map((doc, index) => (
            <a 
              key={index}
              href={doc.url} 
              target="_blank" 
              rel="noreferrer"
              className="group flex items-center justify-between p-6 md:p-8 bg-slate-50 rounded-[2rem] border-2 border-slate-100 hover:border-[#00a19a] hover:bg-white transition-all shadow-sm hover:shadow-xl"
            >
              <div className="flex items-center gap-6">
                <div className="bg-[#003876]/5 p-4 rounded-2xl group-hover:bg-[#00a19a]/10 group-hover:-translate-y-1 transition-all shrink-0">
                  <FileText className="text-[#003876] group-hover:text-[#00a19a]" size={36} strokeWidth={1.5} />
                </div>
                
                {/* Texto del Enlace */}
                <h3 className="text-xl md:text-2xl font-black text-slate-700 group-hover:text-[#003876] transition-colors underline decoration-2 decoration-transparent group-hover:decoration-[#00a19a] underline-offset-8">
                  {doc.titulo}
                </h3>
              </div>
              <ExternalLink className="text-slate-300 group-hover:text-[#ffb81c] transition-colors hidden sm:block shrink-0" size={32} />
            </a>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ProtocoloAtencionUsuario;