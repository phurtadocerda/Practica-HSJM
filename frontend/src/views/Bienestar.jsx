// src/views/Bienestar.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, FileText, Mail, BookOpen } from 'lucide-react';

// Importa la imagen (ajusta la ruta si es necesario)
import imagenHeroes from '../assets/heroes.png';

const Bienestar = () => {
  const navigate = useNavigate();
  const [view, setView] = useState('main'); // 'main', 'formularios', 'informativos', 'marco'

  return (
    <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 min-h-[600px] animate-in fade-in zoom-in duration-500 w-full">
      
      {/* VISTA PRINCIPAL DE BIENESTAR */}
      {view === 'main' && (
        <>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-16 border-b pb-8">
            <div>
              <button onClick={() => navigate('/accesos')} className="bg-slate-100 hover:bg-[#ffb81c] text-[#003876] px-5 py-2 rounded-full font-black flex items-center gap-2 transition-all mb-4 text-sm">
                <ChevronLeft size={18} /> VOLVER A ACCESOS
              </button>
              <h2 className="text-4xl md:text-5xl font-black text-slate-700">Bienestar</h2>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto items-center">
            <BienestarCard title="Formularios" icon={<FileText size={56} strokeWidth={1.5} />} onClick={() => setView('formularios')} />
            <BienestarCard title="Informativos" icon={<Mail size={56} strokeWidth={1.5} />} onClick={() => setView('informativos')} />
            <BienestarCard title="Marco Normativo" icon={<BookOpen size={56} strokeWidth={1.5} />} onClick={() => setView('marco')} />
            
            <div className="flex justify-center md:justify-start pl-0 md:pl-8">
              <a href="http://10.5.131.63/intranet/wp-content/uploads/2024/10/INFORMACION-A-CONSIDERAR.pdf" target="_blank" rel="noreferrer" className="text-black hover:text-[#00a19a] font-bold underline underline-offset-4 decoration-2 transition-colors text-lg uppercase tracking-wide">
                INFORMACIÓN A CONSIDERAR
              </a>
            </div>
          </div>
        </>
      )}

      {/* SUBVISTA: FORMULARIOS */}
      {view === 'formularios' && (
        <>
          <HeaderSubvista titulo="Formularios" onVolver={() => setView('main')} />
          <div className="pl-4 md:pl-10">
            <ul className="space-y-4">
              <BienestarLink text="TABLA BENEFICIOS 2025" link="http://10.5.131.63/intranet/wp-content/uploads/2025/02/TABLA-BENEFICIOS_2025.pdf" isTitle={true} />
              <BienestarLink text="FORMULARIO BONO ESCOLAR" link="http://10.5.131.63/intranet/wp-content/uploads/2024/07/FORMULARIO-BONO-ESCOLAR.pdf" />
              <BienestarLink text="Solicitud Beneficio 2025" link="http://10.5.131.63/intranet/wp-content/uploads/2025/07/Solicitud-Beneficio-2025.pdf" />
              <BienestarLink text="Solicitud Préstamo_2024" link="http://10.5.131.63/intranet/wp-content/uploads/2024/07/Solicitud-Prestamo_2024.pdf" />
              <BienestarLink text="Ayuda Extraordinaria" link="http://10.5.131.63/intranet/wp-content/uploads/2024/02/Ayuda-Extraordinaria.pdf" />
              <BienestarLink text="Distinción Académica" link="http://10.5.131.63/intranet/wp-content/uploads/2024/02/Distincion-Academica.pdf" />
              <BienestarLink text="Renuncia" link="http://10.5.131.63/intranet/wp-content/uploads/2024/02/Renuncia.pdf" />
              <BienestarLink text="Solicitud Continuidad" link="http://10.5.131.63/intranet/wp-content/uploads/2024/02/Solicitud-Continuidad.pdf" />
              <BienestarLink text="Solicitud Ingreso" link="http://10.5.131.63/intranet/wp-content/uploads/2024/02/Solicitud-Ingreso.pdf" />
            </ul>
          </div>
        </>
      )}

      {/* SUBVISTA: INFORMATIVOS */}
      {view === 'informativos' && (
        <>
          <HeaderSubvista titulo="Informativos" onVolver={() => setView('main')} />
          <div className="pl-4 md:pl-10 space-y-12">
            <ul className="space-y-6">
              <BienestarLink text="Paso a paso ingreso Bono en Dinero y Reembolsos médicos Digital" link="http://10.5.131.63/intranet/wp-content/uploads/2023/08/Paso-a-paso-ingreso-Bono-en-Dinero-y-Reembolsos-medicos-Digital.pdf" />
              <BienestarLink text="SOLICITUD AYUDA CATÁSTROFE" link="http://10.5.131.63/intranet/wp-content/uploads/2024/10/SOLICITUD-AYUDA-CATASTROFE.pdf" isTitle={true} />
            </ul>
            <div className="mt-10 max-w-sm flex justify-start">
              <img src={imagenHeroes} alt="Informativo Los Héroes" className="w-full h-auto rounded-xl shadow-md border border-slate-200" />
            </div>
          </div>
        </>
      )}

      {/* SUBVISTA: MARCO NORMATIVO */}
      {view === 'marco' && (
        <>
          <HeaderSubvista titulo="Marco Normativo" onVolver={() => setView('main')} />
          <div className="pl-4 md:pl-10">
            <ul className="space-y-8">
              <BienestarLink text="REGLAMENTO GENERAL N° 28" link="http://10.5.131.63/intranet/wp-content/uploads/2023/08/REGLAMENTO-GENERAL-N%C2%B0-28.pdf" />
              <BienestarLink text="REGLAMENTO PARTICULAR DS N° 160" link="http://10.5.131.63/intranet/wp-content/uploads/2023/08/REGLAMENTO-PARTICULAR-DS-N%C2%B0-160.pdf" />
              <BienestarLink text="01_Instructivo_Bienestar-2023" link="http://10.5.131.63/intranet/wp-content/uploads/2023/08/01_Instructivo_Bienestar-2023.pdf" />
            </ul>
          </div>
        </>
      )}

    </section>
  );
};

