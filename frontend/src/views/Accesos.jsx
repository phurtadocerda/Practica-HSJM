// src/views/Accesos.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import SystemGrid from '../components/SystemGrid';
import SystemCard from '../components/SystemCard';

// Importa todas las imágenes específicas de accesos
import Concurso from '../assets/ConcursoInterno.png'; 
import Bienestar from '../assets/bien.png'; 
import imagen from '../assets/imagenologia.png';
import hola from '../assets/comite.jpg';  
import mono from '../assets/viruela.jpg';  
import vida from '../assets/calidad.png';
import informacion from '../assets/seguridad.jpg';
import Salud from '../assets/tuberculosis.png';
import Salud1 from '../assets/BPSO.png';
import midas from '../assets/logomidas.png';
import ser from '../assets/servicio.png';
import rea from '../assets/2023.png';
import Laboratorio from '../assets/lab.png';
import SOGA from '../assets/soga.png';
import Innovacion from '../assets/innova.png';
import paciente from '../assets/segpaciente.png';
import Soporte from '../assets/soporte.png';
import IAAS from '../assets/iaas.png';
import seremi from '../assets/Seremienlinea.jpeg';
import svi from '../assets/SVI.png';
import logoServicio from '../assets/logo.png'; 

const Accesos = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 min-h-[600px] animate-in fade-in zoom-in duration-500 w-full">
      <PageHeader
        title="Accesos"
        badge="Accesos Seguros"
        badgeIcon={Lock}
      />
      
      <SystemGrid>
        <SystemCard image={Concurso} title="Concurso Interno" desc="" onClick={() => navigate('/concurso')} />
        <SystemCard image={Bienestar} title="Bienestar" desc="" onClick={() => navigate('/bienestar')} />
        <SystemCard image={imagen} title="Protocolos y ordenes-Imagenologia" desc="" onClick={() => navigate('/protocolos-ordenes')} />
        <SystemCard image={hola} title="Comite Paritario" desc="" onClick={() => navigate('/comite-paritario')} />
        <SystemCard image={mono} title="Viruela del mono" desc="" onClick={() => navigate('/viruela-del-mono')} />
        <SystemCard image={vida} title="Calidad De Vida" desc="" onClick={() => navigate('/calidad-de-vida')} />
        <SystemCard image={informacion} title="Seguridad de la Información" desc="" onClick={() => navigate('/ciberseguridad')} />
        <SystemCard image={Salud} title="Tuberculosis" desc="" onClick={() => navigate('/tuberculosis')} />
        <SystemCard image={Salud1} title="Programa BPSO" desc="" onClick={() => navigate('/bpso')} />
        <SystemCard image={midas} title="Midas" desc="" onClick={() => navigate('/midas')} />
        <SystemCard image={ser} title="Orden Reparacion Equipos Medicos" desc="" link="http://10.5.130.24/ticketequipos/" />
        <SystemCard image={Salud} title="Protocolo Vigilancia" desc="" onClick={() => navigate('/protocolo-vigilancia')} />
        <SystemCard image={rea} title="Reacreditación 2023" desc="" onClick={() => navigate('/reacreditacion')} />
        <SystemCard image={Laboratorio} title="Laboratorio" desc="" onClick={() => navigate('/laboratorio')} />
        <SystemCard image={SOGA} title="Prevencion de Riegos" desc="" onClick={() => navigate('/prevencion')} />
        <SystemCard image={Innovacion} title="Innovacion" desc="" onClick={() => navigate('/innovacion')} />
        <SystemCard image={paciente} title="Semana de seguridad del paciente" desc="" onClick={() => navigate('/seguridad-paciente')} />
        <SystemCard image={logoServicio} title="Portal Sistemas de Declaraciones" desc="" link="https://www.declaracionjurada.cl/dip/index.html" />
        <SystemCard image={seremi} title="Seremi en linea" desc="" link="https://seremienlinea.minsal.cl/asdigital/" />
        <SystemCard image={svi} title="Sistema Vigilancia Integrado" desc="" link="https://www.ispch.gob.cl/anamed/farmacovigilancia/vacunas/sistema-de-vigilancia-integrada-svi-esavi/" />
        <SystemCard image={Soporte} title="Ticket Informatica" desc="" link="http://10.5.130.24/ticket/" />
        <SystemCard image={IAAS} title="IAAS" desc="" onClick={() => navigate('/iaas')} />
      </SystemGrid>
    </section>
  );
};

export default Accesos;