import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; 
import { 
  Home, FileText, Phone, Map, LogOut, ChevronDown, Menu, X, 
  ShieldCheck, History, Pill, Calendar, UserCircle, FolderTree, 
  BarChart3, Microscope, Activity, Scale, LayoutList, ClipboardCheck, 
  Heart, FileWarning, HelpCircle, Newspaper, AlertTriangle 
} from 'lucide-react';
import logoHospital from '../assets/logo.png';
const Navbar = ({ onLogout, userName }) => {
  const navigate = useNavigate(); // Hook para navegar
  const location = useLocation(); // Hook para saber en qué página estamos (reemplaza a currentPage)
  
  const [isBibliotecaOpen, setIsBibliotecaOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showDocsExtra, setShowDocsExtra] = useState(false);
  const [isMobileDocsOpen, setIsMobileDocsOpen] = useState(false);

  const menuBiblioteca = [
    { name: "Protocolos de Calidad y Acreditación Vigentes", route: "calidad-vigente", icon: <ShieldCheck size={16}/> },
    { name: "Versiones Anteriores Acreditación 2020-2023", route: "versiones-anteriores", icon: <History size={16}/> },
    { name: "Arsenal Farmacológico", route: "arsenal", icon: <Pill size={16}/> },
    { name: "Manuales Agendamiento GIS", route: "agendamiento-gis", icon: <Calendar size={16}/> },
    { name: "Protocolo de Atención al Usuario", route: "atencion-usuario", icon: <UserCircle size={16}/> },
    { 
      name: "Documento de la información", 
      isSub: true,
      icon: <FolderTree size={16}/>,
      items: [
        { name: "Reglamento Interno Hsjm", route: "reglamento-interno" },
        { name: "Enfermedades Transmisibles", route: "enfermedades-transmisibles" },
        { name: "Accidentes de Trabajo", route: "accidentes-trabajo" },
        { name: "Reunion Clínica Urgencia", route: "reunion-urgencia" },
        { name: "Manual de Agendamiento", route: "manual-agendamiento" },
        { name: "Documentos PDF", route: "documentos-pdf" },
        { name: "Reglamento Interno y Protocolos", route: "reglamento-protocolos" },
        { name: "Gestión de Proyectos", route: "gestion-proyectos" },
        { name: "Reglamento Interno de Higiene, Seguridad y Medioambiente", route: "reglamento-higiene" },
        { name: "Manuales Agendamiento GIS", route: "manuales-gis" },
        { name: "Resolución nuevo organigrama institucional", route: "organigrama" }
      ] 
    },
    { name: "Producción y Estadísticas", route: "produccion-estadistica", icon: <BarChart3 size={16}/> },
    { name: "GRD-Informes", route: "grd", icon: <Microscope size={16}/> },
    { name: "Especialidad Odontología", route: "odontologia", icon: <Activity size={16}/> },
    { name: "Documentos de Contingencia", route: "contingencia", icon: <AlertTriangle size={16}/> },
    { name: "Resoluciones", route: "resoluciones", icon: <Scale size={16}/> },
    { name: "Manual de organización", route: "organizacion", icon: <LayoutList size={16}/> },
    { name: "Plan Anual Participación Ciudadana", route: "participacion", icon: <ClipboardCheck size={16}/> },
    { name: "Plan Anual año 2024 CCU", route: "ccu-2024", icon: <Calendar size={16}/> },
    { name: "Procuramiento", route: "procuramiento", icon: <Heart size={16}/> },
    { name: "Código de Ética", route: "etica", icon: <Scale size={16}/> },
    { name: "Formulario Evento Adverso", route: "evento-adverso", icon: <FileWarning size={16}/> },
    { 
      name: "Formulario Notificación de Agresiones", 
      route: "agresiones", 
      icon: <HelpCircle size={16}/>,
      external: true, 
      link: "http://10.5.131.63/faf/" 
    },
  ];

  // NUEVA FUNCIÓN DE NAVEGACIÓN
  const handleNavegar = (e, opcion) => {
    if (e) { e.preventDefault(); e.stopPropagation(); }
    if (opcion.external) {
      window.open(opcion.link, '_blank');
    } else {
      // Usamos el navigate de React Router
      navigate(`/${opcion.route || opcion}`);
    }
    setIsMobileMenuOpen(false);
    setIsBibliotecaOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full z-[1000] font-sans shadow-md">
      <div className="bg-white px-3 md:px-6 h-20 flex items-center justify-between border-b">
        <div className="flex items-center gap-2 md:gap-4 shrink-0 overflow-hidden">
          <img 
            src={logoHospital} 
            alt="Logo" 
            className="h-8 xs:h-10 md:h-14 w-auto object-contain cursor-pointer transition-all" 
            onClick={() => navigate('/inicio')} // <-- Cambio aquí
          />
          <div className="flex flex-col min-w-0">
            <h1 className="text-[#003876] font-black text-[10px] xs:text-xs sm:text-sm md:text-xl leading-none uppercase italic truncate">
              Hospital Melipilla
            </h1>
            <p className="text-[#00a19a] text-[7px] xs:text-[8px] sm:text-[9px] md:text-[10px] font-bold tracking-widest uppercase truncate">
              Intranet Hsjm
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 md:gap-6">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-[10px] uppercase font-bold text-slate-400 leading-none">Bienvenido(a)</span>
            <span className="text-sm font-black text-[#003876] leading-none">Hola, <span className="text-[#00a19a] uppercase">{userName || 'Cristian'}</span></span>
          </div>

          <button 
            onClick={onLogout} 
            className="bg-[#f85149] hover:bg-red-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-all shadow-md active:scale-95"
          >
            <LogOut size={18} /> 
            <span className="hidden md:inline font-black text-xs uppercase">Salir</span>
          </button>

          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden bg-slate-100 text-[#003876] p-2.5 rounded-full">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <div className="hidden lg:block bg-[#003876] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex items-center justify-center gap-2 xl:gap-8 py-3">
            {/* COMPROBACIÓN DE RUTA ACTUAL CON LOCATION */}
            <NavItem icon={<Home size={22}/>} text="INICIO" active={location.pathname === '/inicio'} onClick={() => navigate('/inicio')} />
            
            <li 
              className="relative"
              onMouseEnter={() => setIsBibliotecaOpen(true)}
              onMouseLeave={() => {setIsBibliotecaOpen(false); setShowDocsExtra(false);}}
            >
              <div className="flex items-center gap-3 px-5 py-2 rounded-full cursor-pointer text-white hover:bg-white/10 font-black text-sm xl:text-lg uppercase transition-all tracking-wide">
                <FileText size={22}/> <span>Biblioteca</span> <ChevronDown size={16} />
              </div>

              {isBibliotecaOpen && (
                <div className="absolute top-full left-0 w-[420px] bg-white shadow-2xl rounded-b-2xl py-3 border-t-4 border-[#ffb81c] max-h-[80vh] overflow-y-auto">
                  {menuBiblioteca.map((op, i) => (
                    <div key={i}>
                      {!op.isSub ? (
                        <button onClick={(e) => handleNavegar(e, op)} className="w-full text-left px-6 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50 hover:text-[#003876] flex items-center gap-3">
                          <span className="text-[#00a19a]">{op.icon}</span> {op.name}
                        </button>
                      ) : (
                        <div className="bg-slate-50 my-1">
                          <button onClick={() => setShowDocsExtra(!showDocsExtra)} className="w-full text-left px-6 py-3 text-sm font-black text-[#003876] flex justify-between items-center uppercase">
                            <span className="flex items-center gap-3">{op.icon} {op.name}</span>
                            <ChevronDown size={14} className={showDocsExtra ? 'rotate-180' : ''}/>
                          </button>
                          {showDocsExtra && (
                            <div className="px-10 pb-2 flex flex-col">
                              {op.items.map((sub, si) => (
                                <button key={si} onClick={() => navigate(`/${sub.route}`)} className="text-left py-1.5 text-xs text-slate-500 hover:text-[#00a19a] font-bold">• {sub.name}</button>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </li>

            <NavItem icon={<UserCircle size={22}/>} text="AUTOCONSULTA" onClick={() => window.open('http://10.8.64.31/autoconsulta', '_blank')} />
            <NavItem icon={<Phone size={22}/>} text="ANEXOS" active={location.pathname === '/anexos'} onClick={() => navigate('/anexos')} />
            <NavItem icon={<Map size={22}/>} text="PLANOS" active={location.pathname === '/planos'} onClick={() => navigate('/planos')} />
          </ul>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#003876] fixed inset-0 top-20 z-50 overflow-y-auto animate-in fade-in zoom-in duration-300">
          <div className="p-4 space-y-2">
            <MobileNavItem icon={<Home size={24}/>} text="INICIO" onClick={() => handleNavegar(null, 'inicio')} />
            
            <div className="bg-white/5 rounded-2xl overflow-hidden">
              <button onClick={() => setIsBibliotecaOpen(!isBibliotecaOpen)} className="w-full flex justify-between items-center p-5 text-white font-black uppercase text-base">
                <span className="flex items-center gap-4"><FileText size={24}/> BIBLIOTECA</span>
                <ChevronDown size={24} className={isBibliotecaOpen ? 'rotate-180' : ''} />
              </button>
              {isBibliotecaOpen && (
                <div className="bg-black/20">
                  {menuBiblioteca.map((op, i) => (
                    <div key={i}>
                      {!op.isSub ? (
                        <button onClick={(e) => handleNavegar(e, op)} className="w-full text-left p-4 pl-14 text-white/80 text-sm font-bold border-b border-white/5">
                          {op.name}
                        </button>
                      ) : (
                        <div className="bg-black/10">
                          <button 
                            onClick={() => setIsMobileDocsOpen(!isMobileDocsOpen)}
                            className="w-full flex justify-between items-center p-4 pl-10 text-[#ffb81c] font-black text-sm uppercase"
                          >
                            <span className="flex items-center gap-3">{op.icon} {op.name}</span>
                            <ChevronDown size={18} className={isMobileDocsOpen ? 'rotate-180' : ''} />
                          </button>
                          
                          {isMobileDocsOpen && (
                            <div className="pl-6 border-l-2 border-[#ffb81c]/30 pb-2">
                              {op.items.map((sub, si) => (
                                <button key={si} onClick={() => navigate(`/${sub.route}`)} className="w-full text-left p-3 pl-8 text-white/60 text-xs font-bold uppercase">
                                  - {sub.name}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <MobileNavItem icon={<UserCircle size={24}/>} text="AUTOCONSULTA" onClick={() => window.open('http://10.8.64.31/autoconsulta', '_blank')} />
            <MobileNavItem icon={<Phone size={24}/>} text="ANEXOS" onClick={() => handleNavegar(null, 'anexos')} />
            <MobileNavItem icon={<Map size={24}/>} text="PLANOS" onClick={() => handleNavegar(null, 'planos')} />
          </div>
        </div>
      )}
    </nav>
  );
};

const NavItem = ({ icon, text, active, onClick }) => (
  <li onClick={onClick} className={`
    flex items-center gap-2 px-4 xl:px-6 py-2 rounded-full cursor-pointer transition-all font-black uppercase tracking-wide
    text-sm xl:text-lg 
    ${active ? 'bg-white text-[#003876] shadow-lg scale-105' : 'text-white hover:bg-white/10 hover:scale-105'}
  `}>
    {icon} <span>{text}</span>
  </li>
);

const MobileNavItem = ({ icon, text, onClick }) => (
  <button onClick={onClick} className="flex items-center gap-4 w-full p-5 text-white font-black uppercase text-base hover:bg-white/10 rounded-2xl transition-all border border-white/5">
    {icon} {text}
  </button>
);

export default Navbar;