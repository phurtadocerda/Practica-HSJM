import React from 'react';
import { ChevronLeft, FileText } from 'lucide-react';

const Tuberculosis = ({ onNavigate }) => {
  // Primer bloque de documentos (sin viñetas en tu imagen)
  const bloqueUno = [
    { name: "ACUALIZACION DEL ESQUEMA DE TRATAMIENTO DE LA TBC RESISTENTE A FARMACOS", link: "http://10.5.131.63/intranet/wp-content/uploads/2025/07/ACUALIZACION-DEL-ESQUEMA-DE-TRATAMIENTO-DE-LA-TBC-RESISTENTE-A-FARMACOS.pdf" },
    { name: "NOTIFICACION Y SEGUIMIENTO TB DR Y PACIENTES COMITÉ 2025", link: "http://10.5.131.63/intranet/wp-content/uploads/2025/07/NOTIFICACION-Y-SEGUIMIENTO-TB-DR-Y-PACIENTES-COMITE-2025.xlsx" },
    { name: "Protocolo de manejo del programa de control y eliminacion de la tuberculosis en area ambulatoria y hospitalizados", link: "http://10.5.131.63/intranet/wp-content/uploads/2025/06/Protocolo-de-manejo-del-programa-de-control-y-eliminacion-de-la-tuberculosis-en-area-ambulatoria-y-hospitalizados.pdf" },
    { name: "Encuesta CPT 2025", link: "http://10.5.131.63/intranet/wp-content/uploads/2025/03/Encuesta-CPT-2025.pdf" },
    { name: "Informe 1ER trimestre 2024", link: "http://10.5.131.63/intranet/wp-content/uploads/2025/03/Informe-1ER-trimestre-2024.pdf" },
    { name: "Informe 2do trimestre 2024", link: "http://10.5.131.63/intranet/wp-content/uploads/2025/03/Informe-2do-trimestre-2024.pdf" },
    { name: "Informe 3er trimestre 2024", link: "http://10.5.131.63/intranet/wp-content/uploads/2025/03/Informe-3er-trimestre-2024.pdf" },
    { name: "Informe PROCET 4to trimestre -año2024", link: "http://10.5.131.63/intranet/wp-content/uploads/2025/03/Informe-PROCET-4to-trimestre-ano2024.pdf" },
    { name: "Pauta de supervision servicios clinicos 2025", link: "http://10.5.131.63/intranet/wp-content/uploads/2025/03/Pauta-de-supervision-servicios-clinicos-2025.pdf" },
    { name: "Plan Trabajo PROCET 2025", link: "http://10.5.131.63/intranet/wp-content/uploads/2025/03/Plan-Trabajo-PROCET-2025.pdf" },
  ];

  // Segundo bloque de documentos (con viñetas circulares en tu imagen)
  const bloqueDos = [
    { name: "SOLICITUD-COMITE-TERAPEUTICA_v2", link: "http://10.5.131.63/intranet/wp-content/uploads/2024/10/SOLICITUD-COMITE-TERAPEUTICA_v2.pdf" },
    { name: "Flujograma PROCET HSJM 2024", link: "http://10.5.131.63/intranet/wp-content/uploads/2024/08/Flujograma-PROCET-HSJM-2024.pdf" },
    { name: "NUEVA SOLICITUD LABORATORIO TUBERCULOSIS-", link: "http://10.5.131.63/intranet/wp-content/uploads/2024/08/NUEVA-SOLICITUD-LABORATORIO-TUBERCULOSIS-.pdf" },
    { name: "PRESENTACION PROCET 2024", link: "http://10.5.131.63/intranet/wp-content/uploads/2024/03/PRESENTACION-PROCET-2024.pdf" },
    { name: "DIAGNOSTICO BACTERIOLOGICO TBC", link: "http://10.5.131.63/intranet/wp-content/uploads/2024/03/DIAGNOSTICO-BACTERIOLOGICO-TBC.pdf" },
    { name: "Encuesta CPT 2024", link: "http://10.5.131.63/intranet/wp-content/uploads/2024/03/Encuesta-CPT-2024-1.pdf" },
    { name: "Informe 3 ER CUATRIMESTRE 2023.", link: "http://10.5.131.63/intranet/wp-content/uploads/2024/03/Informe-3-ER-CUATRIMESTRE-2023.pdf" },
    { name: "TARJETA DE TRATAMIENTO TBC", link: "http://10.5.131.63/intranet/wp-content/uploads/2024/03/TARJETA-DE-TRATAMIENTO-TBC.pdf" },
    { name: "TRASLADO INTERNACIONAL TBC", link: "http://10.5.131.63/intranet/wp-content/uploads/2024/03/TRASLADO-INTERNACIONAL-TBC.pdf" },
    { name: "TRASLADO NACIONAL TBC", link: "http://10.5.131.63/intranet/wp-content/uploads/2024/03/TRASLADO-NACIONAL-TBC.pdf" },
    { name: "NORMA-TECNICA-TUBERCULOSIS 2022", link: "http://10.5.131.63/intranet/wp-content/uploads/2024/03/NORMA-TECNICA-TUBERCULOSIS-2022.pdf" },
    { name: "CUIDADOS TBC (+) AMBULATORIO", link: "http://10.5.131.63/intranet/wp-content/uploads/2024/03/CUIDADOS-TBC-AMBULATORIO.pdf" },
    { name: "CUIDADOS TBC (+)HOSPITALIZADO", link: "http://10.5.131.63/intranet/wp-content/uploads/2024/03/CUIDADOS-TBC-HOSPITALIZADO.pdf" },
    { name: "QUE ES LA TUBERCULOSIS", link: "http://10.5.131.63/intranet/wp-content/uploads/2024/03/QUE-ES-LA-TUBERCULOSIS.pdf" },
    { name: "Informe 3er trimestre 2025", link: "http://10.5.131.63/intranet/wp-content/uploads/2025/10/Informe-3er-trimestre-2025.pdf" },
  ];

  return (
    <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 min-h-[600px] animate-in fade-in zoom-in duration-500 w-full font-sans">
      
      {/* HEADER CON BOTÓN VOLVER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 border-b pb-8">
        <div>
          <button 
            onClick={() => onNavigate('accesos')} 
            className="bg-slate-100 hover:bg-[#ffb81c] text-[#003876] px-5 py-2 rounded-full font-black flex items-center gap-2 transition-all mb-4 text-sm"
          >
            <ChevronLeft size={18} /> VOLVER A ACCESOS
          </button>
          <h2 className="text-4xl md:text-5xl font-black text-slate-700 tracking-tighter uppercase italic">Programa de Tuberculosis</h2>
          <p className="text-[#00a19a] font-bold uppercase tracking-widest mt-2">Documentos y Protocolos</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto space-y-12 pt-4">
        
        {/* BLOQUE 1 (Sin viñetas, más espaciado) */}
        <div className="space-y-6">
          {bloqueUno.map((doc, index) => (
            <div key={index}>
              <a 
                href={doc.link} 
                target="_blank" 
                rel="noreferrer"
                className="text-slate-800 font-medium text-base md:text-lg underline underline-offset-4 hover:text-[#00a19a] transition-colors"
              >
                {doc.name}
              </a>
            </div>
          ))}
        </div>

        {/* SEPARADOR VISUAL */}
        <hr className="border-slate-200" />

        {/* ENLACE SUELTO (Formulario de traslado) */}
        <div>
          <a 
            href="http://10.5.131.63/intranet/wp-content/uploads/2025/03/TRASLADO-NACIONAL_QUIMIOPROFILAXIS.pdf" 
            target="_blank" 
            rel="noreferrer"
            className="text-slate-800 font-medium text-base md:text-lg underline underline-offset-4 hover:text-[#00a19a] transition-colors"
          >
            Formulario de traslado nacional de pacientes en tratamiento por tuberculosis latente(quimioprofilaxis)
          </a>
        </div>

        {/* BLOQUE 2 (Con viñetas de círculo vacío) */}
        <div className="pl-4">
          <ul className="space-y-4">
            {bloqueDos.map((doc, index) => (
              <li key={index} className="flex items-center gap-3 group">
                {/* Viñeta de círculo */}
                <div className="w-1.5 h-1.5 rounded-full border-2 border-slate-500 group-hover:border-[#00a19a] shrink-0 transition-colors"></div>
                <a 
                  href={doc.link} 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-slate-800 font-medium text-base md:text-lg underline underline-offset-4 hover:text-[#00a19a] transition-colors uppercase"
                >
                  {doc.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
};

export default Tuberculosis;