import React, { useState } from 'react';
import { ChevronLeft, FileText, Search, History } from 'lucide-react';

const VersionesAnteriores = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // === PEGA AQUÍ LOS BLOQUES DE DOCUMENTOS ===
  const documentos = [
    { nombre: "AOC 1.1 SISTEMA DE ALERTA ORGANIZACIÓN PARA TENCIÓN DE EMERGENCIA Res N°295", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/AOC-1.1-SISTEMA-DE-ALERTA-ORGANIZACION-PARA-TENCION-DE-EMERGENCIA-Res-N%C2%B0295.pdf" },
    { nombre: "AOC 1.1 acreditación 2023", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/AOC-1.1-Edic-4.pdf" },
    { nombre: "AOC 1.2 acreditacion 2023", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/AOC-1.2-Edic-5.pdf" },
    { nombre: "AOC 1.2 acreditación 2023", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/AOC-1.2-ED.-7-CATEGORIZACION-PACIENTES-UEH-1.pdf" },
    { nombre: "AOC 1.3 APAacreditación 2023", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/AOC-1.3-APA-ED.-4-NOTIFICACIONES-RESULTADOS-CRITICOS-APA.pdf" },
    { nombre: "AOC 1.3 API acreditación 2023", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/AOC-1.3-API-ED-5.pdf" },
    { nombre: "AOC 1 3 ED 5 IMAG NOTIF RESULTADOS DE EX CRÍTICOS", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/AOC-1-3-ED-5-IMAG-NOTIF-RESULTADOS-DE-EX-CRITICOS.pdf" },
    { nombre: "AOC 1.3 APL acreditación 2023", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/RES-AOC-1.3-LAB-ED-5-1-1.pdf" },
    { nombre: "AOC 1 3 (APL) ED 5 NOTIFICACIÓN OPORTUNA DE RESULTADOS DE RIESGO EN LABORATORIO", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/AOC-1-3-APL-ED-5-NOTIFICACION-OPORTUNA-DE-RESULTADOS-DE-RIESGO-EN-LABORATORIO-1.pdf" },
    { nombre: "AOC 2.1 acreditación 2023", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/AOC-2.1-ED-3-DERIVACION-DE-PCTES.pdf" },
    { nombre: "AOC 2.2 ENF acreditación 2023", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/RESOLUCION-AOC-2.2-ENTREGA-TURNO-EU.pdf" },
    { nombre: "AOC 2.2 ED. 2 ENTREGA DE TURNOS ENFERMERIA RESOLUCION", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/AOC-2.2-ED.-2-ENTREGA-DE-TURNOS-ENFERMERIA.pdf" },
    { nombre: "AOC 2.2 MAT acreditación 2023 – copia", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/RESOLUCION-AOC-2.2-MATRONERIA.pdf" },
    { nombre: "AOC 2.2 ED. 1 ENTREGA DE TURNOS MATRONERIA RESOLUCION", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/RESOLUCION-AOC-2.2-MATRONERIA.pdf" },
    { nombre: "APA 1.2 acreditación 2023", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/ED-3-APA-1.2.pdf" },
    { nombre: "APA 1.2 ED. 3 ETAPA PRE ANALITICA DEL MANEJO DE BIOPSIAS actual.", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/APA-1.2-ED.-3-ETAPA-PRE-ANALITICA-DEL-MANEJO-DE-BIOPSIAS-actual..pdf" },
    { nombre: "APE acreditación 2023", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/APE-ED-3-manual-esterilizacion.pdf" },
    { nombre: "RESOLUCION APE 1.3-1.4-1.5 ED 3", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/APE-ED-3-manual-esterilizacion.pdf" },
    { nombre: "APF 1.2 MED E INS acreditación 2023", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/APF-1-2-ED-4-ADQUISICION-DE-MEDICAMENTOS-3.pdf" },
    { nombre: "RESOLUCION APF 1.2 INSUMOS ED 4", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/RESOLUCION-APF-1.2-INSUMOS-ED-4.pdf" },
    { nombre: "Resolución APF 1.2 MEDIC ED 4", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/Resolucion-APF-1.2-MEDIC-ED-4.pdf" },
    { nombre: "APF 1.2 ED. 4 PROT PARA LA aDQUISICIÓN DE INSUMOS CLÍNICOS", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/APF-1.2-ED.-4-PROT-PARA-LA-aDQUISICION-DE-INSUMOS-CLINICOS.pdf" },
    { nombre: "APF 1.3 acreditación 2023", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/APF-1.3-Edicion-5-2018.pdf" },
    { nombre: "APF 1.3 Responsables Stock Mínimo", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/APF-1.3-Responsables-Stock-Minimo.pdf" },
    { nombre: "RES EXENTA RESPONSABLES STOCK CRITICO", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/RES-EXENTA-RESPONSABLES-STOCK-CRITICO.pdf" },
    { nombre: "Responsables Stock Minimos Medicamentos Res N°572 – 2019", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/Responsables-Stock-Minimos-Medicamentos-Res-N%C2%B0572-2019.pdf" },
    { nombre: "APF 1.3 ED. 6 STOCK MÍNIMO", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/APF-1.3-ED.-6-STOCK-MINIMO.pdf" },
    { nombre: "API 1.3 acreditación 2023", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/Res-Exenta-API-1.3-Requisitos-Solicitudes-Edicion-2.pdf" },
    { nombre: "API 1.3 ED. 2 SOL IND IMAGENOLOGIA ", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/API-1.3-ED.-2-SOL-IND-IMAGENOLOGIA.pdf" },
    { nombre: "API 1.3 ED 3 REQUISITOS SOLICITUD EXAMENES IMAGENOLOGÍA", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/API-1.3-ED-3-REQUISITOS-SOLICITUD-EXAMENES-IMAGENOLOGIA.pdf" },
    { nombre: "APK 1.2 acreditación 2023", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/Resolucion-APK-1.2-Edicion-3.pdf" },
    { nombre: "APK 1.2 ED. 3 PREPARACIÓN PARA KINE RESPIRATORIA Edición 3 2017", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/Resolucion-APK-1.2-Edicion-3.pdf" },
    { nombre: "APK 1.3 acreditación 2023", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/RESOLUCION-APK-1.3-ED-4-.pdf" },
    { nombre: "APK 1.3 ED 4 PREV EA REHABILITACION KINESICA", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/APK-1.3-ED-4-PREV-EA-REHABILITACION-KINESICA.pdf" },
    { nombre: "APL 1.2 acreditación 2023", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/APL-1.2-ED-3-RESOLUCION.pdf" },
    { nombre: "APL 1.2 ED 3 PROTOCOLO", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/APL-1.2-ED-3-PROTOCOLO.pdf" },
    { nombre: "APL 1. 3 Edicion 2", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/APL-1.-3-Edicion-2.pdf" },
    { nombre: "APL 1.4 acreditación 2023", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/Resolucion-APL-1.4-Edicion-3-2018.pdf" },
    { nombre: "APL 1.4 Edición 3 2018", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/Resolucion-APL-1.4-Edicion-3-2018.pdf" },
    { nombre: "APL 1.5 acreditación 2023", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/APL-1.5-ED-4-PROTOCOLO-BIOSEGURIDAD.pdf" },
    { nombre: "RESOL APL 1.5 ED 4", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/RESOL-APL-1.5-ED-4.pdf" },
    { nombre: "APT 1.2 acreditación 2023", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/APT-1.2-ED.-3-CONDICIONES-MINIMAS-DE-TRANSPORTE-ACTUALIZADO.pdf" },
    { nombre: "APTR 1.2- 1.3 acreditación 2023", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/APTr-1.2-y-1.3-ED-3-MANUAL-UMT-copia.pdf" },
    { nombre: "CAL 1.1 ENC acreditación 2023", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/CAL-1.1-ENCARGADOS-CALIDAD-2020-.pdf" },
    { nombre: "Res.Exenta 840 HSJM Complementa funciones Enc Calidad", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/Res.Exenta-840-HSJM-Complementa-funciones-Enc-Calidad.pdf" },
    { nombre: "Res.Exenta 771 Jefatura Calidad Jamie Pérez", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/Res.Exenta-771-Jefatura-Calidad-Jamie-Perez.pdf" },
    { nombre: "CAL 1.1 Evaluación Calidad año 2021 Res. N° 158", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/CAL-1.1-Evaluacion-Calidad-ano-2021-Res.-N%C2%B0-158.pdf" },
    { nombre: "CAL 1.1 Evaluación Calidad año 2020 ultima versión", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/CAL-1.1-Evaluacion-Calidad-ano-2020-ultima-version.pdf" },
    { nombre: "CAL 1.1 POLIT acreditación 2023", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/CAL-1.1-ED.-4-POLITICAS-DE-CALIDAD-2017.pdf" },
    { nombre: "CAL-1.1-POLITICAS-DE-CALIDAD-2021", url: "http://10.5.131.63/intranet/wp-content/uploads/2024/02/CAL-1.1-POLITICAS-DE-CALIDAD-2021.pdf" },
    { nombre: "CAL-1.1-PROGRAMA-DE-CALIDAD-Y-SEGURIDAD-DEL-PACIENTE-ANO-2023", url: "http://10.5.131.63/intranet/wp-content/uploads/2024/02/CAL-1.1-PROGRAMA-DE-CALIDAD-Y-SEGURIDAD-DEL-PACIENTE-ANO-2023.pdf" },
    { nombre: "CAL-1.2-METAS-CALIDAD-2023", url: "http://10.5.131.63/intranet/wp-content/uploads/2024/02/CAL-1.2-METAS-CALIDAD-2023.pdf" },
    { nombre: "CAL 1.1 PROGRAMA acreditación 2023(RES PROG CALIDAD 2020)", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/RES-PROG-CALIDAD-2020.pdf" },
    { nombre: "CAL 1.1 PROGRAMA DE CALIDAD 2020 meep 110320", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/CAL-1.1-PROGRAMA-DE-CALIDAD-2020-meep-110320.pdf" },
    { nombre: "CAL 1.1 Programa calidad año 2022 Res N°157", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/CAL-1.1-Programa-calidad-ano-2022-Res-N%C2%B0157.pdf" },
    { nombre: "CAL 1.1 Programa Calidad 2021", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/CAL-1.1-Programa-Calidad-2021.pdf" },
    { nombre: "CAL 1.1 Anexo programa calidad y Seguridad año 2021", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/CAL-1.1-Anexo-programa-calidad-y-Seguridad-ano-2021.pdf" },
    { nombre: "CAL 1.2 METAS Y RESP acreditación", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/RESPONSABLES-DE-CALIDAD-2023.pdf" },
    { nombre: "Res.Exenta 870", url: "#http://10.5.131.63/intranet/wp-content/uploads/2023/04/Res.Exenta-870.pdf" },
    { nombre: "Res.Exenta 382", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/Res.Exenta-382.pdf" },
    { nombre: "Res Exenta 164 Responsables calidad", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/Res-Exenta-164-Responsables-calidad.pdf" },
    { nombre: "Cal-1-2-metas de calidad 2019", url: "http://10.5.131.63/intranet/cal-1-2-metas-de-calidad-2019/" },
    { nombre: "RESOL CAL 1.2 ED 7 METAS DE CALIDAD 2019", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/RESOL-CAL-1.2-ED-7-METAS-DE-CALIDAD-2019.pdf" },
    { nombre: "CAL 1.2 ED. 7 FE DE ERRATA METAS CALIDAD 2019", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/CAL-1.2-ED.-7-FE-DE-ERRATA-METAS-CALIDAD-2019.pdf" },
    { nombre: "CAL 1.2 ED 7 METAS DE CALIDAD 2019", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/CAL-1.2-ED-7-METAS-DE-CALIDAD-2019.pdf" },
    { nombre: "CAL 1.2 Ed 8 Metas de Calidad 2021", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/CAL-1.2-Ed-8-Metas-de-Calidad-2021.pdf" },
    { nombre: "CAL 1.2 RES 938 RESPONSABLES", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/CAL-1.2-RES-938-RESPONSABLES.pdf" },
    { nombre: "DP 2.1 CONSENTIMIENTO INFORMADO ED 4", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/12/DP-2.1-CONSENTIMIENTO-INFORMADO-ED-4-.pdf" },
    { nombre: "DP 1.2 acreditación 2023", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/Resolucion-DP-1.2-Edicion-2-2017.pdf" },
    { nombre: "DP 1.2 ED 3 Procedimientos de Gestión de Reclamo", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/DP-1.2-ED-3-Procedimientos-de-Gestion-de-Reclamo.pdf" },
    { nombre: "DP 1 2 ED 2 PROTOCOLO DE GESTION DE RECLAMOS 2017", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/DP-1-2-ED-2-PROTOCOLO-DE-GESTION-DE-RECLAMOS-2017.pdf" },
    { nombre: "DP-4.2-ED.-3-ALUMNOS-DE-TECNOLOGIA-MEDICA", url: "http://10.5.131.63/intranet/wp-content/uploads/2024/03/DP-4.2-ED.-3-ALUMNOS-DE-TECNOLOGIA-MEDICA-1.pdf" },
    { nombre: "DP 1.3 acreditación 2023", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/Resolucion-DP-1.3-Edicion-2.pdf" },
    { nombre: "DP 1.3 ED 3 EVALUACIÓN RESPETO DERECHO A PACIENTES", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/DP-1.3-ED-3-EVALUACION-RESPETO-DERECHO-A-PACIENTES.pdf" },
    { nombre: "DP 1 3 ED 2 PROTOCOLO DE DERECHOS", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/DP-1-3-ED-2-PROTOCOLO-DE-DERECHOS.pdf" },
    { nombre: "DP 2.1 acreditación 2023", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/DP-2-1-CONSENTIMIENTO-INFORMADO.pdf" },
    { nombre: "RESOLUCION DP 2.1", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/RESOLUCION-DP-2.1.pdf" },
    { nombre: "DP 4.2 PROG SUPERV acreditación 2023", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/DP-4.2-ED-3-PROGRAMA-SUPERVISION-HSJM.pdf" },
    { nombre: "EQ-1.1-ED-3-PROCEDIMIENTO-ADQUISICION-DE-EQUIPAMIENTO", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/11/EQ-1.1-ED-3-PROCEDIMIENTO-ADQUISICION-DE-EQUIPAMIENTO.pdf" },
    { nombre: "EQ-1.1-PROCEDIMIENTO-PARA-LA-ADQUISICION-DE-EQUIPAMIENTO", url: "http://10.5.131.63/intranet/wp-content/uploads/2024/03/EQ-1.1-PROCEDIMIENTO-PARA-LA-ADQUISICION-DE-EQUIPAMIENTO.pdf" },
    { nombre: "EQ-1.2-ED.-2-SEGUIMIENTO-DE-VIDA-UTIL", url: "http://10.5.131.63/intranet/wp-content/uploads/2024/03/EQ-1.2-ED.-2-SEGUIMIENTO-DE-VIDA-UTIL.pdf" },
    { nombre: "EQ-1.1-ED.-3-PROCEDIMIENTO-ADQUISICION-DE-EQUIPAMIENTO-Resolucion", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/11/EQ-1.1-ED.-3-PROCEDIMIENTO-ADQUISICION-DE-EQUIPAMIENTO-Resolucion.pdf" },
    { nombre: "EQ 2.1 acreditación 2023", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/RESOLUCION-EQ-2.1-ED-5.pdf" },
    { nombre: "PROTOCOLO EQ 2 1 ED 5 PROGRAMA DE MANTENCION PREVENTIVA", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/PROTOCOLO-EQ-2-1-ED-5-PROGRAMA-DE-MANTENCION-PREVENTIVA-.pdf" },
    { nombre: "EQ 2.1 ENCARGADOS", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/EQ-2.1-ENCARGADOS-.pdf" },
    { nombre: "Res. Encargados Mantenimiento EQ 2.1 Res N° 6-2022", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/Res.-Encargados-Mantenimiento-EQ-2.1-Res-N%C2%B0-6-2022.pdf" },
    { nombre: "Informe EQ 1.2 año 2022.", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/Informe-EQ-1.2-ano-2022.-.pdf" },
    { nombre: "Informe cumplimiento mantenimiento preventivo Equipos críticos 1er semestre 2020", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/Informe-cumplimiento-mantenimiento-preventivo-Equipos-criticos-1er-semestre-2020.pdf" },
    { nombre: "Informe cumplimiento mantenimiento preventivo de equipos críticos hsjm año 2020", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/Informe-cumplimiento-mantenimiento-preventivo-de-equipos-criticos-hsjm-ano-2020.pdf" },
    { nombre: "GCL 1.1 acreditación 2023", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/GCL-1.1-EVALUACION-PREANESTESICA.pdf" },
    { nombre: "1.1 EVALUACION PREANESTESICA", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/GCL-1.1-EVALUACION-PREANESTESICA.pdf" },
    { nombre: "GCL 1.2 acreditación 2023", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/GCL-1.2-CUIDADO-DE-ENFERMERIA.pdf" },
    { nombre: "GCL 1.3 ED 2 MANEJO DEL DOLOR", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/GCL-1.3-ED-2-MANEJO-DEL-DOLOR.pdf" },
    { nombre: "ED 2 GCL 1.3", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/ED-2-GCL-1.3.pdf" },
    { nombre: "GCL-2-2-2-ED.-4-PREVENCION-DE-CAIDAS", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/11/GCL-2-2-2-ED.-4-PREVENCION-DE-CAIDAS.pdf" },
    { nombre: "GCL 1.5 acreditación 2023", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/GCL-1.5-ED-4-INGRESO-Y-EGRESO-A-UPC.pdf" },
    { nombre: "GCL 1.6 acreditación 2023", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/Res-Exenta-GCL-1.6-Edicion-3.pdf" },
    { nombre: "GCL 1.6 ED 3 INDICACION DE CESAREA 2017", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/GCL-1.6-ED-3-INDICACION-DE-CESAREA-2017.pdf" },
    { nombre: "GCL 1.7 acreditación 2023", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/GCL-1.7-ED-5-INDICACION-TRANSFUSION.pdf" },
    { nombre: "GCL 1.7 RES ED 5", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/GCL-1.7-RES-ED-5.pdf" },
    { nombre: "GCL-1.7-ED.-6-CRITERIOS-DE-TRANSFUSION-DE-HEMOCOMPONENTES-ED.-6", url: "http://10.5.131.63/intranet/wp-content/uploads/2024/08/GCL-1.7-ED.-6-CRITERIOS-DE-TRANSFUSION-DE-HEMOCOMPONENTES-ED.-6.pdf" },
    { nombre: "Res.-Comite-Oncologico-paciente-Pediatrico (1)", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/Res.-Comite-Oncologico-paciente-Pediatrico-1.pdf" },
    { nombre: "Res.-Comite-Oncologico-paciente-Adulto", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/Res.-Comite-Oncologico-paciente-Adulto.pdf" },
    { nombre: "Res. Exenta 245 Integrantes Comité Oncologico del Hsjm", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/Res.-Exenta-245-Integrantes-Comite-Oncologico-del-Hsjm.pdf" },
    { nombre: "Protocolo de derivación pacientes uro-oncologicos a HSJD 11-2-21", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/Protocolo-de-derivacion-pacientes-uro-oncologicos-a-HSJD-11-2-21.doc" },
    { nombre: "Res.Exenta 693-1 Comité Gestión Oncológica HSJM 29-10-20", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/06/Res.Exenta-693-1-Comite-Gestion-Oncologica-HSJM-29-10-20.pdf" },

    { nombre: "GCL 1.9 ED 2 PREV EA AGITACION PSICOMOTORA 2017", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/GCL-1.9-ED-2-PREV-EA-AGITACION-PSICOMOTORA-2017.pdf" },
    { nombre: "Res Exenta Prev EA Contencion Fisica Agitacion Edición 2 2017", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/Res-Exenta-Prev-EA-Contencion-Fisica-Agitacion-Edicion-2-2017.pdf" },

    { nombre: "GCL 1.11 ED 4 RES", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/GCL-1.11-ED-4-RES.pdf" },
    { nombre: "GCL 1.11 ED 4 BIOPSIAS", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/GCL-1.11-ED-4-BIOPSIAS-.pdf" },

    { nombre: "GCL 1.11 Protocolo Atención Usuario", url: "http://10.5.131.63/intranet/wp-content/uploads/2022/10/Protocolo-de-Atencion-al-Usuario-2022.pdf" },
    { nombre: "GCL-1.12-ED.-4-IDENTIFICACION-DE-PACIENTES", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/12/GCL-1.12-ED.-4-IDENTIFICACION-DE-PACIENTES.pdf" },
    { nombre: "GCL-2-2-2-ED.-4-PREVENCION-DE-CAIDAS", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/07/GCL-2-2-2-ED.-4-PREVENCION-DE-CAIDAS.pdf" },
    { nombre: "vigencia 2020 Res.Exenta 382", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/vigencia-2020-Res.Exenta-382.pdf" },
    { nombre: "RESOLUCION GCL 2.1", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/RESOLUCION-GCL-2.1.pdf" },
    { nombre: "GCL 2.1 ED. 3 FE DE ERRATA EVE. ADV. PROC. QUIRURGICOS", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/GCL-2.1-ED.-3-FE-DE-ERRATA-EVE.-ADV.-PROC.-QUIRURGICOS.pdf" },



    { nombre: "GCL 2.2 LPP acreditación 2023", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/GCL-2.2-ED.-4-PREVENCION-DE-UPP.pdf" },
    { nombre: "GCL 2.3 acreditación 2023", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/GCL-2.3-ED.-3-NOTIF-EVENTO-ADVERSO.pdf" },
    { nombre: "GCL 3.3 ED 5 ANTISÉPTICOS Y DESINFECTANTES Res Exenta Uso desinfectantes y antisepticos Edicion 4", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/Res-Exenta-Uso-desinfectantes-y-antisepticos-Edicion-4.pdf" },
    { nombre: "GCL 33 ED 5 RES ANTISP Y DESINF", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/GCL-33-ED-5-RES-ANTISP-Y-DESINF.pdf" },
    { nombre: "GCL 3.3 ED 5 ANTISÉPTICOS Y DESINFECTANTES", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/GCL-3.3-ED-5-ANTISEPTICOS-Y-DESINFECTANTES-.pdf" },

    { nombre: "Res Exenta GCL 3.3 Prev Cateter urinario Edición 4 2017", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/Res-Exenta-GCL-3.3-Prev-Cateter-urinario-Edicion-4-2017.pdf" },
    { nombre: "GCL 3.3 IAAS EN CATETER URINARIO Edición 4 2017", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/GCL-3.3-IAAS-EN-CATETER-URINARIO-Edicion-4-2017.pdf" },
    { nombre: "GCL 3.3 ED 5 CATETER URINARIO", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/GCL-3.3-ED-5-CATETER-URINARIO.pdf" },
    
    { nombre: "RES EXENTA CATETER VENOSO PERIFERICO Edición 3", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/RES-EXENTA-CATETER-VENOSO-PERIFERICO-Edicion-3-.pdf" },
    { nombre: "GCL 3.3 CATETER VENOSO PERIFERICO Edición 3 2107", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/GCL-3.3-CATETER-VENOSO-PERIFERICO-Edicion-3-2107-.pdf" },

    { nombre: "RES EXENTA ENDOMETRITIS PUERPERAL Edición 4", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/RES-EXENTA-ENDOMETRITIS-PUERPERAL-Edicion-4-.pdf" },
    { nombre: "GCL 3.3 ENDOMETRITIS Edición 4 2017", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/GCL-3.3-ENDOMETRITIS-Edicion-4-2017.pdf" },

    { nombre: "GCL 3.3 PREC ESTAND Y AISLM acreditación 2023", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/RESOL-GCL-3.3-ED-4-PREC-ESTANDAR.pdf" },
    { nombre: "GCL 3.3 ED 4 PREC.BASADAS MECANISMO DE TRANSMISIÓN Y AISLAMIENTO 2019", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/GCL-3.3-ED-4-PREC.BASADAS-MECANISMO-DE-TRANSMISION-Y-AISLAMIENTO-2019.pdf" },

    { nombre: "GCL 3.3 RES ED 4 EP", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/GCL-3.3-RES-ED-4-EP-.pdf" },

    { nombre: "INS 2.1 acreditación 2023(RES. INS 2.1 ED 3)", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/RES.-INS-2.1-ED-3.pdf" },
    { nombre: "INS 2.1 ED 3 PLAN DE EMERGENCIA", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/INS-2.1-ED-3-PLAN-DE-EMERGENCIA.pdf" },
    { nombre: "EM1 INS 2.1", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/EM1-INS-2.1-.pdf" },

    { nombre: "REG 1.1 acreditación 2023(RESOL. REG 1.1 ED 5)", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/RESOL.-REG-1.1-ED-5.pdf" },
    { nombre: "REG 1.1 ED 5", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/REG-1.1-ED-5.pdf" },

    { nombre: "REG 1.1 ED 5 – V5", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/12/REG-1.1-ED-5-V5.pdf" },
    { nombre: "REG 1.1 ED 6 RES 1705 – V6", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/12/REG-1.1-ED-6-RES-1705-V6.pdf " },
    { nombre: "REG 1. 2-1. 3 ED. 3 REGISTROS MINIMOS Y SEGUIMIENTO", url: "http://10.5.131.63/intranet/wp-content/uploads/2020/12/REG-1.-2-1.-3-ED.-3-REGISTROS-MINIMOS-Y-SEGUIMIENTO.pdf" },
    { nombre: "REG-1.4-ED.-3-SOLICITUD-ENTREGA-RECEPCION-CONSERVACION-FICHA-CLINICA", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/12/REG-1.4-ED.-3-SOLICITUD-ENTREGA-RECEPCION-CONSERVACION-FICHA-CLINICA.pdf" },
    { nombre: "REG 1.4 acreditación 2023(RESOLUCION REG 1.4 ED 2)", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/RESOLUCION-REG-1.4-ED-2.pdf" },
    { nombre: "REG 1.4 ED 2 CON FE DE ERRATAS", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/REG-1.4-ED-2-CON-FE-DE-ERRATAS.pdf" },

    { nombre: "RH 2.1 acreditación 2023(RH 2.1 RESOL ED 4)", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/RH-2.1-RESOL-ED-4.pdf" },
    { nombre: "RH 2.1 ED 4 MANUAL INDUCCIÓN", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/RH-2.1-ED-4-MANUAL-INDUCCION.pdf" },

    { nombre: "RH 3.1 acreditación 2023(http://10.5.131.63/intranet/rh-3-1-acreditacion-2023/)", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/RH-3.1-ED.-2-CAPACITACION-IAAS-Y-RCP-Edicion-2-2017.pdf" },
    { nombre: "Resolución RH 3.1 ed 2 Capacitacion IAAS y RCP", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/Resolucion-RH-3.1-ed-2-Capacitacion-IAAS-y-RCP.pdf" },

    { nombre: "RH 4.2 acreditación 2023(RH 4.2 RESOL ED 5)", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/RH-4.2-RESOL-ED-5.pdf" },
    { nombre: "RH 4 2 ED 5 MANEJO DE ACP final 13 6 19", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/RH-4-2-ED-5-MANEJO-DE-ACP-final-13-6-19-.pdf" },

    { nombre: "RH 4.3 acreditación 2023(RH 4.3 ED. 2 Inmunización Hepatitis)", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/RH-4.3-ED.-2-Inmunizacion-Hepatitis.pdf" },
    { nombre: "Resolución RH 4.3 Edición 2 2017", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/Resolucion-RH-4.3-Edicion-2-2017.pdf" },
  ];

  // Filtro de búsqueda
  const documentosFiltrados = documentos.filter(doc => 
    doc.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 min-h-[800px] animate-in fade-in zoom-in duration-500 w-full font-sans relative mt-6">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 border-b pb-8">
        <div>
          <button 
            onClick={() => onNavigate('inicio')} 
            className="bg-slate-100 hover:bg-[#ffb81c] text-[#003876] px-5 py-2 rounded-full font-black flex items-center gap-2 transition-all mb-6 text-sm shadow-sm"
          >
            <ChevronLeft size={18} strokeWidth={3} /> VOLVER A INICIO
          </button>
          <div className="flex items-center gap-4">
            <History className="text-[#00a19a] hidden md:block" size={48} />
            <h2 className="text-3xl md:text-5xl font-black text-slate-700 tracking-tighter uppercase italic">
              Versiones Anteriores <br/><span className="text-[#003876]">Acreditación 2020-2023</span>
            </h2>
          </div>
        </div>

        {/* BUSCADOR INTEGRADO */}
        <div className="w-full md:w-96 relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="text-slate-400" size={20} />
          </div>
          <input
            type="text"
            placeholder="Buscar documento antiguo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:outline-none focus:border-[#00a19a] focus:ring-4 focus:ring-[#00a19a]/10 transition-all font-medium text-slate-700 shadow-sm"
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-2">
        {/* RESULTADOS O MENSAJE DE VACÍO */}
        {documentosFiltrados.length === 0 ? (
          <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
            {documentos.length === 0 ? (
              <>
                <History className="mx-auto text-slate-300 mb-4" size={48} />
                <p className="text-xl font-bold text-slate-500">Aún no hay documentos cargados.</p>
              </>
            ) : (
              <>
                <Search className="mx-auto text-slate-300 mb-4" size={48} />
                <p className="text-xl font-bold text-slate-500">No se encontraron documentos con ese nombre.</p>
                <button onClick={() => setSearchTerm('')} className="mt-4 text-[#00a19a] font-bold hover:underline">
                  Limpiar búsqueda
                </button>
              </>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {documentosFiltrados.map((doc, index) => (
              <a 
                key={index}
                href={doc.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-start gap-3 p-4 rounded-2xl border border-slate-200 hover:border-[#00a19a] hover:bg-[#00a19a]/5 transition-all group shadow-sm hover:shadow-md bg-white"
              >
                <div className="bg-slate-100 p-2 rounded-lg shrink-0 group-hover:bg-[#ffb81c]/20 transition-colors">
                  <FileText className="text-slate-500 group-hover:text-[#ffb81c]" size={20} />
                </div>
                <p className="text-sm font-bold text-slate-700 group-hover:text-[#003876] uppercase leading-tight line-clamp-3">
                  {doc.nombre}
                </p>
              </a>
            ))}
          </div>
        )}
        
        {documentos.length > 0 && (
          <div className="mt-8 text-center text-slate-400 text-sm font-medium">
            Mostrando {documentosFiltrados.length} documento(s)
          </div>
        )}
      </div>
    </section>
  );
};

export default VersionesAnteriores;