import React, { useState, useEffect } from 'react';
import { ChevronLeft, FileText, Search, ShieldCheck, Plus, Trash2, X, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CalidadVigente = ({ userRole }) => {
  const navigate = useNavigate();
  const isJefe = userRole === 'jefe';
  const [searchTerm, setSearchTerm] = useState('');

  // === ESTADO DE DOCUMENTOS CON LISTA COMPLETA ===
  const [documentos, setDocumentos] = useState(() => {
    const saved = localStorage.getItem('calidad_vigente_final');
    if (saved) return JSON.parse(saved);
    
    return [
        { id: 1, nombre: "AOC 1.1 CODIGO AZUL Res N° 295", url: "http://10.5.131.63/intranet/wp-content/uploads/2024/02/AOC-1.1-CODIGO-AZUL-Res-N%C2%B0-295.pdf" },
        { id: 2, nombre: "AOC 1.2 ED. 6 PROTOCOLO DE CATEGORIZACIÓN DE PACIENTES, UNIDAD DE EMERGENCIA GINECOOBSTETICA HSJM", url: "http://10.5.131.63/intranet/wp-content/uploads/2021/12/AOC-1.2-ED.-6-PROTOCOLO-DE-CATEGORIZACION-DE-PACIENTES-UNIDAD-DE-EMERGENCIA-GINECOOBSTETICA-HSJM.pdf" },
        { id: 3, nombre: "AOC 1.2 ED 8 PROTOCOLO DE CATEGORIZACIÓN DE PACIENTES UEH ADULTOS Y NIÑOS HSJM Res N° 579", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/02/AOC-1.2-ED-8-PROTOCOLO-DE-CATEGORIZACION-DE-PACIENTES-UEH-ADULTOS-Y-NINOS-HSJM-Res-N%C2%B0-579.pdf" },
        { id: 4, nombre: "AOC-1.3 NOTIFICACIÓN OPORTUNA RESULTADOS DE RIESGO APA", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/11/AOC-1.3-NOTIFICACION-OPORTUNA-RESULTS-DE-RIESGO-APA.pdf" },
        { id: 5, nombre: "AOC 1.3 ED 6 NOTIFICACIÓN EXÁMENES CRITICOS IMAGENOLOGÍA", url: "http://10.5.131.63/intranet/wp-content/uploads/2021/08/AOC-1.3-ED-6-NOTIFICACION-EXAMENES-CRITICOS-IMAGENOLOGIA.pdf" },
        { id: 6, nombre: "AOC 1.3 NOTIFICACIÓN OPORTUNA LABORATORIO ED. 6", url: "http://10.5.131.63/intranet/wp-content/uploads/2021/07/AOC-1.3-NOTIFICACION-OPORTUNA-LABORATORIO-ED.-6.pdf" },
        { id: 7, nombre: "AOC 2.1 ED. 4 PROTOCOLO DERIVACIÓN PACIENTES", url: "http://10.5.131.63/intranet/wp-content/uploads/2020/12/AOC-2.1-ED.-4-PROTOCOLO-DERIVACION-PACIENTES.pdf" },
        { id: 8, nombre: "Aoc 2.2 entrega de turno Matroneria ed 2", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/11/Aoc-2.2-entrega-de-turno-Matroneria-ed-2.pdf" },
        { id: 9, nombre: "AOC 2.2 ED. 3 PROTOCOLO ENTREGA DE TURNO ENFERMERÍA", url: "http://10.5.131.63/intranet/wp-content/uploads/2021/05/AOC-2.2-ED.-3-PROTOCOLO-ENTREGA-DE-TURNO-ENFERMERIA.pdf" },
        { id: 10, nombre: "AOC 2.2 ED. 3 Cambio de turno de medicos", url: "http://10.5.131.63/intranet/wp-content/uploads/2021/05/AOC-2.2-ED.-3-Cambio-de-turno-de-medicos.pdf" },
        { id: 11, nombre: "APA-1.2-ED.-5-Protocolo-Etapa-Pre-Analitica-de-Manejo-de-Bipsias.pdf", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/11/APA-1.2-ED.-5-Protocolo-Etapa-Pre-Analitica-de-Manejo-de-Bipsias.pdf.pdf" },
        { id: 12, nombre: "APA 1.4 ED 1 Manual de Bioseguridad de oficina de Biopsia Res. N° 920", url: "http://10.5.131.63/intranet/wp-content/uploads/2022/07/APA-1.4-ED-1-Manual-de-Bioseguridad-de-oficina-de-Biopsia-Res.-N%C2%B0-920.pdf" },
        { id: 13, nombre: "APE 1.3-1.4-1.5 – ED5 MANUAL ESTERILIZACIÓN", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/11/APE-1.3-1.4-1.5-ED5-MANUAL-ESTERILIZACION.pdf" },
        { id: 14, nombre: "APF 1.2 ED 5 PROT. PARA LA ADQUISICIÓN DE MEDICAMENTOS E INSUMOS CLÍNICOS", url: "http://10.5.131.63/intranet/wp-content/uploads/2022/10/APF-1.2-ED-5-PROT.-PARA-LA-ADQUISICION-DE-MEDICAMENTOS-E-INSUMOS-CLINICOS.pdf" },
        { id: 15, nombre: "APF 1.3 – PROTOCOLO DE MANTENCION DE STOCK MINIMODE MEDICAMENTO E INSUMOS EN UNIDADES CRITICAS", url: "http://10.5.131.63/intranet/wp-content/uploads/2025/07/APF-1.3-PROTOCOLO-DE-MANTENCION-DE-STOCK-MINIMODE-MEDICAMENTO-E-INSUMOS-EN-UNIDADES-CRITICAS.pdf" },
        { id: 16, nombre: "APF 1.3 Ed. 7 Stock Minimo de Medicamentos", url: "http://10.5.131.63/intranet/wp-content/uploads/2021/05/APF-1.3-Ed.-7-Stock-Minimo-de-Medicamentos.pdf" },
        { id: 17, nombre: "APF1.4 PROTOCOLO PROCEDIMIENTOS DE FARMACIA", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/APF1.4-PROTOCOLO-PROCEDIMIENTOS-DE-FARMACIA.pdf" },
        { id: 18, nombre: "APF 1.4 ED. 3 PROCEDIMIENTO DE ELIMINACIÓN DE MEDICAMENTOS VENCIDOS", url: "http://10.5.131.63/intranet/wp-content/uploads/2022/04/APF-1.4-ED.-3-PROCEDIMIENTO-DE-ELIMINACION-DE-MEDICAMENTOS-VENCIDOS.pdf" },
        { id: 19, nombre: "APF-1.5 PROTOCOLO DE ESTANDARIZACION DE PROCEDIMIENTOS RELACIONADOS CON MEDICAMENTOS", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/05/APF-1.5-PROTOCOLO-DE-ESTANDARIZACION-DE-PROCEDIMIENTOS-RELACIONADOS-CON-MEDICAMENTOS.pdf" },
        { id: 20, nombre: "APF 1.6 ed 1 almacenamiento, distribución y eliminación de medicamentos antineoplásicos", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/11/APF-1.6-ed-1-almacenamiento-distribucion-y-eliminacion-de-medicamentos-antineoplasicos.pdf" },
        { id: 21, nombre: "APF 1.7 ed 1 recepción, almacenamiento y dispensación de nutrición parenteral", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/11/APF-1.7-ed-1-recepcion-almacenamiento-y-dispensacion-de-nutricion-parenteral.pdf" },
        { id: 22, nombre: "API 1.3 ED 3 REQUISITOS SOLICITUD EXAMENES IMAGENOLOGÍA", url: "http://10.5.131.63/intranet/wp-content/uploads/2021/10/API-1.3-ED-3-REQUISITOS-SOLICITUD-EXAMENES-IMAGENOLOGIA.pdf" },
        { id: 23, nombre: "APK 1.2 Ed. 4 Protocolo Preparación Paciente Kinesico", url: "http://10.5.131.63/intranet/wp-content/uploads/2021/05/APK-1.2-Ed.-4-Protocolo-Preparacion-Paciente-Kinesico.pdf" },
        { id: 24, nombre: "APK 1.3 ED. 5 PREVENCIÓN DE EVENTOS ASOCIADOS A LA A REHABILITACIÓN KINÉSICA", url: "http://10.5.131.63/intranet/wp-content/uploads/2022/03/APK-1.3-ED.-5-PREVENCION-DE-EVENTOS-ASOCIADOS-A-LA-A-REHABILITACION-KINESICA.pdf" },
        { id: 25, nombre: "APL 1.4 ED. 4 Programa de Evaluación Externa de la Calidad del Laboratorio Clínico y UMT", url: "http://10.5.131.63/intranet/wp-content/uploads/2021/12/APL-1.4-ED.-4-Programa-de-Evaluacion-Externa-de-la-Calidad-del-Laboratorio-Clinico-y-UMT.pdf" },
        { id: 26, nombre: "APL 1.2 ED. 4 MANUAL DE TOMA DE MUESTRAS GENERAL Y MICROBILÓGICAS LABORATORIO CLÍNICO HSJM", url: "http://10.5.131.63/intranet/wp-content/uploads/2021/11/APL-1.2-ED.-4-MANUAL-DE-TOMA-DE-MUESTRAS-GENERAL-Y-MICROBILOGICAS-LABORATORIO-CLINICO-HSJM.pdf" },
        { id: 27, nombre: "APL 1.3 ED.3 MANUAL PROCEDIMIENTOS MUESTRAS BIOLÓGICAS", url: "http://10.5.131.63/intranet/wp-content/uploads/2021/12/APL-1.3-ED.3-MANUAL-PROCEDIMIENTOS-MUESTRAS-BIOLOGICAS.pdf" },
        { id: 28, nombre: "APL 1.5 Ed. 5 Manual de Bioseguridad de laboratorio y UMT", url: "http://10.5.131.63/intranet/wp-content/uploads/2021/04/APL-1.5-Ed.-5-Manual-de-Bioseguridad-de-laboratorio-y-UMT.pdf" },
        { id: 29, nombre: "APQ 1.3 ED 3-ELIMINACION DE MEDICAMENTOS ANTINEOPLASICOS", url: "http://10.5.131.63/intranet/wp-content/uploads/2022/10/APQ-1.3-ED-3-ELIMINACION-DE-MEDICAMENTOS-ANTINEOPLASICOS.pdf" },
        { id: 30, nombre: "APT 1.2 ED 5 Condiciones mínimas de seguridad durante el transporte pacientes", url: "http://10.5.131.63/intranet/wp-content/uploads/2024/03/APT-1.2-ED-5-Condiciones-minimas-de-seguridad-durante-el-transporte-pacientes.pdf" },
        { id: 31, nombre: "APTr 1.2-1.3 ED 4 Procedimientos Unidad Medicina Transfusional y Trazabilidad", url: "http://10.5.131.63/intranet/wp-content/uploads/2021/06/APTr-1.2-1.3-ED-4-Procedimientos-Unidad-Medicina-Transfusional.pdf" },
        { id: 32, nombre: "APTr 1.2 y 1.3 ED. 3 MANUAL UMT", url: "http://10.5.131.63/intranet/wp-content/uploads/2020/12/APTr-1.2-y-1.3-ED.-3-MANUAL-UMT.pdf" },
        { id: 33, nombre: "CAL 1.1 POLITICAS DE CALIDAD 2021", url: "http://10.5.131.63/intranet/wp-content/uploads/2021/03/CAL-1.1-POLITICAS-DE-CALIDAD-2021.pdf" },
        { id: 34, nombre: "CAL 1.1 PROGRAMA DE CALIDAD 2024 RES 707", url: "http://10.5.131.63/intranet/wp-content/uploads/2024/02/CAL-1.1-PROGRAMA-DE-CALIDAD-2024-RES-707.pdf" },
        { id: 35, nombre: "CAL 1.1 EVALUACION PROGRAMA DE CALIDAD 2023 RES 662", url: "http://10.5.131.63/intranet/wp-content/uploads/2024/02/CAL-1.1-EVALUACION-PROGRAMA-DE-CALIDAD-2023-RES-662.pdf" },
        { id: 36, nombre: "CAL 1.1 Metas calidad version 11 res 749", url: "http://10.5.131.63/intranet/wp-content/uploads/2024/02/CAL-1.1-Metas-calidad-version-11-res-749.pdf" },
        { id: 37, nombre: "CAL 1.2 responsables", url: "http://10.5.131.63/intranet/wp-content/uploads/2022/08/CAL-1.2-responsables.pdf" },
        { id: 38, nombre: "CAL 1.2 METAS 2023 RES 683", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/CAL-1.2-METAS-2023-RES-683.pdf" },
        { id: 39, nombre: "DP 1.2 ED. 4 PROCEDIMIENTOS DE GESTIÓN DE LOS RECLAMOS Res N°572", url: "http://10.5.131.63/intranet/wp-content/uploads/2022/04/DP-1.2-ED.-4-PROCEDIMIENTOS-DE-GESTION-DE-LOS-RECLAMOS-Res-N%C2%B0572.pdf" },
        { id: 40, nombre: "DP 1.3 ED 4 EVALUACIÓN-RESPETO-DERECHO-A-PACIENTES", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/03/DP-1.3-ED-4-EVALUACION-RESPETO-DERECHO-A-PACIENTES.pdf" },
        { id: 41, nombre: "DP 2.1 ED. 5 Consentimiento informado", url: "http://10.5.131.63/intranet/wp-content/uploads/2021/05/DP-2.1-ED.-5-Consentimiento-informado.pdf" },
        { id: 42, nombre: "DP 3.1 ED 3 INVESTIGACIÓN EN SERES HUMANOS", url: "http://10.5.131.63/intranet/wp-content/uploads/2020/12/DP-3.1-ED-3-INVESTIGACION-EN-SERES-HUMANOS.pdf" },
        { id: 43, nombre: "DP 4.2 ALUMNOS KINE, TO Y FONO ED 2 RES 1701", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/09/DP-4.2-ALUMNOS-KINE-TO-Y-FONO-ED-2-RES-1701.pdf" },
        { id: 44, nombre: "DP 4.2 ALUMNOS MEDICINA ED 4 RES 1702", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/09/DP-4.2-ALUMNOS-MEDICINA-ED-4-RES-1702.pdf" },
        { id: 45, nombre: "DP 4.2 HSJM ALUMNOS DE TECNOLOGIA MEDICA", url: "http://10.5.131.63/intranet/wp-content/uploads/2024/03/DP-4.2-HSJM-ALUMNOS-DE-TECNOLOGIA-MEDICA.pdf" },
        { id: 46, nombre: "DP 4.2 PROGRAMA SUPERV ED 5 RES 1699", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/09/DP-4.2-PROGRAMA-SUPERV-ED-5-RES-1699.pdf" },
        { id: 47, nombre: "DP 4.2 ALUMNOS ENFERMERIA ED 5 RES 1697", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/09/DP-4.2-ALUMNOS-ENFERMERIA-ED-5-RES-1697.pdf" },
        { id: 48, nombre: "DP 4.2 ALUMNOS OBSTETRICIA ED 5 RES 1698", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/09/DP-4.2-ALUMNOS-OBSTETRICIA-ED-5-RES-1698.pdf" },
        { id: 49, nombre: "DP 4.2 NUTRICION ED 4 RES 1700", url: "http://10.5.131.63/intranet/wp-content/uploads/2024/02/DP-4.2-NUTRICION-ED-4-RES-1700.pdf" },
        { id: 50, nombre: "DP 4.2 Actividades y procedimientos alumnos de TENS", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/06/DP-4.2-Actividades-y-procedimientos-alumnos-de-TENS.pdf" },
        { id: 51, nombre: "DP 5.1 ED 3 RES", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/DP-5.1-ED-3-RES.pdf" },
        { id: 52, nombre: "DP 5.1 PROTOCOLO COMITE DE ETICA", url: "http://10.5.131.63/intranet/wp-content/uploads/2024/07/DP-5.1-PROTOCOLO-COMITE-DE-ETICA.pdf" },
        { id: 53, nombre: "DP 3.1 ED 4 PROTOCOLO DE APROBACION ETICA", url: "http://10.5.131.63/intranet/wp-content/uploads/2024/07/DP-3.1-ED-4-PROTOCOLO-DE-APROBACION-ETICA.pdf" },
        { id: 54, nombre: "EQ 1.1 PROCEDIMIENTO PARA LA ADQUISICION DE EQUIPAMIENTO", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/11/EQ-1.1-PROCEDIMIENTO-PARA-LA-ADQUISICION-DE-EQUIPAMIENTO.pdf" },
        { id: 55, nombre: "EQ 1.2 ED. 2 SEGUIMIENTO DE VIDA UTIL", url: "http://10.5.131.63/intranet/wp-content/uploads/2020/12/EQ-1.2-ED.-2-SEGUIMIENTO-DE-VIDA-UTIL.pdf" },
        { id: 56, nombre: "EQ 2.1 ED 6 PROGRAMA DE MANTENCIÓN PREVENTIVA", url: "http://10.5.131.63/intranet/wp-content/uploads/2021/10/EQ-2.1-ED-6-PROGRAMA-DE-MANTENCION-PREVENTIVA.pdf" },
        { id: 57, nombre: "EQ 2.2 Programa de Mantenimiento Preventivo Unidades de Apoyo", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/06/EQ-2.2-Programa-de-Mantenimiento-Preventivo-Unidades-de-Apoyo.pdf" },
        { id: 58, nombre: "EQ 1.2 ED 3 3 Seguimiento de vida útil equipos médicos", url: "http://10.5.131.63/intranet/wp-content/uploads/2024/03/EQ-1.2-ED-3-3-Seguimiento-de-vida-util-equipos-medicos.pdf" },
        { id: 59, nombre: "EQ 3.1 ED 4 PROTOCOLO PERFIL TECNICO O PRESIONAL", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/06/EQ-3.1-ED-4-PROTOCOLO-PERFIL-TECNICO-O-PRESIONAL.pdf" },
        { id: 60, nombre: "GCL 1.1 Ed 4 PROTOCOLO PRE ANESTESICO", url: "http://10.5.131.63/intranet/wp-content/uploads/2021/04/GCL-1.1-Ed-4-PROTOCOLO-PRE-ANESTESICO.pdf" },
        { id: 61, nombre: "GCL 1.2 ED 4 PROT. ATENCIÓN DE ENFERMERIA", url: "http://10.5.131.63/intranet/wp-content/uploads/2022/10/GCL-1.2-ED-4-PROT.-ATENCION-DE-ENFERMERIA-.pdf" },
        { id: 62, nombre: "GCL 1.13 ED 3 RES", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/GCL-1.13-ED-3-RES.pdf" },
        { id: 63, nombre: "GCL 3.3 HDA OP ED 5 RES", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/GCL-3.3-HDA-OP-ED-5-RES.pdf" },
        { id: 64, nombre: "GCL 1.4 ED 3 RES I", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/GCL-1.4-ED-3-RES-I.pdf" },
        { id: 65, nombre: "GCL 1.4 ED 3 RES II", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/GCL-1.4-ED-3-RES-II.pdf" },
        { id: 66, nombre: "GCL 2.2 CAIDAS ED 4 RES", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/GCL-2.2-CAIDAS-ED-4-RES.pdf" },
        { id: 67, nombre: "GCL 2.2 ED 4 ERROR DE MED RES", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/GCL-2.2-ED-4-ERROR-DE-MED-RES.pdf" },
        { id: 68, nombre: "GCL 2.3 EVENTOS ADVERSOS ED 5 RES 6152", url: "http://10.5.131.63/intranet/wp-content/uploads/2024/07/GCL-2.3-EVENTOS-ADVERSOS-ED-5-RES-6152.pdf" },
        { id: 69, nombre: "GCL 3.3 ED 4 CVC RES", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/GCL-3.3-ED-4-CVC-RES.pdf" },
        { id: 70, nombre: "GCL-1_11-APA-1_2-Manejo de biopsia HSJD", url: "http://10.5.131.63/intranet/wp-content/uploads/2022/08/GCL-1_11-APA-1_2-Manejo-de-biopsia-HSJD.pdf" },
        { id: 71, nombre: "GCL 1.3 Ed. 3 Manejo de Dolor Agudo Post-Operatorio", url: "http://10.5.131.63/intranet/wp-content/uploads/2021/05/GCL-1.3-Ed.-3-Manejo-de-Dolor-Agudo-Post-Operatorio.pdf" },
        { id: 72, nombre: "GCL-1.4-REANIMACION CARDIOPULMONAR", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/11/GCL-1.4-REANIMACION-CARDIOPULMONAR.pdf" },
        { id: 73, nombre: "GCL 1.5 Ed. 5 Protocolo Ingreso y Egreso UPC", url: "http://10.5.131.63/intranet/wp-content/uploads/2021/05/GCL-1.5-Ed.-5-Protocolo-Ingreso-y-Egreso-UPC.pdf" },
        { id: 74, nombre: "GCL 1.6 ED. 4 INDICACIÓN CESAREA", url: "http://10.5.131.63/intranet/wp-content/uploads/2021/07/GCL-1.6-ED.-4-INDICACION-CESAREA.pdf" },
        { id: 75, nombre: "GCL 1.7 Indicación médica de transfusión", url: "http://10.5.131.63/intranet/wp-content/uploads/2024/08/GCL-1.7-Indicacion-medica-de-transfusion.pdf" },
        { id: 76, nombre: "GCL 1.8 DERIVACIÓN PACIENTES URO-ONCOLOGICOS", url: "http://10.5.131.63/intranet/wp-content/uploads/2021/03/GCL-1.8-DERIVACION-PACIENTES-URO-ONCOLOGICOS.pdf" },
        { id: 77, nombre: "COMITÉ ONCOLOGICO RES 119", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/06/COMITE-ONCOLOGICO-RES-119.pdf" },
        { id: 78, nombre: "Res.-Comite-Oncologico-paciente-Adulto", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/06/Res.-Comite-Oncologico-paciente-Adulto.pdf" },
        { id: 79, nombre: "Res.-Comite-Oncologico-paciente-Pediatrico", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/06/Res.-Comite-Oncologico-paciente-Pediatrico.pdf" },
        { id: 80, nombre: "GCL 1.9 CONTENCIÓN FÍSICA ED. 3", url: "http://10.5.131.63/intranet/wp-content/uploads/2021/05/GCL-1.9-CONTENCION-FISICA-ED.-3.pdf" },
        { id: 81, nombre: "GCL 1.10 CRITERIOS DE INGRESO Y DERIVACION INTENTO DE SUICIDIO", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/GCL-1.10-CRITERIOS-DE-INGRESO-Y-DERIVACION-INTENTO-DE-SUICIDIO.pdf" },
        { id: 82, nombre: "GCL-1.11-ED.-6-Protocolo-Informes-de-biopsias-HSJM", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/11/GCL-1.11-ED.-6-Protocolo-Informes-de-biopsias-HSJM.pdf" },
        { id: 83, nombre: "GCL 1.12 ED5 Identificación de pacientes", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/07/GCL-1.12-ED5-Identificacion-de-pacientes-1.pdf" },
        { id: 84, nombre: "GCL 1.13 ED. 3 TACO ACTUALIZADO", url: "http://10.5.131.63/intranet/wp-content/uploads/2020/12/GCL-1.13-ED.-3-TACO-ACTUALIZADO.pdf" },
        { id: 85, nombre: "GCL 2.1 ed. 4 Prevención evento adverso proceso Qx.", url: "http://10.5.131.63/intranet/wp-content/uploads/2021/04/GCL-2.1-ed.-4-Prevencion-evento-adverso-proceso-Qx..pdf" },
        { id: 86, nombre: "GCL 2.2 ED5 Prevención De Caídas", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/07/GCL-2.2-ED5-Prevencion-De-Caidas.pdf" },
        { id: 87, nombre: "GCL 2.2 ED. 4 ERROR DE MEDICACION", url: "http://10.5.131.63/intranet/wp-content/uploads/2020/12/GCL-2.2-ED.-4-ERROR-DE-MEDICACION.pdf" },
        { id: 88, nombre: "GCL 2.2 Ed. 5 PREVENCIÓN ULCERAS POR PRESIÓN", url: "http://10.5.131.63/intranet/wp-content/uploads/2021/03/GCL-2.2-Ed.-5-PREVENCION-ULCERAS-POR-PRESION.pdf" },
        { id: 89, nombre: "GCL 2.3 ED. 4 VIGILANCIA EVENTOS ADVERSOS", url: "http://10.5.131.63/intranet/wp-content/uploads/2022/03/GCL-2.3-ED.-4-VIGILANCIA-EVENTOS-ADVERSOS.pdf" },
        { id: 90, nombre: "GCL 3.2 ED 8 VIGILANCIA IAAS", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/11/GCL-3.2-ED-8-VIGILANCIA-IAAS.pdf" },
        { id: 91, nombre: "GCL 3.2 ED. 1 PREVENCIÓN ENDOFTALMITIS", url: "http://10.5.131.63/intranet/wp-content/uploads/2021/06/GCL-3.2-ED.-1-PREVENCION-ENDOFTALMITIS.pdf" },
        { id: 92, nombre: "Gcl 3.3 prevención de IAAS por catéter periférico", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/01/Gcl-3.3-prevencion-de-IAAS-por-cateter-periferico.pdf" },
        { id: 93, nombre: "Gcl 3.3 prevención de IAAS por catéter urinario", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/01/Gcl-3.3-prevencion-de-IAAS-por-cateter-urinario.pdf" },
        { id: 94, nombre: "Gcl 3.3 PREVENCION DE ENDOMETRITIS PUERPERAL", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/02/Gcl-3.3-PREVENCION-DE-ENDOMETRITIS-PUERPERAL.pdf" },
        { id: 95, nombre: "GCL 3.3 ED. 4 INSTAL, MANTENCIÓN CVC", url: "http://10.5.131.63/intranet/wp-content/uploads/2020/12/GCL-3.3-ED.-4-INSTAL-MANTENCION-CVC.pdf" },
        { id: 96, nombre: "GCL 3.3 ANTISÉPTICOS-Y-DESINFECTANTES", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/01/GCL-3.3-ANTISEPTICOS-Y-DESINFECTANTES.pdf" },
        { id: 97, nombre: "GCL-3.3-ED.-6-PREV-HERIDA-OPERATORIA-HSJM", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/12/GCL-3.3-ED.-6-PREV-HERIDA-OPERATORIA-HSJM.pdf" },
        { id: 98, nombre: "GCL 3.3 ED. 5 Precauciones Estándares, Res 344", url: "http://10.5.131.63/intranet/wp-content/uploads/2021/06/GCL-3.3-ED.-5-Precauciones-Estandares-Res-344.pdf" },
        { id: 99, nombre: "INS 1.1 ED. 3 PLAN DE PREVENCION DE INCENDIOS", url: "http://10.5.131.63/intranet/wp-content/uploads/2020/12/INS-1.1-ED.-3-PLAN-DE-PREVENCION-DE-INCENDIOS.pdf" },
        { id: 100, nombre: "INS 2.1- PLAN DE EMERGENCIA HSJM", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/10/INS-2.1-PLAN-DE-EMERGENCIA-HSJM.pdf" },
        { id: 101, nombre: "INS 3.1 MANTENIMIENTO INSTALACIONES RELEVANTES", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/03/INS-3.1-MANTENIMIENTO-INSTALACIONES-RELEVANTES.pdf" },
        { id: 102, nombre: "INS-3.2-ED.-3-PLAN-CORTE-DE-LUZ-Y-AGUA", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/11/INS-3.2-ED.-3-PLAN-CORTE-DE-LUZ-Y-AGUA.pdf" },
        { id: 103, nombre: "INS 1.1 ED 3 RES", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/INS-1.1-ED-3-RES.pdf" },
        { id: 104, nombre: "INS 3.2 ED 2 RES", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/INS-3.2-ED-2-RES.pdf" },
        { id: 105, nombre: "REG 1.1 ficha clínica única v7", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/12/REG-1.1-ficha-clinica-unica-v7.pdf" },
        { id: 106, nombre: "Reg 1.4 -ED.4-Manejo de ficha Clinica.", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/12/Reg-1.4-ED.4-Manejo-de-ficha-Clinica.pdf" },
        { id: 107, nombre: "REG 1.2-1.3 ED 3 RES", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/REG-1.2-1.3-ED-3-RES.pdf" },
        { id: 108, nombre: "REG 1.2.3 Estandarización de Registros Clínicos", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/06/REG-1.2.3-Estandarizacion-de-Registros-Clinicos.pdf" },
        { id: 109, nombre: "RH 2.1 Ed 5 Manual de Inducción funcionaria HSJM", url: "http://10.5.131.63/intranet/wp-content/uploads/2022/11/RH-2.1-Ed 5-Manual-de-Induccion-funcionaria-HSJM.pdf" },
        { id: 110, nombre: "RH 2.2 ED. 1 PROGRAMA ORIENTACIÓN UPC Res N° 449", url: "http://10.5.131.63/intranet/wp-content/uploads/2022/04/RH-2.2-ED.-1-PROGRAMA-ORIENTACION-UPC-Res-N-449.pdf" },
        { id: 111, nombre: "RH 2.2 PROGRAMA DE ORIENTACION AL PUESTO", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/RH-2.2-PROGRAMA-DE-ORIENTACION-AL-PUESTO.pdf" },
        { id: 112, nombre: "RH 2.2 Orientación Unidad de Farmacia", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/06/RH-2.2-Orientacion-Unidad-de-Farmacia.pdf" },
        { id: 113, nombre: "RH 2.2 ED1 – Orientación funcionarios esterilización", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/07/RH-2.2-ED1-Orientacion-funcionarios-esterilizacion.pdf" },
        { id: 114, nombre: "RH 2.2 ED1-Orientación Gineco-Obstetricia", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/07/RH-2.2-ED1-Orientacion-Gineco-Obstetricia.pdf" },
        { id: 115, nombre: "RH 3.1 ED 3 Programa Capacitación IAAS Y RCP", url: "http://10.5.131.63/intranet/wp-content/uploads/2021/12/RH-3.1-ED-3-Programa-Capacitacion-IAAS-Y-RCP.pdf" },
        { id: 116, nombre: "Rh 4.1 SEGURIDAD Y SALUD OCUPACIONAL", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/02/Rh-4.1-SEGURIDAD-Y-SALUD-OCUPACIONAL.pdf" },
        { id: 117, nombre: "RH 4.2 ED 6 EXPOSICION A FLUIDOS CORPORALES", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/03/RH-4.2-ED-6-EXPOSICION-A-FLUIDOS-CORPORALES.pdf " },
        { id: 118, nombre: "Rh 4.3 inmunización funcionaria", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/02/Rh-4.3-inmunizacion-funcionaria.pdf" },
        { id: 119, nombre: "PROTOCOLO TRAZABILIDAD DE DISPOSITIVOS MEDICOS ED 2", url: "http://10.5.131.63/intranet/wp-content/uploads/2025/07/PROTOCOLO-TRAZABILIDAD-DE-DISPOSITIVOS-MEDICOS-ED-2.pdf" },
        { id: 120, nombre: "PROTOCOLO GESTIÓN DOCUMENTAL", url: "http://10.5.131.63/intranet/wp-content/uploads/2021/08/PROTOCOLO-GESTION-DOCUMENTAL.pdf"},
        { id: 121, nombre: "PROTOCOLO-TECNOVIGILANCIA-DISPOSITIVOS-MEDICOS", url: "http://10.5.131.63/intranet/wp-content/uploads/2022/09/PROTOCOLO-TECNOVIGILANCIA-DISPOSITIVOS-MEDICOS.pdf" },
        { id: 122, nombre: "PROTOCOLO ATENCIÓN PREFERENTE HSJM", url: "http://10.5.131.63/intranet/wp-content/uploads/2022/01/PROTOCOLO-ATENCION-PREFERENTE-HSJM.pdf" },
        { id: 123, nombre: "PROTOCOLO CARRO DE PARO res 3684", url: "http://10.5.131.63/intranet/wp-content/uploads/2024/12/PROTOCOLO-CARRO-DE-PARO-res-3684-1.pdf" },
        { id: 124, nombre: "GUÍA DE CONCILIACIÓN DE MEDICAMENTOS", url: "http://10.5.131.63/intranet/wp-content/uploads/2022/01/GUIA-DE-CONCILIACION-DE-MEDICAMENTOS.pdf" },
        { id: 125, nombre: "PROTOCOLO ENFERMEDADES TROMBOEMBÓLICAS ED. 4", url: "http://10.5.131.63/intranet/wp-content/uploads/2025/10/Protocolo-enfermedades-tromboembolicas-1.pdf" },
        { id: 126, nombre: "GUIA REHABILITACION POR COVID Res N° 338", url: "http://10.5.131.63/intranet/wp-content/uploads/2022/05/GUIA-REHABILITACION-POR-COVID-Res-N-338.pdf" },
        { id: 127, nombre: "GUÍA ATENCIÓN KINÉSICA COVID 19 Res N°583", url: "http://10.5.131.63/intranet/wp-content/uploads/2022/05/GUIA-ATENCION-KINESICA-COVID-19-Res-N-583.pdf" },
        { id: 128, nombre: "PROTOCOLO PROTESIS DE CADERA Y RODILLA", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/05/PROTOCOLO-PROTESIS-DE-CADERA-Y-RODILLA.pdf" },
        { id: 129, nombre: "PROTOCOLO CALIDAD DE QUÍMICA CLÍNICA Res N° 360-2021", url: "http://10.5.131.63/intranet/wp-content/uploads/2022/05/PROTOCOLO-CALIDAD-DE-QUIMICA-CLINICA-Res-N-360-2021.pdf" },
        { id: 130, nombre: "PROTOCOLO CALIDAD HEMATOLOGÍA Res 487-2021", url: "http://10.5.131.63/intranet/wp-content/uploads/2022/05/PROTOCOLO-CALIDAD-HEMATOLOGIA-Res-487-2021.pdf" },
        { id: 131, nombre: "PROTOCOLO CALIDAD MICROBIOLOGÍA Res N° 371-2021", url: "http://10.5.131.63/intranet/wp-content/uploads/2022/05/PROTOCOLO-CALIDAD-MICROBIOLOGIA-Res-N-371-2021.pdf" },
        { id: 132, nombre: "PROTOCOLO REHABILITACIÓN TRAQUEOSTOMÍA Res N° 614", url: "http://10.5.131.63/intranet/wp-content/uploads/2022/05/PROTOCOLO-REHABILITACION-TRAQUEOSTOMIA-Res-N-614.pdf" },
        { id: 133, nombre: "PROTOCOLO PERTENENCIAS USUARIOS URGENCIA Res N° 280-2021", url: "http://10.5.131.63/intranet/wp-content/uploads/2022/05/PROTOCOLO-PERTENENCIAS-USUARIOS-URGENCIA-Res-N-280-2021.pdf" },
        { id: 134, nombre: "PROTOCOLO SEGUIMIENTO LEY DE URGENCIA Res N° 336-2021", url: "http://10.5.131.63/intranet/wp-content/uploads/2022/05/PROTOCOLO-SEGUIMIENTO-LEY-DE-URGENCIA-Res-N-336-2021.pdf" },
        { id: 135, nombre: "PROTOCOLO TAMIZAJE DE DROGAS Res. N° 831", url: "http://10.5.131.63/intranet/wp-content/uploads/2022/05/PROTOCOLO-TAMIZAJE-DE-DROGAS-Res.-N-831.pdf" },
        { id: 136, nombre: "PROTOCOLO MANEJO Y ENTREGA DE FALLECIDOS Res. N°86", url: "http://10.5.131.63/intranet/wp-content/uploads/2022/05/PROTOCOLO-MANEJO-Y-ENTREGA-DE-FALLECIDOS-Res.-N-86.pdf" },
        { id: 137, nombre: "PROTOCOLO PRONACIÓN PACIENTES UPC Res N° 335-2021", url: "http://10.5.131.63/intranet/wp-content/uploads/2022/05/PROTOCOLO-PRONACION-PACIENTES-UPC-Res-N-335-2021.pdf" },
        { id: 138, nombre: "PROTOCOLO ESTUDIOS UNIDAD DE CARDIOLOGÍA Res N° 413-2021", url: "http://10.5.131.63/intranet/wp-content/uploads/2022/05/PROTOCOLO-ESTUDIOS-UNIDAD-DE-CARDIOLOGIA-Res-N-413-2021.pdf" },
        { id: 139, nombre: "PROTOCOLO SEDOANALGESIA UPC Res.Exenta 730", url: "http://10.5.131.63/intranet/wp-content/uploads/2022/05/PROTOCOLO-SEDOANALGESIA-UPC-Res.Exenta-730.pdf" },
        { id: 140, nombre: "REGLAMENTO INTERNO HIGIENE Y SEGURIDAD RES N°567", url: "http://10.5.131.63/intranet/wp-content/uploads/2022/05/REGLAMENTO-INTERNO-HIGIENE-Y-SEGURIDAD-RES-N-567.pdf" },
        { id: 141, nombre: "MANUAL PROCEDIMIENTOS KINE UPC", url: "http://10.5.131.63/intranet/wp-content/uploads/2022/07/MANUAL-PROCEDIMIENTOS-KINE-UPC.pdf" },
        { id: 142, nombre: "MANUAL VACUNATORIO HSJM", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/MANUAL-VACUNATORIO-HSJM.pdf" },
        { id: 143, nombre: "TRAZABILIDAD DE DISPOSISTIVOS MEDICOS HSJM", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/11/TRAZABILIDAD-DE-DISPOSISTIVOS-MEDICOS-HSJM.pdf" },
        { id: 144, nombre: "PROTOCOLO RE INTERVENCIONES QUIRURGICAS HSJM", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/11/PROTOCOLO-RE-INTERVENCIONES-QUIRURGICAS-HSJM.pdf" },
        { id: 145, nombre: "PROTOCOLO GCL 2.2 LPP ED 6 RES 6479", url: "http://10.5.131.63/intranet/wp-content/uploads/2024/07/PROTOCOLO-GCL-2.2-LPP-ED-6-RES-6479.pdf" },
        { id: 146, nombre: "PPT RESULTADOS CEAL-SM 2024.", url: "http://10.5.131.63/intranet/wp-content/uploads/2025/11/PPT-RESULTADOS-CEAL-SM-2024.pdf" },
        { id: 147, nombre: "FLUJO DE DERIVACIÓN", url: "http://10.5.131.63/intranet/wp-content/uploads/2025/11/FLUJO-DE-DERIVACION.pdf" },
        { id: 148, nombre: "TRABAJO PREVENCIÓN DE RIESGOS HSJM 2025", url: "http://10.5.131.63/intranet/wp-content/uploads/2025/11/TRABAJO-PREVENCION-DE-RIESGOS-HSJM-2025.pdf" }
    ];
  });

  // === ESTADOS ADMIN ===
  const [showForm, setShowForm] = useState(false);
  const [newDoc, setNewDoc] = useState({ nombre: '', url: '' });

  // Guardar en localStorage
  useEffect(() => {
    localStorage.setItem('calidad_vigente_final', JSON.stringify(documentos));
  }, [documentos]);

  // === FUNCIONES JEFE ===
  const handleAddDocument = (e) => {
    e.preventDefault();
    if (!newDoc.nombre || !newDoc.url) return;
    const nuevo = { id: Date.now(), nombre: newDoc.nombre.toUpperCase(), url: newDoc.url };
    setDocumentos([nuevo, ...documentos]);
    setNewDoc({ nombre: '', url: '' });
    setShowForm(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de eliminar este protocolo?")) {
      setDocumentos(documentos.filter(d => d.id !== id));
    }
  };

  const documentosFiltrados = documentos.filter(doc => 
    doc.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 min-h-[800px] animate-in fade-in zoom-in duration-500 w-full font-sans relative mt-6">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 border-b pb-8">
        <div>
          <button onClick={() => navigate('/inicio')} className="bg-slate-100 hover:bg-[#ffb81c] text-[#003876] px-5 py-2 rounded-full font-black flex items-center gap-2 transition-all mb-6 text-sm shadow-sm">
            <ChevronLeft size={18} /> INICIO
          </button>
          <div className="flex items-center gap-4">
            <ShieldCheck className="text-[#00a19a] hidden md:block" size={48} />
            <div>
                <h2 className="text-3xl md:text-5xl font-black text-slate-700 tracking-tighter uppercase italic">Protocolos Calidad</h2>
                <span className="text-[#003876] font-bold text-xl uppercase tracking-widest leading-none">Acreditación Vigente</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
            {isJefe && !showForm && (
                <button onClick={() => setShowForm(true)} className="bg-[#00a19a] text-white px-6 py-3 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-[#003876] transition-all shadow-lg self-end">
                <Plus size={20} /> AGREGAR DOCUMENTO
                </button>
            )}
            <div className="w-full md:w-96 relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><Search className="text-slate-400" size={20} /></div>
                <input type="text" placeholder="Buscar..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:outline-none focus:border-[#00a19a] transition-all font-medium text-slate-700 shadow-sm" />
            </div>
        </div>
      </div>

      {showForm && (
        <div className="mb-10 p-8 bg-[#00a19a]/5 rounded-3xl border-2 border-dashed border-[#00a19a]/30 animate-in slide-in-from-top duration-500">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-black text-[#003876] uppercase">Publicar Nuevo Protocolo</h3>
            <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-red-500"><X /></button>
          </div>
          <form onSubmit={handleAddDocument} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input required className="p-4 rounded-xl border-none shadow-sm outline-none focus:ring-2 focus:ring-[#00a19a]" placeholder="Nombre (Ej: AOC 1.1...)" value={newDoc.nombre} onChange={e => setNewDoc({...newDoc, nombre: e.target.value})} />
            <input required className="p-4 rounded-xl border-none shadow-sm outline-none focus:ring-2 focus:ring-[#00a19a]" placeholder="Link PDF" value={newDoc.url} onChange={e => setNewDoc({...newDoc, url: e.target.value})} />
            <button type="submit" className="md:col-span-2 bg-[#003876] text-white p-4 rounded-xl font-black flex items-center justify-center gap-2 hover:bg-[#00a19a] transition-all uppercase"><Save size={20}/> Guardar en Intranet</button>
          </form>
        </div>
      )}

      <div className="max-w-7xl mx-auto pt-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {documentosFiltrados.map((doc) => (
            <div key={doc.id} className="relative group">
            <a href={doc.url} target="_blank" rel="noreferrer" className="flex items-start gap-3 p-5 rounded-2xl border border-slate-200 hover:border-[#00a19a] hover:bg-white transition-all shadow-sm hover:shadow-xl bg-slate-50/50 h-full">
                <div className="bg-red-100 p-2 rounded-lg shrink-0 group-hover:bg-red-500 group-hover:text-white transition-all"><FileText size={20} /></div>
                <p className="text-xs font-black text-slate-600 group-hover:text-[#003876] uppercase leading-snug">{doc.nombre}</p>
            </a>
            {isJefe && (
                <button onClick={(e) => { e.preventDefault(); handleDelete(doc.id); }} className="absolute -top-2 -right-2 bg-red-600 text-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={14} /></button>
            )}
            </div>
        ))}
        </div>
        <div className="mt-12 text-center text-slate-400 text-xs font-bold uppercase tracking-widest">{documentosFiltrados.length} PROTOCOLOS DISPONIBLES</div>
      </div>
    </section>
  );
};

export default CalidadVigente;