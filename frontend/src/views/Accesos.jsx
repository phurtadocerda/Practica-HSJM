// src/views/Accesos.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Lock } from 'lucide-react';
import ClinicalSystemCard from '../components/ClinicalSystemCard';

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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12 border-b pb-8">
        <div>
          <button onClick={() => navigate('/inicio')} className="bg-slate-100 hover:bg-[#ffb81c] text-[#003876] px-5 py-2 rounded-full font-black flex items-center gap-2 transition-all mb-4 text-sm">
            <ChevronLeft size={18} /> VOLVER AL INICIO
          </button>
          <h2 className="text-4xl md:text-5xl font-black text-[#003876] uppercase italic tracking-tighter leading-none">Accesos</h2>
        </div>
        <div className="flex items-center gap-2 text-slate-400 bg-slate-50 px-4 py-2 rounded-full text-xs font-bold">
          <Lock size={16} /> Accesos Seguros
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        <ClinicalSystemCard image={Concurso} title="Concurso Interno" desc="" onClick={() => navigate('/concurso')} />
        <ClinicalSystemCard image={Bienestar} title="Bienestar" desc="" onClick={() => navigate('/bienestar')} />
        <ClinicalSystemCard image={imagen} title="Protocolos y ordenes-Imagenologia" desc="" onClick={() => navigate('/protocolos-ordenes')} />
        <ClinicalSystemCard image={hola} title="Comite Paritario" desc="" onClick={() => navigate('/comite-paritario')} />
        <ClinicalSystemCard image={mono} title="Viruela del mono" desc="" onClick={() => navigate('/viruela-del-mono')} />
        <ClinicalSystemCard image={vida} title="Calidad De Vida" desc="" onClick={() => navigate('/calidad-de-vida')} />
        <ClinicalSystemCard image={informacion} title="Seguridad de la Información" desc="" onClick={() => navigate('/ciberseguridad')} />
        <ClinicalSystemCard image={Salud} title="Tuberculosis" desc="" onClick={() => navigate('/tuberculosis')} />
        <ClinicalSystemCard image={Salud1} title="Programa BPSO" desc="" onClick={() => navigate('/bpso')} />
        <ClinicalSystemCard image={midas} title="Midas" desc="" onClick={() => navigate('/midas')} />
        <ClinicalSystemCard image={ser} title="Orden Reparacion Equipos Medicos" desc="" link="http://10.5.130.24/ticketequipos/" />
        <ClinicalSystemCard image={Salud} title="Protocolo Vigilancia" desc="" onClick={() => navigate('/protocolo-vigilancia')} />
        <ClinicalSystemCard image={rea} title="Reacreditación 2023" desc="" onClick={() => navigate('/reacreditacion')} />
        <ClinicalSystemCard image={Laboratorio} title="Laboratorio" desc="" onClick={() => navigate('/laboratorio')} />
        <ClinicalSystemCard image={SOGA} title="Prevencion de Riegos" desc="" onClick={() => navigate('/prevencion')} />
        <ClinicalSystemCard image={Innovacion} title="Innovacion" desc="" onClick={() => navigate('/innovacion')} />
        <ClinicalSystemCard image={paciente} title="Semana de seguridad del paciente" desc="" onClick={() => navigate('/seguridad-paciente')} />
        <ClinicalSystemCard image={logoServicio} title="Portal Sistemas de Declaraciones" desc="" link="https://www.declaracionjurada.cl/dip/index.html" />
        <ClinicalSystemCard image={seremi} title="Seremi en linea" desc="" link="https://seremienlinea.minsal.cl/asdigital/" />
        <ClinicalSystemCard image={svi} title="Sistema Vigilancia Integrado" desc="" link="https://www.ispch.gob.cl/anamed/farmacovigilancia/vacunas/sistema-de-vigilancia-integrada-svi-esavi/" />
        <ClinicalSystemCard image={Soporte} title="Ticket Informatica" desc="" link="http://10.5.130.24/ticket/" />
        <ClinicalSystemCard image={IAAS} title="IAAS" desc="" onClick={() => navigate('/iaas')} />
      </div>
    </section>
  );
};

export default Accesos;