import React, { useState } from 'react';
import { 
  ChevronLeft, BookOpen, GraduationCap, Folder, FileText, 
  PlayCircle, Video, Image as ImageIcon, Users, ShieldCheck, 
  Search, ExternalLink, School, FileSpreadsheet 
} from 'lucide-react';
import logoServicio from '../assets/logo.png'; 

const Capacitacion = ({ onNavigate }) => {
  const [subView, setSubView] = useState('principal');
  const [searchTerm, setSearchTerm] = useState('');

  // --- DATOS: 25 GUÍAS PDF (CORREGIDO A OBJETOS) ---
  const guiasPdf = [
    { nombre: "1. INDICE V.1", url: "http://10.5.131.63/intranet/wp-content/uploads/2025/10/1.-INDICE-V.1.pdf" },
    { nombre: "2. INGRESO DE SIC MANUALMENTE A TRAKCARE V.2_CM", url: "http://10.5.131.63/intranet/wp-content/uploads/2025/10/2.-INGRESO-DE-SIC-MANUALMENTE-A-TRAKCARE-V.2_CM.pdf" },
    { nombre: "3. REVISION DE SIC POR GESTOR HOSPITALARIO V.2_CM", url: "http://10.5.131.63/intranet/wp-content/uploads/2025/10/3.-REVISION-DE-SIC-POR-GESTOR-HOSPITALARIO-V.2_CM.pdf" },
    { nombre: "4. ENVIO Y RECEPCION DE MENSAJERIA INTERNA V.1_CM", url: "http://10.5.131.63/intranet/wp-content/uploads/2025/10/4.-ENVIO-Y-RECEPCION-DE-MENSAJERIA-INTERNA-V.1_CM.pdf" },
    { nombre: "5. CONTACTABILIDAD CON PACIENTE V.2_CM", url: "http://10.5.131.63/intranet/wp-content/uploads/2025/10/5.-CONTACTABILIDAD-CON-PACIENTE-V.2_CM.pdf" },
    { nombre: "6. EGRESO DE SIC POR CAUSALES ADMISTRATIVAS V.2_CM", url: "http://10.5.131.63/intranet/wp-content/uploads/2025/10/6.-EGRESO-DE-SIC-POR-CAUSALES-ADMISTRATIVAS-V.2_CM.pdf" },
    { nombre: "7. AGENDAMIENTO DE CITA CONFIRMADA V.2_CM", url: "http://10.5.131.63/intranet/wp-content/uploads/2025/10/7.-AGENDAMIENTO-DE-CITA-CONFIRMADA-V.2_CM.pdf" },
    { nombre: "8. POSTERGACION DE CITA POR USUARIO V.2_CM", url: "http://10.5.131.63/intranet/wp-content/uploads/2025/10/8.-POSTERGACION-DE-CITA-POR-USUARIO-V.2_CM.pdf" },
    { nombre: "9. CITA CANCELADA POR ESTABLECIMIENTO V.2_CM docx", url: "http://10.5.131.63/intranet/wp-content/uploads/2025/10/9.-CITA-CANCELADA-POR-ESTABLECIMIENTO-V.2_CM-docx.pdf" },
    { nombre: "10. TRANSFERENCIA DE AGENDA V.1_CM", url: "http://10.5.131.63/intranet/wp-content/uploads/2025/10/10.-TRANSFERENCIA-DE-AGENDA-V.1_CM.pdf" },
    { nombre: "11. RECEPCION DE PACIENTE A CITA POR ADMISIONISTA V.2_CM", url: "http://10.5.131.63/intranet/wp-content/uploads/2025/10/11.-RECEPCION-DE-PACIENTE-A-CITA-POR-ADMISIONISTA-V.2_CM.pdf" },
    { nombre: "12. REGISTRO DE INASISTENCIA DEL PACIENTE A SU CITA V.2_CM", url: "http://10.5.131.63/intranet/wp-content/uploads/2025/10/12.-REGISTRO-DE-INASISTENCIA-DEL-PACIENTE-A-SU-CITA-V.2_CM-.pdf" },
    { nombre: "13. VISUALIZACION DE SIC POR CLINICO V.1_CM", url: "http://10.5.131.63/intranet/wp-content/uploads/2025/10/13.-VISUALIZACION-DE-SIC-POR-CLINICO-V.1_CM.pdf" },
    { nombre: "14. REVISION DE HISTORIAL CLINICO POR PROFESIONAL V.1_CM", url: "http://10.5.131.63/intranet/wp-content/uploads/2025/10/14.-REVISION-DE-HISTORIAL-CLINICO-POR-PROFESIONAL-V.1_CM.pdf" },
    { nombre: "15. REGISTRO DE ATENCION ACTUAL POR PROFESIONAL CLINICO V.1_CM", url: "http://10.5.131.63/intranet/wp-content/uploads/2025/10/15.-REGISTRO-DE-ATENCION-ACTUAL-POR-PROFESIONAL-CLINICO-V.1_CM.pdf" },
    { nombre: "16. REGISTRO DE PATOLOGIA GES V.1_CM", url: "http://10.5.131.63/intranet/wp-content/uploads/2025/10/16.-REGISTRO-DE-PATOLOGIA-GES-V.1_CM.pdf" },
    { nombre: "17. SOLICITUD DE INDICACIONES POR CLINICO Y CREACIÓN DE FAVORITOS V.1", url: "http://10.5.131.63/intranet/wp-content/uploads/2025/10/17.-SOLICITUD-DE-INDICACIONES-POR-CLINICO-Y-CREACION-DE-FAVORITOS-V.1.pdf" },
    { nombre: "18. CIERRE DE REGISTRO Y FICHA POR CLINICO V.1_CM", url: "http://10.5.131.63/intranet/wp-content/uploads/2025/10/18.-CIERRE-DE-REGISTRO-Y-FICHA-POR-CLINICO-V.1_CM.pdf" },
    { nombre: "19. EMISION DE SOLCITUD DE INTERCONSULTA POR CLINICO V.2_CM", url: "http://10.5.131.63/intranet/wp-content/uploads/2025/10/19.-EMISION-DE-SOLCITUD-DE-INTERCONSULTA-POR-CLINICO-V.2_CM.pdf" },
    { nombre: "20. EMISION DE CONSULTA REPETIDA POR CLINICO. V.1_CM", url: "http://10.5.131.63/intranet/wp-content/uploads/2025/10/20.-EMISION-DE-CONSULTA-REPETIDA-POR-CLINICO.-V.1_CM.pdf" },
    { nombre: "21. EMISION DE ALTA-CONTRA REFERENCIA POR PROFESIONAL MEDICO-ODONTO_CM", url: "http://10.5.131.63/intranet/wp-content/uploads/2025/10/21.-EMISION-DE-ALTA-CONTRA-REFERENCIA-POR-PROFESIONAL-MEDICO-ODONTO_CM-.pdf" },
    { nombre: "22. VISUALIZCION DE ALTA POR ADMINISTRATIVO_CM", url: "http://10.5.131.63/intranet/wp-content/uploads/2025/10/22.-VISUALIZCION-DE-ALTA-POR-ADMINISTRATIVO_CM.pdf" },
    { nombre: "23. GESTION ORDENES DE PROCEDIMIENTO V.1_CM", url: "http://10.5.131.63/intranet/wp-content/uploads/2025/10/23.-GESTION-ORDENES-DE-PROCEDIMIENTO-V.1_CM.pdf" },
    { nombre: "24. Interconsulta hospitalizado-urgencia", url: "http://10.5.131.63/intranet/wp-content/uploads/2025/10/24.-Interconsulta-hospitalizado-urgencia.pdf" },
    { nombre: "25. Solicitud de Orden de Atención de Profesional no Médico", url: "http://10.5.131.63/intranet/wp-content/uploads/2025/10/25.-Solicitud-de-Orden-de-Atencion-de-Profesional-no-Medico.pdf" }
  ];

  // Filtro corregido para buscar dentro del nombre del objeto
  const filteredGuias = guiasPdf.filter(guia => 
    guia.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // --- SUB-VISTAS DE RENDERIZADO ---

  const renderGuiasPdf = () => (
    <div className="animate-in fade-in duration-500">
      <button onClick={() => setSubView('intersystems')} className="bg-slate-100 hover:bg-slate-200 text-[#003876] px-4 py-1.5 rounded-full font-bold flex items-center gap-2 mb-8 text-xs border border-slate-200">
        <ChevronLeft size={16} /> Volver a InterSystems
      </button>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <h3 className="text-2xl font-black text-[#003876] uppercase tracking-tighter flex items-center gap-3">
          <FileText className="text-red-500" size={32} /> Guías TrakCare PDF
        </h3>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Buscar guía..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00a19a] font-bold text-sm" 
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredGuias.map((guia, index) => (
          <a 
            key={index} 
            href={guia.url} // <-- AQUÍ SE ACTIVA EL LINK
            target="_blank" 
            rel="noreferrer"
            className="group flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-[#00a19a] transition-all cursor-pointer"
          >
            <div className="bg-red-50 p-2 rounded-lg group-hover:bg-red-500 transition-colors">
              <FileText size={20} className="text-red-500 group-hover:text-white" />
            </div>
            {/* Se muestra el nombre del objeto */}
            <span className="text-[10px] font-black text-slate-700 uppercase leading-tight group-hover:text-[#003876]">{guia.nombre}</span>
            <ExternalLink size={14} className="ml-auto text-slate-300 group-hover:text-[#00a19a]" />
          </a>
        ))}
      </div>
    </div>
  );

  const renderAtencionMedica = () => (
    <div className="animate-in fade-in duration-500">
      <button onClick={() => setSubView('intersystems')} className="bg-slate-100 hover:bg-slate-200 text-[#003876] px-4 py-1.5 rounded-full font-bold flex items-center gap-2 mb-8 text-xs border border-slate-200">
        <ChevronLeft size={16} /> Volver a InterSystems
      </button>
      <h3 className="text-2xl font-black text-[#003876] mb-8 uppercase tracking-tighter flex items-center gap-3"><Video className="text-[#00a19a]" size={32} /> Videos Flujo Médico</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <VideoCard title="Perfil Médico – Realizar Indicaciones Farmacológicas" url="#" />
        <VideoCard title="Registro Médico NCI" url="#" />
        <VideoCard title="Perfil Médico – Realizar Indicaciones de Laboratorio" url="#" />
        <VideoCard title="Perfil Médico – Realizar Indicaciones de Imagenología (P1)" url="#" />
        <VideoCard title="Perfil Médico – Realizar Indicaciones de Imagenología (P2)" url="#" />
      </div>
    </div>
  );

  const renderMantenedorAgenda = () => (
    <div className="animate-in fade-in duration-500">
      <button onClick={() => setSubView('intersystems')} className="bg-slate-100 hover:bg-slate-200 text-[#003876] px-4 py-1.5 rounded-full font-bold flex items-center gap-2 mb-8 text-xs border border-slate-200">
        <ChevronLeft size={16} /> Volver a InterSystems
      </button>
      <h3 className="text-2xl font-black text-[#003876] mb-8 uppercase tracking-tighter flex items-center gap-3"><Folder className="text-yellow-500" size={32} /> Mantenedor de Agenda</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-4">
          <h4 className="text-sm font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">Video Tutorial</h4>
          <VideoCard title="Capacitación Mantenedor de Agenda" url="#" />
        </div>
        <div className="space-y-4">
          <h4 className="text-sm font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">Infografía / Foto Guía</h4>
          <div className="bg-white p-4 rounded-[2rem] shadow-lg border border-slate-100 overflow-hidden">
            <img src="https://via.placeholder.com/800x600?text=Foto+Mantenedor+Agenda" alt="Guía" className="w-full h-auto rounded-xl hover:scale-105 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );

  const renderAdmision = () => (
    <div className="animate-in fade-in duration-500">
      <button onClick={() => setSubView('intersystems')} className="bg-slate-100 hover:bg-slate-200 text-[#003876] px-4 py-1.5 rounded-full font-bold flex items-center gap-2 mb-8 text-xs border border-slate-200">
        <ChevronLeft size={16} /> Volver a InterSystems
      </button>
      <h3 className="text-2xl font-black text-[#003876] mb-8 uppercase tracking-tighter flex items-center gap-3"><Users className="text-[#00a19a]" size={32} /> Videos Admisión</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <VideoCard title="Tutorial Admisión - Parte 1" url="#" /><VideoCard title="Tutorial Admisión - Parte 2" url="#" />
        <VideoCard title="Tutorial Admisión - Parte 3" url="#" /><VideoCard title="Tutorial Admisión - Parte 4" url="#" />
      </div>
    </div>
  );

  const renderMedicoContralor = () => (
    <div className="animate-in fade-in duration-500">
      <button onClick={() => setSubView('intersystems')} className="bg-slate-100 hover:bg-slate-200 text-[#003876] px-4 py-1.5 rounded-full font-bold flex items-center gap-2 mb-8 text-xs border border-slate-200">
        <ChevronLeft size={16} /> Volver a InterSystems
      </button>
      <h3 className="text-2xl font-black text-[#003876] mb-8 uppercase tracking-tighter flex items-center gap-3"><ShieldCheck className="text-orange-500" size={32} /> Videos Médico Contralor</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <VideoCard title="Tutorial Médico Contralor - Parte 1" url="#" /><VideoCard title="Tutorial Médico Contralor - Parte 2" url="#" />
      </div>
    </div>
  );

  const renderInterSystems = () => (
    <div className="animate-in fade-in duration-500">
      <button onClick={() => setSubView('principal')} className="bg-slate-100 hover:bg-slate-200 text-[#003876] px-4 py-1.5 rounded-full font-bold flex items-center gap-2 mb-8 text-xs border border-slate-200">
        <ChevronLeft size={16} /> Volver a Capacitación
      </button>
      <h3 className="text-2xl font-black text-[#003876] mb-8 uppercase tracking-tighter">Capacitación InterSystems</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <FolderCard title="Atención Medica" onClick={() => setSubView('atencion-medica')} />
        <FolderCard title="Mantenedor de Agenda" onClick={() => setSubView('mantenedor-agenda')} />
        <FolderCard title="Admisión" onClick={() => setSubView('admision')} />
        <FolderCard title="Médico Contralor" onClick={() => setSubView('medico-contralor')} />
        <FileCard title="Guías en PDF" onClick={() => setSubView('guias-pdf')} />
      </div>
    </div>
  );

  return (
    <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 min-h-[600px] animate-in fade-in zoom-in duration-500 w-full font-sans relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12 border-b pb-8">
        <div>
          <button onClick={() => onNavigate('inicio')} className="bg-[#003876]/5 hover:bg-[#ffb81c] text-[#003876] px-5 py-2 rounded-full font-black flex items-center gap-2 transition-all mb-6 text-xs border border-[#003876]/10">
            <ChevronLeft size={18} /> VOLVER AL INICIO
          </button>
          <div className="flex items-center gap-4">
            <GraduationCap className="text-[#003876] hidden md:block" size={48} />
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-[#003876] uppercase italic tracking-tighter leading-none">Portal de Capacitación</h2>
              <p className="text-[#00a19a] font-bold uppercase tracking-[0.2em] mt-2 text-sm">Formación Continua y Desarrollo Profesional</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-slate-400 bg-slate-50 px-4 py-2 rounded-full text-xs font-bold border border-slate-100">
          <BookOpen size={16} className="text-[#00a19a]" /> Área de Desarrollo Local
        </div>
      </div>
      
      {subView === 'principal' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl animate-in fade-in duration-500">
          <MenuCard title="Capacitación InterSystems" image={logoServicio} bgColor="bg-blue-50/50" onClick={() => setSubView('intersystems')} />
          <MenuCard title="Portal De Capacitación" image={logoServicio} bgColor="bg-emerald-50/50" link="https://capacitacionhsjm.cl/hsjm/" />
        </div>
      )}

      {subView === 'intersystems' && renderInterSystems()}
      {subView === 'atencion-medica' && renderAtencionMedica()}
      {subView === 'mantenedor-agenda' && renderMantenedorAgenda()}
      {subView === 'admision' && renderAdmision()}
      {subView === 'medico-contralor' && renderMedicoContralor()}
      {subView === 'guias-pdf' && renderGuiasPdf()}
    </section>
  );
};

