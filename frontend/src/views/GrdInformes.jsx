import React from 'react';
import { Microscope, BookOpen, FolderOpen } from 'lucide-react';
import PageHeader from '../components/PageHeader';

const GrdInformes = () => { // 2. Quitamos onNavigate

  const informes2024 = [
    { titulo: "Informe Estandar diciembre 2024", link: "http://10.5.131.63/intranet/wp-content/uploads/2025/02/Informe-Estandar-diciembre-2024.xlsx" },
    { titulo: "Informe Estandar noviembre 2024.", link: "http://10.5.131.63/intranet/wp-content/uploads/2025/02/Informe-Estandar-noviembre-2024.xlsx" },
    { titulo: "Informe Estandar octubre 2024", link: "http://10.5.131.63/intranet/wp-content/uploads/2025/02/Informe-Estandar-octubre-2024.xlsx" },
    { titulo: "Informe Estandar Septiembre 2024", link: "http://10.5.131.63/intranet/wp-content/uploads/2024/11/Informe-Estandar-Septiembre-2024.xlsx" },
    { titulo: "Informe Estandar Agosto 2024", link: "http://10.5.131.63/intranet/wp-content/uploads/2024/09/Informe-Estandar-Agosto-2024.xlsx" },
    { titulo: "Informe Estandar Julio 2024", link: "http://10.5.131.63/intranet/wp-content/uploads/2024/09/Informe-Estandar-Julio-2024.xlsx" },
    { titulo: "Informe Estandar Junio 2024", link: "http://10.5.131.63/intranet/wp-content/uploads/2024/08/Informe-Estandar-Junio-2024.xlsx" },
    { titulo: "Informe Estandar Mayo 2024", link: "http://10.5.131.63/intranet/wp-content/uploads/2024/07/Informe-Estandar-Mayo-2024.xlsx" },
  ];

  const informes2023 = [
    { titulo: "Informe Estandar diciembre 2023", link: "http://10.5.131.63/intranet/wp-content/uploads/2024/01/Informe-Estandar-diciembre-2023.xlsx" },
    { titulo: "Informe Estandar octubre 2023", link: "http://10.5.131.63/intranet/wp-content/uploads/2023/12/Informe-Estandar-octubre-2023.xlsx" },
    { titulo: "Informe Estandar septiembre 2023", link: "http://10.5.131.63/intranet/wp-content/uploads/2023/11/Informe-Estandar-septiembre-2023.xlsx" },
  ];

  const informesAntiguos = [
    { titulo: "Informe Estandar Diciembre 2022", link: "http://10.5.131.63/intranet/wp-content/uploads/2023/02/Informe-Estandar-Diciembre-2022.xlsx" },
    { titulo: "Informe Estandar septiembre 2022", link: "http://10.5.131.63/intranet/wp-content/uploads/2022/12/Informe-Estandar-septiembre-2022.xlsx" },
    { titulo: "Informe Estandar agosto 2022", link: "http://10.5.131.63/intranet/wp-content/uploads/2022/12/Informe-Estandar-agosto-2022.xlsx" },
    { titulo: "Informe Estandar Julio 2022", link: "http://10.5.131.63/intranet/wp-content/uploads/2022/12/Informe-Estandar-Julio-2022.xlsx" },
    { titulo: "Informe Estandar Junio 2022", link: "http://10.5.131.63/intranet/wp-content/uploads/2022/12/Informe-Estandar-Junio-2022.xlsx" },
    { titulo: "Informe Estandar Mayo 2022", link: "http://10.5.131.63/intranet/wp-content/uploads/2022/12/Informe-Estandar-Mayo-2022.xlsx" },
    { titulo: "Informe Estandar Abril 2022", link: "http://10.5.131.63/intranet/wp-content/uploads/2022/12/Informe-Estandar-Abril-2022.xlsx" },
    { titulo: "Informe Estandar Marzo 2022", link: "http://10.5.131.63/intranet/wp-content/uploads/2022/12/Informe-Estandar-Marzo-2022.xlsx" },
    { titulo: "Informe Estandar enero y febrero 2022", link: "http://10.5.131.63/intranet/wp-content/uploads/2022/12/Informe-Estandar-enero-y-febrero-2022.xlsx" },
    { titulo: "Informe Estandar Diciembre 2021", link: "http://10.5.131.63/intranet/wp-content/uploads/2022/12/Informe-Estandar-Diciembre-2021.xlsx" },
  ];

  return (
    <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 min-h-[600px] w-full font-sans">

      <PageHeader
        title={<>GRD-<span className="text-purple-600">Informes</span></>}
        icon={Microscope}
        iconBg='bg-purple-600'
      />
  
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h3 className="text-xl font-black text-[#003876] uppercase tracking-tighter mb-6 flex items-center gap-2 border-b-2 border-purple-100 pb-2">
            <BookOpen size={20} className="text-purple-500" /> Informes Año 2024
          </h3>
          <ul className="space-y-4">
            {informes2024.map((doc, idx) => (
              <li key={idx} className="list-none"><a href={doc.link} target="_blank" rel="noreferrer" className="text-slate-700 font-bold underline decoration-slate-200 hover:text-purple-700 text-sm">{doc.titulo}</a></li>
            ))}
          </ul>
        </div>

        <div className="space-y-12">
          <div>
            <h3 className="text-xl font-black text-[#003876] uppercase tracking-tighter mb-6 flex items-center gap-2 border-b-2 border-purple-100 pb-2">
              <BookOpen size={20} className="text-purple-500" /> Informes Año 2023
            </h3>
            <ul className="space-y-4">
              {informes2023.map((doc, idx) => (
                <li key={idx} className="list-none"><a href={doc.link} target="_blank" rel="noreferrer" className="text-slate-700 font-bold underline decoration-slate-200 hover:text-purple-700 text-sm">{doc.titulo}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-black text-[#003876] uppercase tracking-tighter mb-6 flex items-center gap-2 border-b-2 border-purple-100 pb-2">
              <FolderOpen size={20} className="text-purple-500" /> Histórico (2022 - 2021)
            </h3>
            <ul className="space-y-4">
              {informesAntiguos.map((doc, idx) => (
                <li key={idx} className="list-none"><a href={doc.link} target="_blank" rel="noreferrer" className="text-slate-700 font-bold underline decoration-slate-200 hover:text-purple-700 text-sm">{doc.titulo}</a></li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GrdInformes;