// Componentes auxiliares exclusivos de Bienestar
const HeaderSubvista = ({ titulo, onVolver }) => (
  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 border-b pb-8">
    <div>
      <button onClick={onVolver} className="bg-slate-100 hover:bg-[#ffb81c] text-[#003876] px-5 py-2 rounded-full font-black flex items-center gap-2 transition-all mb-4 text-sm">
        <ChevronLeft size={18} /> VOLVER A BIENESTAR
      </button>
      <h2 className="text-4xl md:text-5xl font-black text-slate-700">{titulo}</h2>
    </div>
  </div>
);

const BienestarCard = ({ title, icon, onClick }) => (
  <div onClick={onClick} className="flex flex-col items-center justify-center p-10 bg-white border-2 border-slate-100 rounded-3xl hover:border-[#003876] hover:shadow-xl transition-all cursor-pointer group border-b-8 border-b-[#003876]">
    <div className="text-slate-400 mb-6 group-hover:text-[#00a19a] group-hover:-translate-y-2 transition-all duration-300">{icon}</div>
    <h4 className="text-[#003876] font-black text-xl tracking-wide">{title}</h4>
  </div>
);

const BienestarLink = ({ text, link, isTitle }) => (
  <li className="mb-2">
    <a href={link || "#"} target="_blank" rel="noreferrer" className="flex items-center gap-3 group w-fit">
      {isTitle ? (
        <span className="text-slate-800 font-bold underline underline-offset-4 decoration-2 hover:text-[#00a19a] transition-colors text-lg uppercase tracking-wide">{text}</span>
      ) : (
        <>
          <span className="w-1.5 h-1.5 rounded-full bg-slate-400 group-hover:bg-[#00a19a] transition-colors"></span>
          <span className="text-slate-600 font-medium underline decoration-slate-300 group-hover:decoration-[#00a19a] group-hover:text-[#00a19a] underline-offset-4 transition-all">{text}</span>
        </>
      )}
    </a>
  </li>
);

export default Bienestar;