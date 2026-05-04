import React from 'react';
import { BarChart3, Calendar, FileSpreadsheet } from 'lucide-react';
import PageHeader from '../components/PageHeader';

const ProduccionEstadistica = () => {
  const documentos = [
    { id: 1, titulo: "Actividades-Produccion-H.-Melipilla_2025", fecha: "2025", link: "http://10.5.131.63/intranet/wp-content/uploads/2025/11/Actividades_Produccion_Melipilla_2025-1.xlsx" },
    { id: 2, titulo: "Actividades-Produccion-H.-Melipilla_2024", fecha: "2024", link: "http://10.5.131.63/intranet/wp-content/uploads/2025/10/Actividades-Produccion-H.-Melipilla_2024-Actualizado.xlsx" },
    { id: 3, titulo: "Actividades Producción H. Melipilla 2023", fecha: "2023", link: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/Actividades-Produccion-H.-Melipilla_2022.xlsx" },
    { id: 4, titulo: "Actividades Producción H. Melipilla 2022", fecha: "2022", link: "http://10.5.131.63/intranet/wp-content/uploads/2022/12/Manual-Series-REM-2023-V1.pdf", isManual: true }, // Agregué isManual: true porque es un PDF manual
    { id: 5, titulo: "Manual-Series-REM-2023-V1", fecha: "2023", link: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/2-Arancel-MAI-2023con-Res.-244.xls", isManual: true },
    { id: 6, titulo: "2 Arancel MAI 2023 (con Res. 244)", fecha: "2023", link: "http://10.5.131.63/intranet/wp-content/uploads/2024/02/Actividades-Produccion-H.-Melipilla_2023.xlsx" },   
  ];

  return (
    <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 min-h-[600px] animate-in fade-in zoom-in duration-500 w-full font-sans relative">
      
      <PageHeader
        title={<>Producción – <span className="text-[#003876]">Estadísticas</span></>}
        subtitle="Registro de Actividades e Indicadores Hospitalarios"
        badge="Control de Gestión"
        badgeIcon={FileSpreadsheet}
        icon={BarChart3}
        iconBg="bg-blue-600"
        showBackButton={true}
        backPath="/inicio"
      />

      {/* LISTADO DE DOCUMENTOS (AHORA COMO LINKS DIRECTOS) */}
      <div className="max-w-4xl mx-auto space-y-6">
        <ul className="space-y-6 pl-4 md:pl-10">
          {documentos.map((doc) => (
            <li key={doc.id} className="list-none group">
              <a 
                href={doc.link}
                target="_blank"
                rel="noreferrer"
                className="flex flex-col md:flex-row md:items-center gap-4 w-fit"
              >
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-slate-400 group-hover:bg-[#00a19a] transition-colors shrink-0"></span>
                  <span className="text-slate-800 font-bold underline decoration-slate-300 group-hover:decoration-[#00a19a] group-hover:text-[#00a19a] underline-offset-4 transition-all text-lg tracking-wide break-words">
                    {doc.titulo}
                  </span>
                </div>
                <div className="flex items-center gap-2 ml-5 md:ml-0 opacity-60 group-hover:opacity-100 transition-opacity">
                   <div className="flex items-center gap-1 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-200">
                      <Calendar size={12} className="text-slate-500" />
                      <span className="text-[10px] font-black text-slate-500 uppercase">{doc.fecha}</span>
                   </div>
                   {doc.isManual && (
                     <span className="text-[9px] bg-orange-100 text-orange-600 px-2 py-0.5 rounded-md font-black uppercase tracking-tighter">Manual</span>
                   )}
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* PIE DE PÁGINA */}
      <div className="mt-20 pt-8 border-t border-slate-100 text-center">
        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
          Información oficial del Hospital San José de Melipilla
        </p>
      </div>

    </section>
  );
};

export default ProduccionEstadistica;