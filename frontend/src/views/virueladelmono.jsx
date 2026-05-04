import React from 'react';
import PageHeader from '../components/PageHeader';
import aficheMpox from '../assets/viruela.png'; 

const ViruelaDelMono = () => {

  const documentos = [
    { name: "FORMULARIO DE NOTIFICACIÓN VIRUELA DEL MONO EDITABLE (003)", link: "http://10.5.131.63/intranet/wp-content/uploads/2024/08/FORMULARIO-DE-NOTIFICACION-VIRUELA-DEL-MONO-EDITABLE-003.docx" },
    { name: "PPT Viruela del Mono 28-08-2024", link: "http://10.5.131.63/intranet/wp-content/uploads/2024/08/PPT-Viruela-del-Mono-28-08-2024.pptx" },
    { name: "Orientacion Tecnica Viruela del Mono 2022", link: "http://10.5.131.63/intranet/wp-content/uploads/2024/08/Orientacion-Tecnica-Viruela-del-Mono-2022.pdf" },
    { name: "ORD-4160-Protocolo de vigilancia Epidemiológica de viruela del mono 31-08-2024", link: "http://10.5.131.63/intranet/wp-content/uploads/2024/08/ORD-4160-Protocolo-de-vigilancia-Epidemiologica-de-viruela-del-mono-31-08-2024.pdf" },
    { name: "ORD-3888 LM en casos de viruela simica", link: "http://10.5.131.63/intranet/wp-content/uploads/2024/08/ORD-3888-LM-en-casos-de-viruela-simica.pdf" },
    { name: "ORD- 1961-Protocolo preparación y respuesta viruela del simio", link: "http://10.5.131.63/intranet/wp-content/uploads/2024/08/ORD-1961-Protocolo-preparacion-y-respuesta-viruela-del-simio.pdf" },
    { name: "Informe_ejecutivo_Mpox_junio_2024", link: "http://10.5.131.63/intranet/wp-content/uploads/2024/08/Informe_ejecutivo_Mpox_junio_2024.pdf" },
    { name: "Formulario gral envio muestras clinicas analisis virologicos", link: "http://10.5.131.63/intranet/wp-content/uploads/2024/08/Formulario-gral-envio-muestras-clinicas-analisis-virologicos.pdf" },
    { name: "INSTRUCTIVO MUESTRAS VIRUELA SIMICA -HSJM", link: "http://10.5.131.63/intranet/wp-content/uploads/2024/08/INSTRUCTIVO-MUESTRAS-VIRUELA-SIMICA-HSJM.pdf" },
    { name: "Formulario envío de muestra dg diferencial", link: "http://10.5.131.63/intranet/wp-content/uploads/2024/08/Formulario-envio-de-muestra-dg-diferencial.pdf" },
    { name: "Formulario envío de muestra dg diferencial Formulario sarampion, rubeola dg diferencial", link: "http://10.5.131.63/intranet/wp-content/uploads/2024/08/Formulario-envio-de-muestra-dg-diferencial-1.pdf" },
    { name: "Protocolo de manejo del programa de control y eliminacion de la tuberculosis en area ambulatoria y hospitalizados", link: "http://10.5.131.63/intranet/wp-content/uploads/2025/06/Protocolo-de-manejo-del-programa-de-control-y-eliminacion-de-la-tuberculosis-en-area-ambulatoria-y-hospitalizados-1.pdf" },
    { name: "ORD-3888-que-imparte-instrucciones-sobre-emision-de-LM-en-casos-de-viruela-simica", link: "http://10.5.131.63/intranet/wp-content/uploads/2025/06/ORD-3888-que-imparte-instrucciones-sobre-emision-de-LM-en-casos-de-viruela-simica.pdf" },
    { name: "ORD_609_Mpox_28_02_2025 (1)", link: "http://10.5.131.63/intranet/wp-content/uploads/2025/06/ORD_609_Mpox_28_02_2025-1.pdf" },
    { name: "Anexo-3 FORMULARIO DE NOTIFICACIÓN MPOX EDITABLE", link: "http://10.5.131.63/intranet/wp-content/uploads/2025/06/Anexo-3-FORMULARIO-DE-NOTIFICACION-MPOX-EDITABLE.pdf" },
  ];

  return (
    <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 min-h-[600px] animate-in fade-in zoom-in duration-500 w-full">
      <PageHeader
        title="Viruela del Mono"
        subtitle="Hospital San José de Melipilla"
        showBackButton={true}
        backPath="/accesos"
        backLabel="VOLVER A ACCESOS"
      />

      <div className="max-w-5xl mx-auto space-y-8">
        <ul className="space-y-4">
          {documentos.map((doc, index) => (
            <li key={index} className="flex items-start gap-3 group">
              <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 group-hover:bg-[#00a19a] shrink-0" />
              <a 
                href={doc.link} 
                target="_blank" 
                rel="noreferrer"
                className="text-slate-700 font-bold underline underline-offset-4 decoration-slate-300 hover:text-blue-700 hover:decoration-blue-700 transition-all text-sm md:text-base uppercase tracking-tight"
              >
                {doc.name}
              </a>
            </li>
          ))}
        </ul>

        {/* IMAGEN INFORMATIVA INFERIOR */}
        <div className="pt-10 flex justify-start">
          <div className="max-w-md rounded-2xl overflow-hidden shadow-xl hover:scale-105 transition-all duration-300 border border-slate-100">
             <img src={aficheMpox} alt="Mpox Informativo" className="w-full h-auto" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ViruelaDelMono;