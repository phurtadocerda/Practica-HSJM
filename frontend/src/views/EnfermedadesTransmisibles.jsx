import React from 'react';
import { ChevronLeft, ShieldCheck, FolderOpen } from 'lucide-react';

const EnfermedadesTransmisibles = ({ onNavigate }) => {
  const categorias = [
    {
      id: 1, nombre: "Cólera y Hanta Virus",
      archivos: [
        { titulo: "COLERA, BROTE", link: "http://10.5.131.63/intranet/epidemiologia/Colera%2CBrote%20Dr%20Salome%20Pedro%20Castillo.pdf" },
        { titulo: "COLERA, EPIDEMIOLOGIA DE LA ENFERMEDAD", link: "http://10.5.131.63/intranet/epidemiologia/Colera.Epidemiologia%20de%20la%20Enfermedad.pdf" },
        { titulo: "HANTA VIRUS", link: "http://10.5.131.63/intranet\epidemiologia\Hanta Virus.pptx" },
      ]
    },
    {
      id: 2, nombre: "Vigilancia de Febriles y Fiebre Amarilla",
      archivos: [
        { titulo: "FICHA DE VIGILANCIA DE FEBRILES Y ENVÍO DE MUESTRA  Dengue,Malaria,Fiebre Amarilla", link: "http://10.5.131.63/intranet\epidemiologia\DengMalaFiebA (1).doc" },
        { titulo: "FIEBRE AMARILLA CLÍNICA Y TRATAMIENTO", link: "http://10.5.131.63/intranet/epidemiologia/FA-clinica-y-tto.pdf" },
        { titulo: "FIEBRE AMARILLA", link: "http://10.5.131.63/intranet\epidemiologia\FIEBRE AMARILLA.pptx" },
        { titulo: "FIEBRE AMARILLA EPIDEMIOLOGIA", link: "http://10.5.131.63/intranet/epidemiologia/Fiebre-Amarilla-Epidemiologia.pdf" },
        { titulo: "PRESENTACIÓN LABORATORIO – FIEBRE AMARILLA", link: "http://10.5.131.63/intranet/epidemiologia/Presentacion-Laboratorio-Fiebre-Amarilla.pdf" },
      ]
    },
    {
      id: 3, nombre: "Influenza y Epidemiología General",
      archivos: [
        { titulo: "GUIA DE PRACTICA CLINICA INFLUENZA 2015 07 21", link: "http://10.5.131.63/intranet/epidemiologia/GUIA%20DE%20PRACTICA%20CLINICA_INFLUENZA_2015_07_21.pdf" },
        { titulo: "LINEAMIENTOS ANTIINFLUENZA 2018", link: "http://10.5.131.63/intranet/epidemiologia/Lineamientos%20Antiinfluenza%202018.pdf" },
        { titulo: "INFLUENZA, CAPACITACIÓN MARZO", link: "http://10.5.131.63/intranet\epidemiologia\Influenza,Capacitacion Marzo.ppt" },
        { titulo: "MUERTES PEDIATRICAS 2010-2016", link: "http://10.5.131.63/intranet\epidemiologia\Muertes Pediatricas 2010-2016.docx" },
        { titulo: "EFECTIVIDAD DE LA VACUNA EN EEUU-2018", link: "http://10.5.131.63/intranet\epidemiologia\Efectividad de la Vacuna en EEUU-2018.docx" },
      ]
    }
  ];

  return (
    <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 min-h-[600px] w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12 border-b pb-8">
        <div>
          <button onClick={() => onNavigate('inicio')} className="bg-[#003876]/5 hover:bg-[#ffb81c] text-[#003876] px-5 py-2 rounded-full font-black flex items-center gap-2 mb-6 text-xs">
            <ChevronLeft size={18} /> VOLVER AL INICIO
          </button>
          <div className="flex items-center gap-4">
            <div className="bg-red-500 p-3 rounded-2xl text-white shadow-lg"><ShieldCheck size={32} /></div>
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-[#003876] uppercase italic tracking-tighter">Enfermedades <span className="text-red-500">Transmisibles</span></h2>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-12">
        {categorias.map((categoria) => (
          <div key={categoria.id}>
            <h3 className="text-sm font-black text-slate-400 uppercase mb-6 flex items-center gap-2 border-b border-slate-100 pb-2">
              <FolderOpen size={16} className="text-[#00a19a]" /> {categoria.nombre}
            </h3>
            <ul className="space-y-5 pl-4 md:pl-10">
              {categoria.archivos.map((doc, idx) => (
                <li key={idx} className="list-none">
                  <a href={doc.link} target="_blank" rel="noreferrer" className="text-slate-700 font-bold underline decoration-slate-200 hover:text-red-600 uppercase text-[13px]">{doc.titulo}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EnfermedadesTransmisibles;