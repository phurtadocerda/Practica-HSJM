// src/routes/AppRoutes.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// --- VISTAS PRINCIPALES ---
import Inicio from '../views/Inicio';
import Noticias from '../views/Noticias';
import Portal from '../views/Portal';
import Accesos from '../views/Accesos';

// --- NUEVAS VISTAS REFACTORIZADAS ---
import Bienestar from '../views/Bienestar';
import ProtocolosOrdenes from '../views/ProtocolosOrdenes';
import Concurso from '../views/Concurso';
// Nota: Deberás crear este archivo igual que Bienestar, unificando las actas, calendarios, etc.
import ComiteParitario from '../views/ComiteParitario'; 

// --- VISTAS AISLADAS (BIBLIOTECA, GREMIO, ETC) ---
import ViruelaDelMono from '../views/virueladelmono';
import CalidadDeVida from '../views/CalidadDeVida';
import Ciberseguridad from '../views/Ciberseguridad';
import Tuberculosis from '../views/Tuberculosis';
import ProgramaBPSO from '../views/ProgramaBPSO';
import Midas from '../views/Midas';
import ProtocoloVigilancia from '../views/ProtocoloVigilancia';
import Reacreditacion from '../views/Reacreditacion';
import Laboratorio_instructivo from '../views/Laboratorioo';
import PrevencionRiesgos from '../views/PrevencionRiesgos';
import Innovacion_pagina from '../views/Innovacion';
import Iaas from '../views/Iaas';
import SeguridadPaciente from '../views/SeguridadPaciente';
import CalidadVigente from '../views/CalidadVigente';
import VersionesAnteriores from '../views/VersionesAnteriores';
import ArsenalFarmacologico from '../views/ArsenalFarmacologico';
import AgendamientoGis from '../views/AgendamientoGis';
import ProtocoloAtencionUsuario from '../views/ProtocoloAtencionUsuario';
import Capacitacion from '../views/Capacitacion';
import Gremio from '../views/Gremio';
import ReglamentoInterno from '../views/ReglamentoInterno';
import ProduccionEstadistica from '../views/ProduccionEstadistica';
import EnfermedadesTransmisibles from '../views/EnfermedadesTransmisibles';
import GrdInformes from '../views/GrdInformes';
import EspecialidadOdontologia from '../views/EspecialidadOdontologia';
import Contingencia from '../views/Contingencia';
import Resoluciones from '../views/Resoluciones';
import ManualOrganizacion from '../views/ManualOrganizacion';
import ParticipacionCiudadana from '../views/ParticipacionCiudadana';
import PlanAnualCCU from '../views/PlanAnualCCU';
import Procuramiento from '../views/Procuramiento';
import CodigoEtica from '../views/CodigoEtica';
import EventoAdverso from '../views/EventoAdverso';
import AccidentesTrabajo from '../views/AccidentesTrabajo';
import ReunionClinicaUrgencia from '../views/ReunionClinicaUrgencia';
import ManualAgendamiento from '../views/ManualAgendamiento';
import DocumentosPDF from '../views/DocumentosPDF';
import GestionProyectos from '../views/GestionProyectos';
import ReglamentoHigiene from '../views/ReglamentoHigiene';
import Organigrama from '../views/Organigrama';
import ReglamentoProtocolos from '../views/ReglamentoProtocolos';
import Anexos from '../views/Anexos';
import Planos from '../views/Planos';

const AppRoutes = ({ userRole, userName, images }) => {
  return (
    <Routes>
      {/* --- REDIRECCIÓN POR DEFECTO --- */}
      <Route path="/" element={<Navigate to="/inicio" />} />
      
      {/* --- RUTAS PRINCIPALES --- */}
      <Route path="/inicio" element={<Inicio userName={userName} images={images} />} />
      <Route path="/noticias" element={<Noticias userRole={userRole} />} />
      <Route path="/portal" element={<Portal />} />
      <Route path="/accesos" element={<Accesos />} />
      
      {/* --- RUTAS REFACTORIZADAS (CON SUB-MENÚS INTERNOS) --- */}
      <Route path="/bienestar" element={<Bienestar />} />
      <Route path="/protocolos-ordenes" element={<ProtocolosOrdenes />} />
      <Route path="/concurso" element={<Concurso userRole={userRole} />} />
      <Route path="/comite-paritario" element={<ComiteParitario />} />

      {/* --- RUTAS DE BIBLIOTECA Y OTRAS SECCIONES --- */}
      <Route path="/viruela-del-mono" element={<ViruelaDelMono />} />
      <Route path="/calidad-de-vida" element={<CalidadDeVida />} />
      <Route path="/ciberseguridad" element={<Ciberseguridad />} />
      <Route path="/tuberculosis" element={<Tuberculosis />} />
      <Route path="/bpso" element={<ProgramaBPSO />} />
      <Route path="/midas" element={<Midas />} />
      <Route path="/protocolo-vigilancia" element={<ProtocoloVigilancia />} />
      <Route path="/reacreditacion" element={<Reacreditacion />} />
      <Route path="/laboratorio" element={<Laboratorio_instructivo />} />
      <Route path="/prevencion" element={<PrevencionRiesgos />} />
      <Route path="/innovacion" element={<Innovacion_pagina />} />
      <Route path="/iaas" element={<Iaas />} />
      <Route path="/seguridad-paciente" element={<SeguridadPaciente />} />
      <Route path="/calidad-vigente" element={<CalidadVigente userRole={userRole}/>} />
      <Route path="/versiones-anteriores" element={<VersionesAnteriores userRole={userRole} />} />
      <Route path="/arsenal" element={<ArsenalFarmacologico />} />
      <Route path="/agendamiento-gis" element={<AgendamientoGis />} />
      <Route path="/atencion-usuario" element={<ProtocoloAtencionUsuario />} />
      <Route path="/capacitacion" element={<Capacitacion />} />
      <Route path="/gremio" element={<Gremio userRole={userRole} />} />
      <Route path="/reglamento-interno" element={<ReglamentoInterno />} />
      <Route path="/produccion-estadistica" element={<ProduccionEstadistica />} />
      <Route path="/enfermedades-transmisibles" element={<EnfermedadesTransmisibles />} />
      <Route path="/grd" element={<GrdInformes />} />
      <Route path="/odontologia" element={<EspecialidadOdontologia />} />
      <Route path="/contingencia" element={<Contingencia />} />
      <Route path="/resoluciones" element={<Resoluciones />} />
      <Route path="/organizacion" element={<ManualOrganizacion />} />
      <Route path="/participacion" element={<ParticipacionCiudadana />} />
      <Route path="/ccu-2024" element={<PlanAnualCCU />} />
      <Route path="/procuramiento" element={<Procuramiento />} />
      <Route path="/etica" element={<CodigoEtica />} />
      <Route path="/evento-adverso" element={<EventoAdverso />} />
      <Route path="/accidentes-trabajo" element={<AccidentesTrabajo />} />
      <Route path="/reunion-urgencia" element={<ReunionClinicaUrgencia />} />
      <Route path="/manual-agendamiento" element={<ManualAgendamiento />} />
      <Route path="/documentos-pdf" element={<DocumentosPDF />} />
      <Route path="/gestion-proyectos" element={<GestionProyectos />} />
      <Route path="/reglamento-higiene" element={<ReglamentoHigiene />} />
      <Route path="/organigrama" element={<Organigrama />} />
      <Route path="/reglamento-protocolos" element={<ReglamentoProtocolos />} />
      <Route path="/anexos" element={<Anexos userRole={userRole}/>} />
      <Route path="/planos" element={<Planos />} />

      {/* --- RUTA 404 CATCH-ALL (SI ESCRIBEN ALGO MAL EN LA URL) --- */}
      <Route path="*" element={<Navigate to="/inicio" />} />
    </Routes>
  );
};

export default AppRoutes;