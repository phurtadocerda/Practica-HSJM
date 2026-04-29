// src/views/Portal.jsx
import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import SystemGrid from '../components/SystemGrid';
import SystemCard from '../components/SystemCard';

// Importa las imágenes que usa el Portal
import logoServicio from '../assets/logo.png'; 
import logoMedicap from '../assets/Medicap.jpg';
import logosynaspe from '../assets/Synapse.png';
import logomaitenes from '../assets/Maitenes.png';
import logofleming from '../assets/Fleming.png';
import logohospitalmeli from '../assets/Hospitalmeli.png';
import logotalagante from '../assets/Talagante.png';

const Portal = () => {
  // Este estado ahora vive solo aquí, donde pertenece
  const [portalView, setPortalView] = useState('main');

  return (
    <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 min-h-[600px] animate-in fade-in zoom-in duration-500 w-full">
      {portalView === 'main' ? (
        <>
          <PageHeader
            title="Portal Digital Clínico"
            subtitle="Registro Clínico Electrónico de Melipilla"
            badge="Red Local Hospital Melipilla"
            badgeIcon={MapPin}
            showBackButton
            backPath="/inicio"
          />
          
          <SystemGrid>
            <SystemCard image={logoServicio} title="Gis" desc="" link="https://melipilla.experthis.cl/produccion/login.php" />
            <SystemCard image={logoServicio} title="Sistemas de Imagenología" desc="" onClick={() => setPortalView('imagen')} />
            <SystemCard image={logoServicio} title="Libro de Pabellón" desc="" link="http://10.5.131.63/hospital_2/" />
            <SystemCard image={logoServicio} title="Softmed Biopsias" desc="" link="https://atrys.softmed.cl/#/login" />
            <SystemCard image={logoServicio} title="Exámenes Laboratorio" desc="" link="https://www.examenesoccidente.cl/Home/Login?ReturnUrl=%2fclinicos" />
            <SystemCard image={logoServicio} title="TaoNet" desc="" link="http://10.6.4.45:8080/tao/servlet/KYNTAOController" />
            <SystemCard image={logoServicio} title="TRAKCARE" desc="" link="http://10.8.163.40/trakcare/" />
            <SystemCard image={logoServicio} title="APA" desc="" link="http://10.5.131.63/sistema_apa/login/index" />
            <SystemCard image={logoServicio} title="Tickets Soporte" desc="" link="https://nuevohospitaldemelipilla.cl/sistema_tickets/" />
          </SystemGrid>
        </>
      ) : (
        <>
          <PageHeader
            title="Sistemas Imagenología"
            subtitle="Hospital San José de Melipilla"
            showBackButton
            backLabel="VOLVER AL PORTAL"
            onBack={() => setPortalView('main')}
          />

          <SystemGrid>
            <SystemCard image={logoMedicap} title="MediCap" desc="Visor de Imágenes" link="https://cloud1.medicap.cl/nube/login" />
            <SystemCard image={logosynaspe} title="Synapse" desc="Hospital San Juan de Dios" link="https://sjdpacs.synapsetimed.cl/SynapseSignOn/sts/login?signin=a0841457449580795e2ba3476955447e" />
            <SystemCard image={logomaitenes} title="Clínica Maitenes" desc="ACHS Salud" link="https://186.103.154.101:8080/portal/WebLogin.aspx?ReturnUrl=%2fportal%2f" />
            <SystemCard image={logofleming} title="Centro Fleming" desc="Centro Radiológico" link="https://convenios.crfleming.cl/index.php" />
            <SystemCard image={logohospitalmeli} title="Estudios HSJM" desc="Informes de Imágenes" link="http://10.5.131.63/procedimiento/Login/index" />
            <SystemCard image={logotalagante} title="H. Talagante" desc="Imágenes Puerta Abierta" link="http://10.5.0.52:8085/login.html" />
          </SystemGrid>
        </>
      )}
    </section>
  );
};

export default Portal;