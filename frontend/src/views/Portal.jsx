// src/views/Portal.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, MapPin } from 'lucide-react';
import ClinicalSystemCard from '../components/ClinicalSystemCard';

// Importa las imágenes que usa el Portal
import logoServicio from '../assets/logo.png'; 
import logoMedicap from '../assets/Medicap.jpg';
import logosynaspe from '../assets/Synapse.png';
import logomaitenes from '../assets/Maitenes.png';
import logofleming from '../assets/Fleming.png';
import logohospitalmeli from '../assets/Hospitalmeli.png';
import logotalagante from '../assets/Talagante.png';

const Portal = () => {
  const navigate = useNavigate();
  // Este estado ahora vive solo aquí, donde pertenece
  const [portalView, setPortalView] = useState('main');

  return (
    <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 min-h-[600px] animate-in fade-in zoom-in duration-500 w-full">
      {portalView === 'main' ? (
        <>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12 border-b pb-8">
            <div>
              <button onClick={() => navigate('/inicio')} className="bg-slate-100 hover:bg-[#ffb81c] text-[#003876] px-5 py-2 rounded-full font-black flex items-center gap-2 transition-all mb-4 text-sm shadow-sm border">
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
  );
};

export default Portal;