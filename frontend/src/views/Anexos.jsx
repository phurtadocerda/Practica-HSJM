import React, { useState, useEffect } from 'react';
import { Search, Mail, Plus, Trash2, Pencil, Save, X, ChevronRight, ChevronLeft as ChevronLeftIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Anexos = ({ userRole }) => {
  const navigate = useNavigate();
  const isJefe = userRole === 'jefe';

  // --- ESTADOS ---
  const [busqueda, setBusqueda] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const registrosPorPagina = 15;

  // 1. CARGA DE DATOS (Intentar leer del navegador o usar la lista completa)
  const [datosAnexos, setDatosAnexos] = useState(() => {
    const saved = localStorage.getItem('anexos_hospital_v3');
    if (saved) return JSON.parse(saved);
    
    return [
        { id: 1, anexo: "245639", unidad: "ABASTECIMIENTO", usuario: "ABASTECIMIENTO", cargo: "ABASTECIMIENTO", mail: "" },
        { id: 2, anexo: "245634", unidad: "Abastecimiento", usuario: "María de los Ángeles Morales Jorquera", cargo: "Jefa de abastecimiento", mail: "maria.moralesj@redsalud.gov.cl" },
        { id: 3, anexo: "245736", unidad: "ABASTECIMIENTO", usuario: "JEFATURA DE ABASTECIMIENTO/ENCARGADA DE CONVENIOS", cargo: "", mail: "maria.moralesj@redsalud.gov.cl" },
        { id: 4, anexo: "245636", unidad: "ABASTECIMIENTO", usuario: "EJECUTIVO DE COMPRAS", cargo: "EJECUTIVO DE COMPRAS", mail: "" },
        { id: 5, anexo: "245637", unidad: "ABASTECIMIENTO", usuario: "ENCARGADA DE CONVENIOS", cargo: "ENCARGADA DE CONVENIOS", mail: "" },
        { id: 6, anexo: "245672", unidad: "COMUNICACIONES", usuario: "LUIS DUARTE", cargo: "CENTRAL TELEFONICA", mail: "luis.duarte@redsalud.gov.cl" },
        { id: 7, anexo: "245669", unidad: "APOYO URGENCIA", usuario: "RECAUDADOR", cargo: "RECAUDADOR", mail: "" },
        { id: 8, anexo: "245642", unidad: "ARCHIVO", usuario: "Ximena Pinto", cargo: "", mail: "patricia.pinto@redsalud.gov.cl" },
        { id: 9, anexo: "245648", unidad: "Imagenolgía", usuario: "Sala informes medico radiologo", cargo: "Sala informes medico radiologo", mail: "" },
        { id: 10, anexo: "245748", unidad: "Archivo", usuario: "Alejandra Chamizo", cargo: "Jefatura", mail: "maria.chamizo@redsalud.gov.cl" },
        { id: 11, anexo: "245652", unidad: "ARCHIVO PASIVO", usuario: "Patricio Ballesteros", cargo: "", mail: "patricio.ballesteros@redsalud.gov.cl" },
        { id: 12, anexo: "245584", unidad: "ASISTENTE SOCIAL", usuario: "SONIA ALVARADO", cargo: "ENCARGADA BIENESTAR", mail: "sonia.alvarado@redsalud.gov.cl" },
        { id: 13, anexo: "245704", unidad: "BIOPSIAS", usuario: "ELIZABETH JORQUERA", cargo: "ENCARGADA BIOPSIAS", mail: "elizabeth.jorqueraf@redsalud.gov.cl" },
        { id: 14, anexo: "245568", unidad: "Bodega abastecimiento", usuario: "Jorge Roblero", cargo: "Jefa de bodega", mail: "" },
        { id: 15, anexo: "245725", unidad: "Bodega Farmacia", usuario: "Euguenio Vargas Chávez", cargo: "Encargado Bodega de Farmacia", mail: "eugenio.vargas@redsalud.gov.cl" },
        { id: 16, anexo: "245773", unidad: "BOTIQUIN FARMACIA", usuario: "BOTIQUIN FARMACIA", cargo: "", mail: "" },
        { id: 17, anexo: "245615", unidad: "Proced. Endoscópicos - Cir. Menor - Proceso Qx. Oftalmológico", usuario: "Francisca Arenas Carvajal", cargo: "Proced. Endoscópicos - Cir. Menor - Proceso Qx. Oftalmológico", mail: "procedimientos.cae@redsalud.gov.cl" },
        { id: 18, anexo: "245616", unidad: "GES, SIGGES, GESTION ONCOLOGICA", usuario: "ANTONIETA OLIVARES O.", cargo: "JEFE GES, SIGGES, GESTION ONCOLOGICA", mail: "antonieta.olivares@redsalud.gov.cl" },
        { id: 19, anexo: "245617", unidad: "BOX 13 CIRUGIA AMBULATORIA", usuario: "", cargo: "TECNICO DE TURNO", mail: "" },
        { id: 20, anexo: "245618", unidad: "BOX 14 OFTALMOLOGIA", usuario: "DRA. COLL", cargo: "OFTALMOLOGA", mail: "" },
        { id: 21, anexo: "245619", unidad: "BOX 15", usuario: "", cargo: "MEDICO DE TURNO", mail: "" },
        { id: 22, anexo: "245620", unidad: "BOX 16", usuario: "", cargo: "MEDICO DE TURNO", mail: "" },
        { id: 23, anexo: "245625", unidad: "TACO", usuario: "Stephanie Bruna Véliz", cargo: "TACO", mail: "stephanie.bruna@redsalud.gov.cl" },
        { id: 24, anexo: "245626", unidad: "BOX 20", usuario: "DENTAL", cargo: "DENTISTA DE TURNO", mail: "" },
        { id: 25, anexo: "245627", unidad: "BOX 21", usuario: "DENTAL", cargo: "DENTISTA DE TURNO", mail: "" },
        { id: 26, anexo: "245628", unidad: "BOX 22", usuario: "DENTAL", cargo: "DENTISTA DE TURNO", mail: "" },
        { id: 27, anexo: "245629", unidad: "BOX 23", usuario: "DENTAL", cargo: "DENTISTA DE TURNO", mail: "" },
        { id: 28, anexo: "245705", unidad: "BOX 24", usuario: "DENTAL", cargo: "DENTISTA DE TURNO", mail: "" },
        { id: 29, anexo: "245631", unidad: "BOX 25", usuario: "DENTAL", cargo: "DENTISTA DE TURNO", mail: "" },
        { id: 30, anexo: "245632", unidad: "BOX 26", usuario: "LABORATORIO DENTAL", cargo: "", mail: "" },
        { id: 31, anexo: "245593", unidad: "BOX 27", usuario: "UMAH", cargo: "ENFERMERA", mail: "" },
        { id: 32, anexo: "245594", unidad: "BOX 28", usuario: "BOX GINECOLOGICO", cargo: "GINECOLOGO DE TURNO", mail: "" },
        { id: 33, anexo: "245595", unidad: "BOX 29", usuario: "GINECOLOGIA GENERAL", cargo: "GINECOLOGO DE TURNO", mail: "" },
        { id: 34, anexo: "245608", unidad: "BOX 2 TRAUMATOLOGIA", usuario: "TRAUMATOLOGIA", cargo: "", mail: "" },
        { id: 35, anexo: "245596", unidad: "BOX 30", usuario: "SALUD SEXUAL", cargo: "MATRONA DE TURNO", mail: "" },
        { id: 36, anexo: "245597", unidad: "BOX 31", usuario: "MONICA WALTON", cargo: "MATRONA CAE", mail: "monica.walton@redsalud.gov.cl" },
        { id: 37, anexo: "245599", unidad: "BOX 33", usuario: "OFICINA MONITOREO", cargo: "", mail: "" },
        { id: 38, anexo: "245600", unidad: "BOX 34", usuario: "MONITORA SIGGES", cargo: "MONITORA SIGGES", mail: "" },
        { id: 39, anexo: "245601", unidad: "BOX 35", usuario: "DR. CARMONA", cargo: "COLOPROCTOLOGIA- PSIQUIATRIA", mail: "" },
        { id: 40, anexo: "245602", unidad: "PARTICIPACION CIUDADANA", usuario: "MARITZA CARRASCO", cargo: "ENCARGADA PARTICIPACION CIUDADANA", mail: "maritza.carrasco@redsalud.gov.cl" },
        { id: 41, anexo: "245603", unidad: "OIRS", usuario: "LEYLA VALLADARES - JEANNETTE CEA", cargo: "JEFATURA OIRS - PROFESIONAL APOYO OIRS", mail: "leyla.valladares@redsalud.gov.cl" },
        { id: 42, anexo: "245605", unidad: "OIRS", usuario: "RAUL BUSTAMANTE", cargo: "ASISTENTE SOCIAL OIRS", mail: "raul.bustante@redsalud.gov.cl" },
        { id: 43, anexo: "245604", unidad: "BOX 38", usuario: "OIRS", cargo: "MARIANA LAZO- ISABEL VARGAS", mail: "mariana.lazo@redsalud.gov.cl" },
        { id: 44, anexo: "245633", unidad: "COMUNICACIONES", usuario: "BERNARDITA RAMIREZ", cargo: "ATENCION PACIENTES HOSPITALIZADOS", mail: "bernardita.ramirez@redsalud.gov.cl" },
        { id: 45, anexo: "245590", unidad: "BOX 40", usuario: "CECILIA ELGUETA - WOLFGANG KAGELMACHER", cargo: "JEFATURA CAE", mail: "ana.elgueta@redsalud.gov.cl" },
        { id: 46, anexo: "245612", unidad: "BOX 45", usuario: "ROSSANA YAÑEZ", cargo: "JEFATURA", mail: "rossana.yanez@redsalud.gov.cl" },
        { id: 47, anexo: "245609", unidad: "Polos Especialidades CDT", usuario: "Carolina Emack Magaña", cargo: "Traumatología", mail: "esp.traumatologia@redsalud.gov.cl" },
        { id: 48, anexo: "245610", unidad: "BOX 5 PEDIATRIA CAE", usuario: "", cargo: "", mail: "" },
        { id: 49, anexo: "245611", unidad: "BOX 6 PEDIATRIA CAE", usuario: "", cargo: "", mail: "" },
        { id: 50, anexo: "245659", unidad: "BOX URGENCIA ADULTOS", usuario: "TECNICO DE TURNO", cargo: "", mail: "" },
        { id: 51, anexo: "245732", unidad: "CALDERA", usuario: "", cargo: "", mail: "" },
        { id: 52, anexo: "245747", unidad: "CALIDAD", usuario: "JAMIE PEREZ AEDO", cargo: "JEFATURA CALIDAD Y SEGURIDAD PACIENTE", mail: "calidad.hsjm@redsalud.gov.cl" },
        { id: 53, anexo: "245707", unidad: "CALIDAD", usuario: "SECRETARIA", cargo: "SECRETARIA CALIDAD", mail: "" },
        { id: 54, anexo: "245588", unidad: "IAAS / EPIDEMIOLOGIA", usuario: "GIANINA CAÑAS / DR. SALOME CASTILLO", cargo: "JEFATURA", mail: "iaashsjm@redsalud.gob.cl" },
        { id: 55, anexo: "247610", unidad: "Estadisticas", usuario: "Olivia Carrasco", cargo: "", mail: "olivia.carrasco@redsalud.gov.cl" },
        { id: 56, anexo: "245745", unidad: "CALL-CENTER", usuario: "ROSA ESCARATE", cargo: "", mail: "" },
        { id: 57, anexo: "247613", unidad: "CALL- CENTER", usuario: "SONIA FARIAS", cargo: "", mail: "" },
        { id: 58, anexo: "247612", unidad: "POLO OFTALMOLOGIA", usuario: "ROMINA MARTINEZ", cargo: "", mail: "" },
        { id: 59, anexo: "247614", unidad: "CALL- CENTER", usuario: "JACQUELINE PEREZ", cargo: "", mail: "" },
        { id: 60, anexo: "247615", unidad: "UNIDAD LISTA DE ESPERA", usuario: "KAREN SANTIBAÑEZ ARCUCH", cargo: "ENCARGADA", mail: "karen.santibanez@redsalud.gov.cl" },
        { id: 61, anexo: "247611", unidad: "Censo - Estadisticas", usuario: "Juana Cortéz - Francisca Rivera", cargo: "", mail: "jluisa.cortes@redsalud.gov.cl" },
        { id: 62, anexo: "245567", unidad: "CAPACITACION", usuario: "ALBERTO OVALLE", cargo: "ENCARGADO", mail: "alberto.ovalle@redsalud.gov.cl" },
        { id: 63, anexo: "229203", unidad: "Capacitación y Formación", usuario: "Carlos Schulmeyer Jara", cargo: "Profesional", mail: "carlos.schulmeyer@redsalud.gov.cl" },
        { id: 64, anexo: "245598", unidad: "CASA CLUB", usuario: "CASA CLUB", cargo: "", mail: "" },
        { id: 65, anexo: "245722", unidad: "CENTRAL ESTERILIZACION", usuario: "ENCARGADA DE TURNO", cargo: "", mail: "" },
        { id: 66, anexo: "245555", unidad: "COMUNICACIONES", usuario: "LUIS DUARTE", cargo: "ENCARGADO CENTRAL TELEFONICA", mail: "luis.duarte@redsalud.gov.cl" },
        { id: 68, anexo: "247618", unidad: "Chile Crece Contigo", usuario: "Marie Claire Lacouture", cargo: "Psicóloga", mail: "marie.lacouture@redsalud.gov.cl" },
        { id: 69, anexo: "245702", unidad: "CHOFERES", usuario: "CHOFER DE TURNO", cargo: "", mail: "" },
        { id: 70, anexo: "245684", unidad: "CMA", usuario: "LAURA ECHEVERRIA", cargo: "SUPERVISORA", mail: "laura.echeverria@redsalud.gov.cl" },
        { id: 71, anexo: "245570", unidad: "CONTABILIDAD", usuario: "", cargo: "", mail: "stephanie.vargasp@redsalud.gov.cl" },
        { id: 72, anexo: "245569", unidad: "CONTABILIDAD", usuario: "CONTABILIDAD", cargo: "JEFATURA", mail: "" },
        { id: 73, anexo: "245571", unidad: "CONTABILIDAD", usuario: "LUIS FARIAS", cargo: "", mail: "luis.farias@redsalud.gov.cl" },
        { id: 74, anexo: "245572", unidad: "CONTABILIDAD", usuario: "ELIAS HERNANDEZ", cargo: "", mail: "elias.hernandez@redsalud.gov.cl" },
        { id: 75, anexo: "245689", unidad: "CONTROL DE GESTION", usuario: "CLAUDIA PEREZ", cargo: "JEFATURA", mail: "claudia.perezh@redsalud.gov.cl" },
        { id: 76, anexo: "245770", unidad: "CTA", usuario: "SUSANA PIZARRO", cargo: "JEFA UNIDAD", mail: "susana.pizarros@redsalud.gov.cl" },
        { id: 77, anexo: "245622", unidad: "Programa CP y AD", usuario: "Denisse Hinojosa", cargo: "Programa CP y AD", mail: "denisse.hinojosa@redsalud.gov.cl" },
        { id: 78, anexo: "245566", unidad: "Calidad de Vida", usuario: "Silvana Muñoz Cañete", cargo: "Profesional", mail: "silvana.munoz@redsalud.gov.cl" },
        { id: 79, anexo: "245661", unidad: "DESARROLLO ORGANIZACIONAL", usuario: "SILVANA MUÑOZ CAÑETE", cargo: "ENCARGADA", mail: "silvana.munozc@redsalud.gov.cl" },
        { id: 80, anexo: "245552", unidad: "DIRECCION", usuario: "OSCAR VARGAS DURANTI", cargo: "DIRECTOR", mail: "oscar.vargasd@redsalud.gov.cl" },
        { id: 81, anexo: "245623", unidad: "HOSPITALIZACION DOMICILIARIA", usuario: "DRA. VICTORIA DIAZ-GRANADOS", cargo: "MEDICO JEFE", mail: "victoria.diazg@redsalud.gov.cl" },
        { id: 82, anexo: "245710", unidad: "Cirugia", usuario: "Patricio Muñoz", cargo: "Supervisor", mail: "scirugia.hsjm@redsalud.gov.cl" },
        { id: 83, anexo: "245643", unidad: "ESTADISTICA", usuario: "VIVIANA PIÑEIRO", cargo: "JEFE", mail: "viviana.pineiro@redsalud.gov.cl" },
        { id: 84, anexo: "245641", unidad: "ESTADISTICA", usuario: "Daniela Escalona", cargo: "", mail: "daniela.escalona@redsalud.gov.c" },
        { id: 85, anexo: "245640", unidad: "EST. ENFER CAE", usuario: "TECNICO DE TURNO", cargo: "TECNICO DE TURNO", mail: "" },
        { id: 86, anexo: "245709", unidad: "CIRUGIA", usuario: "SECRETARIA", cargo: "SECRETARIA", mail: "secretariacirgugia@redsalud.gov.cl" },
        { id: 87, anexo: "245685", unidad: "EST ENFER. MATERNIDAD", usuario: "MATRONA DE TURNO", cargo: "", mail: "" },
        { id: 88, anexo: "245706", unidad: "EST.ENFERMERIA MATERNIDAD", usuario: "MEDICOS DE TURNO", cargo: "", mail: "" },
        { id: 89, anexo: "245698", unidad: "UCI", usuario: "YENNY VERA", cargo: "ENFERMERA SUPERVISORA", mail: "yenny.vera@redsalud.gob.cl" },
        { id: 90, anexo: "245699", unidad: "EST.ENFERMERIA MEDICINA B", usuario: "", cargo: "", mail: "" },
        { id: 91, anexo: "245713", unidad: "PEDIATRIA", usuario: "ESTACION", cargo: "SUPERVISORA", mail: "margarita.tapia@redsalud.gob.cl" },
        { id: 92, anexo: "245686", unidad: "Pensionado", usuario: "Nicole Tapia", cargo: "Supervisora", mail: "" },
        { id: 93, anexo: "245586", unidad: "EST. ENFER UTI", usuario: "Cecilia Echeverria", cargo: "GCE Uti", mail: "cecilia.echeverriam@redsalud.gov.cl" },
        { id: 94, anexo: "245721", unidad: "Esterilización", usuario: "Judith Herrada", cargo: "Supervisora", mail: "judith.herrada@redsalud.gov.cl" },
        { id: 95, anexo: "245697", unidad: "Farmacia 24", usuario: "Elizabeth Yévenes Jerez", cargo: "Jefa de Farmacia", mail: "elizabeth.yevenes@redsalud.gov.cl" },
        { id: 96, anexo: "245696", unidad: "FARMACIA 24 HRS", usuario: "SECRETARIA F24", cargo: "", mail: "" },
        { id: 97, anexo: "245607", unidad: "Farmacia Atencion Abierta", usuario: "Felipe Fuentes Viveros", cargo: "Encargado", mail: "felipe.fuentesv@redsalud.gov.cl" },
        { id: 98, anexo: "722696939", unidad: "FINIS TERRAE", usuario: "", cargo: "", mail: "" },
        { id: 99, anexo: "245693", unidad: "GESTION DE CAMAS", usuario: "KARLA ARAYA", cargo: "SUPERVISORA", mail: "karla.araya@redsalud.gov.cl" },
        { id: 100, anexo: "245720", unidad: "GESTION DE CAMAS", usuario: "INES MALLEA", cargo: "SECRETARIA", mail: "ines.mallea@redsalud.gov.cl" },
        { id: 101, anexo: "245581", unidad: "Contabilidad", usuario: "Carlos Quiroga Catalán", cargo: "Jefe", mail: "carlos.quiroga@redsalud.gov.cl" },
        { id: 102, anexo: "245582", unidad: "GESTION FINANCIERA", usuario: "", cargo: "", mail: "" },
        { id: 103, anexo: "245746", unidad: "Finanzas", usuario: "Ana María Villouta Villarroel", cargo: "Jefa", mail: "ana.villouta@redsalud.gov.cl" },
        { id: 104, anexo: "245613", unidad: "GESTORA GES", usuario: "QUIRURGICA", cargo: "", mail: "" },
        { id: 105, anexo: "245557", unidad: "GRD", usuario: "BELEN GONZALEZ LECAROS", cargo: "JEFA", mail: "belen.gonzalezl@redsalud.gov.cl" },
        { id: 106, anexo: "245580", unidad: "INFORMATICA", usuario: "SOPORTE", cargo: "", mail: "" },
        { id: 107, anexo: "245579", unidad: "INFORMATICA", usuario: "ALDO PIZARRO PIZARRO", cargo: "JEFATURA", mail: "aldo.pizarro@redsalud.gov.cl" },
        { id: 108, anexo: "245592", unidad: "Desarrollo Organizacional", usuario: "Alejandro Muñoz", cargo: "Profesional", mail: "alejandro.munoz@redsalud.gov.cl" },
        { id: 109, anexo: "245655", unidad: "Laboratorio y UMT", usuario: "Tiare Zuchel", cargo: "Jefatura", mail: "tiare.zuchel@redsalud.gov.cl" },
        { id: 110, anexo: "245749", unidad: "JURIDICA", usuario: "JORGE HERRERA FIGUEROA", cargo: "JEFE", mail: "jorge.herreraf@redsalud.gov.cl" },
        { id: 111, anexo: "245556", unidad: "JURIDICA", usuario: "ROBERTO MASSARELI", cargo: "PROFESIONAL", mail: "juridica.hsjm@redsalud.gov.cl" },
        { id: 112, anexo: "245645", unidad: "Medicina Fisica", usuario: "Secretaria Kinesiologia", cargo: "", mail: "rhb.secretaria@redsalud.gov.cl" },
        { id: 113, anexo: "245651", unidad: "Laboratorio y UMT", usuario: "TM Turno", cargo: "", mail: "" },
        { id: 114, anexo: "245730", unidad: "LAVANDERIA", usuario: "", cargo: "", mail: "" },
        { id: 115, anexo: "245771", unidad: "MATERNIDAD", usuario: "ARIEL GUIÑEZ", cargo: "SUPERVISOR", mail: "supgo.hsjm@redsalud.gob.cl" },
        { id: 116, anexo: "245703", unidad: "MEDICINA", usuario: "IBONNE CATALAN", cargo: "SUPERVISORA", mail: "ibonne.catalan@redsalud.gov.cl" },
        { id: 117, anexo: "245700", unidad: "MEDICINA", usuario: "SECRETARIA", cargo: "", mail: "carola.contrerasf@redsalud.gob.cl" },
        { id: 118, anexo: "247616", unidad: "MODULO 1", usuario: "ADMISION SOME", cargo: "", mail: "" },
        { id: 119, anexo: "247622", unidad: "Polos especialidades", usuario: "Daniela Allende Rojo", cargo: "Interna", mail: "" },
        { id: 120, anexo: "247617", unidad: "Polos Especialidades", usuario: "Romina Martínez Ortíz", cargo: "Pediatría", mail: "esp.infantileshjsm@redsalud.gov.cl" },
        { id: 121, anexo: "245638", unidad: "Polos especialidades", usuario: "Catalina Gutierrez Núñez", cargo: "Urología", mail: "esp.uronefrohsjm@redsalud.gov.cl" },
        { id: 122, anexo: "247621", unidad: "Polos Especialidades", usuario: "Victoria Alvarez", cargo: "Cirugía", mail: "policirugia.hsjm@redsalud.gov.cl" },
        { id: 123, anexo: "247620", unidad: "Polos especialidades", usuario: "Bárbara Catalán Sánchez", cargo: "Oftalmología", mail: "polo.oftalmologia@redsalud.gov.cl" },
        { id: 124, anexo: "247635", unidad: "MODULO 7", usuario: "", cargo: "ADMISION SOME", mail: "" },
        { id: 125, anexo: "245712", unidad: "NEONATOLOGIA", usuario: "MARCELA UTEAU", cargo: "PEDIATRA", mail: "marcela.uteau@redsalud.gov.cl" },
        { id: 126, anexo: "245658", unidad: "OBSERVACION URGENCIA", usuario: "MEDICO TURNO", cargo: "", mail: "" },
        { id: 127, anexo: "245710", unidad: "CIRUGIA", usuario: "EDUARDO MORALES MEZA", cargo: "JEFE", mail: "scirugia.hsjm@redsalud.gov.cl" },
        { id: 128, anexo: "245576", unidad: "COMUNICACIONES", usuario: "CHRISTIAN CADENAS", cargo: "ADMIN", mail: "esteban.cadenas.c@gmail.com" },
        { id: 129, anexo: "245681", unidad: "OFICINA JEFE PABELLON", usuario: "PABELLON", cargo: "", mail: "" },
        { id: 130, anexo: "245694", unidad: "GINECOLOGIA", usuario: "ARIEL GUIÑEZ", cargo: "SUPERVISOR", mail: "ariel.guinez@redsalud.gov.cl" },
        { id: 131, anexo: "245682", unidad: "OFICINA MEDICOS PABELLON", usuario: "", cargo: "SECRETARIA", mail: "" },
        { id: 132, anexo: "245708", unidad: "UPC", usuario: "GALO AVENDAÑO A.", cargo: "JEFE", mail: "jefeupchsjm@redsalud.gov.cl" },
        { id: 133, anexo: "245723", unidad: "OFICINA NUTRICIONISTAS", usuario: "VALERIA PIZARRO", cargo: "NUTRICIONISTA", mail: "" },
        { id: 134, anexo: "245578", unidad: "OFICINA PARTES", usuario: "PAOLA MUÑOZ", cargo: "ENCARGADA", mail: "oficinapartes.hsjm@redsalud.gov.cl" },
        { id: 135, anexo: "245678", unidad: "OFICINA PRE-PARTO", usuario: "", cargo: "", mail: "" },
        { id: 136, anexo: "245560", unidad: "S.O.G.A", usuario: "CAMILA SANTIS", cargo: "PROFESIONAL", mail: "camila.santis@redsalud.gov.cl" },
        { id: 137, anexo: "245680", unidad: "PABELLONES", usuario: "GERARDO VALDIVIA SALGADO", cargo: "MEDICO JEFE", mail: "gerardo.valdivias@redsalud.gov.cl" },
        { id: 138, anexo: "245656", unidad: "SERVICIO URGENCIA", usuario: "JOSE VILLASMIL NUÑEZ", cargo: "JEFE", mail: "jose.villasmil@redsalud.gov.cl" },
        { id: 139, anexo: "245654", unidad: "Imagenolgía", usuario: "Edgardo Hernandez Lucero", cargo: "jefatura", mail: "jefeimagen.hsjm@redsalud.gov.cl" },
        { id: 140, anexo: "245711", unidad: "OF. JEFE CIRUGIA", usuario: "SECRETARIA", cargo: "", mail: "" },
        { id: 141, anexo: "245644", unidad: "OF. KINESIOLOGIA", usuario: "RICARDO CONTRERAS", cargo: "Jefatura", mail: "ricardo.contreras@redsalud.gov.cl" },
        { id: 142, anexo: "245714", unidad: "OF. MEDICOS PEDIATRIA", usuario: "MEDICO TURNO", cargo: "PEDIATRA", mail: "" },
        { id: 143, anexo: "245670", unidad: "OIRS URGENCIA", usuario: "ASISTENTE SOCIAL", cargo: "", mail: "" },
        { id: 144, anexo: "245676", unidad: "PASILLO PRE-PARTO", usuario: "MATRONA TURNO", cargo: "", mail: "" },
        { id: 145, anexo: "245752", unidad: "PEDIATRIA", usuario: "MARGARITA TAPIA", cargo: "SUPERVISORA", mail: "margarita.tapia@redsalud.gob.cl" },
        { id: 146, anexo: "245614", unidad: "COMUNICACIONES", usuario: "GRETHEL DURAN", cargo: "JEFE", mail: "grethel.duran@redsalud.gov.cl" },
        { id: 147, anexo: "245583", unidad: "PERSONAL", usuario: "JAVIER MIRANDA MANZO", cargo: "ANALISTA", mail: "javier.miranda@redsalud.gov.cl" },
        { id: 148, anexo: "245562", unidad: "Personal", usuario: "jenniffer Cerda Cortez", cargo: "Analista", mail: "jenniffer.cerda@redsalud.gov.cl" },
        { id: 149, anexo: "245563", unidad: "Personal", usuario: "Jenny Farias Troncoso", cargo: "Analista", mail: "jenny.farias@redsalud.gov.cl" },
        { id: 150, anexo: "229304", unidad: "Personal", usuario: "Pamela Sotomayor Aedo", cargo: "Analista", mail: "pamela.sotomayor@redsalud.gov.cl" },
        { id: 151, anexo: "245565", unidad: "Personal", usuario: "Fabian Maureira Matus", cargo: "Analista", mail: "fabian.maureira@redsalud.gov.cl" },
        { id: 152, anexo: "245559", unidad: "Personal", usuario: "Alberto Rodriguez Hernandez", cargo: "Analista", mail: "alberto.rodriguez@redsalud.gov.cl" },
        { id: 153, anexo: "245577", unidad: "Analista Ley Medica", usuario: "Carlos Retamales Nuñez", cargo: "Profesional", mail: "carlos.retamalesn@redsalud.gov.cl" },
        { id: 154, anexo: "245667", unidad: "PORTERIA URGENCIA", usuario: "", cargo: "", mail: "" },
        { id: 155, anexo: "229309", unidad: "PRAIS", usuario: "SECRETARIA", cargo: "", mail: "prais.melipilla@redsalud.gov.cl" },
        { id: 156, anexo: "245772", unidad: "PRAIS", usuario: "MARIA PAZ JORQUERA", cargo: "JEFATURA", mail: "mariapaz.jorquera@redsalud.gov.cl" },
        { id: 157, anexo: "245573", unidad: "PROCESO QUIRURGICO", usuario: "VIVIANA ACEVEDO VILLEGAS", cargo: "ENCARGADA", mail: "viviana.acevedo@redsalud.gov.cl" },
        { id: 158, anexo: "245606", unidad: "REAUDACION CAE", usuario: "RECAUDADOR", cargo: "", mail: "" },
        { id: 159, anexo: "245733", unidad: "Cobranzas", usuario: "Javier Inostroza", cargo: "Encargado", mail: "javier.inostroza@redsalud.gov.cl" },
        { id: 160, anexo: "245741", unidad: "RECAUDACION CENTRAL", usuario: "PABLO MARTINEZ", cargo: "JEFATURA", mail: "pablo.martinez@redsalud.gov.cl" },
        { id: 161, anexo: "245688", unidad: "RECAUDACION PENSIONADO", usuario: "PIA FAUNDEZ", cargo: "RECAUDADOR", mail: "pia.faundez@redsalud.gov.cl" },
        { id: 162, anexo: "245690", unidad: "RECAUDACION PENSIONADO", usuario: "RECAUDACION", cargo: "", mail: "" },
        { id: 163, anexo: "245668", unidad: "RECAUDACION URGENCIA", usuario: "RECAUDADOR", cargo: "", mail: "" },
        { id: 164, anexo: "245650", unidad: "Laboratorio", usuario: "Lesly Manzo", cargo: "Secretaria", mail: "secrelaboratoriohsjm@redsalud.gov.cl" },
        { id: 165, anexo: "245646", unidad: "Imagenolgía", usuario: "Admision", cargo: "", mail: "" },
        { id: 166, anexo: "245679", unidad: "RESIDENCIA MATRONAS", usuario: "", cargo: "", mail: "" },
        { id: 167, anexo: "245564", unidad: "Personal", usuario: "Sebastian Aguilar Reyes", cargo: "Jefe", mail: "jefepersonalhsjm@redsalud.gov.cl" },
        { id: 168, anexo: "245647", unidad: "Imagenolgía", usuario: "Ecotomografia", cargo: "", mail: "" },
        { id: 169, anexo: "245664", unidad: "SALA ESTAR MEDICOS", usuario: "", cargo: "", mail: "" },
        { id: 170, anexo: "245677", unidad: "SALA PRE-PARTO", usuario: "MATRONA TURNO", cargo: "", mail: "" },
        { id: 171, anexo: "245683", unidad: "SALA RECUPERACION", usuario: "TECNICO TURNO", cargo: "", mail: "" },
        { id: 172, anexo: "245589", unidad: "SECRETARIA CAE", usuario: "CECILIA PEREZ", cargo: "SECRETARIA", mail: "cecilia.perezm@redsalud.gov.cl" },
        { id: 173, anexo: "245630", unidad: "CDT", usuario: "CAMILA ESPINOZA MORENO", cargo: "JEFE ODONTOLOGIA", mail: "camila.espinoza@redsalud.gov.cl" },
        { id: 174, anexo: "245554", unidad: "SECRETARIA DIRECCION", usuario: "DIRECCION", cargo: "SECRETARIA", mail: "secretaria.dir@redsalud.gov.cl" },
        { id: 175, anexo: "245671", unidad: "SECRETARIA SUBDIRECCION", usuario: "CAROL DURAN GUERRA", cargo: "SECRETARIA", mail: "secretaria.sub@redsalud.gov.cl" },
        { id: 176, anexo: "245585", unidad: "Control Gestión", usuario: "Felipe Saavedra", cargo: "", mail: "" },
        { id: 177, anexo: "245742", unidad: "SECRETARIA RR.HH.", usuario: "SECRETARIA", cargo: "", mail: "secretariapersonas@redsalud.gov.cl" },
        { id: 178, anexo: "245619", unidad: "SELECTOR", usuario: "TECNICO TURNO", cargo: "", mail: "" },
        { id: 179, anexo: "245718", unidad: "Alimentación", usuario: "Victor Saavedra Barrera", cargo: "Nutricionista Jefe", mail: "victor.saavedra@redsalud.gov.cl" },
        { id: 180, anexo: "245737", unidad: "SSGG", usuario: "CRISTIAN MUÑOZ", cargo: "ADMIN", mail: "cristian.munozs@redsalud.gov.cl" },
        { id: 181, anexo: "245729", unidad: "SSGG", usuario: "MIGUEL JARA", cargo: "JEFATURA", mail: "miguel.jara@redsalud.gov.cl" },
        { id: 182, anexo: "245660", unidad: "SSGG SECRETARIA", usuario: "SECRETARIA", cargo: "", mail: "ssgg.secretaria@redsalud.gov.cl" },
        { id: 183, anexo: "245551", unidad: "SUBDIRECCION ADM", usuario: "CAROLINA ROJAS ELGUETA", cargo: "SUBDIRECTORA", mail: "sdahsjm@redsalud.gov.cl" },
        { id: 184, anexo: "245553", unidad: "SUBDIRECCION ENF/MAT", usuario: "IVORY MONDINO BARRERA", cargo: "SUBDIRECCION", mail: "sdmat.hsjm@redsalud.gov.cl" },
        { id: 185, anexo: "245587", unidad: "SUBDIRECCION MEDICA", usuario: "DRA. LUZ QUIROGA IRREÑO", cargo: "SUBDIRECTOR", mail: "sdmhsjm@redsalud.gov.cl" },
        { id: 186, anexo: "245691", unidad: "SUPERVISORA CDT", usuario: "ELIZABETH ALLENDES FILIPPI", cargo: "SUPERVISORA", mail: "elizabeth.allendes@redsalud.gov.cl" },
        { id: 187, anexo: "245726", unidad: "TALLERES", usuario: "MAESTROS SSGG", cargo: "", mail: "" },
        { id: 188, anexo: "245558", unidad: "TESORERIA", usuario: "MONICA JARA", cargo: "ENCARGADA", mail: "monica.jarav@redsalud.gov.cl" },
        { id: 189, anexo: "245591", unidad: "UNIDAD GES", usuario: "DIGITADORAS", cargo: "", mail: "" },
        { id: 190, anexo: "245663", unidad: "UNIDAD GES", usuario: "ROSITA BLANCO", cargo: "DIGITADORA", mail: "rosa.blanco@redsalud.gov.cl" },
        { id: 191, anexo: "245674", unidad: "URGENCIA MATERNAL", usuario: "MATRONA TURNO", cargo: "", mail: "" },
        { id: 192, anexo: "245665", unidad: "URGENCIA PEDIATRICA", usuario: "PEDIATRA TURNO", cargo: "", mail: "" },
        { id: 193, anexo: "245575", unidad: "Subdirección Gestión", usuario: "Mackarena Zapata", cargo: "Subdirectora", mail: "sdaig.hsjm@redsalud.gov.cl" },
        { id: 194, anexo: "245666", unidad: "MEDICINA", usuario: "JOSE SUCCRE TALY", cargo: "JEFE SERVICIO", mail: "jose.sucre@redsalud.gov.cl" },
        { id: 195, anexo: "245680", unidad: "Pabellon Quirurgico", usuario: "Ivonne Cancino", cargo: "Supervisora", mail: "ivonne.cancino@redsalud.gov.cl" },
        // REGISTROS "SIN NÚMERO" (S/N) AÑADIDOS:
        { id: 196, anexo: "245755", unidad: "GESTION DE LA DEMANDA", usuario: "ROSSANA YAÑEZ ERCOLI", cargo: "JEFA GESTION DE LA DEMANDA", mail: "rossana.yanez@redsalud.gov.cl" },
        { id: 197, anexo: "245751", unidad: "UNIDAD PROCESO QUIRURGICO", usuario: "VIVIANA ACEVEDO VILLEGAS", cargo: "ENCARGADA UNIDAD PROCESO QUIRURGICO Y GESTION LEQ", mail: "viviana.acevedo@redsalud.gov.cl" },
        { id: 198, anexo: "245701", unidad: "AUDITORIA", usuario: "JUAN CARLOS DIAZ - ISABEL SILVA", cargo: "JEFE AUDITORIA - PROFESIONAL UNIDAD AUDITORIA", mail: "juancarlos.diaz@redsalud.gov.cl" },
        { id: 199, anexo: "245574", unidad: "OIRS", usuario: "MARIANA LAZO", cargo: "ADMINISTRATIVO OIRS", mail: "mariana.lazo@redsalud.gov.cl" },
        { id: 200, anexo: "245719", unidad: "Planificación y control de gestión", usuario: "Claudia Perez", cargo: "Jefatura", mail: "claudia.perezh@redsalud.gov.cl" },
        { id: 201, anexo: "245687", unidad: "Planificación y control de gestión", usuario: "Felipe Saavedra", cargo: "Profesional", mail: "felipe.saavedra@redsalud.gov.cl" },
        { id: 202, anexo: "245649", unidad: "Laboratorio y UMT", usuario: "Waleska Parodi- Nicole Camus", cargo: "Toma de muestra", mail: "nicole.camus@redsalud.gov.cl" },
        { id: 203, anexo: "229305", unidad: "Salud de Personal", usuario: "Cristian Ull Galaz", cargo: "Medico Cirujano", mail: "" },
        { id: 204, anexo: "229302", unidad: "Personal", usuario: "Nicolas Mejias Zuñiga", cargo: "Analista", mail: "nicolas.mejias@redsalud.gov.cl" },
        { id: 205, anexo: "245561", unidad: "Personal", usuario: "Alisson Berrios Mora", cargo: "Analista Horas Extras", mail: "alisson.berrios@redsalud.gov.cl" },
        { id: 206, anexo: "245680", unidad: "Pabellon Quirurgico", usuario: "Ivonne Cancino", cargo: "Supervisora", mail: "ivonne.cancino@redsalud.gov.cl" },
        { id: 207, anexo: "245657", unidad: "Urgencia", usuario: "Amelia Rodriguez", cargo: "Supervisora", mail: "supervisora.urghsjm@redsalud.gov.cl" },
        { id: 208, anexo: "245708", unidad: "GCE UPC", usuario: "Yenny Vera", cargo: "Supervisora", mail: "yenny.vera@redsalud.gov.cl" },
        { id: 209, anexo: "245776", unidad: "Polo-Cardiologia", usuario: "", cargo: "Cardiología - Broncopulmonar - Anestesiología", mail: "cardiologia.hsjm@redsalud.gov.cl" },
        { id: 210, anexo: "245621", unidad: "UMAH", usuario: "Cristina Solis Cárdenas", cargo: "", mail: "cristina.solis@redsalud.gov.cl" },
        { id: 211, anexo: "245638", unidad: "Programa Diabetes", usuario: "María Paz Toledo", cargo: "Programa Diabetes", mail: "programadiabeteshsjm@redsalud.gov.cl" },
        { id: 212, anexo: "245697", unidad: "Farmacia 24", usuario: "Jorge Aravena Venegas", cargo: "Encargado farmacia hospitalizados", mail: "jorge.aravenav@redsalud.gov.cl" }
    ];
  });

  // 2. ESTADO FORMULARIO Y EDICIÓN
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ anexo: '', unidad: '', usuario: '', cargo: '', mail: '' });

  // 3. PERSISTENCIA
  useEffect(() => {
    localStorage.setItem('anexos_hospital_v3', JSON.stringify(datosAnexos));
  }, [datosAnexos]);

  // --- FUNCIONES ADMIN ---
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      setDatosAnexos(datosAnexos.map(item => item.id === editingId ? { ...formData, id: editingId } : item));
    } else {
      const nuevoAnexo = { ...formData, id: Date.now() };
      setDatosAnexos([nuevoAnexo, ...datosAnexos]);
    }
    cancelarEdicion();
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData({ anexo: item.anexo, unidad: item.unidad, usuario: item.usuario, cargo: item.cargo, mail: item.mail });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de eliminar este anexo?")) {
      setDatosAnexos(datosAnexos.filter(item => item.id !== id));
    }
  };

  const cancelarEdicion = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({ anexo: '', unidad: '', usuario: '', cargo: '', mail: '' });
  };

  // --- FILTRADO ---
  const filtrados = datosAnexos.filter(item => {
    const busquedaMinus = busqueda.toLowerCase();
    return (
      (item.unidad || "").toLowerCase().includes(busquedaMinus) ||
      (item.usuario || "").toLowerCase().includes(busquedaMinus) ||
      (item.cargo || "").toLowerCase().includes(busquedaMinus) ||
      (item.anexo || "").includes(busquedaMinus)
    );
  });

  const totalPaginas = Math.ceil(filtrados.length / registrosPorPagina);
  const registrosActuales = filtrados.slice((paginaActual - 1) * registrosPorPagina, paginaActual * registrosPorPagina);

  return (
    <section className="bg-white rounded-[3rem] p-4 md:p-10 shadow-2xl border border-slate-100 min-h-screen w-full font-sans animate-in fade-in duration-500">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 border-b pb-8">
        <div>
          <button onClick={() => navigate('/inicio')} className="bg-slate-100 hover:bg-[#ffb81c] text-[#003876] px-4 py-2 rounded-full font-black flex items-center gap-2 transition-all mb-4 text-xs shadow-sm">
            <ChevronLeftIcon size={18} /> INICIO
          </button>
          <h2 className="text-4xl md:text-5xl font-black text-[#003876] uppercase italic tracking-tighter leading-none">
            Anexos <span className="text-cyan-600">Hospital</span>
          </h2>
          <p className="text-slate-400 font-bold uppercase tracking-widest mt-2 text-xs">Directorio Telefónico Interno</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-center">
          {isJefe && !showForm && (
            <button onClick={() => setShowForm(true)} className="bg-[#003876] text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-cyan-600 transition-all shadow-md">
              <Plus size={20} /> AÑADIR ANEXO
            </button>
          )}
          
          <div className="relative w-full md:w-80 flex shadow-sm rounded-xl overflow-hidden border-2 border-slate-200 focus-within:border-cyan-500 transition-all">
            <input 
              type="text"
              placeholder="Buscar unidad, usuario..."
              className="flex-grow px-4 py-2 text-sm focus:outline-none"
              value={busqueda}
              onChange={(e) => { setBusqueda(e.target.value); setPaginaActual(1); }}
            />
            <div className="bg-[#003876] text-white p-3"><Search size={18} /></div>
          </div>
        </div>
      </div>

      {/* FORMULARIO JEFE */}
      {showForm && (
        <div className="mb-10 p-8 bg-slate-50 rounded-3xl border-2 border-dashed border-cyan-200 animate-in slide-in-from-top duration-500">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-black text-[#003876] uppercase">{editingId ? 'Editar registro' : 'Ingresar nuevo anexo'}</h3>
            <button onClick={cancelarEdicion} className="text-slate-400 hover:text-red-500 bg-white p-2 rounded-full shadow-sm"><X /></button>
          </div>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <input className="p-4 rounded-xl border-none shadow-sm focus:ring-2 focus:ring-cyan-500 outline-none" placeholder="N° Anexo" required value={formData.anexo} onChange={e => setFormData({...formData, anexo: e.target.value})} />
            <input className="p-4 rounded-xl border-none shadow-sm focus:ring-2 focus:ring-cyan-500 outline-none" placeholder="Unidad / Servicio" required value={formData.unidad} onChange={e => setFormData({...formData, unidad: e.target.value})} />
            <input className="p-4 rounded-xl border-none shadow-sm focus:ring-2 focus:ring-cyan-500 outline-none" placeholder="Nombre Usuario" required value={formData.usuario} onChange={e => setFormData({...formData, usuario: e.target.value})} />
            <input className="p-4 rounded-xl border-none shadow-sm focus:ring-2 focus:ring-cyan-500 outline-none" placeholder="Cargo" value={formData.cargo} onChange={e => setFormData({...formData, cargo: e.target.value})} />
            <input className="p-4 rounded-xl border-none shadow-sm focus:ring-2 focus:ring-cyan-500 outline-none md:col-span-2" placeholder="Correo Electrónico" value={formData.mail} onChange={e => setFormData({...formData, mail: e.target.value})} />
            <button type="submit" className="md:col-span-3 bg-cyan-600 text-white p-4 rounded-xl font-black flex items-center justify-center gap-2 hover:bg-[#003876] transition-all shadow-lg uppercase">
              <Save size={20}/> {editingId ? 'Guardar Cambios' : 'Crear Registro'}
            </button>
          </form>
        </div>
      )}

      {/* TABLA PRINCIPAL */}
      <div className="overflow-x-auto bg-white rounded-2xl border border-slate-200 shadow-sm">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-[#003876]">
              <th className="p-4 font-black text-[11px] uppercase tracking-wider">Anexo</th>
              <th className="p-4 font-black text-[11px] uppercase tracking-wider">Servicio / Unidad</th>
              <th className="p-4 font-black text-[11px] uppercase tracking-wider">Usuario</th>
              <th className="p-4 font-black text-[11px] uppercase tracking-wider">Cargo</th>
              <th className="p-4 font-black text-[11px] uppercase tracking-wider">E-Mail</th>
              {isJefe && <th className="p-4 font-black text-[11px] uppercase tracking-wider text-center">Gestión</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {registrosActuales.length === 0 ? (
                <tr><td colSpan="6" className="p-20 text-center text-slate-400 font-bold uppercase tracking-widest">No se encontraron resultados</td></tr>
            ) : (
                registrosActuales.map((item) => (
                    <tr key={item.id} className="hover:bg-cyan-50/30 transition-colors group">
                      <td className="p-4 text-sm font-black text-cyan-600 tracking-tight">{item.anexo}</td>
                      <td className="p-4 text-xs font-bold text-slate-500 uppercase">{item.unidad}</td>
                      <td className="p-4 text-xs font-black text-[#003876] uppercase">{item.usuario}</td>
                      <td className="p-4 text-xs text-slate-500 font-bold">{item.cargo}</td>
                      <td className="p-4">
                        {item.mail && (
                          <a href={`mailto:${item.mail}`} className="flex items-center gap-2 text-xs font-bold text-cyan-600 hover:text-[#003876] underline decoration-cyan-200 underline-offset-4">
                            <Mail size={14} /> {item.mail}
                          </a>
                        )}
                      </td>
                      {isJefe && (
                        <td className="p-4">
                          <div className="flex justify-center gap-2">
                            <button onClick={() => handleEdit(item)} className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all shadow-sm"><Pencil size={14}/></button>
                            <button onClick={() => handleDelete(item.id)} className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all shadow-sm"><Trash2 size={14}/></button>
                          </div>
                        </td>
                      )}
                    </tr>
                  ))
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINACIÓN */}
      <div className="mt-8 flex justify-center items-center gap-4">
        <button disabled={paginaActual === 1} onClick={() => setPaginaActual(paginaActual - 1)} className="flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-slate-200 text-[#003876] font-bold text-xs hover:bg-slate-50 disabled:opacity-30 transition-all">
            <ChevronLeftIcon size={16} /> ANTERIOR
        </button>
        <div className="bg-slate-100 px-6 py-2 rounded-xl text-[#003876] font-black text-xs shadow-inner">
            PÁGINA {paginaActual} DE {totalPaginas || 1}
        </div>
        <button disabled={paginaActual === totalPaginas || totalPaginas === 0} onClick={() => setPaginaActual(paginaActual + 1)} className="flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-slate-200 text-[#003876] font-bold text-xs hover:bg-slate-50 disabled:opacity-30 transition-all">
            SIGUIENTE <ChevronRight size={16} />
        </button>
      </div>
    </section>
  );
};

export default Anexos;