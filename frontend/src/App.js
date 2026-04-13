import React, { useState, useEffect } from 'react';
import { 
  LogIn, Microscope, Pill, ShieldCheck, Newspaper, MapPin, Search, 
  FileText, Database, Users, Menu, X, HelpCircle,
  ChevronLeft, ChevronRight, LogOut, Instagram, Facebook, Youtube, Twitter, 
  Mail, Globe, Lock, Briefcase, Download, Map, BookOpen, Image as ImageIcon, FolderOpen, Key
} from 'lucide-react';

// --- COMPONENTES PRINCIPALES ---
import Login from './components/login';
import Navbar from './components/Navbar';
import './App.css';

// --- VISTAS ---
import ViruelaDelMono from './views/virueladelmono.jsx';
import CalidadDeVida from './views/CalidadDeVida';
import Ciberseguridad from './views/Ciberseguridad';
import Tuberculosis from './views/Tuberculosis';
import ProgramaBPSO from './views/ProgramaBPSO';
import Midas from './views/Midas';
import ProtocoloVigilancia from './views/ProtocoloVigilancia';
import Reacreditacion from './views/Reacreditacion';
import Laboratorio_instructivo from './views/Laboratorioo';
import PrevencionRiesgos from './views/PrevencionRiesgos';
import Innovacion_pagina from './views/Innovacion';
import Iaas from './views/Iaas';
import SeguridadPaciente from './views/SeguridadPaciente';
import CalidadVigente from './views/CalidadVigente';
import VersionesAnteriores from './views/VersionesAnteriores';
import ArsenalFarmacologico from './views/ArsenalFarmacologico';
import AgendamientoGis from './views/AgendamientoGis';
import ProtocoloAtencionUsuario from './views/ProtocoloAtencionUsuario';

// --- IMÁGENES Y ASSETS ---
import foto4 from './assets/foto4.jpeg'; 
import foto5 from './assets/foto5.jpeg'; 
import foto6 from './assets/foto6.jpeg'; 
import foto7 from './assets/foto7.jpeg'; 
import foto8 from './assets/foto8.jpeg'; 
import foto9 from './assets/foto9.jpeg'; 
import foto10 from './assets/foto10.jpeg'; 
import foto11 from './assets/foto11.jpeg'; 
import foto12 from './assets/foto12.jpeg'; 
import foto13 from './assets/foto13.jpeg';
import logoHospital from './assets/logo.png'; 
import logoServicio from './assets/logo.png'; 
import Concurso from './assets/ConcursoInterno.png'; 
import Bienestar from './assets/bien.png'; 
import imagen from './assets/imagenologia.png';
import hola from './assets/comite.jpg';  
import mono from './assets/viruela.jpg';  
import vida from './assets/calidad.png';
import informacion from './assets/seguridad.jpg';
import Salud from './assets/tuberculosis.png';
import Salud1 from './assets/BPSO.png';
import midas from './assets/logomidas.png';
import ser from './assets/servicio.png';
import Protocolos from './assets/protocolo.png';
import proa from './assets/PROA.png';
import rea from './assets/2023.png';
import Laboratorio from './assets/lab.png';
import SOGA from './assets/soga.png';
import Innovacion from './assets/innova.png';
import paciente from './assets/segpaciente.png';
import Soporte from './assets/soporte.png';
import IAAS from './assets/iaas.png';
import seremi from './assets/Seremienlinea.jpeg';
import svi from './assets/SVI.png';
import Declaraciones from './assets/declaraciones.png';
import imagenHeroes from './assets/heroes.png'; 
import ComiteIntegrantes from './assets/integrantes_comite.png'; 
import ComiteFunciones from './assets/funciones_comite.png';    
import Calendario from './assets/calendario.png';
import f1 from './assets/1.jpg';
import f2 from './assets/2.jpg';
import f3 from './assets/3.jpg';
import f4 from './assets/4.png';
import f5 from './assets/5.png';
import f6 from './assets/6.png';
import f7 from './assets/7.png';
import f8 from './assets/8.png';
import f9 from './assets/9.png';
import f10 from './assets/10.png';
import f11 from './assets/11.png';
import f12 from './assets/12.png';
import f13 from './assets/13.png';
import fiesta from './assets/clavefiestas.png';
import paso from './assets/campañapaso.png';
import ley from './assets/ley.png';
import ley2 from './assets/ley2.png';
import salud from './assets/salud.png';
import violencia from './assets/violencia.png';
import resolucion from './assets/resolucion.jpg';
import logoMedicap from './assets/Medicap.jpg';
import logosynaspe from './assets/Synapse.png';
import logomaitenes from './assets/Maitenes.png';
import logofleming from './assets/Fleming.png';
import logohospitalmeli from './assets/Hospitalmeli.png';
import logotalagante from './assets/Talagante.png';

import Capacitacion from './views/Capacitacion';
import Gremio from './views/Gremio';
import ReglamentoInterno from './views/ReglamentoInterno';
import ProduccionEstadistica from './views/ProduccionEstadistica';
import EnfermedadesTransmisibles from './views/EnfermedadesTransmisibles';
import GrdInformes from './views/GrdInformes';
import EspecialidadOdontologia from './views/EspecialidadOdontologia';
import Contingencia from './views/Contingencia';
import Resoluciones from './views/Resoluciones';
import ManualOrganizacion from './views/ManualOrganizacion';
import ParticipacionCiudadana from './views/ParticipacionCiudadana';
import PlanAnualCCU from './views/PlanAnualCCU';
import Procuramiento from './views/Procuramiento';
import CodigoEtica from './views/CodigoEtica';
import EventoAdverso from './views/EventoAdverso';
import AccidentesTrabajo from './views/AccidentesTrabajo';
import ReunionClinicaUrgencia from './views/ReunionClinicaUrgencia';
import ManualAgendamiento from './views/ManualAgendamiento';
import DocumentosPDF from './views/DocumentosPDF'; // Agrega esta línea arriba
import GestionProyectos from './views/GestionProyectos';
import ReglamentoHigiene from './views/ReglamentoHigiene';
import Organigrama from './views/Organigrama';
import ReglamentoProtocolos from './views/ReglamentoProtocolos';
import Anexos from './views/Anexos';
import Planos from './views/Planos';
import Inicio from './views/Inicio';
import Noticias from './views/Noticias';


