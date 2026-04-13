import React, { useState } from 'react';
import { ChevronLeft, FileText, Search, ShieldCheck } from 'lucide-react';

const CalidadVigente = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // === LISTA DE DOCUMENTOS ===
  // Aquí puedes seguir agregando los que falten con el formato { nombre: "...", url: "#" }
  const documentos = [
    { nombre: "AOC 1.1 CODIGO AZUL Res N° 295", url: "http://10.5.131.63/intranet/wp-content/uploads/2024/02/AOC-1.1-CODIGO-AZUL-Res-N%C2%B0-295.pdf" },
    { nombre: "AOC 1.2 ED. 6 PROTOCOLO DE CATEGORIZACIÓN DE PACIENTES, UNIDAD DE EMERGENCIA GINECOOBSTETICA HSJM", url: "http://10.5.131.63/intranet/wp-content/uploads/2021/12/AOC-1.2-ED.-6-PROTOCOLO-DE-CATEGORIZACION-DE-PACIENTES-UNIDAD-DE-EMERGENCIA-GINECOOBSTETICA-HSJM.pdf" },
    { nombre: "AOC 1.2 ED 8 PROTOCOLO DE CATEGORIZACIÓN DE PACIENTES UEH ADULTOS Y NIÑOS HSJM Res N° 579", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/02/AOC-1.2-ED-8-PROTOCOLO-DE-CATEGORIZACION-DE-PACIENTES-UEH-ADULTOS-Y-NINOS-HSJM-Res-N%C2%B0-579.pdf" },
    { nombre: "AOC-1.3 NOTIFICACIÓN OPORTUNA RESULTADOS DE RIESGO APA", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/11/AOC-1.3-NOTIFICACION-OPORTUNA-RESULTADOS-DE-RIESGO-APA.pdf" },
    { nombre: "AOC 1.3 ED 6 NOTIFICACIÓN EXÁMENES CRITICOS IMAGENOLOGÍA", url: "http://10.5.131.63/intranet/wp-content/uploads/2021/08/AOC-1.3-ED-6-NOTIFICACION-EXAMENES-CRITICOS-IMAGENOLOGIA.pdf" },
    { nombre: "AOC 1.3 NOTIFICACIÓN OPORTUNA LABORATORIO ED. 6", url: "http://10.5.131.63/intranet/wp-content/uploads/2021/07/AOC-1.3-NOTIFICACION-OPORTUNA-LABORATORIO-ED.-6.pdf" },
    { nombre: "AOC 2.1 ED. 4 PROTOCOLO DERIVACIÓN PACIENTES", url: "http://10.5.131.63/intranet/wp-content/uploads/2020/12/AOC-2.1-ED.-4-PROTOCOLO-DERIVACI%C3%93N-PACIENTES.pdf" },
    { nombre: "Aoc 2.2 entrega de turno Matroneria ed 2", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/11/Aoc-2.2-entrega-de-turno-Matroneria-ed-2.pdf" },
    { nombre: "AOC 2.2 ED. 3 PROTOCOLO ENTREGA DE TURNO ENFERMERÍA", url: "http://10.5.131.63/intranet/wp-content/uploads/2021/05/AOC-2.2-ED.-3-PROTOCOLO-ENTREGA-DE-TURNO-ENFERMER%C3%8DA.pdf" },
    { nombre: "AOC 2.2 ED. 3 Cambio de turno de medicos", url: "http://10.5.131.63/intranet/wp-content/uploads/2021/05/AOC-2.2-ED.-3-Cambio-de-turno-de-medicos.pdf" },
    { nombre: "APA-1.2-ED.-5-Protocolo-Etapa-Pre-Analitica-de-Manejo-de-Bipsias.pdf", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/11/APA-1.2-ED.-5-Protocolo-Etapa-Pre-Analitica-de-Manejo-de-Bipsias.pdf.pdf" },
    { nombre: "APA 1.4 ED 1 Manual de Bioseguridad de oficina de Biopsia Res. N° 920", url: "http://10.5.131.63/intranet/wp-content/uploads/2022/07/APA-1.4-ED-1-Manual-de-Bioseguridad-de-oficina-de-Biopsia-Res.-N%C2%B0-920.pdf" },
    { nombre: "APE 1.3-1.4-1.5 – ED5 MANUAL ESTERILIZACIÓN", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/11/APE-1.3-1.4-1.5-ED5-MANUAL-ESTERILIZACION.pdf" },
    { nombre: "APF 1.2 ED 5 PROT. PARA LA ADQUISICIÓN DE MEDICAMENTOS E INSUMOS CLÍNICOS", url: "http://10.5.131.63/intranet/wp-content/uploads/2022/10/APF-1.2-ED-5-PROT.-PARA-LA-ADQUISICION-DE-MEDICAMENTOS-E-INSUMOS-CLINICOS.pdf" },
    { nombre: "APF 1.3 – PROTOCOLO DE MANTENCION DE STOCK MINIMODE MEDICAMENTO E INSUMOS EN UNIDADES CRITICAS", url: "http://10.5.131.63/intranet/wp-content/uploads/2025/07/APF-1.3-PROTOCOLO-DE-MANTENCION-DE-STOCK-MINIMODE-MEDICAMENTO-E-INSUMOS-EN-UNIDADES-CRITICAS.pdf" },
    { nombre: "APF 1.3 Ed. 7 Stock Minimo de Medicamentos", url: "http://10.5.131.63/intranet/wp-content/uploads/2021/05/APF-1.3-Ed.-7-Stock-Minimo-de-Medicamentos.pdf" },
    { nombre: "APF1.4 PROTOCOLO PROCEDIMIENTOS DE FARMACIA", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/APF1.4-PROTOCOLO-PROCEDIMIENTOS-DE-FARMACIA.pdf" },
    { nombre: "APF 1.4 ED. 3 PROCEDIMIENTO DE ELIMINACIÓN DE MEDICAMENTOS VENCIDOS, EN MAL ESTADO O SIN ROTULACIÓN ADECUADA", url: "http://10.5.131.63/intranet/wp-content/uploads/2022/04/APF-1.4-ED.-3-PROCEDIMIENTO-DE-ELIMINACION-DE-MEDICAMENTOS-VENCIDOS-EN-MAL-ESTADO-O-SIN-ROTULACION-ADECUADA.pdf" },
    { nombre: "APF-1.5 PROTOCOLO DE ESTANDARIZACION DE PROCEDIMIENTOS RELACIONADOS CON MEDICAMENTOS", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/05/APF-1.5-PROTOCOLO-DE-ESTANDARIZACION-DE-PROCEDIMIENTOS-RELACIONADOS-CON-MEDICAMENTOS.pdf" },
    { nombre: "APF 1.6 ed 1 almacenamiento, distribución y eliminación de medicamentos antineoplásicos", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/11/APF-1.6-ed-1-almacenamiento-distribucion-y-eliminacion-de-medicamentos-antineoplasicos.pdf" },
    { nombre: "APF 1.7 ed 1 recepción, almacenamiento y dispensación de nutrición parenteral", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/11/APF-1.7-ed-1-recepcion-almacenamiento-y-dispensacion-de-nutricion-parenteral.pdf" },
    { nombre: "API 1.3 ED 3 REQUISITOS SOLICITUD EXAMENES IMAGENOLOGÍA", url: "http://10.5.131.63/intranet/wp-content/uploads/2021/10/API-1.3-ED-3-REQUISITOS-SOLICITUD-EXAMENES-IMAGENOLOGIA.pdf" },
    { nombre: "APK 1.2 Ed. 4 Protocolo Preparación Paciente Kinesico", url: "http://10.5.131.63/intranet/wp-content/uploads/2021/05/APK-1.2-Ed.-4-Protocolo-Preparaci%C3%B3n-Paciente-Kinesico.pdf" },
    { nombre: "APK 1.3 ED. 5 PREVENCIÓN DE EVENTOS ASOCIADOS A LA A REHABILITACIÓN KINÉSICA", url: "http://10.5.131.63/intranet/wp-content/uploads/2022/03/APK-1.3-ED.-5-PREVENCION-DE-EVENTOS-ASOCIADOS-A-LA-A-REHABILITACION-KINESICA.pdf" },
    { nombre: "APL 1.4 ED. 4 Programa de Evaluación Externa de la Calidad del Laboratorio Clínico y UMT", url: "http://10.5.131.63/intranet/wp-content/uploads/2021/12/APL-1.4-ED.-4-Programa-de-Evaluacion-Externa-de-la-Calidad-del-Laboratorio-Clinico-y-UMT.pdf" },
    { nombre: "APL 1.2 ED. 4 MANUAL DE TOMA DE MUESTRAS GENERAL Y MICROBILÓGICAS LABORATORIO CLÍNICO HSJM", url: "http://10.5.131.63/intranet/wp-content/uploads/2021/11/APL-1.2-ED.-4-MANUAL-DE-TOMA-DE-MUESTRAS-GENERAL-Y-MICROBILOGICAS-LABORATORIO-CLINICO-HSJM.pdf" },
    { nombre: "APL 1.3 ED.3 MANUAL PROCEDIMIENTOS MUESTRAS BIOLÓGICAS", url: "http://10.5.131.63/intranet/wp-content/uploads/2021/12/APL-1.3-ED.3-MANUAL-PROCEDIMIENTOS-MUESTRAS-BIOLOGICAS.pdf" },
    { nombre: "APL 1.5 Ed. 5 Manual de Bioseguridad de laboratorio y UMT", url: "http://10.5.131.63/intranet/wp-content/uploads/2021/04/APL-1.5-Ed.-5-Manual-de-Bioseguridad-de-laboratorio-y-UMT.pdf" },
    { nombre: "APQ 1.3 ED 3-ELIMINACION DE MEDICAMENTOS ANTINEOPLASICOS", url: "http://10.5.131.63/intranet/wp-content/uploads/2022/10/APQ-1.3-ED-3-ELIMINACION-DE-MEDICAMENTOS-ANTINEOPLASICOS.pdf" },
    { nombre: "APT 1.2 ED 5 Condiciones mínimas de seguridad durante el transporte pacientes", url: "http://10.5.131.63/intranet/wp-content/uploads/2024/03/APT-1.2-ED-5-Condiciones-minimas-de-seguridad-durante-el-transporte-pacientes.pdf" },
    { nombre: "APTr 1.2-1.3 ED 4 Procedimientos Unidad Medicina Transfusional y Trazabilidad de Componente Sanguineos (1)", url: "http://10.5.131.63/intranet/wp-content/uploads/2021/06/APTr-1.2-1.3-ED-4-Procedimientos-Unidad-Medicina-Transfusional-y-Trazabilidad-de-Componente-Sanguineos-1.pdf" },
    { nombre: "APTr 1.2 y 1.3 ED. 3 MANUAL UMT", url: "http://10.5.131.63/intranet/wp-content/uploads/2020/12/APTr-1.2-y-1.3-ED.-3-MANUAL-UMT.pdf" },
    { nombre: "CAL 1.1 POLITICAS DE CALIDAD 2021", url: "http://10.5.131.63/intranet/wp-content/uploads/2021/03/CAL-1.1-POLITICAS-DE-CALIDAD-2021.pdf" },
    { nombre: "CAL 1.1 PROGRAMA DE CALIDAD 2024 RES 707", url: "http://10.5.131.63/intranet/wp-content/uploads/2024/02/CAL-1.1-PROGRAMA-DE-CALIDAD-2024-RES-707.pdf" },
    { nombre: "CAL 1.1 EVALUACION PROGRAMA DE CALIDAD 2023 RES 662", url: "http://10.5.131.63/intranet/wp-content/uploads/2024/02/CAL-1.1-EVALUACION-PROGRAMA-DE-CALIDAD-2023-RES-662.pdf" },
    { nombre: "CAL 1.1 Metas calidad version 11 res 749", url: "http://10.5.131.63/intranet/wp-content/uploads/2024/02/CAL-1.1-Metas-calidad-version-11-res-749.pdf" },
    { nombre: "CAL 1.2 responsables", url: "http://10.5.131.63/intranet/wp-content/uploads/2022/08/CAL-1.2-responsables.pdf" },
    { nombre: "CAL 1.2 METAS 2023 RES 683", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/CAL-1.2-METAS-2023-RES-683.pdf" },
    { nombre: "DP 1.2 ED. 4 PROCEDIMIENTOS DE GESTIÓN DE LOS RECLAMOS Res N°572", url: "http://10.5.131.63/intranet/wp-content/uploads/2022/04/DP-1.2-ED.-4-PROCEDIMIENTOS-DE-GESTION-DE-LOS-RECLAMOS-Res-N%C2%B0572.pdf" },
    { nombre: "DP 1.3 ED 4 EVALUACIÓN-RESPETO-DERECHO-A-PACIENTES", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/03/DP-1.3-ED-4-EVALUACION-RESPETO-DERECHO-A-PACIENTES.pdf" },
    { nombre: "DP 2.1 ED. 5 Consentimiento informado", url: "http://10.5.131.63/intranet/wp-content/uploads/2021/05/DP-2.1-ED.-5-Consentimiento-informado.pdf" },
    { nombre: "DP 3.1 ED 3 INVESTIGACIÓN EN SERES HUMANOS", url: "http://10.5.131.63/intranet/wp-content/uploads/2020/12/DP-3.1-ED-3-INVESTIGACI%C3%93N-EN-SERES-HUMANOS.pdf" },
    { nombre: "DP 4.2 ALUMNOS KINE, TO Y FONO ED 2 RES 1701", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/09/DP-4.2-ALUMNOS-KINE-TO-Y-FONO-ED-2-RES-1701.pdf" },
    { nombre: "DP 4.2 ALUMNOS MEDICINA ED 4 RES 1702", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/09/DP-4.2-ALUMNOS-MEDICINA-ED-4-RES-1702.pdf" },
    { nombre: "DP 4.2 HSJM ALUMNOS DE TECNOLOGIA MEDICA", url: "http://10.5.131.63/intranet/wp-content/uploads/2024/03/DP-4.2-HSJM-ALUMNOS-DE-TECNOLOGIA-MEDICA.pdf" },
    { nombre: "DP 4.2 PROGRAMA SUPERV ED 5 RES 1699", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/09/DP-4.2-PROGRAMA-SUPERV-ED-5-RES-1699.pdf" },
    { nombre: "DP 4.2 ALUMNOS ENFERMERIA ED 5 RES 1697", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/09/DP-4.2-ALUMNOS-ENFERMERIA-ED-5-RES-1697.pdf" },
    { nombre: "DP 4.2 ALUMNOS OBSTETRICIA ED 5 RES 1698", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/09/DP-4.2-ALUMNOS-OBSTETRICIA-ED-5-RES-1698.pdf" },
    { nombre: "DP 4.2 NUTRICION ED 4 RES 1700", url: "http://10.5.131.63/intranet/wp-content/uploads/2024/02/DP-4.2-NUTRICION-ED-4-RES-1700.pdf" },
    { nombre: "DP 4.2 Actividades y procedimientos que pueden realizar alumnos de TENS", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/06/DP-4.2-Actividades-y-procedimientos-que-pueden-realizar-alumnos-de-TENS.pdf" },
    { nombre: "DP 5.1 ED 3 RES", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/DP-5.1-ED-3-RES.pdf" },
    { nombre: "DP 5.1 PROTOCOLO COMITE DE ETICA", url: "http://10.5.131.63/intranet/wp-content/uploads/2024/07/DP-5.1-PROTOCOLO-COMITE-DE-ETICA.pdf" },
    { nombre: "DP 3.1 ED 4 PROTOCOLO DE APROBACION ETICA DE INVESTIGACION EN SERES HUMANOS", url: "http://10.5.131.63/intranet/wp-content/uploads/2024/07/DP-3.1-ED-4-PROTOCOLO-DE-APROBACION-ETICA-DE-INVESTIGACION-EN-SERES-HUMANOS.pdf" },
    { nombre: "EQ 1.1 PROCEDIMIENTO PARA LA ADQUISICION DE EQUIPAMIENTO", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/11/EQ-1.1-PROCEDIMIENTO-PARA-LA-ADQUISICION-DE-EQUIPAMIENTO.pdf" },
    { nombre: "EQ 1.2 ED. 2 SEGUIMIENTO DE VIDA UTIL", url: "http://10.5.131.63/intranet/wp-content/uploads/2020/12/EQ-1.2-ED.-2-SEGUIMIENTO-DE-VIDA-UTIL.pdf" },
    { nombre: "EQ 2.1 ED 6 PROGRAMA DE MANTENCIÓN PREVENTIVA DE EQUIPOS CRITICOS Y AMBULANCIAS", url: "http://10.5.131.63/intranet/wp-content/uploads/2021/10/EQ-2.1-ED-6-PROGRAMA-DE-MANTENCION-PREVENTIVA-DE-EQUIPOS-CRITICOS-Y-AMBULANCIAS.pdf" },
    { nombre: "EQ 2.2 Programa de Mantenimiento Preventivo de Equipos de las Unidades de Apoyo Hsjm", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/06/EQ-2.2-Programa-de-Mantenimiento-Preventivo-de-Equipos-de-las-Unidades-de-Apoyo-Hsjm.pdf" },
    { nombre: "EQ 1.2 ED 3 3 Seguimiento de vida útil equipos médicos", url: "http://10.5.131.63/intranet/wp-content/uploads/2024/03/EQ-1.2-ED-3-3-Seguimiento-de-vida-util-equipos-medicos.pdf" },
    { nombre: "EQ 3.1 ED 4 PROTOCOLO PERFIL TECNICO O PRESIONAL DEL PERSONAL AUTORIZADO PARA OPERAR EQUIPOS RELEVANTES", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/06/EQ-3.1-ED-4-PROTOCOLO-PERFIL-TECNICO-O-PRESIONAL-DEL-PERSONAL-AUTORIZADO-PARA-OPERAR-EQUIPOS-RELEVANTES.pdf" },
    { nombre: "GCL 1.1 Ed 4 PROTOCOLO PRE ANESTESICO", url: "http://10.5.131.63/intranet/wp-content/uploads/2021/04/GCL-1.1-Ed-4-PROTOCOLO-PRE-ANESTESICO.pdf" },
    { nombre: "GCL 1.2 ED 4 PROT. ATENCIÓN DE ENFERMERIA", url: "http://10.5.131.63/intranet/wp-content/uploads/2022/10/GCL-1.2-ED-4-PROT.-ATENCION-DE-ENFERMERIA-.pdf" },
    { nombre: "GCL 1.13 ED 3 RES", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/GCL-1.13-ED-3-RES.pdf" },
    { nombre: "GCL 3.3 HDA OP ED 5 RES", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/GCL-3.3-HDA-OP-ED-5-RES.pdf" },
    { nombre: "GCL 1.4 ED 3 RES I", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/GCL-1.4-ED-3-RES-I.pdf" },
    { nombre: "GCL 1.4 ED 3 RES II", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/GCL-1.4-ED-3-RES-II.pdf" },
    { nombre: "GCL 2.2 CAIDAS ED 4 RES", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/GCL-2.2-CAIDAS-ED-4-RES.pdf" },
    { nombre: "GCL 2.2 ED 4 ERROR DE MED RES", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/GCL-2.2-ED-4-ERROR-DE-MED-RES.pdf" },
    { nombre: "GCL 2.3 EVENTOS ADVERSOS ED 5 RES 6152", url: "http://10.5.131.63/intranet/wp-content/uploads/2024/07/GCL-2.3-EVENTOS-ADVERSOS-ED-5-RES-6152.pdf" },
    { nombre: "GCL 3.3 ED 4 CVC RES", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/GCL-3.3-ED-4-CVC-RES.pdf" },
    { nombre: "GCL-1_11-APA-1_2-Obtencion-rotulacion-registro-traslado-criterios-de-rechazo-y-recepcion- de- biopsia HSJD", url: "http://10.5.131.63/intranet/wp-content/uploads/2022/08/GCL-1_11-APA-1_2-Obtencion-rotulacion-registro-traslado-criterios-de-rechazo-y-recepcion-de-biopsia-HSJD.pdf" },
    { nombre: "GCL 1.3 Ed. 3 Manejo de Dolor Agudo Post-Operatorio", url: "http://10.5.131.63/intranet/wp-content/uploads/2021/05/GCL-1.3-Ed.-3-Manejo-de-Dolor-Agudo-Post-Operatorio.pdf" },
    { nombre: "GCL-1.4-REANIMACION CARDIOPULMONAR EN ADULTOS, PEDIATRICOS Y NEONATAL", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/11/GCL-1.4-REANIMACION-CARDIOPULMONAR-EN-ADULTOS-PEDIATRICOS-Y-NEONATAL.pdf" },
    { nombre: "GCL 1.5 Ed. 5 Protocolo de Ingreso y Egreso Unidad de Pacientes Críticos", url: "http://10.5.131.63/intranet/wp-content/uploads/2021/05/GCL-1.5-Ed.-5-Protocolo-de-Ingreso-y-Egreso-Unidad-de-Pacientes-Cr%C3%ADticos.pdf" },
    { nombre: "GCL 1.6 ED. 4 INDICACIÓN CESAREA", url: "http://10.5.131.63/intranet/wp-content/uploads/2021/07/GCL-1.6-ED.-4-INDICACION-CESAREA.pdf" },
    { nombre: "GCL 1.7 Indicación médica de transfusión de hemo componentes", url: "http://10.5.131.63/intranet/wp-content/uploads/2024/08/GCL-1.7-Indicacion-medica-de-transfusion-de-hemo-componentes.pdf" },
    { nombre: "GCL 1.8 Ed N°1 DERIVACIÓN PACIENTES URO-ONCOLOGICOS DE HSJM A HSJDD", url: "http://10.5.131.63/intranet/wp-content/uploads/2021/03/GCL-1.8-Ed-N%C2%B01-DERIVACI%C3%93N-PACIENTES-URO-ONCOLOGICOS-DE-HSJM-A-HSJDD.pdf" },
    { nombre: "COMITÉ ONCOLOGICO RES 119", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/06/COMITE-ONCOLOGICO-RES-119.pdf" },
    { nombre: "Res.-Comite-Oncologico-paciente-Adulto", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/06/Res.-Comite-Oncologico-paciente-Adulto.pdf" },
    { nombre: "Res.-Comite-Oncologico-paciente-Pediatrico (1)", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/06/Res.-Comite-Oncologico-paciente-Pediatrico-1.pdf" },
    { nombre: "GCL 1.9 CONTENCIÓN FÍSICA ED. 3", url: "http://10.5.131.63/intranet/wp-content/uploads/2021/05/GCL-1.9-CONTENCI%C3%93N-F%C3%8DSICA-ED.-3.pdf" },
    { nombre: "GCL 1.10 CRITERIOS DE INGRESO, EGRESO Y DERIVACION DE PACIENTES CON INTENTO DE SUICIDIO", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/GCL-1.10-CRITERIOS-DE-INGRESO-EGRESO-Y-DERIVACION-DE-PACIENTES-CON-INTENTO-DE-SUICIDIO.pdf" },
    { nombre: "GCL-1.11-ED.-6-Protocolo-registro-rotulación-traslado-recepción-y-distribución-de-informes-de-biopsias-HSJM.pdf", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/11/GCL-1.11-ED.-6-Protocolo-registro-rotulacion-traslado-recepcion-y-distribucion-de-informes-de-biopsias-HSJM.pdf.pdf" },
    { nombre: "GCL 1.12 ED5 Identificación de pacientes", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/07/GCL-1.12-ED5-Identificacion-de-pacientes-1.pdf" },
    { nombre: "GCL 1.13 ED. 3 TACO ACTUALIZADO", url: "http://10.5.131.63/intranet/wp-content/uploads/2020/12/GCL-1.13-ED.-3-TACO-ACTUALIZADO.pdf" },
    { nombre: "GCL 2.1 ed. 4 Prevención evento adverso asociado a proceso Qx.", url: "http://10.5.131.63/intranet/wp-content/uploads/2021/04/GCL-2.1-ed.-4-Prevenci%C3%B3n-evento-adverso-asociado-a-proceso-Qx..pdf" },
    { nombre: "GCL 2.2 ED5 Prevención De Caídas", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/07/GCL-2.2-ED5-Prevencion-De-Caidas.pdf" },
    { nombre: "GCL 2.2 ED. 4 ERROR DE MEDICACION", url: "http://10.5.131.63/intranet/wp-content/uploads/2020/12/GCL-2.2-ED.-4-ERROR-DE-MEDICACION.pdf" },
    { nombre: "GCL 2.2 Ed. 5 PROTOCOLO PREVENCIÓN ULCERAS POR PRESIÓN", url: "http://10.5.131.63/intranet/wp-content/uploads/2021/03/GCL-2.2-Ed.-5-PROTOCOLO-PREVENCI%C3%93N-ULCERAS-POR-PRESI%C3%93N.pdf" },
    { nombre: "GCL 2.3 ED. 4 VIGILANCIA Y NOTIFICACIÓN EVENTOS ADVERSOS", url: "http://10.5.131.63/intranet/wp-content/uploads/2022/03/GCL-2.3-ED.-4-VIGILANCIA-Y-NOTIFICACION-EVENTOS-ADVERSOS.pdf" },
    { nombre: "GCL 3.2 ED 8 SISTEMA DE VIGILANCIA DE INFECCIONES ASOCIADAS A LA ATENCION DE SALUD", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/11/GCL-3.2-ED-8-SISTEMA-DE-VIGILANCIA-DE-INFECCIONES-ASOCIADAS-A-LA-ATENCION-DE-SALUD.pdf" },
    { nombre: "GCL 3.2 ED. 1 PREVENCIÓN ENDOFTALMITIS POST CIRUGÍA DE CATARATAS", url: "http://10.5.131.63/intranet/wp-content/uploads/2021/06/GCL-3.2-ED.-1-PREVENCI%C3%93N-ENDOFTALMITIS-POST-CIRUG%C3%8DA-DE-CATARATAS.pdf" },
    { nombre: "Gcl 3.3 prevención de IAAS por catéter venoso periférico", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/01/Gcl-3.3-prevencion-de-IAAS-por-cateter-venoso-periferico.pdf" },
    { nombre: "Gcl 3.3 prevención de IAAS por catéter urinario", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/01/Gcl-3.3-prevencion-de-IAAS-por-cateter-urinario.pdf" },
    { nombre: "Gcl 3.3 PREVENCION DE ENDOMETRITIS PUERPERAL", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/02/Gcl-3.3-PREVENCION-DE-ENDOMETRITIS-PUERPERAL.pdf" },
    { nombre: "GCL 3.3 ED. 4 INSTAL, MANTENCIÓN Y RETIRO CVC", url: "http://10.5.131.63/intranet/wp-content/uploads/2020/12/GCL-3.3-ED.-4-INSTAL-MANTENCI%C3%93N-Y-RETIRO-CVC.pdf" },
    { nombre: "GCL 3.3 PROTOCOLO DE USO DE ANTISÉPTICOS-Y-DESINFECTANTES.pdf", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/01/GCL-3.3-PROTOCOLO-DE-USO-DE-ANTISEPTICOS-Y-DESINFECTANTES.pdf.pdf" },
    { nombre: "GCL-3.3-ED.-6-PREV-HERIDA-OPERATORIA-HSJM.pdf", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/12/GCL-3.3-ED.-6-PREV-HERIDA-OPERATORIA-HSJM.pdf.pdf" },
    { nombre: "GCL 3.3 ED. 5 Precauciones Estándares, Res 344", url: "http://10.5.131.63/intranet/wp-content/uploads/2021/06/GCL-3.3-ED.-5-Precauciones-Est%C3%A1ndares-Res-344.pdf" },
    { nombre: "INS 1.1 ED. 3 PLAN DE PREVENCION DE INCENDIOS", url: "http://10.5.131.63/intranet/wp-content/uploads/2020/12/INS-1.1-ED.-3-PLAN-DE-PREVENCION-DE-INCENDIOS.pdf" },
    { nombre: "INS 2.1- PLAN DE EMERGENCIA Y EVACUACION HSJM", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/10/INS-2.1-PLAN-DE-EMERGENCIA-Y-EVACUACION-HSJM.pdf" },
    { nombre: "INS 3.1 PROTOCOLO DE PROGRAMA DE MANTENIMIENTO PREVENTIVO DE LAS INSTALACIONES RELEVANTES", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/03/INS-3.1-PROTOCOLO-DE-PROGRAMA-DE-MANTENIMIENTO-PREVENTIVO-DE-LAS-INSTALACIONES-RELEVANTES.pdf" },
    { nombre: "INS-3.2-ED.-3-PLAN-DE-CONTINGENCIA-CORTE-DE-LUZ-Y-AGUA.pdf", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/11/INS-3.2-ED.-3-PLAN-DE-CONTINGENCIA-CORTE-DE-LUZ-Y-AGUA.pdf.pdf" },
    { nombre: "INS 1.1 ED 3 RES", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/INS-1.1-ED-3-RES.pdf" },
    { nombre: "INS 3.2 ED 2 RES", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/INS-3.2-ED-2-RES.pdf" },
    { nombre: "REG 1.1 ficha clínica única e individual v7", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/12/REG-1.1-ficha-clinica-unica-e-individual-v7.pdf" },
    { nombre: "Reg 1.4 -ED.4-Solicitud, Entrega, Recepcion, conservacion y Eliminacion de la ficha Clinica.", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/12/Reg-1.4-ED.4-Solicitud-Entrega-Recepcion-conservacion-y-Eliminacion-de-la-ficha-Clinica.pdf" },
    { nombre: "REG 1.2-1.3 ED 3 RES", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/REG-1.2-1.3-ED-3-RES.pdf" },
    { nombre: "REG 1.2.3 Estandarización de Registros Clínicos e Informes de prestaciones realizadas a entregar al paciente.", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/06/REG-1.2.3-Estandarizacion-de-Registros-Clinicos-e-Informes-de-prestaciones-realizadas-a-entregar-al-paciente.pdf" },
    { nombre: "RH 2.1 Ed 5 Manual de Inducción funcionaria HSJM", url: "http://10.5.131.63/intranet/wp-content/uploads/2022/11/RH-2.1-Ed-5-Manual-de-Induccion-funcionaria-HSJM.pdf" },
    { nombre: "RH 2.2 ED. 1 PROGRAMA DE ORIENTACIÓN AL PUESTO DE TRABAJO EN UPC Res N° 449", url: "http://10.5.131.63/intranet/wp-content/uploads/2022/04/RH-2.2-ED.-1-PROGRAMA-DE-ORIENTACION-AL-PUESTO-DE-TRABAJO-EN-UPC-Res-N%C2%B0-449.pdf" },
    { nombre: "RH 2.2 PROGRAMA DE ORIENTACION AL PUESTO DE TRABAJO", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/RH-2.2-PROGRAMA-DE-ORIENTACION-AL-PUESTO-DE-TRABAJO.pdf" },
    { nombre: "RH 2.2 Programa de Orientación al Puesto de Trabajo en Unidad de Farmacia", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/06/RH-2.2-Programa-de-Orientacion-al-Puesto-de-Trabajo-en-Unidad-de-Farmacia.pdf" },
    { nombre: "RH 2.2 ED1 – Orientación de funcionarios a esterilización", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/07/RH-2.2-ED1-Orientacion-de-funcionarios-a-esterilizacion.pdf" },
    { nombre: "RH 2.2 ED1-Orientación puesto de trabajo Gineco-Obstetricia", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/07/RH-2.2-ED1-Orientacion-puesto-de-trabajo-Gineco-Obstetricia.pdf" },
    { nombre: "RH 3.1 ED 3 Programa de Capacitación Institucional anual IAAS Y RCP", url: "http://10.5.131.63/intranet/wp-content/uploads/2021/12/RH-3.1-ED-3-Programa-de-Capacitacion-Institucional-anual-IAAS-Y-RCP.pdf" },
    { nombre: "Rh 4.1 SEGURIDAD Y SALUD OCUPACIONAL", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/02/Rh-4.1-SEGURIDAD-Y-SALUD-OCUPACIONAL.pdf" },
    { nombre: "RH 4.2 ED 6 MANEJO DE ACCIDENTES CON EXPOSICION A FLUIDOS CORPORALES DE ALTO RIESGO BIOLOGICO", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/03/RH-4.2-ED-6-MANEJO-DE-ACCIDENTES-CON-EXPOSICION-A-FLUIDOS-CORPORALES-DE-ALTO-RIESGO-BIOLOGICO.pdf " },
    { nombre: "Rh 4.3 inmunización funcionaria", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/02/Rh-4.3-inmunizacion-funcionaria.pdf" },
    { nombre: "PROTOCOLO TRAZABILIDAD DE DISPOSITIVOS MEDICOS ED 2", url: "http://10.5.131.63/intranet/wp-content/uploads/2025/07/PROTOCOLO-TRAZABILIDAD-DE-DISPOSITIVOS-MEDICOS-ED-2.pdf" },
    { nombre: "PROTOCOLO GESTIÓN DOCUMENTAL", url: "http://10.5.131.63/intranet/wp-content/uploads/2021/08/PROTOCOLO-GESTION-DOCUMENTAL.pdf"},
    { nombre: "PROTOCOLO-TECNOVIGILANCIA-DE-DISPOSITIVOS-MEDICOS", url: "http://10.5.131.63/intranet/wp-content/uploads/2022/09/PROTOCOLO-TECNOVIGILANCIA-DE-DISPOSITIVOS-MEDICOS.pdf" },
    { nombre: "PROTOCOLO ATENCIÓN PREFERENTE HSJM", url: "http://10.5.131.63/intranet/wp-content/uploads/2022/01/PROTOCOLO-ATENCION-PREFERENTE-HSJM.pdf" },
    { nombre: "PROTOCOLO CARRO DE PARO res 3684", url: "http://10.5.131.63/intranet/wp-content/uploads/2024/12/PROTOCOLO-CARRO-DE-PARO-res-3684-1.pdf" },
    { nombre: "GUÍA DE CONCILIACIÓN DE MEDICAMENTOS", url: "http://10.5.131.63/intranet/wp-content/uploads/2022/01/GUIA-DE-CONCILIACION-DE-MEDICAMENTOS.pdf" },
    { nombre: "PROTOCOLO PREVENCIÓN ENFERMEDADES TROMBOEMBÓLICAS EN PACIENTES QUIRÚRGICOS ED. 4", url: "http://10.5.131.63/intranet/wp-content/uploads/2025/10/Protocolo-prevencion-enfermedad-tromboembolica-en-pacientes-quirurgicos-1.pdf" },
    { nombre: "GUIA ATENCIÓN DE PACIENTES EN SERVICIO DE MEDICINA FÍSICA Y REHABILITACIÓN POR CONTINGENCIA SANITARIA POR COVID Res N° 338", url: "http://10.5.131.63/intranet/wp-content/uploads/2022/05/GUIA-ATENCION-DE-PACIENTES-EN-SERVICIO-DE-MEDICINA-FISICA-Y-REHABILITACION-POR-CONTINGENCIA-SANITARIA-POR-COVID-Res-N%C2%B0-338.pdf" },
    { nombre: "GUÍA DE ATENCIÓN KINÉSICA PARA PACIENTES COVID 19 HSJM Res N°583", url: "http://10.5.131.63/intranet/wp-content/uploads/2022/05/GUIA-DE-ATENCION-KINESICA-PARA-PACIENTES-COVID-19-HSJM-Res-N%C2%B0583.pdf" },
    { nombre: "PROTOCOLO DE ATENCION KINESICA EN PACIENTES CON PROTESIS DE CADERA Y PROTESIS DE RODILLA", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/05/PROTOCOLO-DE-ATENCION-KINESICA-EN-PACIENTES-CON-PROTESIS-DE-CADERA-Y-PROTESIS-DE-RODILLA.pdf" },
    { nombre: "PROTOCOLO CONTROL DE CALIDAD DE QUÍMICA CLÍNICA Res N° 360-2021", url: "http://10.5.131.63/intranet/wp-content/uploads/2022/05/PROTOCOLO-CONTROL-DE-CALIDAD-DE-QUIMICA-CLINICA-Res-N%C2%B0-360-2021.pdf" },
    { nombre: "PROTOCOLO CONTROL DE CALIDAD INTERNO DE HEMATOLOGÍA Y COAGULACIÓN ED. 1 Res 487-2021", url: "http://10.5.131.63/intranet/wp-content/uploads/2022/05/PROTOCOLO-CONTROL-DE-CALIDAD-INTERNO-DE-HEMATOLOGIA-Y-COAGULACION-ED.-1-Res-487-2021.pdf" },
    { nombre: "PROTOCOLO CONTROL DE CALIDAD INTERNO DE MICROBIOLOGÍA Res N° 371-2021", url: "http://10.5.131.63/intranet/wp-content/uploads/2022/05/PROTOCOLO-CONTROL-DE-CALIDAD-INTERNO-DE-MICROBIOLOGIA-Res-N%C2%B0-371-2021.pdf" },
    { nombre: "PROTOCOLO DE REHABILITACIÓN EN EL PACIENTE HOSPITALIZADO CON TRAQUEOSTOMÍA, MANEJO Y PROCESO DE DECANULACIÓN Res N° 614", url: "http://10.5.131.63/intranet/wp-content/uploads/2022/05/PROTOCOLO-DE-REHABILITACION-EN-EL-PACIENTE-HOSPITALIZADO-CON-TRAQUEOSTOMIA-MANEJO-Y-PROCESO-DE-DECANULACION-Res-N%C2%B0-614.pdf" },
    { nombre: "PROTOCOLO DE RESGUARDO, ENTREGA Y ELIMINACIÓN DE PERTENENCIAS DE USUARIOS EN SERVICIO DE URGENCIA Res N° 280-2021", url: "http://10.5.131.63/intranet/wp-content/uploads/2022/05/PROTOCOLO-DE-RESGUARDO-ENTREGA-Y-ELIMINACION-DE-PERTENENCIAS-DE-USUARIOS-EN-SERVICIO-DE-URGENCIA-Res-N%C2%B0-280-2021.pdf" },
    { nombre: "PROTOCOLO DE SEGUIMIENTO, RESCATE Y FACTURACIÓN PACIENTES LEY DE URGENCIA Res N° 336-2021", url: "http://10.5.131.63/intranet/wp-content/uploads/2022/05/PROTOCOLO-DE-SEGUIMIENTO-RESCATE-Y-FACTURACION-PACIENTES-LEY-DE-URGENCIA-Res-N%C2%B0-336-2021.pdf" },
    { nombre: "PROTOCOLO DE TAMIZAJE DE DROGAS ED 1, Res. N° 831", url: "http://10.5.131.63/intranet/wp-content/uploads/2022/05/PROTOCOLO-DE-TAMIZAJE-DE-DROGAS-ED-1-Res.-N%C2%B0-831.pdf" },
    { nombre: "PROTOCOLO MANEJO Y ENTREGA DE FALLECIDOS Res. N°86", url: "http://10.5.131.63/intranet/wp-content/uploads/2022/05/PROTOCOLO-MANEJO-Y-ENTREGA-DE-FALLECIDOS-Res.-N%C2%B086.pdf" },
    { nombre: "PROTOCOLO PRONACIÓN PACIENTES UPC Res N° 335-2021", url: "http://10.5.131.63/intranet/wp-content/uploads/2022/05/PROTOCOLO-PRONACION-PACIENTES-UPC-Res-N%C2%B0-335-2021.pdf" },
    { nombre: "PROTOCOLO REALIZACIÓN DE ESTUDIOS EN UNIDAD DE CARDIOLOGÍA Res N° 413-2021", url: "http://10.5.131.63/intranet/wp-content/uploads/2022/05/PROTOCOLO-REALIZACION-DE-ESTUDIOS-EN-UNIDAD-DE-CARDIOLOGIA-Res-N%C2%B0-413-2021.pdf" },
    { nombre: "PROTOCOLO SEDOANALGESIA UPC Res.Exenta 730", url: "http://10.5.131.63/intranet/wp-content/uploads/2022/05/PROTOCOLO-SEDOANALGESIA-UPC-Res.Exenta-730.pdf" },
    { nombre: "REGLAMENTO INTERNO DE HIGIENE Y SEGURIDAD 2021 ED 1 RES N°567", url: "http://10.5.131.63/intranet/wp-content/uploads/2022/05/REGLAMENTO-INTERNO-DE-HIGIENE-Y-SEGURIDAD-2021-ED-1-RES-N%C2%B0567.pdf" },
    { nombre: "MANUAL DE PROCEDIMIENTOS KINE, FONO Y TERAPIA OCUPACIONAL EN UPC", url: "http://10.5.131.63/intranet/wp-content/uploads/2022/07/MANUAL-DE-PROCEDIMIENTOS-KINE-FONO-Y-TERAPIA-OCUPACIONAL-EN-UPC.pdf" },
    { nombre: "MANUAL VACUNATORIO HSJM", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/04/MANUAL-VACUNATORIO-HSJM.pdf" },
    { nombre: "SISTEMA DE REGISTRO PARA LA TRAZABILIDAD DE DISPOSISTIVOS MEDICOS HSJM", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/11/SISTEMA-DE-REGISTRO-PARA-LA-TRAZABILIDAD-DE-DISPOSISTIVOS-MEDICOS-HSJM.pdf" },
    { nombre: "PROTOCOLO DE ANALISIS RE INTERVENCIONES QUIRURGICAS HSJM", url: "http://10.5.131.63/intranet/wp-content/uploads/2023/11/PROTOCOLO-DE-ANALISIS-RE-INTERVENCIONES-QUIRURGICAS-HSJM.pdf" },
    { nombre: "PROTOCOLO GCL 2.2 LPP ED 6 RES 6479", url: "http://10.5.131.63/intranet/wp-content/uploads/2024/07/PROTOCOLO-GCL-2.2-LPP-ED-6-RES-6479.pdf" },
    { nombre: "PPT RESULTADOS CEAL-SM 2024.", url: "http://10.5.131.63/intranet/wp-content/uploads/2025/11/PPT-RESULTADOS-CEAL-SM-2024.pdf" },
    { nombre: "FLUJO DE DERIVACIÓN", url: "http://10.5.131.63/intranet/wp-content/uploads/2025/11/FLUJO-DE-DERIVACION.pdf" },
    { nombre: "PLAN PROGRAMA TRABAJO PREVENCIÓN DE RIESGOS HSJM 2025", url: "http://10.5.131.63/intranet/wp-content/uploads/2025/11/PLAN-PROGRAMA-TRABAJO-PREVENCION-DE-RIESGOS-HSJM-2025.pdf" }
 
    

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
            <ShieldCheck className="text-[#00a19a] hidden md:block" size={48} />
            <h2 className="text-3xl md:text-5xl font-black text-slate-700 tracking-tighter uppercase italic">
              Protocolos de Calidad <br/><span className="text-[#003876]">y Acreditación Vigentes</span>
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
            placeholder="Buscar documento o resolución..."
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
            <Search className="mx-auto text-slate-300 mb-4" size={48} />
            <p className="text-xl font-bold text-slate-500">No se encontraron documentos con ese nombre.</p>
            <button onClick={() => setSearchTerm('')} className="mt-4 text-[#00a19a] font-bold hover:underline">
              Limpiar búsqueda
            </button>
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
                <div className="bg-red-100 p-2 rounded-lg shrink-0 group-hover:bg-red-200 transition-colors">
                  <FileText className="text-red-600" size={20} />
                </div>
                <p className="text-sm font-bold text-slate-700 group-hover:text-[#003876] uppercase leading-tight line-clamp-3">
                  {doc.nombre}
                </p>
              </a>
            ))}
          </div>
        )}
        
        <div className="mt-8 text-center text-slate-400 text-sm font-medium">
          Mostrando {documentosFiltrados.length} documento(s)
        </div>
      </div>
    </section>
  );
};

export default CalidadVigente;