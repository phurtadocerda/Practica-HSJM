// src/views/ComiteParitario.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, FolderOpen, FileText } from 'lucide-react';

// --- IMPORTACIÓN DE IMÁGENES ---
import ComiteIntegrantes from '../assets/integrantes_comite.png'; 
import ComiteFunciones from '../assets/funciones_comite.png';    
import Calendario from '../assets/calendario.png';
import fiesta from '../assets/clavefiestas.png';
import paso from '../assets/campañapaso.png';
// Galería de fotos
import f1 from '../assets/1.jpg'; import f2 from '../assets/2.jpg'; import f3 from '../assets/3.jpg';
import f4 from '../assets/4.png'; import f5 from '../assets/5.png'; import f6 from '../assets/6.png';
import f7 from '../assets/7.png'; import f8 from '../assets/8.png'; import f9 from '../assets/9.png';
import f10 from '../assets/10.png'; import f11 from '../assets/11.png'; import f12 from '../assets/12.png';
import f13 from '../assets/13.png';

const ComiteParitario = () => {
  const navigate = useNavigate();
  // Estado para controlar qué sub-vista mostrar
  const [view, setView] = useState('main'); 
  const [showPasoAPasoImage, setShowPasoAPasoImage] = useState(false);

  return (
    <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 min-h-[600px] animate-in fade-in zoom-in duration-500 w-full">
      
      {/* ============================================================== */}
      {/* VISTA PRINCIPAL: MENÚ DEL COMITÉ */}
      {/* ============================================================== */}
      {view === 'main' && (
        <>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 border-b pb-8">
            <div>
              <button onClick={() => navigate('/accesos')} className="bg-slate-100 hover:bg-[#ffb81c] text-[#003876] px-5 py-2 rounded-full font-black flex items-center gap-2 transition-all mb-4 text-sm">
                <ChevronLeft size={18} /> VOLVER A ACCESOS
              </button>
              <h2 className="text-4xl md:text-5xl font-black text-slate-700 tracking-tighter">Comité Paritario</h2>
              <p className="text-[#00a19a] font-bold uppercase tracking-widest mt-2">Higiene y Seguridad - HSJM</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            <div className="bg-slate-50 p-4 rounded-3xl border border-slate-200">
              <img src={ComiteIntegrantes} alt="Integrantes Comité" className="w-full h-auto rounded-2xl shadow-sm" />
            </div>
            <div className="bg-slate-50 p-4 rounded-3xl border border-slate-200">
              <img src={ComiteFunciones} alt="Funciones Comité" className="w-full h-auto rounded-2xl shadow-sm" />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            <FolderCard title="Resolución / Actas" onClick={() => setView('actas')} />
            <FolderCard title="Calendario" onClick={() => setView('calendario')} />
            <FolderCard title="Campañas / Actividades" onClick={() => setView('campanas')} />
            <FolderCard title="Formularios" onClick={() => setView('formularios')} />
            <FolderCard title="Estadísticas" onClick={() => setView('estadisticas')} />
          </div>
        </>
      )}

      {/* ============================================================== */}
      {/* SUB-VISTA: ESTADÍSTICAS */}
      {/* ============================================================== */}
      {view === 'estadisticas' && (
        <>
          <HeaderSubvista titulo="Estadísticas" onVolver={() => setView('main')} />
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h3 className="text-xl font-black text-[#003876] uppercase">Informes de accidentabilidad</h3>
              <p className="text-slate-600 text-sm leading-relaxed italic">
                Los informes de accidentabilidad son documentos técnicos y estadísticos que recopilan, analizan y exponen los datos relativos a los accidentes de trabajo y enfermedades profesionales ocurridos en una organización durante un periodo determinado (mensual, trimestral o anual).
              </p>
              <p className="text-slate-600 text-sm leading-relaxed">
                Su objetivo principal no es solo "contar" accidentes, sino servir como una herramienta de diagnóstico para mejorar el Sistema de Gestión de Seguridad y Salud en el Trabajo (SST).
              </p>
            </div>

            <div className="mt-12">
              <h4 className="text-center font-bold text-[#003876] mb-6">Informes de accidentabilidad 2025:</h4>
              <div className="border border-slate-300 rounded-xl overflow-hidden shadow-sm">
                <table className="w-full text-sm text-left border-collapse">
                  <tbody>
                    <tr className="border-b border-slate-300">
                      <MonthCell name="01 Enero" link="#" />
                      <MonthCell name="02 Febrero" link="#" />
                      <MonthCell name="03 Marzo" link="#" />
                      <MonthCell name="04 Abril" link="#" />
                    </tr>
                    <tr className="border-b border-slate-300">
                      <MonthCell name="05 Mayo" link="#" />
                      <MonthCell name="06 Junio" link="#" />
                      <MonthCell name="07 Julio" link="#" />
                      <MonthCell name="08 Agosto" link="#" />
                    </tr>
                    <tr>
                      <MonthCell name="09 Septiembre" link="#" />
                      <MonthCell name="10 Octubre" link="#" />
                      <MonthCell name="11 Noviembre" link="#" />
                      <MonthCell name="12 Diciembre" link="#" />
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ============================================================== */}
      {/* SUB-VISTA: ACTAS Y RESOLUCIONES */}
      {/* ============================================================== */}
      {view === 'actas' && (
        <>
          <HeaderSubvista titulo="Resolución / Actas" onVolver={() => setView('main')} uppercase={true} />
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="text-center">
              <h3 className="font-bold text-sm uppercase mb-4 text-slate-800">RESOLUCIÓN CONSTITUCIÓN DE COMITE PARITARIO DE HIGIENE Y SEGURIDAD 2024 – 2026</h3>
              <div className="border border-slate-800 p-8 text-left space-y-4 shadow-inner bg-slate-50/50">
                <a href="https://drive.google.com/file/d/1YmUTYMlmw3o-Tl-0wg-LCaUVNi6i4U1c/view" target="_blank" rel="noreferrer" className="block text-blue-700 font-bold underline hover:text-[#00a19a]">Resolución CPHS</a>
                <a href="https://drive.google.com/file/d/1ksbCbq_DqwQH8ODAhN2y9fOos6b8xNPX/view" target="_blank" rel="noreferrer" className="block text-blue-700 font-bold underline hover:text-[#00a19a]">Resolución CPHS actualizada</a>
              </div>
            </div>

            <div>
              <h4 className="text-xl font-black text-[#003876] mb-6 flex items-center gap-2 uppercase tracking-tighter">
                <div className="w-2 h-8 bg-[#00a19a] rounded-full"></div>
                ACTAS DE REUNIÓN COMITE PARITARIO DE HIGIENE Y SEGURIDAD 2025
              </h4>
              <div className="border border-slate-300 rounded-xl overflow-hidden shadow-sm bg-white">
                <table className="w-full text-sm text-left border-collapse">
                  <tbody>
                    <tr className="border-b border-slate-300">
                      <MonthCell name="01 Acta Ene" link="https://drive.google.com/file/d/1yBFt3YeBwTHWuLY2CxIkn0HkPvnyEwsg/view" />
                      <MonthCell name="02 Acta Feb" link="https://drive.google.com/file/d/1-TM4DInxq-kRl12NGNpSi13nf-moGyot/view" />
                      <MonthCell name="03 Acta Mar" link="https://drive.google.com/file/d/14X1POVIgPVNRT9k72F78WkYVNvXhGy_J/view" />
                      <MonthCell name="04 Acta Abr" link="https://drive.google.com/file/d/1ks2U6bpmbtP4LbukdoTeWnTGd1Qbmxco/view" />
                    </tr>
                    <tr className="border-b border-slate-300">
                      <MonthCell name="05 Acta May" link="https://drive.google.com/file/d/18hnW3qtfxWDBpbpJq4VstUPVOCt2xfo5/view" />
                      <MonthCell name="06 Acta Jun" link="https://drive.google.com/file/d/1iJjkJ1jN82rJJYCoRNNTIDdIXL5HsWcL/view" />
                      <MonthCell name="07 Acta Jul" link="https://drive.google.com/file/d/1BuN0RvcFdSpaASl89X24gSsB1gZNViWu/view" />
                      <MonthCell name="08 Acta Ago" link="https://drive.google.com/file/d/1wNrl_UBMUXOaThni2KXYNbJ71iLuTJlX/view" />
                    </tr>
                    <tr>
                      <MonthCell name="09 Acta Sep" link="https://drive.google.com/file/d/1d5ziM6SlcCQA1TC-AHUW6tUK2XTGkHUS/view" />
                      <MonthCell name="10 Acta Oct" link="https://drive.google.com/file/d/1HP9SP_IIjsjU5ZmyhF1ZHgLa55EJhuCB/view" />
                      <MonthCell name="11 Acta Nov" link="https://drive.google.com/file/d/1nRsQHyYL2sk0-cBQDMnVL9DXZmO4srTu/view" />
                      <MonthCell name="12 Acta Dic" link="#" />
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="pt-8 border-t border-slate-100">
              <h4 className="text-xl font-black text-[#003876] mb-6 flex items-center gap-2 uppercase tracking-tighter">
                <div className="w-2 h-8 bg-[#00a19a] rounded-full"></div>
                ACTAS DE REUNIÓN COMITE PARITARIO DE HIGIENE Y SEGURIDAD 2024
              </h4>
              <div className="border border-slate-300 rounded-xl overflow-hidden shadow-sm bg-white">
                <table className="w-full text-sm text-left border-collapse">
                  <tbody>
                    <tr className="border-b border-slate-200">
                      <MonthCell name="01 Acta Ene" link="#" />
                      <MonthCell name="02 Acta Feb" link="#" />
                      <MonthCell name="03 Acta Mar" link="#" />
                      <MonthCell name="04 Acta Abr" link="https://drive.google.com/file/d/1knR0FXYp8JRktf9wcj5vcAggB2-8Sfae/view" />
                    </tr>
                    <tr className="border-b border-slate-200">
                      <MonthCell name="05 Acta May" link="https://drive.google.com/file/d/1UeZkhWsS-eKG95mYRRXMMz88YTG0q2s2/view" />
                      <MonthCell name="06 Acta Jun" link="https://drive.google.com/file/d/1iJjkJ1jN82rJJYCoRNNTIDdIXL5HsWcL/view" />
                      <MonthCell name="07 Acta Jul" link="https://drive.google.com/file/d/1p_cUDTs9_zaenWoxqQinkpOse54U75kk/view" />
                      <MonthCell name="08 Acta Ago" link="https://drive.google.com/file/d/1blu4OyWWTfRzkF5qRVx3f188pUaA_ujH/view" />
                    </tr>
                    <tr>
                      <MonthCell name="09 Acta Sep" link="https://drive.google.com/file/d/1d5ziM6SlcCQA1TC-AHUW6tUK2XTGkHUS/view" />
                      <MonthCell name="10 Acta Oct" link="https://drive.google.com/file/d/1HP9SP_IIjsjU5ZmyhF1ZHgLa55EJhuCB/view" />
                      <MonthCell name="11 Acta Nov" link="https://drive.google.com/file/d/1nRsQHyYL2sk0-cBQDMnVL9DXZmO4srTu/view" />
                      <MonthCell name="12 Acta Dic" link="https://drive.google.com/file/d/1Qu9o3eSbU6yjXwGD4lyBba3DLHUWYoIU/view" />
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ============================================================== */}
      {/* SUB-VISTA: CALENDARIO */}
      {/* ============================================================== */}
      {view === 'calendario' && (
        <>
          <HeaderSubvista titulo="Calendario" onVolver={() => setView('main')} uppercase={true} />
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="flex justify-center">
              <img src={Calendario} alt="Horarios Mutual" className="w-full max-w-4xl h-auto rounded-3xl shadow-lg border border-slate-200" />
            </div>

            <div className="text-center">
              <h3 className="font-bold text-sm uppercase mb-6 text-slate-800 tracking-widest">
                CALENDARIO DE REUNIONES COMITE PARITARIO DE HIGIENE Y SEGURIDAD 2025
              </h3>
              <div className="border border-[#003876] overflow-hidden bg-white shadow-xl">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#003876] text-white">
                      <th className="p-4 border-r border-slate-400 font-black uppercase text-sm text-center w-1/2 tracking-widest">Mes</th>
                      <th className="p-4 font-black uppercase text-sm text-center w-1/2 tracking-widest">Fecha</th>
                    </tr>
                  </thead>
                  <tbody>
                    <CalendarRow name="FEBRERO" date="25/02/2025" />
                    <CalendarRow name="MARZO" date="27/03/2025" />
                    <CalendarRow name="ABRIL" date="24/04/2025" />
                    <CalendarRow name="MAYO" date="29/05/2025" />
                    <CalendarRow name="JUNIO" date="27/06/2025" />
                    <CalendarRow name="JULIO" date="24/07/2025" />
                    <CalendarRow name="AGOSTO" date="28/08/2025" />
                    <CalendarRow name="SEPTIEMBRE" date="25/09/2025" />
                    <CalendarRow name="OCTUBRE" date="30/10/2025" />
                    <CalendarRow name="NOVIEMBRE" date="27/11/2025" />
                    <CalendarRow name="DICIEMBRE" date="19/12/2025" />
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ============================================================== */}
      {/* SUB-VISTA: FORMULARIOS */}
      {/* ============================================================== */}
      {view === 'formularios' && (
        <>
          <HeaderSubvista titulo="Formularios" onVolver={() => setView('main')} uppercase={true} />
          <div className="max-w-6xl mx-auto space-y-16">
            <div className="text-center space-y-4">
              <h3 className="font-bold text-sm uppercase text-slate-800 tracking-widest">INSPECCIONES</h3>
              <p className="text-slate-600 text-sm max-w-5xl mx-auto">
                Son procesos de observación sistemática y detallada para examinar instalaciones, equipos, herramientas y comportamientos, con el fin de detectar <strong>peligros</strong> o desviaciones que podrían causar daños.
              </p>
              <div className="border border-slate-800 bg-white shadow-sm overflow-hidden mt-6">
                <FormLinkCell name="Inspección de riesgos físicos" link="https://drive.google.com/file/d/13kdnNCRnuUv6r7-ISvHIyIellVTkE1N0/view" />
                <FormLinkCell name="Inspección de riesgos químicos" link="https://drive.google.com/file/d/13kdnNCRnuUv6r7-ISvHIyIellVTkE1N0/view" />
                <FormLinkCell name="Inspección riesgos biológicos" link="https://drive.google.com/file/d/1DCksIBK_dZ8HKyoWLrkXHBlOhPisXYNn/view" />
                <FormLinkCell name="Inspección elementos de protección personal" link="https://drive.google.com/file/d/1PA0Q-jF-0Ctz2wEjVs5nWV5CJZIA9D_3/view" isLast={true} />
              </div>
            </div>

            <div className="text-center space-y-4">
              <h3 className="font-bold text-sm uppercase text-slate-800 tracking-widest">OBSERVACIONES</h3>
              <p className="text-slate-600 text-sm max-w-5xl mx-auto">
                Son una técnica preventiva que se centra exclusivamente en el factor humano...
              </p>
              <div className="border border-slate-800 bg-white shadow-sm overflow-hidden mt-6">
                <div className="p-4 border-b border-slate-800 min-h-[40px]"></div>
                <div className="p-4 border-b border-slate-800 min-h-[40px]"></div>
                <div className="p-4 min-h-[40px]"></div>
              </div>
            </div>

            <div className="text-center space-y-4 pb-12">
              <h3 className="font-bold text-sm uppercase text-slate-800 tracking-widest">CHECK LIST</h3>
              <div className="border border-slate-800 bg-white shadow-sm overflow-hidden mt-6">
                <FormLinkCell name="Lista de chequeo extintores" link="https://drive.google.com/file/d/1M7HsgtsrU3a7uM3ytVCxu5Q2NfKrGAhX/view" isLast={true} />
              </div>
            </div>
          </div>
        </>
      )}

      {/* ============================================================== */}
      {/* SUB-VISTA: CAMPAÑAS */}
      {/* ============================================================== */}
      {view === 'campanas' && (
        <>
          <HeaderSubvista titulo="Campañas y/o Actividades" onVolver={() => setView('main')} uppercase={true} />
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="space-y-4 pl-4">
              <AficheLink text="Afiche Protege de la lluvia" link="http://10.5.131.63/intranet/wp-content/uploads/2025/06/Afiche-Protege-de-la-lluvia.pdf" />
              <AficheLink text="Afiche dermatitis" link="http://10.5.131.63/intranet/wp-content/uploads/2025/06/FAP-Afiche-dermatitis.pdf" />
              <AficheLink text="Afiche Trayecto Seguro" link="http://10.5.131.63/intranet/wp-content/uploads/2025/06/FAP-Trayecto-Seguro.pdf" />
              <AficheLink text="Afiche Viaje seguro en semana santa" link="http://10.5.131.63/intranet/wp-content/uploads/2025/06/VIAJE-SEGURO-EN-SEMANA-SANTA.pdf" />
            </div>

            <div className="flex flex-wrap gap-10 justify-start pt-8">
              <img src={fiesta} alt="Campaña Paso a Paso" onClick={() => setShowPasoAPasoImage(true)} className="w-64 h-auto cursor-pointer hover:scale-105 transition-transform" />
              <img src={paso} alt="Fiestas Patrias" className="w-64 h-auto cursor-pointer hover:scale-105 transition-transform" />
            </div>

            <div className="pt-10 border-t border-slate-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-3xl shadow-inner border border-slate-100">
                <img src={f1} alt="Foto 1" className="w-full h-66 object-cover rounded-xl shadow-sm hover:shadow-xl transition-shadow" />
                <img src={f2} alt="Foto 2" className="w-full h-66 object-cover rounded-xl shadow-sm hover:shadow-xl transition-shadow" />
                <img src={f3} alt="Foto 3" className="w-full h-66 object-cover rounded-xl shadow-sm hover:shadow-xl transition-shadow" />
                <img src={f4} alt="Foto 4" className="w-full h-66 object-cover rounded-xl shadow-sm hover:shadow-xl transition-shadow" />
                <img src={f5} alt="Foto 5" className="w-full h-66 object-cover rounded-xl shadow-sm hover:shadow-xl transition-shadow" />
                <img src={f6} alt="Foto 6" className="w-full h-66 object-cover rounded-xl shadow-sm hover:shadow-xl transition-shadow" />
                <img src={f7} alt="Foto 7" className="w-full h-66 object-cover rounded-xl shadow-sm hover:shadow-xl transition-shadow" />
                <img src={f8} alt="Foto 8" className="w-full h-66 object-cover rounded-xl shadow-sm hover:shadow-xl transition-shadow" />
                <img src={f9} alt="Foto 9" className="w-full h-66 object-cover rounded-xl shadow-sm hover:shadow-xl transition-shadow" />
                <img src={f10} alt="Foto 10" className="w-full h-66 object-cover rounded-xl shadow-sm hover:shadow-xl transition-shadow" />
                <img src={f11} alt="Foto 11" className="w-full h-66 object-cover rounded-xl shadow-sm hover:shadow-xl transition-shadow" />
                <img src={f12} alt="Foto 12" className="w-full h-66 object-cover rounded-xl shadow-sm hover:shadow-xl transition-shadow" />
                <img src={f13} alt="Foto 13" className="w-full h-66 object-cover rounded-xl shadow-sm hover:shadow-xl transition-shadow" />
              </div>
            </div>
          </div>
        </>
      )}

    </section>
  );
};

// ==========================================
// COMPONENTES AUXILIARES ESPECÍFICOS DE COMITÉ
// ==========================================

const HeaderSubvista = ({ titulo, onVolver, uppercase }) => (
  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 border-b pb-8">
    <div>
      <button onClick={onVolver} className="bg-slate-100 hover:bg-[#ffb81c] text-[#003876] px-5 py-2 rounded-full font-black flex items-center gap-2 transition-all mb-4 text-sm">
        <ChevronLeft size={18} /> VOLVER AL COMITÉ
      </button>
      <h2 className={`text-4xl md:text-5xl font-black text-slate-700 tracking-tighter ${uppercase ? 'uppercase italic' : ''}`}>
        {titulo}
      </h2>
    </div>
  </div>
);

const FolderCard = ({ title, onClick }) => (
  <div onClick={onClick} className="flex flex-col items-center justify-center p-6 bg-slate-50 border-2 border-transparent hover:border-[#ffb81c] hover:bg-white rounded-3xl transition-all cursor-pointer group shadow-sm hover:shadow-xl">
    <div className="text-orange-400 mb-4 group-hover:scale-110 transition-transform">
      <FolderOpen size={64} strokeWidth={1.5} />
    </div>
    <h4 className="text-[#003876] font-bold text-sm text-center uppercase tracking-tighter leading-tight">
      {title}
    </h4>
  </div>
);

const MonthCell = ({ name, link }) => (
  <td className="p-4 border-r border-slate-300 hover:bg-slate-50 transition-colors cursor-pointer group last:border-r-0">
    <a href={link} target="_blank" rel="noreferrer" className="flex items-center justify-between font-bold text-slate-700 group-hover:text-[#00a19a]">
      {name}
      <FileText size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#00a19a]" />
    </a>
  </td>
);

const CalendarRow = ({ name, date }) => (
  <tr className="border-b border-slate-200 hover:bg-blue-50/30 transition-colors">
    <td className="p-4 border-r border-slate-200 font-black text-[#003876] text-center uppercase tracking-tight">
      {name}
    </td>
    <td className="p-4 text-center font-bold text-slate-600">
      {date}
    </td>
  </tr>
);

const FormLinkCell = ({ name, link, isLast }) => (
  <div className={`p-4 ${!isLast ? 'border-b border-slate-800' : ''} hover:bg-slate-50 transition-colors`}>
    <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-700 font-bold underline hover:text-blue-900 block">
      {name}
    </a>
  </div>
);

const AficheLink = ({ text, link }) => (
  <div className="group">
    <a href={link} target="_blank" rel="noreferrer" className="text-slate-800 font-bold underline decoration-slate-800 hover:text-[#00a19a] hover:decoration-[#00a19a] transition-all text-sm block w-fit">
      {text}
    </a>
  </div>
);

export default ComiteParitario;