function App() {
// 1. Primero sacamos la información del "cajón" (localStorage)
  const sesionGuardada = JSON.parse(localStorage.getItem('usuario_hsjm'));

  // 2. Ahora configuramos todos los estados usando esa información
  const [isLoggedIn, setIsLoggedIn] = useState(sesionGuardada?.logueado || false);
  const [userName, setUserName] = useState(sesionGuardada?.nombre || '');
  const [userRole, setUserRole] = useState(sesionGuardada?.rol || '');
  
  // Extra: Esto hace que si recarga en 'noticias', se quede en 'noticias'
  const [currentPage, setCurrentPage] = useState(localStorage.getItem('pagina_actual') || 'inicio');

  // 3. El resto de tus estados normales
  const [currentSlide, setCurrentSlide] = useState(0);   
  const [searchTerm, setSearchTerm] = useState(''); 
  const [showPasoAPasoImage, setShowPasoAPasoImage] = useState(false);
  const [portalView, setPortalView] = useState('main');

  

  // --- MANEJO DE RUTAS (HISTORIAL) ---
  useEffect(() => {
    if (isLoggedIn) {
      window.history.replaceState({ page: 'inicio' }, '', '#inicio');
    }

    const handlePopState = (event) => {
      if (event.state && event.state.page) {
        setCurrentPage(event.state.page);
      } else {
        setCurrentPage('inicio');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [isLoggedIn]);

  const handleNavigate = (page) => {
    setCurrentPage(page);
    localStorage.setItem('pagina_actual', page);
    window.history.pushState({ page: page }, '', `#${page}`);
  };

  // --- SLIDER DE IMÁGENES ---
  const images = [foto4, foto5, foto6, foto7, foto8, foto9, foto10, foto11, foto12, foto13];
  const nextSlide = () => setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  useEffect(() => {
    if (isLoggedIn && currentPage === 'inicio') { 
      const interval = setInterval(nextSlide, 4500);
      return () => clearInterval(interval); 
    }
  }, [currentSlide, isLoggedIn, currentPage]);

  // --- LOGIN / LOGOUT ---
 const handleLogin = async (rutUsuario, passwordUsuario) => {
  try {
    // 1. React va con el RUT y la clave a preguntarle a Postgres
    const response = await fetch('http://10.63.246.89:5000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        rut: rutUsuario, 
        password: passwordUsuario 
      })
    });

    const data = await response.json();

    if (data.success) {
      // 2. ¡La clave es correcta!
      setUserName(data.user.nombre); // Guarda el nombre real que viene de la base de datos
      localStorage.removeItem('cumpleanosMostrado');
      setUserRole(data.user.rol); // Limpiamos la memoria para que salgan los globos
      setIsLoggedIn(true);

      localStorage.setItem('usuario_hsjm', JSON.stringify({
    nombre: data.user.nombre,
    rol: data.user.rol,
    logueado: true
      }));
      
      // Si tienes un estado para la página actual, descomenta la línea de abajo:
      // setCurrentPage('inicio'); 
    } else {
      // 3. La clave o el RUT están mal
      alert("Acceso denegado: " + data.message); 
    }
  } catch (error) {
    console.error("Error de conexión:", error);
    alert("Error crítico: No se pudo contactar al servidor. ¿Está encendida la terminal negra?");
  }
};
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName('');
    setUserRole('');
    setCurrentPage('inicio'); 
    localStorage.removeItem('usuario_hsjm');
    window.history.replaceState(null, '', ' '); 
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 overflow-x-hidden">
      
      {/* NAVEGACIÓN */}
      <Navbar 
        onLogout={handleLogout} 
        userName={userName} 
        onNavigate={handleNavigate} 
        currentPage={currentPage} 
      />

      <main className="max-w-7xl mx-auto px-4 pt-20 md:pt-40 pb-12 flex-grow w-full">
        
        {/* =========================================
             VISTAS DE LA BIBLIOTECA Y OTROS COMPONENTES AISLADOS
        ========================================= */}
        {currentPage === 'viruela-del-mono' && <ViruelaDelMono onNavigate={handleNavigate} />}
        {currentPage === 'calidad-de-vida' && <CalidadDeVida onNavigate={handleNavigate} fotos={{ ley, ley2, violencia, salud, logoHospital }} />}        
        {currentPage === 'ciberseguridad' && <Ciberseguridad onNavigate={handleNavigate} fotos={{ resolucion, Soporte }} />}
        {currentPage === 'tuberculosis' && <Tuberculosis onNavigate={handleNavigate} />}
        {currentPage === 'bpso' && <ProgramaBPSO onNavigate={handleNavigate} />}
        {currentPage === 'midas' && <Midas onNavigate={handleNavigate} />}
        {currentPage === 'protocolo-vigilancia' && <ProtocoloVigilancia onNavigate={handleNavigate} />}
        {currentPage === 'reacreditacion' && <Reacreditacion onNavigate={handleNavigate} />}
        {currentPage === 'laboratorio' && <Laboratorio_instructivo onNavigate={handleNavigate} />}
        {currentPage === 'prevencion' && <PrevencionRiesgos onNavigate={handleNavigate} />}
        {currentPage === 'innovacion' && <Innovacion_pagina onNavigate={handleNavigate} />}
        {currentPage === 'iaas' && <Iaas onNavigate={handleNavigate} />}
        {currentPage === 'seguridad-paciente' && <SeguridadPaciente onNavigate={handleNavigate} />}
        {currentPage === 'calidad-vigente' && <CalidadVigente onNavigate={handleNavigate} />}
        {currentPage === 'versiones-anteriores' && <VersionesAnteriores onNavigate={handleNavigate} />}
        {currentPage === 'arsenal' && <ArsenalFarmacologico onNavigate={handleNavigate} />}
        {currentPage === 'agendamiento-gis' && <AgendamientoGis onNavigate={handleNavigate} />}
        {currentPage === 'atencion-usuario' && <ProtocoloAtencionUsuario onNavigate={handleNavigate} />}
        {currentPage === 'capacitacion' && <Capacitacion onNavigate={handleNavigate} />}
        {currentPage === 'gremio' && <Gremio onNavigate={handleNavigate} />}
        {currentPage === 'reglamento-interno' && <ReglamentoInterno onNavigate={handleNavigate} />}
        {currentPage === 'produccion-estadistica' && <ProduccionEstadistica onNavigate={handleNavigate} />}
        {currentPage === 'enfermedades-transmisibles' && <EnfermedadesTransmisibles onNavigate={handleNavigate} />}
        {currentPage === 'grd' && <GrdInformes onNavigate={handleNavigate} />}
        {currentPage === 'odontologia' && <EspecialidadOdontologia onNavigate={handleNavigate} />}
        {currentPage === 'contingencia' && <Contingencia onNavigate={handleNavigate} />}
        {currentPage === 'resoluciones' && <Resoluciones onNavigate={handleNavigate} />}
        {currentPage === 'organizacion' && <ManualOrganizacion onNavigate={handleNavigate} />}
        {currentPage === 'participacion' && <ParticipacionCiudadana onNavigate={handleNavigate} />}
        {currentPage === 'ccu-2024' && <PlanAnualCCU onNavigate={handleNavigate} />}
        {currentPage === 'procuramiento' && <Procuramiento onNavigate={handleNavigate} />}
        {currentPage === 'etica' && <CodigoEtica onNavigate={handleNavigate} />}
        {currentPage === 'evento-adverso' && <EventoAdverso onNavigate={handleNavigate} />}
        {currentPage === 'accidentes-trabajo' && <AccidentesTrabajo onNavigate={handleNavigate} />}
        {currentPage === 'reunion-urgencia' && <ReunionClinicaUrgencia onNavigate={handleNavigate} />}
        {currentPage === 'manual-agendamiento' && <ManualAgendamiento onNavigate={handleNavigate} />}
        {currentPage === 'documentos-pdf' && <DocumentosPDF onNavigate={handleNavigate} />}
        {currentPage === 'gestion-proyectos' && <GestionProyectos onNavigate={handleNavigate} />}
        {currentPage === 'reglamento-higiene' && <ReglamentoHigiene onNavigate={handleNavigate} />}
        {currentPage === 'organigrama' && <Organigrama onNavigate={handleNavigate} />}
        {currentPage === 'reglamento-protocolos' && <ReglamentoProtocolos onNavigate={handleNavigate} />}
        {currentPage === 'anexos' && <Anexos onNavigate={handleNavigate} />}
        {currentPage === 'planos' && <Planos onNavigate={handleNavigate} />}
        {currentPage === 'inicio' && <Inicio onNavigate={handleNavigate} userName={userName} images={images}/>}
       {currentPage === 'noticias' && <Noticias userRole={userRole} />}
  
 

       
{/* =========================================
    VISTA PORTAL DIGITAL (CORREGIDA)
========================================= */}
{currentPage === 'portal' && (
  <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 min-h-[600px] animate-in fade-in zoom-in duration-500 w-full">
    
    {portalView === 'main' ? (
      <>
        {/* --- VISTA PRINCIPAL DEL PORTAL --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12 border-b pb-8">
          <div>
            <button onClick={() => handleNavigate('inicio')} className="bg-slate-100 hover:bg-[#ffb81c] text-[#003876] px-5 py-2 rounded-full font-black flex items-center gap-2 transition-all mb-4 text-sm shadow-sm border">
              <ChevronLeft size={18} /> VOLVER AL INICIO
            </button>
            <h2 className="text-4xl md:text-5xl font-black text-[#003876] uppercase italic tracking-tighter leading-none">Portal Digital Clínico</h2>
            <p className="text-[#00a19a] font-bold uppercase tracking-[0.3em] mt-2 text-sm">Registro Clínico Electrónico de Melipilla</p>
          </div>
          <div className="flex items-center gap-2 text-slate-400 bg-slate-50 px-4 py-2 rounded-full text-xs font-bold border border-slate-100">
            <MapPin size={16} className="text-[#00a19a]" /> Red Local Hospital Melipilla
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          <ClinicalSystemCard image={logoServicio} title="Gis" desc="" link="https://melipilla.experthis.cl/produccion/login.php" />
          
          {/* BOTÓN INTERNO: No lleva 'link' para que no abra pestaña en blanco */}
          <div onClick={() => setPortalView('imagen')} className="cursor-pointer">
            <ClinicalSystemCard image={logoServicio} title="Sistemas de Imagenología" desc="" />
          </div>

          <ClinicalSystemCard image={logoServicio} title="Libro de Pabellón" desc="" link="http://10.5.131.63/hospital_2/" />
          <ClinicalSystemCard image={logoServicio} title="Softmed Biopsias" desc="" link="https://atrys.softmed.cl/#/login" />
          <ClinicalSystemCard image={logoServicio} title="Exámenes Laboratorio" desc="" link="https://www.examenesoccidente.cl/Home/Login?ReturnUrl=%2fclinicos" />
          <ClinicalSystemCard image={logoServicio} title="TaoNet" desc="" link="http://10.6.4.45:8080/tao/servlet/KYNTAOController" />
          <ClinicalSystemCard image={logoServicio} title="TRAKCARE" desc="" link="http://10.8.163.40/trakcare/" />
          <ClinicalSystemCard image={logoServicio} title="APA" desc="" link="http://10.5.131.63/sistema_apa/login/index" />
          <ClinicalSystemCard image={logoServicio} title="Tickets Soporte" desc="" link="https://nuevohospitaldemelipilla.cl/sistema_tickets/" />
        </div>
      </>
    ) : (
      <>
        {/* --- SUB-VISTA: SISTEMAS DE IMAGENOLOGÍA --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12 border-b pb-8">
          <div>
            <button 
              onClick={() => setPortalView('main')} 
              className="bg-[#003876] text-white hover:bg-[#ffb81c] hover:text-[#003876] px-5 py-2 rounded-full font-black flex items-center gap-2 transition-all mb-4 text-sm shadow-md"
            >
              <ChevronLeft size={18} /> VOLVER AL PORTAL
            </button>
            <h2 className="text-4xl md:text-5xl font-black text-[#003876] uppercase italic tracking-tighter leading-none text-red-600">Sistemas Imagenología</h2>
            <p className="text-[#00a19a] font-bold uppercase tracking-[0.2em] mt-2 text-sm">Hospital San José de Melipilla</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          <ClinicalSystemCard image={logoMedicap} title="MediCap" desc="Visor de Imágenes" link="https://cloud1.medicap.cl/nube/login" />
          <ClinicalSystemCard image={logosynaspe} title="Synapse" desc="Hospital San Juan de Dios" link="https://sjdpacs.synapsetimed.cl/SynapseSignOn/sts/login?signin=a0841457449580795e2ba3476955447e" />
          <ClinicalSystemCard image={logomaitenes} title="Clínica Maitenes" desc="ACHS Salud" link="https://186.103.154.101:8080/portal/WebLogin.aspx?ReturnUrl=%2fportal%2f" />
          <ClinicalSystemCard image={logofleming} title="Centro Fleming" desc="Centro Radiológico" link="https://convenios.crfleming.cl/index.php" />
          <ClinicalSystemCard image={logohospitalmeli} title="Estudios HSJM" desc="Informes de Imágenes" link="http://10.5.131.63/procedimiento/Login/index" />
          <ClinicalSystemCard image={logotalagante} title="H. Talagante" desc="Imágenes Puerta Abierta" link="http://10.5.0.52:8085/login.html" />
        </div>
      </>
    )}
  </section>
)}
        {/* =========================================
             VISTA ACCESOS
        ========================================= */}
        {currentPage === 'accesos' && (
          <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 min-h-[600px] animate-in fade-in zoom-in duration-500 w-full">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12 border-b pb-8">
              <div>
                <button onClick={() => handleNavigate('inicio')} className="bg-slate-100 hover:bg-[#ffb81c] text-[#003876] px-5 py-2 rounded-full font-black flex items-center gap-2 transition-all mb-4 text-sm">
                  <ChevronLeft size={18} /> VOLVER AL INICIO
                </button>
                <h2 className="text-4xl md:text-5xl font-black text-[#003876] uppercase italic tracking-tighter leading-none">Accesos</h2>
              </div>
              <div className="flex items-center gap-2 text-slate-400 bg-slate-50 px-4 py-2 rounded-full text-xs font-bold">
                <Lock size={16} /> Accesos Seguros
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
              <ClinicalSystemCard image={Concurso} title="Concurso Interno" desc="" onClick={() => handleNavigate('concurso')} />
              <ClinicalSystemCard image={Bienestar} title="Bienestar" desc="" onClick={() => handleNavigate('bienestar')} />
              <ClinicalSystemCard image={imagen} title="Protocolos y ordenes-Imagenologia" desc="" onClick={() => handleNavigate('protocolos-ordenes')} />
              <ClinicalSystemCard image={hola} title="Comite Paritario" desc="" onClick={() => handleNavigate('comite-paritario')} />
              <ClinicalSystemCard image={mono} title="Viruela del mono" desc="" onClick={() => handleNavigate('viruela-del-mono')} />
              <ClinicalSystemCard image={vida} title="Calidad De Vida" desc="" onClick={() => handleNavigate('calidad-de-vida')} />
              <ClinicalSystemCard image={informacion} title="Seguridad de la Información" desc="" onClick={() => handleNavigate('ciberseguridad')} />
              <ClinicalSystemCard image={Salud} title="Tuberculosis" desc="" onClick={() => handleNavigate('tuberculosis')} />
              <ClinicalSystemCard image={Salud1} title="Programa BPSO" desc="" onClick={() => handleNavigate('bpso')} />
              <ClinicalSystemCard image={midas} title="Midas" desc="" onClick={() => handleNavigate('midas')} />
              <ClinicalSystemCard image={ser} title="Orden Reparacion Equipos Medicos" desc="" link="http://10.5.130.24/ticketequipos/" />
              <ClinicalSystemCard image={Salud} title="Protocolo Vigilancia" desc="" onClick={() => handleNavigate('protocolo-vigilancia')} />
              <ClinicalSystemCard image={rea} title="Reacreditación 2023" desc="" onClick={() => handleNavigate('reacreditacion')} />
              <ClinicalSystemCard image={Laboratorio} title="Laboratorio" desc="" onClick={() => handleNavigate('laboratorio')} />
              <ClinicalSystemCard image={SOGA} title="Prevencion de Riegos" desc="" onClick={() => handleNavigate('prevencion')} />
              <ClinicalSystemCard image={Innovacion} title="Innovacion" desc="" onClick={() => handleNavigate('innovacion')} />
              <ClinicalSystemCard image={paciente} title="Semana de seguridad del paciente" desc="" onClick={() => handleNavigate('seguridad-paciente')} />
              <ClinicalSystemCard image={logoServicio} title="Portal Sistemas de Declaraciones" desc="" link="https://www.declaracionjurada.cl/dip/index.html" />
              <ClinicalSystemCard image={seremi} title="Seremi en linea" desc="" link="https://seremienlinea.minsal.cl/asdigital/" />
              <ClinicalSystemCard image={svi} title="Sistema Vigilancia Integrado" desc="" link="https://www.ispch.gob.cl/anamed/farmacovigilancia/vacunas/sistema-de-vigilancia-integrada-svi-esavi/" />
              <ClinicalSystemCard image={Soporte} title="Ticket Informatica" desc="" link="http://10.5.130.24/ticket/" />
              <ClinicalSystemCard image={IAAS} title="IAAS" desc="" onClick={() => handleNavigate('iaas')} />
            </div>
          </section>
        )}

        {/* =========================================
             VISTAS DE BIENESTAR (Y SUS SUB-VISTAS)
        ========================================= */}
        {currentPage === 'bienestar' && (
          <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 min-h-[600px] animate-in fade-in zoom-in duration-500 w-full">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-16 border-b pb-8">
              <div>
                <button onClick={() => handleNavigate('accesos')} className="bg-slate-100 hover:bg-[#ffb81c] text-[#003876] px-5 py-2 rounded-full font-black flex items-center gap-2 transition-all mb-4 text-sm">
                  <ChevronLeft size={18} /> VOLVER A ACCESOS
                </button>
                <h2 className="text-4xl md:text-5xl font-black text-slate-700">Bienestar</h2>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto items-center">
              <BienestarCard title="Formularios" icon={<FileText size={56} strokeWidth={1.5} />} onClick={() => handleNavigate('bienestar-formularios')} />
              <BienestarCard title="Informativos" icon={<Mail size={56} strokeWidth={1.5} />} onClick={() => handleNavigate('bienestar-informativos')} />
              <BienestarCard title="Marco Normativo" icon={<BookOpen size={56} strokeWidth={1.5} />} onClick={() => handleNavigate('bienestar-marco-normativo')} />
              
              <div className="flex justify-center md:justify-start pl-0 md:pl-8">
                <a href="http://10.5.131.63/intranet/wp-content/uploads/2024/10/INFORMACION-A-CONSIDERAR.pdf" target="_blank" rel="noreferrer" className="text-black hover:text-[#00a19a] font-bold underline underline-offset-4 decoration-2 transition-colors text-lg uppercase tracking-wide">
                  INFORMACIÓN A CONSIDERAR
                </a>
              </div>
            </div>
          </section>
        )}

        {currentPage === 'bienestar-formularios' && (
          <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 min-h-[600px] animate-in fade-in zoom-in duration-500 w-full">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 border-b pb-8">
              <div>
                <button onClick={() => handleNavigate('bienestar')} className="bg-slate-100 hover:bg-[#ffb81c] text-[#003876] px-5 py-2 rounded-full font-black flex items-center gap-2 transition-all mb-4 text-sm">
                  <ChevronLeft size={18} /> VOLVER A BIENESTAR
                </button>
                <h2 className="text-4xl md:text-5xl font-black text-slate-700">Formularios</h2>
              </div>
            </div>
            
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
          </section>
        )}

        {currentPage === 'bienestar-informativos' && (
          <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 min-h-[600px] animate-in fade-in zoom-in duration-500 w-full">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 border-b pb-8">
              <div>
                <button onClick={() => handleNavigate('bienestar')} className="bg-slate-100 hover:bg-[#ffb81c] text-[#003876] px-5 py-2 rounded-full font-black flex items-center gap-2 transition-all mb-4 text-sm">
                  <ChevronLeft size={18} /> VOLVER A BIENESTAR
                </button>
                <h2 className="text-4xl md:text-5xl font-black text-slate-700">Informativos</h2>
              </div>
            </div>
            
            <div className="pl-4 md:pl-10 space-y-12">
              <ul className="space-y-6">
                <BienestarLink text="Paso a paso ingreso Bono en Dinero y Reembolsos médicos Digital" link="http://10.5.131.63/intranet/wp-content/uploads/2023/08/Paso-a-paso-ingreso-Bono-en-Dinero-y-Reembolsos-medicos-Digital.pdf" />
                <BienestarLink text="SOLICITUD AYUDA CATÁSTROFE" link="http://10.5.131.63/intranet/wp-content/uploads/2024/10/SOLICITUD-AYUDA-CATASTROFE.pdf" isTitle={true} />
              </ul>
              <div className="mt-10 max-w-sm flex justify-start">
                <img src={imagenHeroes} alt="Informativo Los Héroes" className="w-full h-auto rounded-xl shadow-md border border-slate-200 hover:shadow-xl transition-shadow" />
              </div>
            </div>
          </section>
        )}

        {currentPage === 'bienestar-marco-normativo' && (
          <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 min-h-[600px] animate-in fade-in zoom-in duration-500 w-full">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 border-b pb-8">
              <div>
                <button onClick={() => handleNavigate('bienestar')} className="bg-slate-100 hover:bg-[#ffb81c] text-[#003876] px-5 py-2 rounded-full font-black flex items-center gap-2 transition-all mb-4 text-sm">
                  <ChevronLeft size={18} /> VOLVER A BIENESTAR
                </button>
                <h2 className="text-4xl md:text-5xl font-black text-slate-700">Marco Normativo</h2>
              </div>
            </div>
            
            <div className="pl-4 md:pl-10">
              <ul className="space-y-8">
                <BienestarLink text="REGLAMENTO GENERAL N° 28" link="http://10.5.131.63/intranet/wp-content/uploads/2023/08/REGLAMENTO-GENERAL-N%C2%B0-28.pdf" />
                <BienestarLink text="REGLAMENTO PARTICULAR DS N° 160" link="http://10.5.131.63/intranet/wp-content/uploads/2023/08/REGLAMENTO-PARTICULAR-DS-N%C2%B0-160.pdf" />
                <BienestarLink text="01_Instructivo_Bienestar-2023" link="http://10.5.131.63/intranet/wp-content/uploads/2023/08/01_Instructivo_Bienestar-2023.pdf" />
              </ul>
            </div>
          </section>
        )}


        {/* =========================================
             VISTA PROTOCOLOS Y ORDENES
        ========================================= */}
        {currentPage === 'protocolos-ordenes' && (
          <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 min-h-[600px] animate-in fade-in zoom-in duration-500 w-full">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 border-b pb-8">
              <div>
                <button onClick={() => handleNavigate('accesos')} className="bg-slate-100 hover:bg-[#ffb81c] text-[#003876] px-5 py-2 rounded-full font-black flex items-center gap-2 transition-all mb-4 text-sm">
                  <ChevronLeft size={18} /> VOLVER A ACCESOS
                </button>
                <h2 className="text-4xl md:text-6xl font-black text-slate-700 tracking-tighter">Protocolos y ordenes</h2>
                <p className="text-[#00a19a] font-bold uppercase tracking-widest mt-2">Hospital San José de Melipilla</p>
              </div>
            </div>
            <div className="pl-4 md:pl-10">
              <ul className="space-y-6">
                <ProtocoloLink text="CONSENTIMIENTO SCANNER Y RESONANCIA CON CONTRASTE" link="http://10.5.131.63/intranet/wp-content/uploads/2024/03/CONSENTIMIENTO-SCANNER-Y-RESONANCIA-CON-CONTRASTE.pdf" />
                <ProtocoloLink text="CUESTIONARIO SCANNER ACTUALIZADO" link="http://10.5.131.63/intranet/wp-content/uploads/2024/03/CUESTIONARIO-SCANNER-ACTUALIZADO.pdf" />
                <ProtocoloLink text="ENCUESTA DE RESONANCIA" link="http://10.5.131.63/intranet/wp-content/uploads/2024/03/ENCUESTA-DE-RESONANCIA.pdf" />
                <ProtocoloLink text="PREMEDICACION-HFB" link="http://10.5.131.63/intranet/wp-content/uploads/2024/03/PREMEDICACION-HFB.pdf" />
                <ProtocoloLink text="Preparaciones HSJM" link="http://10.5.131.63/intranet/wp-content/uploads/2024/03/Preparaciones-HSJM.docx" />
                <ProtocoloLink text="TAC-AUTORIZACION-crea-alta-ambulatorio" link="http://10.5.131.63/intranet/wp-content/uploads/2024/03/TAC-AUTORIZACION-crea-alta-ambulatorio.doc" />
                <ProtocoloLink text="TAC-AUTORIZACION-PCTES-crea-alta-hospitalizado" link="http://10.5.131.63/intranet/wp-content/uploads/2024/03/TAC-AUTORIZACION-PCTES-crea-alta-hospitalizado.doc" />
              </ul>
            </div>
          </section>
        )}
        
        {/* =========================================
             VISTAS DE COMITÉ PARITARIO (Y SUS SUB-VISTAS)
        ========================================= */}
        {currentPage === 'comite-paritario' && (
          <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 min-h-[600px] animate-in fade-in zoom-in duration-500 w-full">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 border-b pb-8">
              <div>
                <button onClick={() => handleNavigate('accesos')} className="bg-slate-100 hover:bg-[#ffb81c] text-[#003876] px-5 py-2 rounded-full font-black flex items-center gap-2 transition-all mb-4 text-sm">
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
              <FolderCard title="Resolución / Actas" onClick={() => handleNavigate('comite-actas')} />
              <FolderCard title="Calendario" onClick={() => handleNavigate('comite-calendario')} />
              <FolderCard title="Campañas / Actividades" onClick={() => handleNavigate('comite-campanas')} />
              <FolderCard title="Formularios" onClick={() => handleNavigate('comite-formularios')} />
              <FolderCard title="Estadísticas" onClick={() => handleNavigate('comite-estadisticas')} />
            </div>
          </section>
        )}

        {currentPage === 'comite-estadisticas' && (
          <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 min-h-[600px] animate-in fade-in zoom-in duration-500 w-full">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 border-b pb-8">
              <div>
                <button onClick={() => handleNavigate('comite-paritario')} className="bg-slate-100 hover:bg-[#ffb81c] text-[#003876] px-5 py-2 rounded-full font-black flex items-center gap-2 transition-all mb-4 text-sm">
                  <ChevronLeft size={18} /> VOLVER AL COMITÉ
                </button>
                <h2 className="text-4xl md:text-5xl font-black text-slate-700 tracking-tighter">Estadísticas</h2>
              </div>
            </div>

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
          </section>
        )}

        {currentPage === 'comite-actas' && (
          <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 min-h-[600px] animate-in fade-in zoom-in duration-500 w-full">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 border-b pb-8">
              <div>
                <button onClick={() => handleNavigate('comite-paritario')} className="bg-slate-100 hover:bg-[#ffb81c] text-[#003876] px-5 py-2 rounded-full font-black flex items-center gap-2 transition-all mb-4 text-sm">
                  <ChevronLeft size={18} /> VOLVER AL COMITÉ
                </button>
                <h2 className="text-4xl md:text-5xl font-black text-slate-700 tracking-tighter uppercase italic">Resolución / Actas</h2>
              </div>
            </div>

            <div className="max-w-5xl mx-auto space-y-12">
              <div className="text-center">
                <h3 className="font-bold text-sm uppercase mb-4 text-slate-800">RESOLUCIÓN CONSTITUCIÓN DE COMITE PARITARIO DE HIGIENE Y SEGURIDAD 2024 – 2026</h3>
                <div className="border border-slate-800 p-8 text-left space-y-4 shadow-inner bg-slate-50/50">
                  <a href="https://drive.google.com/file/d/1YmUTYMlmw3o-Tl-0wg-LCaUVNi6i4U1c/view" className="block text-blue-700 font-bold underline hover:text-[#00a19a]">Resolución CPHS</a>
                  <a href="https://drive.google.com/file/d/1ksbCbq_DqwQH8ODAhN2y9fOos6b8xNPX/view" className="block text-blue-700 font-bold underline hover:text-[#00a19a]">Resolución CPHS actualizada</a>
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
          </section>
        )}

        {currentPage === 'comite-calendario' && (
          <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 min-h-[600px] animate-in fade-in zoom-in duration-500 w-full">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 border-b pb-8">
              <div>
                <button onClick={() => handleNavigate('comite-paritario')} className="bg-slate-100 hover:bg-[#ffb81c] text-[#003876] px-5 py-2 rounded-full font-black flex items-center gap-2 transition-all mb-4 text-sm">
                  <ChevronLeft size={18} /> VOLVER AL COMITÉ
                </button>
                <h2 className="text-4xl md:text-5xl font-black text-slate-700 tracking-tighter uppercase italic">Calendario</h2>
              </div>
            </div>

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
          </section>
        )}

        {currentPage === 'comite-formularios' && (
          <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 min-h-[600px] animate-in fade-in zoom-in duration-500 w-full font-sans">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 border-b pb-8">
              <div>
                <button onClick={() => handleNavigate('comite-paritario')} className="bg-slate-100 hover:bg-[#ffb81c] text-[#003876] px-5 py-2 rounded-full font-black flex items-center gap-2 transition-all mb-4 text-sm">
                  <ChevronLeft size={18} /> VOLVER AL COMITÉ
                </button>
                <h2 className="text-4xl md:text-5xl font-black text-slate-700 tracking-tighter uppercase italic">Formularios</h2>
              </div>
            </div>

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
          </section>
        )}

        {currentPage === 'comite-campanas' && (
          <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 min-h-[600px] animate-in fade-in zoom-in duration-500 w-full font-sans">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 border-b pb-8">
              <div>
                <button onClick={() => handleNavigate('comite-paritario')} className="bg-slate-100 hover:bg-[#ffb81c] text-[#003876] px-5 py-2 rounded-full font-black flex items-center gap-2 transition-all mb-4 text-sm">
                  <ChevronLeft size={18} /> VOLVER AL COMITÉ
                </button>
                <h2 className="text-4xl md:text-5xl font-black text-slate-700 tracking-tighter uppercase italic tracking-tighter">Campañas y/o Actividades</h2>
              </div>
            </div>

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
                  <img src={f1} alt="1" className="w-full h-66 object-cover rounded-xl shadow-sm hover:shadow-xl transition-shadow" />
                  <img src={f2} alt="2" className="w-full h-66 object-cover rounded-xl shadow-sm hover:shadow-xl transition-shadow" />
                  <img src={f3} alt="F3" className="w-full h-66 object-cover rounded-xl shadow-sm hover:shadow-xl transition-shadow" />
                  <img src={f4} alt="F4" className="w-full h-66 object-cover rounded-xl shadow-sm hover:shadow-xl transition-shadow" />
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
          </section>
        )}

        {/* =========================================
             VISTA CONCURSO INTERNO
        ========================================= */}
        {currentPage === 'concurso' && (
          <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 min-h-[600px] animate-in fade-in zoom-in duration-500 w-full">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 border-b pb-8">
              <div>
                <button onClick={() => handleNavigate('accesos')} className="bg-slate-100 hover:bg-[#ffb81c] text-[#003876] px-5 py-2 rounded-full font-black flex items-center gap-2 transition-all mb-4 text-sm">
                  <ChevronLeft size={18} /> VOLVER A ACCESOS
                </button>
                <h2 className="text-4xl md:text-5xl font-black text-slate-700">Concurso Interno Hsjm</h2>
              </div>
            </div>
            
            <ConcursoTable titulo="Hospital San José de Melipilla Informa Proceso de Selección Interno para ADMINISTRATIVO(A) DE ESTADÍSTICA" plataforma="Presencial, mediante sobre entregado en oficina 65..." cargo="TÉCNICO EN EQUIPOS MÉDICOS" unidad="Estadística" fechaDesde="27/02/2026" fechaHasta="05/03/2026" resolucionTexto="Resolución N°002119 TÉCNICO EN EQUIPOS MÉDICOS" resolucionLink="https://drive.google.com/file/d/14qK7gi2FCZu8UdrJohYA8bY6jm51SDxs/view" />
            <ConcursoTable titulo="Hospital San José de Melipilla Informa Proceso de Selección Interno para ADMINISTRATIVO(A) DE ESTADÍSTICA" plataforma="Presencial..." cargo="ADMINISTRATIVO(A) DE ESTADÍSTICA" unidad="Estadística" fechaDesde="17/02/2026" fechaHasta="23/02/2026" resolucionTexto="Resolución N°002040 ADMINISTRATIVO(A) DE ESTADÍSTICA" resolucionLink="https://drive.google.com/file/d/1ZyuMJF0CyFHJKmS2tOlYDXpMoG0MGfgi/view" />
            <ConcursoTable titulo="Hospital San José de Melipilla Informa Proceso de Selección Interno para TÉCNICO DE IMAGENOLOGÍA O SIMILAR 4TO TURNO" plataforma="Presencial..." cargo="TÉCNICO DE IMAGENOLOGÍA O SIMILAR 4TO TURNO" unidad="Servicio Imagenología" fechaDesde="05/02/2026" fechaHasta="11/05/2026" resolucionTexto="Resolución N°001564 TÉCNICO DE IMAGENOLOGÍA O SIMILAR 4TO TURNO" resolucionLink="https://drive.google.com/file/d/1cR78_1OjuyRiAZMxvfe61mq5z3sjKUNI/view" />
            <ConcursoTable titulo="Hospital San José de Melipilla Informa Proceso de Selección Interno para JEFE(A) BODEGA ABASTECIMIENTO" plataforma="Presencial..." cargo="JEFE(A) BODEGA ABASTECIMIENTO" unidad="BODEGA ABASTECIMIENTO" fechaDesde="04/02/2026" fechaHasta="10/02/2026" resolucionTexto="Resolución N°001211 JEFE(A) BODEGA ABASTECIMIENTO" resolucionLink="https://drive.google.com/file/d/1lpAV1CHJAep-zJpXV1PcKXafcUuxS-ku/view" />
            <ConcursoTable titulo="Hospital San José de Melipilla Informa Proceso de Selección Interno para JEFE (A) DE LICITACIONES Y CONTRATOS" plataforma="Presencial..." cargo="JEFE (A) DE LICITACIONES Y CONTRATOS" unidad="Licitaciones y Contratos" fechaDesde="02/02/2026" fechaHasta="09/02/2026" resolucionTexto="Resolución N°001211 JEFE (A) DE LICITACIONES Y CONTRATOS" resolucionLink="https://drive.google.com/file/d/19to6_rWluPOnykAmHkSsstPVrO0lwGyh/view" />
            <ConcursoTable titulo="Hospital San José de Melipilla Informa Proceso de Selección Interno para ENCARGADO(A) DE PRAIS" plataforma="Presencial..." cargo="ENCARGADO(A) DE PRAIS" unidad="Servicio PRAIS" fechaDesde="28/01/2026" fechaHasta="03/02/2026" resolucionTexto="Resolución N°001130 ENCARGADO(A) DE PRAIS" resolucionLink="https://drive.google.com/file/d/1Va7Rc-ltX0xMVzY65bCcrCfPzEQPuqbS/view" />
            <ConcursoTable titulo="Hospital San José de Melipilla Informa Proceso de Selección Interno para MATRONA SUPERVISORA..." plataforma="Presencial..." cargo="MATRONA SUPERVISORA SERVICIO DE URGENCIA GINECOOBSTÉTRICA UNIDAD DE PARTOS" unidad="Urgencia Gineco obstétrica y Unidad de Partos" fechaDesde="06/01/2026" fechaHasta="12/01/2026" resolucionTexto="Resolución N°11458 MATRONA SUPERVISORA..." resolucionLink="https://drive.google.com/file/d/1ozesc8nBvwu6PvCYRyzfrsCn19zNZuIf/view?usp=drive_link" />
            <ConcursoTable titulo="Hospital San José de Melipilla Informa Proceso de Selección Interno para PROFESIONAL SUPERVISOR(A) UNIDAD GCE PENSIONADO" plataforma="Presencial..." cargo="PROFESIONAL SUPERVISOR(A) UNIDAD GCE PENSIONADO" unidad="GCE Pensionado" fechaDesde="12/11/2025" fechaHasta="18/11/2025" resolucionTexto="Resolución N°11453 PENSIONADO" resolucionLink="http://10.5.131.63/intranet/wp-content/uploads/2025/12/11453-PENSIONADO.pdf" />
            <ConcursoTable titulo="Hospital San José de Melipilla Informa Proceso de Selección Interno para PROFESIONAL GRADO 15°..." plataforma="Presencial..." cargo="PROFESIONAL GRADO 15°..." unidad="Señaladas en base" fechaDesde="14/11/2025" fechaHasta="21/11/2025" resolucionTexto="Resolución N°11455 PROFESIONALES" resolucionLink="http://10.5.131.63/intranet/wp-content/uploads/2025/12/11455-PROFESIONALES.pdf" />
            <ConcursoTable titulo="Hospital San José de Melipilla Informa Proceso de Selección Interno para TÉCNICOS GRADO 22°..." plataforma="Presencial..." cargo="TÉCNICOS GRADO 22°..." unidad="Señaladas en base" fechaDesde="14/11/2025" fechaHasta="21/11/2025" resolucionTexto="Resolución N°11458 TÉCNICOS" resolucionLink="http://10.5.131.63/intranet/wp-content/uploads/2025/12/11458-TECNICOS.pdf" />
          </section>
        )}

        

      </main>

      {/* FOOTER */}
      <footer className="bg-[#003e44] text-white pt-16 pb-8 mt-auto shadow-inner relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 flex flex-col items-center justify-center">
          <div className="flex flex-col items-center space-y-6">
            <h5 className="font-black border-b-4 border-[#ffb81c] pb-2 mb-2 text-lg uppercase text-[#ffb81c] text-center w-fit">Contacto</h5>
            <div className="space-y-4 text-sm font-black text-center">
              <p className="flex items-center justify-center gap-3 uppercase tracking-wider"><MapPin size={20} className="text-[#ffb81c]" /> O'HIGGINS 551, MELIPILLA</p>
              <p className="flex items-center justify-center gap-3 uppercase tracking-wider">📞 CENTRAL: (2) 2574 5555</p>
            </div>
            <div className="flex justify-center gap-4 pt-2">
              <SocialIcon icon={<Instagram size={20} />} link="https://www.instagram.com/hospitaldemelipilla/" />
              <SocialIcon icon={<Facebook size={20} />} link="https://www.facebook.com/hospitaldemelipilla/" />
              <SocialIcon icon={<Youtube size={20} />} link="https://www.youtube.com/@hosp_melipilla" />
              <SocialIcon icon={<Twitter size={20} />} link="https://x.com/hosp_melipilla" />
            </div>
          </div>
        </div>
        <div className="absolute bottom-4 right-8 flex items-center gap-2 text-white/40 text-[10px] font-bold uppercase tracking-widest pointer-events-none">
          <span>Hecho con</span>
          <span className="text-red-500 animate-pulse text-sm">❤️</span>
          <span>por departamento TI</span>
        </div>
      </footer>
    </div>
  );
}

// ==========================================
// COMPONENTES AUXILIARES
// ==========================================

function QuickCard({ icon, title, desc, color }) {
  return (
    <div className={`bg-white p-10 rounded-[2.5rem] shadow-2xl transition-all border-t-[12px] ${color} text-center hover:-translate-y-4 group min-h-[320px] flex flex-col items-center justify-center`}>
      <div className="flex justify-center mb-6 text-[#003876] group-hover:scale-125 transition-transform">{React.cloneElement(icon, { size: 56 })}</div>
      <h4 className="text-3xl font-black text-[#003876] uppercase mb-4 leading-tight">{title}</h4>
      <p className="text-lg text-slate-500 font-bold leading-tight">{desc}</p>
    </div>
  );
}

function ClinicalSystemCard({ image, title, desc, link, onClick }) {
  // Creamos una función interna para manejar el clic
  const manejarClic = () => {
    // 1. Si pasamos un onClick (como el de Imagenología), lo ejecuta y listo
    if (onClick) {
      onClick();
      return;
    }
    
    // 2. Si hay un link real (que no sea # ni esté vacío), lo abre en otra pestaña
    if (link && link !== "#") {
      window.open(link, '_blank');
    }
    // 3. Si el link es "#" o no hay nada, no hace nada (evita la página en blanco)
  };

  return (
    <div 
      onClick={manejarClic}
      className="bg-white p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col items-center group cursor-pointer hover:-translate-y-2 border border-slate-50 min-h-[220px]"
    >
      <h4 className="text-blue-600 font-bold text-lg mb-4 text-center group-hover:scale-110 transition-transform tracking-tighter italic uppercase">
        {title}
      </h4>
      
      <div className="w-32 h-32 flex items-center justify-center mb-2 grayscale group-hover:grayscale-0 transition-all duration-300">
        <img src={image} alt={title} className="w-full h-full object-contain" />
      </div>
      
      <div className="w-24 h-1.5 bg-[#00a19a] rounded-full mb-4 group-hover:w-32 transition-all"></div>
      
      <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity text-center">
        {desc}
      </p>
    </div>
  );
}

function ConcursoTable({ titulo, plataforma, cargo, unidad, fechaDesde, fechaHasta, resolucionTexto, resolucionLink }) {
  return (
    <div className="mb-12 animate-in fade-in duration-500">
      <div className="bg-white border border-slate-300 rounded-lg shadow-sm overflow-hidden mb-4 hover:shadow-md transition-shadow">
        <div className="p-4 border-b border-slate-300 bg-slate-50">
          <h3 className="text-base font-bold text-[#003876]">{titulo}</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600 border-collapse">
            <thead className="text-slate-500 font-semibold border-b border-slate-300 bg-white">
              <tr>
                <th className="p-4 border-r border-slate-200 font-medium whitespace-nowrap">Tipo de <br/> concurso</th>
                <th className="p-4 border-r border-slate-200 font-medium">Plataforma</th>
                <th className="p-4 border-r border-slate-200 font-medium">Cargo</th>
                <th className="p-4 border-r border-slate-200 font-medium">Unidad</th>
                <th className="p-4 font-medium whitespace-nowrap">Fecha de <br/> Difusión</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="p-4 border-r border-slate-200 align-top whitespace-nowrap">Concurso <br/> Interno</td>
                <td className="p-4 border-r border-slate-200 align-top max-w-md">{plataforma}</td>
                <td className="p-4 border-r border-slate-200 align-top font-bold text-[#003876]">{cargo}</td>
                <td className="p-4 border-r border-slate-200 align-top">{unidad}</td>
                <td className="p-4 align-top whitespace-nowrap">
                  <span className="text-slate-400 font-bold text-xs uppercase">Desde</span> <br/> {fechaDesde}
                  <br/><br/>
                  <span className="text-slate-400 font-bold text-xs uppercase">Hasta</span> <br/> {fechaHasta}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="pl-4">
        <a href={resolucionLink || "#"} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[#00a19a] hover:text-[#003876] font-bold underline transition-colors w-fit">
          <FileText size={18} />
          {resolucionTexto}
        </a>
      </div>
    </div>
  );
}

function BienestarCard({ title, icon, onClick }) {
  return (
    <div 
      onClick={onClick}
      className="flex flex-col items-center justify-center p-10 bg-white border-2 border-slate-100 rounded-3xl hover:border-[#003876] hover:shadow-xl transition-all cursor-pointer group border-b-8 border-b-[#003876]"
    >
      <div className="text-slate-400 mb-6 group-hover:text-[#00a19a] group-hover:-translate-y-2 transition-all duration-300">
        {icon}
      </div>
      <h4 className="text-[#003876] font-black text-xl tracking-wide">{title}</h4>
    </div>
  );
}

function BienestarLink({ text, link, isTitle }) {
  return (
    <li className="mb-2">
      <a href={link || "#"} target="_blank" rel="noreferrer" className="flex items-center gap-3 group w-fit">
        {isTitle ? (
          <span className="text-slate-800 font-bold underline underline-offset-4 decoration-2 hover:text-[#00a19a] transition-colors text-lg uppercase tracking-wide">
            {text}
          </span>
        ) : (
          <>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400 group-hover:bg-[#00a19a] transition-colors"></span>
            <span className="text-slate-600 font-medium underline decoration-slate-300 group-hover:decoration-[#00a19a] group-hover:text-[#00a19a] underline-offset-4 transition-all">
              {text}
            </span>
          </>
        )}
      </a>
    </li>
  );
}

function PlanoCategory({ title, children }) {
  return (
    <div className="mb-10 animate-in fade-in duration-500">
      <h3 className="text-slate-500 font-normal text-lg mb-6">{title}</h3>
      <div className="flex flex-col gap-4">
        {children}
      </div>
    </div>
  );
}

function PlanoLink({ text, link }) {
  return (
    <a href={link || "#"} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-slate-700 hover:text-[#00a19a] transition-all group w-fit">
      <span className="font-medium underline decoration-slate-400 group-hover:decoration-[#00a19a] underline-offset-4">{text}</span>
    </a>
  );
}

function FooterSection({ title, items }) {
  return (
    <div className="flex flex-col items-center md:items-start">
      <h5 className="font-black border-b-4 border-white/10 pb-2 mb-8 text-lg uppercase">{title}</h5>
      <ul className="space-y-4 text-[13px] uppercase font-black">
        {items.map(item => (
          <li key={item} className="hover:text-[#ffb81c] cursor-pointer flex items-center gap-3">
            <span className="w-2 h-2 bg-[#ffb81c] rounded-full"></span> {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialIcon({ icon, link }) {
  return (
    <a href={link} target="_blank" rel="noreferrer" className="bg-white/10 p-3 rounded-full hover:bg-[#ffb81c] hover:text-[#003e44] transition-all duration-300 shadow-lg active:scale-95">
      {icon}
    </a>
  );
}

function ProtocoloLink({ text, link }) {
  return (
    <li className="list-none mb-4">
      <a 
        href={link || "#"} 
        target="_blank" 
        rel="noreferrer" 
        className="text-blue-700 font-bold underline underline-offset-4 decoration-1 hover:text-[#00a19a] text-sm md:text-lg uppercase tracking-wide block w-fit transition-colors"
      >
        {text}
      </a>
    </li>
  );
}

function TechnicalLink({ icon, logo, image, title, link }) {
  return (
    <div 
      onClick={() => window.open(link, '_blank')} 
      className="bg-white border-b-8 border-[#003876] p-8 rounded-3xl shadow-lg hover:-translate-y-3 transition-all text-center flex flex-col items-center group cursor-pointer border border-slate-100 h-full justify-center"
    >
      <div className="mb-4 h-20 flex items-center justify-center">
        {image ? (
          <img src={image} alt={title} className="max-h-full max-w-full object-contain transition-transform group-hover:scale-110" />
        ) : (
          <div className="text-5xl">{logo ? logo : icon}</div>
        )}
      </div>
      <span className="text-[12px] font-black text-[#003876] uppercase leading-tight tracking-tight">
        {title}
      </span>
    </div>
  );
}

function FolderCard({ title, onClick }) {
  return (
    <div 
      onClick={onClick}
      className="flex flex-col items-center justify-center p-6 bg-slate-50 border-2 border-transparent hover:border-[#ffb81c] hover:bg-white rounded-3xl transition-all cursor-pointer group shadow-sm hover:shadow-xl"
    >
      <div className="text-orange-400 mb-4 group-hover:scale-110 transition-transform">
        <FolderOpen size={64} strokeWidth={1.5} />
      </div>
      <h4 className="text-[#003876] font-bold text-sm text-center uppercase tracking-tighter leading-tight">
        {title}
      </h4>
    </div>
  );
}

function MonthCell({ name, link }) {
  return (
    <td className="p-4 border-r border-slate-300 hover:bg-slate-50 transition-colors cursor-pointer group last:border-r-0">
      <a href={link} className="flex items-center justify-between font-bold text-slate-700 group-hover:text-[#00a19a]">
        {name}
        <FileText size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#00a19a]" />
      </a>
    </td>
  );
}

function CalendarRow({ name, date }) {
  return (
    <tr className="border-b border-slate-200 hover:bg-blue-50/30 transition-colors">
      <td className="p-4 border-r border-slate-200 font-black text-[#003876] text-center uppercase tracking-tight">
        {name}
      </td>
      <td className="p-4 text-center font-bold text-slate-600">
        {date}
      </td>
    </tr>
  );
}

function FormLinkCell({ name, link, isLast }) {
  return (
    <div className={`p-4 ${!isLast ? 'border-b border-slate-800' : ''} hover:bg-slate-50 transition-colors`}>
      <a 
        href={link} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-blue-700 font-bold underline hover:text-blue-900 block"
      >
        {name}
      </a>
    </div>
  );
}

function AficheLink({ text, link }) {
  return (
    <div className="group">
      <a 
        href={link} 
        target="_blank" 
        rel="noreferrer" 
        className="text-slate-800 font-bold underline decoration-slate-800 hover:text-[#00a19a] hover:decoration-[#00a19a] transition-all text-sm block w-fit"
      >
        {text}
      </a>
    </div>
  );
}

export default App;