// --- COMPONENTES AUXILIARES ---
function VideoCard({ title, url }) {
  return (
    <div className="bg-slate-50 p-4 rounded-3xl border border-slate-200 space-y-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="aspect-video bg-slate-900 rounded-2xl overflow-hidden relative group border-4 border-white">
        <video src={url} className="w-full h-full object-cover" />
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-all cursor-pointer">
          <PlayCircle size={60} className="text-white drop-shadow-lg transform group-hover:scale-110 transition-transform" />
        </div>
      </div>
      <p className="text-center font-black text-[#003876] uppercase text-[10px] px-2 leading-tight">{title}</p>
    </div>
  );
}

function MenuCard({ title, image, link, onClick, bgColor }) {
  const content = (
    <div className={`p-10 rounded-[2.5rem] shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col items-center group cursor-pointer hover:-translate-y-2 border border-slate-100 ${bgColor} h-full`}>
      <h4 className="text-[#003876] font-black text-xl mb-8 text-center">{title}</h4>
      <div className="w-32 h-32 flex items-center justify-center mb-6 bg-white rounded-2xl p-4 shadow-sm group-hover:shadow-md transition-all"><img src={image} alt="" className="w-full h-full object-contain" /></div>
      <div className="w-20 h-1.5 bg-[#ffb81c] rounded-full"></div>
    </div>
  );
  return link ? <a href={link} target="_blank" rel="noreferrer" className="block h-full">{content}</a> : <div onClick={onClick} className="h-full">{content}</div>;
}

function FolderCard({ title, onClick }) {
  return (
    <div onClick={onClick} className="bg-slate-50/50 p-8 rounded-3xl border border-slate-100 text-center flex flex-col items-center group hover:bg-white hover:shadow-xl transition-all cursor-pointer">
      <Folder className="text-yellow-400 mb-4 group-hover:scale-110 transition-transform duration-300" size={64} strokeWidth={1.5} />
      <p className="font-black text-sm text-slate-700 uppercase tracking-tighter">{title}</p>
    </div>
  );
}

function FileCard({ title, onClick }) {
  return (
    <div onClick={onClick} className="bg-slate-50/50 p-8 rounded-3xl border border-slate-100 text-center flex flex-col items-center group hover:bg-white hover:shadow-xl transition-all cursor-pointer">
      <div className="relative mb-4 group-hover:scale-110 transition-transform duration-300">
        <FileText className="text-red-500" size={64} strokeWidth={1.5} />
        <span className="absolute bottom-1 right-1 bg-white px-1 text-[10px] font-black border border-red-500 text-red-500 rounded">PDF</span>
      </div>
      <p className="font-black text-sm text-slate-700 uppercase tracking-tighter">{title}</p>
    </div>
  );
}

export default Capacitacion;