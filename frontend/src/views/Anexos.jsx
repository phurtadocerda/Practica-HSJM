import React, { useState } from 'react';
import { ChevronLeft, Phone, Search, Mail, User, Building2, ChevronRight, ChevronLeft as ChevronLeftIcon } from 'lucide-react';

const Anexos = ({ onNavigate }) => {
  const [busqueda, setBusqueda] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const registrosPorPagina = 15;

  const datosAnexos = [
    { n: 1, anexo: "245639", unidad: "ABASTECIMIENTO", usuario: "ABASTECIMIENTO", cargo: "ABASTECIMIENTO", mail: "" },
    { n: 2, anexo: "245634", unidad: "Abastecimiento", usuario: "María de los Ángeles Morales Jorquera", cargo: "Jefa de abastecimiento", mail: "maria.moralesj@redsalud.gov.cl" },
    { n: 3, anexo: "245736", unidad: "ABASTECIMIENTO", usuario: "JEFATURA DE ABASTECIMIENTO/ENCARGADA DE CONVENIOS", cargo: "", mail: "maria.moralesj@redsalud.gov.cl" },
    { n: 4, anexo: "245636", unidad: "ABASTECIMIENTO", usuario: "EJECUTIVO DE COMPRAS", cargo: "EJECUTIVO DE COMPRAS", mail: "" },
    { n: 5, anexo: "245637", unidad: "ABASTECIMIENTO", usuario: "ENCARGADA DE CONVENIOS", cargo: "ENCARGADA DE CONVENIOS", mail: "" },
    { n: 6, anexo: "245672", unidad: "COMUNICACIONES", usuario: "LUIS DUARTE", cargo: "CENTRAL TELEFONICA", mail: "luis.duarte@redsalud.gov.cl" },
    { n: 7, anexo: "245669", unidad: "APOYO URGENCIA", usuario: "RECAUDADOR", cargo: "RECAUDADOR", mail: "" },
    { n: 8, anexo: "245642", unidad: "ARCHIVO", usuario: "Ximena Pinto", cargo: "", mail: "patricia.pinto@redsalud.gov.cl" },
    { n: 9, anexo: "245648", unidad: "Imagenolgía", usuario: "Sala informes medico radiologo", cargo: "Sala informes medico radiologo", mail: "" },
    { n: 10, anexo: "245748", unidad: "Archivo", usuario: "Alejandra Chamizo", cargo: "Jefatura", mail: "maria.chamizo@redsalud.gov.cl" },
    { n: 11, anexo: "245652", unidad: "ARCHIVO PASIVO", usuario: "Patricio Ballesteros", cargo: "", mail: "patricio.ballesteros@redsalud.gov.cl" },
    { n: 12, anexo: "245584", unidad: "ASISTENTE SOCIAL", usuario: "SONIA ALVARADO", cargo: "ENCARGADA BIENESTAR", mail: "sonia.alvarado@redsalud.gov.cl" },
    { n: 13, anexo: "245704", unidad: "BIOPSIAS", usuario: "ELIZABETH JORQUERA", cargo: "ENCARGADA BIOPSIAS", mail: "elizabeth.jorqueraf@redsalud.gov.cl" },
    { n: 14, anexo: "245568", unidad: "Bodega abastecimiento", usuario: "Jorge Roblero", cargo: "Jefa de bodega", mail: "" },
    { n: 15, anexo: "245725", unidad: "Bodega Farmacia", usuario: "Euguenio Vargas Chávez", cargo: "Encargado Bodega de Farmacia", mail: "eugenio.vargas@redsalud.gov.cl" },
    { n: 16, anexo: "245773", unidad: "BOTIQUIN FARMACIA", usuario: "BOTIQUIN FARMACIA", cargo: "", mail: "" },
    { n: 17, anexo: "245615", unidad: "Proced. Endoscópicos - Cir. Menor - Proceso Qx. Oftalmológico", usuario: "Francisca Arenas Carvajal", cargo: "Proced. Endoscópicos - Cir. Menor - Proceso Qx. Oftalmológico", mail: "procedimientos.cae@redsalud.gov.cl" },
    { n: 18, anexo: "245616", unidad: "GES, SIGGES, GESTION ONCOLOGICA", usuario: "ANTONIETA OLIVARES O.", cargo: "JEFE GES, SIGGES, GESTION ONCOLOGICA", mail: "antonieta.olivares@redsalud.gov.cl" },
    { n: 19, anexo: "245617", unidad: "BOX 13 CIRUGIA AMBULATORIA", usuario: "", cargo: "TECNICO DE TURNO", mail: "" },
    { n: 20, anexo: "245618", unidad: "BOX 14 OFTALMOLOGIA", usuario: "DRA. COLL", cargo: "OFTALMOLOGA", mail: "" },
    { n: 21, anexo: "245619", unidad: "BOX 15", usuario: "", cargo: "MEDICO DE TURNO", mail: "" },
    { n: 22, anexo: "245620", unidad: "BOX 16", usuario: "", cargo: "MEDICO DE TURNO", mail: "" },
    { n: 23, anexo: "245625", unidad: "TACO", usuario: "Stephanie Bruna Véliz", cargo: "TACO", mail: "stephanie.bruna@redsalud.gov.cl" },
    { n: 24, anexo: "245626", unidad: "BOX 20", usuario: "DENTAL", cargo: "DENTISTA DE TURNO", mail: "" },
    { n: 25, anexo: "245627", unidad: "BOX 21", usuario: "DENTAL", cargo: "DENTISTA DE TURNO", mail: "" },
    { n: 26, anexo: "245628", unidad: "BOX 22", usuario: "DENTAL", cargo: "DENTISTA DE TURNO", mail: "" },
    { n: 27, anexo: "245629", unidad: "BOX 23", usuario: "DENTAL", cargo: "DENTISTA DE TURNO", mail: "" },
    { n: 28, anexo: "245705", unidad: "BOX 24", usuario: "DENTAL", cargo: "DENTISTA DE TURNO", mail: "" },
    { n: 29, anexo: "245631", unidad: "BOX 25", usuario: "DENTAL", cargo: "DENTISTA DE TURNO", mail: "" },
    { n: 30, anexo: "245632", unidad: "BOX 26", usuario: "LABORATORIO DENTAL", cargo: "", mail: "" },
    { n: 31, anexo: "245593", unidad: "BOX 27", usuario: "UMAH", cargo: "ENFERMERA", mail: "" },
    { n: 32, anexo: "245594", unidad: "BOX 28", usuario: "BOX GINECOLOGICO", cargo: "GINECOLOGO DE TURNO", mail: "" },
    { n: 33, anexo: "245595", unidad: "BOX 29", usuario: "GINECOLOGIA GENERAL", cargo: "GINECOLOGO DE TURNO", mail: "" },
    { n: 34, anexo: "245608", unidad: "BOX 2 TRAUMATOLOGIA", usuario: "TRAUMATOLOGIA", cargo: "", mail: "" },
    { n: 35, anexo: "245596", unidad: "BOX 30", usuario: "SALUD SEXUAL", cargo: "MATRONA DE TURNO", mail: "" },
    { n: 36, anexo: "245597", unidad: "BOX 31", usuario: "MONICA WALTON", cargo: "MATRONA CAE", mail: "monica.walton@redsalud.gov.cl" },
    { n: 37, anexo: "245599", unidad: "BOX 33", usuario: "OFICINA MONITOREO", cargo: "", mail: "" },
    { n: 38, anexo: "245600", unidad: "BOX 34", usuario: "MONITORA SIGGES", cargo: "MONITORA SIGGES", mail: "" },
    { n: 39, anexo: "245601", unidad: "BOX 35", usuario: "DR. CARMONA", cargo: "COLOPROCTOLOGIA- PSIQUIATRIA", mail: "" },
    { n: 40, anexo: "245602", unidad: "PARTICIPACION CIUDADANA", usuario: "MARITZA CARRASCO", cargo: "ENCARGADA PARTICIPACION CIUDADANA", mail: "maritza.carrasco@redsalud.gov.cl" },
    { n: 41, anexo: "245603", unidad: "OIRS", usuario: "LEYLA VALLADARES - JEANNETTE CEA", cargo: "JEFATURA OIRS - PROFESIONAL APOYO OIRS", mail: "leyla.valladares@redsalud.gov.cl - jeannette.cea@redsalud.gov.cl" },
    { n: 42, anexo: "245605", unidad: "OIRS", usuario: "RAUL BUSTAMANTE", cargo: "ASISTENTE SOCIAL OIRS", mail: "raul.bustante@redsalud.gov.cl" },
    { n: 43, anexo: "245604", unidad: "BOX 38", usuario: "OIRS", cargo: "MARIANA LAZO- ISABEL VARGAS", mail: "mariana.lazo@redsalud.gov.cl" },
    { n: 44, anexo: "245633", unidad: "COMUNICACIONES", usuario: "BERNARDITA RAMIREZ", cargo: "ATENCION PACIENTES HOSPITALIZADOS", mail: "bernardita.ramirez@redsalud.gov.cl" },
    { n: 45, anexo: "245590", unidad: "BOX 40", usuario: "CECILIA ELGUETA - WOLFGANG KAGELMACHER", cargo: "JEFATURA CAE", mail: "ana.elgueta@redsalud.gov.cl - wolfgang.kagelmacher@redsalud.gov.cl" },
    { n: 46, anexo: "245612", unidad: "BOX 45", usuario: "ROSSANA YAÑEZ", cargo: "JEFATURA", mail: "rossana.yanez@redsalud.gov.cl" },
    { n: 47, anexo: "245609", unidad: "Polos Especialidades CDT", usuario: "Carolina Emack Magaña", cargo: "Traumatología", mail: "esp.traumatologia@redsalud.gov.cl" },
    { n: 48, anexo: "245610", unidad: "BOX 5 PEDIATRIA CAE", usuario: "", cargo: "", mail: "" },
    { n: 49, anexo: "245611", unidad: "BOX 6 PEDIATRIA CAE", usuario: "", cargo: "", mail: "" },
    { n: 50, anexo: "245659", unidad: "BOX URGENCIA ADULTOS", usuario: "TECNICO DE TURNO", cargo: "", mail: "" },
    { n: 51, anexo: "245732", unidad: "CALDERA", usuario: "", cargo: "", mail: "" },
    { n: 52, anexo: "245747", unidad: "CALIDAD", usuario: "JAMIE PEREZ AEDO", cargo: "JEFATURA CALIDAD Y SEGURIDAD PACIENTE", mail: "calidad.hsjm@redsalud.gov.cl" },
    { n: 53, anexo: "245707", unidad: "CALIDAD", usuario: "SECRETARIA", cargo: "SECRETARIA CALIDAD", mail: "" },
    { n: "S/N", anexo: "245588", unidad: "IAAS", usuario: "GIANINA CAÑAS", cargo: "JEFATURA IAAS", mail: "iaashsjm@redsalud.gob.cl" },
    { n: 54, anexo: "245588", unidad: "EPIDEMIOLOGIA", usuario: "DR. SALOME CASTILLO", cargo: "JEFATURA IAAS", mail: "epidemiologia.hsjm@redsalud.gov.cl" },
    { n: 55, anexo: "247610", unidad: "Estadisticas", usuario: "Olivia Carrasco", cargo: "", mail: "olivia.carrasco@redsalud.gov.cl" },
    { n: 56, anexo: "245745", unidad: "CALL-CENTER", usuario: "ROSA ESCARATE", cargo: "", mail: "" },
    { n: 57, anexo: "247613", unidad: "CALL- CENTER", usuario: "SONIA FARIAS", cargo: "", mail: "" },
    { n: 58, anexo: "247612", unidad: "POLO OFTALMOLOGIA", usuario: "ROMINA MARTINEZ", cargo: "", mail: "" },
    { n: 59, anexo: "247614", unidad: "CALL- CENTER", usuario: "JACQUELINE PEREZ", cargo: "", mail: "" },
    { n: 60, anexo: "247615", unidad: "UNIDAD LISTA DE ESPERA CONSULTAS Y PROCEDIMIENTOS", usuario: "KAREN SANTIBAÑEZ ARCUCH", cargo: "ENCARGADA UNIDAD LISTA DE ESPERA CONSULTAS Y PROCEDIMIENTOS AMBULATORIO", mail: "karen.santibanez@redsalud.gov.cl" },
    { n: 61, anexo: "247611", unidad: "Censo - Estadisticas", usuario: "Juana Cortéz - Francisca Rivera", cargo: "", mail: "jluisa.cortes@redsalud.gov.cl" },
    { n: 62, anexo: "245567", unidad: "CAPACITACION", usuario: "ALBERTO OVALLE", cargo: "ENCARGADO DE CAPACITACION", mail: "alberto.ovalle@redsalud.gov.cl" },
    { n: 63, anexo: "229203", unidad: "Capacitación y Formación", usuario: "Carlos Schulmeyer Jara", cargo: "Profesional", mail: "carlos.schulmeyer@redsalud.gov.cl" },
    { n: 64, anexo: "245598", unidad: "CASA CLUB", usuario: "CASA CLUB", cargo: "", mail: "" },
    { n: 65, anexo: "245722", unidad: "CENTRAL ESTERILIZACION", usuario: "ENCARGADA DE TURNO", cargo: "", mail: "" },
    { n: 66, anexo: "245555", unidad: "COMUNICACIONES", usuario: "LUIS DUARTE", cargo: "ENCARGADO CENTRAL TELEFONICA", mail: "luis.duarte@redsalud.gov.cl" },
    { n: 68, anexo: "247618", unidad: "Chile Crece Contigo", usuario: "Marie Claire Lacouture", cargo: "Psicóloga", mail: "marie.lacouture@redsalud.gov.cl" },
    { n: 69, anexo: "245702", unidad: "CHOFERES", usuario: "CHOFER DE TURNO", cargo: "", mail: "" },
    { n: 70, anexo: "245684", unidad: "CMA", usuario: "LAURA ECHEVERRIA", cargo: "SUPERVISORA", mail: "laura.echeverria@redsalud.gov.cl" },
    { n: 71, anexo: "245570", unidad: "CONTABILIDAD", usuario: "", cargo: "", mail: "stephanie.vargasp@redsalud.gov.cl" },
    { n: 72, anexo: "245569", unidad: "CONTABILIDAD", usuario: "CONTABILIDAD", cargo: "JEFATURA CONTABILIDAD", mail: "" },
    { n: 73, anexo: "245571", unidad: "CONTABILIDAD", usuario: "LUIS FARIAS", cargo: "", mail: "luis.farias@redsalud.gov.cl" },
    { n: 74, anexo: "245572", unidad: "CONTABILIDAD", usuario: "ELIAS HERNANDEZ", cargo: "", mail: "elias.hernandez@redsalud.gov.cl" },
    { n: 75, anexo: "245689", unidad: "CONTROL DE GESTION", usuario: "CLAUDIA PEREZ", cargo: "JEFATURA", mail: "claudia.perezh@redsalud.gov.cl" },
    { n: 76, anexo: "245770", unidad: "CTA", usuario: "SUSANA PIZARRO", cargo: "JEFA UNIDAD", mail: "susana.pizarros@redsalud.gov.cl" },
    { n: 77, anexo: "245622", unidad: "Programa CP y AD", usuario: "Denisse Hinojosa", cargo: "Programa CP y AD", mail: "denisse.hinojosa@redsalud.gov.cl" },
    { n: 78, anexo: "245566", unidad: "Calidad de Vida", usuario: "Silvana Muñoz Cañete", cargo: "Profesional", mail: "silvana.munoz@redsalud.gov.cl" },
    { n: 79, anexo: "245661", unidad: "DESARROLLO ORGANIZACIONAL", usuario: "SILVANA MUÑOZ CAÑETE", cargo: "ENCARGADA DESARROLLO ORGANIZACIONAL(SUBROGANTE CAPACITACION)", mail: "silvana.munozc@redsalud.gov.cl" },
    { n: 80, anexo: "245552", unidad: "DIRECCION", usuario: "OSCAR VARGAS DURANTI", cargo: "DIRECTOR", mail: "oscar.vargasd@redsalud.gov.cl" },
    { n: 81, anexo: "245623", unidad: "HOSPITALIZACION DOMICILIARIA", usuario: "DRA. VICTORIA DIAZ-GRANADOS - MARIA DE LOS ANGELES ALARCON A.", cargo: "MEDICO JEFE - ENFERMERA SUPERVISORA", mail: "victoria.diazg@redsalud.gov.cl - maria.alarconarratia@redsalud.gov.cl" },
    { n: 82, anexo: "245710", unidad: "Cirugia", usuario: "Patricio Muñoz", cargo: "Supervisor", mail: "scirugia.hsjm@redsalud.gov.cl" },
    { n: 83, anexo: "245643", unidad: "ESTADISTICA", usuario: "VIVIANA PIÑEIRO", cargo: "JEFE ESTADISTICA", mail: "viviana.pineiro@redsalud.gov.cl" },
    { n: 84, anexo: "245641", unidad: "ESTADISTICA", usuario: "Daniela Escalona - Carolina Soto", cargo: "", mail: "daniela.escalona@redsalud.gov.c" },
    { n: 85, anexo: "245640", unidad: "EST. ENFER CAE", usuario: "TECNICO DE TURNO", cargo: "TECNICO DE TURNO", mail: "" },
    { n: 86, anexo: "245709", unidad: "CIRUGIA", usuario: "SECRETARIA", cargo: "SECRETARIA", mail: "secretariacirgugia@redsalud.gov.cl" },
    { n: 87, anexo: "245685", unidad: "EST ENFER. MATERNIDAD", usuario: "MATRONA DE TURNO", cargo: "MATRONA DE TURNO", mail: "" },
    { n: 88, anexo: "245706", unidad: "EST.ENFERMERIA MATERNIDAD", usuario: "MATRONAS Y MÉDICOS DE TURNO", cargo: "", mail: "" },
    { n: 89, anexo: "245698", unidad: "UCI", usuario: "YENNY VERA", cargo: "ENFERMERA SUPERVISORA", mail: "yenny.vera@redsalud.gob.cl" },
    { n: 90, anexo: "245699", unidad: "EST.ENFERMERIA MEDICINA B", usuario: "", cargo: "", mail: "" },
    { n: 91, anexo: "245713", unidad: "PEDIATRIA", usuario: "ESTACION PEDIATRIA", cargo: "ENFERMERA SUPERVISORA", mail: "margarita.tapia@redsalud.gob.cl" },
    { n: 92, anexo: "245686", unidad: "Pensionado", usuario: "Nicole Tapia", cargo: "Supervisora", mail: "" },
    { n: 93, anexo: "245586", unidad: "EST. ENFER UTI", usuario: "Cecilia Echeverria / Alejandra Bustos", cargo: "GCE Uti - GCE UCI", mail: "cecilia.echeverriam@redsalud.gov.cl - alejandra.bustosfabio@redsalud.gov.cl" },
    { n: 94, anexo: "245721", unidad: "Esterilización", usuario: "Judith Herrada", cargo: "Supervisora", mail: "judith.herrada@redsalud.gov.cl" },
    { n: 95, anexo: "245697", unidad: "Farmacia 24", usuario: "Elizabeth Yévenes Jerez", cargo: "Jefa de Farmacia", mail: "elizabeth.yevenes@redsalud.gov.cl" },
    { n: 96, anexo: "245696", unidad: "FARMACIA 24 HRS", usuario: "SECRETARIA F24", cargo: "SECRETARIA FARMACIA 24 HRS", mail: "" },
    { n: 97, anexo: "245607", unidad: "Farmacia Atencion Abierta", usuario: "Felipe Fuentes Viveros", cargo: "Encargado Farmacia Ambulatoria", mail: "felipe.fuentesv@redsalud.gov.cl" },
    { n: 98, anexo: "722696939", unidad: "FINIS TERRAE", usuario: "", cargo: "", mail: "" },
    { n: 99, anexo: "245693", unidad: "GESTION DE CAMAS", usuario: "KARLA ARAYA", cargo: "ENFERMERA SUPERVISORA", mail: "karla.araya@redsalud.gov.cl" },
    { n: 100, anexo: "245720", unidad: "GESTION DE CAMAS", usuario: "INES MALLEA", cargo: "SECRETARIA", mail: "ines.mallea@redsalud.gov.cl" },
    { n: 101, anexo: "245581", unidad: "Contabilidad", usuario: "Carlos Quiroga Catalán", cargo: "Jefe de Contabilidad", mail: "carlos.quiroga@redsalud.gov.cl" },
    { n: 102, anexo: "245582", unidad: "GESTION FINANCIERA", usuario: "", cargo: "", mail: "" },
    { n: 103, anexo: "245746", unidad: "Finanzas", usuario: "Ana María Villouta Villarroel", cargo: "Jefa de Finanzas", mail: "ana.villouta@redsalud.gov.cl" },
    { n: 104, anexo: "245613", unidad: "GESTORA GES", usuario: "GESTORA GES QUIRURGICA", cargo: "GESTORA GES QUIRURGICA", mail: "" },
    { n: 105, anexo: "245557", unidad: "GRD", usuario: "BELEN GONZALEZ LECAROS", cargo: "JEFA GRD", mail: "belen.gonzalezl@redsalud.gov.cl" },
    { n: 106, anexo: "245580", unidad: "INFORMATICA", usuario: "INFORMATICA", cargo: "SOPORTE INFORMATICA", mail: "" },
    { n: 107, anexo: "245579", unidad: "INFORMATICA", usuario: "ALDO PIZARRO PIZARRO", cargo: "JEFATURA INFORMATICA", mail: "aldo.pizarro@redsalud.gov.cl" },
    { n: 108, anexo: "245592", unidad: "Desarrollo Organizacional", usuario: "Alejandro Muñoz", cargo: "Profesional", mail: "alejandro.munoz@redsalud.gov.cl" },
    { n: 109, anexo: "245655", unidad: "Laboratorio y UMT", usuario: "Tiare Zuchel", cargo: "Jefatura Laboratorio", mail: "tiare.zuchel@redsalud.gov.cl" },
    { n: 110, anexo: "245749", unidad: "JURIDICA", usuario: "JORGE HERRERA FIGUEROA", cargo: "JEFE JURIDICA", mail: "jorge.herreraf@redsalud.gov.cl" },
    { n: 111, anexo: "245556", unidad: "JURIDICA", usuario: "ROBERTO MASSARELI", cargo: "PROFESIONAL UNIDAD JURIDICA", mail: "juridica.hsjm@redsalud.gov.cl" },
    { n: 112, anexo: "245645", unidad: "Medicina Fisica y Rehabilitación", usuario: "Secretaria Kinesiologia", cargo: "Secretaria Kinesiologia", mail: "rhb.secretaria@redsalud.gov.cl" },
    { n: 113, anexo: "245651", unidad: "Laboratorio y UMT", usuario: "TM Turno", cargo: "Laboratorio y UMT", mail: "" },
    { n: 114, anexo: "245730", unidad: "LAVANDERIA", usuario: "", cargo: "", mail: "" },
    { n: 115, anexo: "245771", unidad: "MATERNIDAD", usuario: "ARIEL GUIÑEZ", cargo: "MATRON SUPERVISOR", mail: "supgo.hsjm@redsalud.gob.cl" },
    { n: 116, anexo: "245703", unidad: "MEDICINA", usuario: "IBONNE CATALAN", cargo: "ENFERMERA SUPERVISORA", mail: "ibonne.catalan@redsalud.gov.cl" },
    { n: 117, anexo: "245700", unidad: "MEDICINA", usuario: "SECRETARIA SERV. MEDICINA", cargo: "SECRETARIA SERV. MEDICINA", mail: "carola.contrerasf@redsalud.gob.cl" },
    { n: 118, anexo: "247616", unidad: "MODULO 1", usuario: "ADMISION SOME", cargo: "ADMISION SOME", mail: "" },
    { n: 119, anexo: "247622", unidad: "Polos especialidades CDT", usuario: "Daniela Allende Rojo", cargo: "Medicina Interna - RMT - Neurología", mail: "" },
    { n: 120, anexo: "247617", unidad: "Polos Especialidades CDT", usuario: "Romina Martínez Ortíz", cargo: "Cirugía Infantil - Pediatría- BP Inf. - ORL", mail: "esp.infantileshjsm@redsalud.gov.cl" },
    { n: 121, anexo: "245638", unidad: "Polos especialidades CDT", usuario: "Catalina Gutierrez Núñez", cargo: "Urología y Nefrología", mail: "esp.uronefrohsjm@redsalud.gov.cl" },
    { n: 122, anexo: "247621", unidad: "Polos Especialidades CDT", usuario: "Victoria Alvarez", cargo: "Cirugía Adulto", mail: "policirugia.hsjm@redsalud.gov.cl" },
    { n: 123, anexo: "247620", unidad: "Polos especialidades CDT", usuario: "Bárbara Catalán Sánchez", cargo: "Oftalmología", mail: "polo.oftalmologia@redsalud.gov.cl" },
    { n: 124, anexo: "247635", unidad: "MODULO 7", usuario: "", cargo: "ADMISION SOME", mail: "" },
    { n: 125, anexo: "245712", unidad: "NEONATOLOGIA", usuario: "MARCELA UTEAU", cargo: "PEDIATRA", mail: "marcela.uteau@redsalud.gov.cl" },
    { n: 126, anexo: "245658", unidad: "OBSERVACION URGENCIA", usuario: "MEDICO DE TURNO", cargo: "", mail: "" },
    { n: 127, anexo: "245710", unidad: "CIRUGIA", usuario: "EDUARDO MORALES MEZA", cargo: "JEFE SERVICIO", mail: "scirugia.hsjm@redsalud.gov.cl" },
    { n: 128, anexo: "245576", unidad: "COMUNICACIONES", usuario: "CHRISTIAN CADENAS", cargo: "ADMINISTRATIVO COMUNICACIONES", mail: "esteban.cadenas.c@gmail.com" },
    { n: 129, anexo: "245681", unidad: "OFICINA JEFE PABELLON", usuario: "PABELLON", cargo: "", mail: "" },
    { n: 130, anexo: "245694", unidad: "GINECOLOGIA Y OBSTETRICIA", usuario: "ARIEL GUIÑEZ", cargo: "MATRON SUPERVISOR", mail: "ariel.guinez@redsalud.gov.cl" },
    { n: 131, anexo: "245682", unidad: "OFICINA MEDICOS PABELLON", usuario: "", cargo: "SECRETARIA", mail: "" },
    { n: 132, anexo: "245708", unidad: "UPC", usuario: "GALO AVENDAÑO A.", cargo: "JEFE UPC", mail: "jefeupchsjm@redsalud.gov.cl" },
    { n: 133, anexo: "245723", unidad: "OFICINA NUTRICIONISTAS", usuario: "VALERIA PIZARRO", cargo: "NUTRICIONISTA DE TURNO", mail: "" },
    { n: 134, anexo: "245578", unidad: "OFICINA PARTES", usuario: "PAOLA MUÑOZ", cargo: "ENCARGADA OFICINA DE PARTES", mail: "oficinapartes.hsjm@redsalud.gov.cl" },
    { n: 135, anexo: "245678", unidad: "OFICINA PRE-PARTO", usuario: "", cargo: "", mail: "" },
    { n: 136, anexo: "245560", unidad: "S.O.G.A", usuario: "CAMILA SANTIS", cargo: "PROFESIONAL", mail: "camila.santis@redsalud.gov.cl" },
    { n: 137, anexo: "245680", unidad: "PABELLONES QUIRURGICOS", usuario: "GERARDO VALDIVIA SALGADO - SECRETARIA", cargo: "MEDICO JEFE PABELLON - SECRETARIA", mail: "gerardo.valdivias@redsalud.gov.cl - karen.madridp@redsalud.gob.cl" },
    { n: 138, anexo: "245656", unidad: "SERVICIO URGENCIA", usuario: "JOSE VILLASMIL NUÑEZ", cargo: "JEFE SERVICIO - SECRETARIA", mail: "jose.villasmil@redsalud.gov.cl - marisol.gonzalezs@redsalud.gov.cl" },
    { n: 139, anexo: "245654", unidad: "Imagenolgía", usuario: "Edgardo Hernandez Lucero", cargo: "jefatura", mail: "jefeimagen.hsjm@redsalud.gov.cl" },
    { n: 140, anexo: "245711", unidad: "OF. JEFE CIRUGIA", usuario: "SECRETARIA SERV. CIRUGIA", cargo: "SECRETARIA", mail: "" },
    { n: 141, anexo: "245644", unidad: "OF. KINESIOLOGIA", usuario: "RICARDO CONTRERAS", cargo: "Jefatura", mail: "ricardo.contreras@redsalud.gov.cl" },
    { n: 142, anexo: "245714", unidad: "OF. MEDICOS PEDIATRIA", usuario: "MEDICO DE TURNO", cargo: "PEDIATRA DE TURNO", mail: "" },
    { n: 143, anexo: "245670", unidad: "OIRS URGENCIA", usuario: "ASISTENTE SOCIAL", cargo: "ASISTENTE SOCIAL", mail: "" },
    { n: 144, anexo: "245676", unidad: "PASILLO PRE-PARTO", usuario: "MATRONA DE TURNO", cargo: "", mail: "" },
    { n: 145, anexo: "245752", unidad: "PEDIATRIA", usuario: "MARGARITA TAPIA", cargo: "SUPERVISORA", mail: "margarita.tapia@redsalud.gob.cl" },
    { n: 146, anexo: "245614", unidad: "COMUNICACIONES", usuario: "GRETHEL DURAN", cargo: "JEFE COMUNICACIONES", mail: "grethel.duran@redsalud.gov.cl" },
    { n: 147, anexo: "245583", unidad: "PERSONAL", usuario: "JAVIER MIRANDA MANZO", cargo: "ANALISTA HONORARIOS", mail: "javier.miranda@redsalud.gov.cl" },
    { n: 148, anexo: "245562", unidad: "Personal", usuario: "jenniffer Cerda Cortez", cargo: "Anlaistas Ley 18.834", mail: "jenniffer.cerda@redsalud.gov.cl" },
    { n: 149, anexo: "245563", unidad: "Personal", usuario: "Jenny Farias Troncoso", cargo: "Analista Lic. Medicas", mail: "jenny.farias@redsalud.gov.cl" },
    { n: 150, anexo: "229304", unidad: "Personal", usuario: "Pamela Sotomayor Aedo", cargo: "Analista Ley 18.834 y Apoyo Honorarios", mail: "pamela.sotomayor@redsalud.gov.cl" },
    { n: 151, anexo: "245565", unidad: "Personal", usuario: "Fabian Maureira Matus", cargo: "Analista Ley 18.834", mail: "fabian.maureira@redsalud.gov.cl" },
    { n: 152, anexo: "245559", unidad: "Personal", usuario: "Alberto Rodriguez Hernandez", cargo: "Analistas Horas Extras", mail: "alberto.rodriguez@redsalud.gov.cl" },
    { n: 153, anexo: "245577", unidad: "Analista Ley Medica", usuario: "Carlos Retamales Nuñez", cargo: "Profesional", mail: "carlos.retamalesn@redsalud.gov.cl" },
    { n: 154, anexo: "245667", unidad: "PORTERIA URGENCIA", usuario: "PORTERIA URGENCIA", cargo: "PORTERIA URGENCIA", mail: "" },
    { n: 155, anexo: "229309", unidad: "PRAIS", usuario: "SECRETARIA", cargo: "SECRETARIA", mail: "prais.melipilla@redsalud.gov.cl" },
    { n: 156, anexo: "245772", unidad: "PRAIS", usuario: "MARIA PAZ JORQUERA", cargo: "JEFATURA", mail: "mariapaz.jorquera@redsalud.gov.cl" },
    { n: 157, anexo: "245573", unidad: "UNIDAD PROCESO QUIRURGICO", usuario: "VIVIANA ACEVEDO VILLEGAS", cargo: "ENCARGADA UNIDAD PROCESO QUIRURGICO Y GESTION LEQ", mail: "viviana.acevedo@redsalud.gov.cl" },
    { n: 158, anexo: "245606", unidad: "REAUDACION CAE", usuario: "RECAUDADOR TURNO", cargo: "RECAUDADOR", mail: "" },
    { n: 159, anexo: "245733", unidad: "Cobranzas", usuario: "Javier Inostroza", cargo: "Encargado de Cobranzas", mail: "javier.inostroza@redsalud.gov.cl" },
    { n: 160, anexo: "245741", unidad: "RECAUDACION CENTRAL", usuario: "PABLO MARTINEZ", cargo: "JEFATURA RECAUDACION", mail: "pablo.martinez@redsalud.gov.cl" },
    { n: 161, anexo: "245688", unidad: "RECAUDACION PENSIONADO", usuario: "PIA FAUNDEZ", cargo: "RECAUDADOR", mail: "pia.faundez@redsalud.gov.cl" },
    { n: 162, anexo: "245690", unidad: "RECAUDACION PENSIONADO", usuario: "RECAUDACION PENSIONADO", cargo: "RECAUDADOR", mail: "" },
    { n: 163, anexo: "245668", unidad: "RECAUDACION URGENCIA", usuario: "RECAUDADOR DE TURNO", cargo: "", mail: "" },
    { n: 164, anexo: "245650", unidad: "Laboratorio y UMT", usuario: "Lesly Manzo", cargo: "Secretaria laboratorio", mail: "secrelaboratoriohsjm@redsalud.gov.cl" },
    { n: 165, anexo: "245646", unidad: "Imagenolgía", usuario: "Admision imagenologia", cargo: "Admision imagenologia", mail: "" },
    { n: 166, anexo: "245679", unidad: "RESIDENCIA MATRONAS", usuario: "", cargo: "", mail: "" },
    { n: 167, anexo: "245564", unidad: "Gestión y administracion de Personas", usuario: "Sebastian Aguilar Reyes", cargo: "Jefe Personal", mail: "jefepersonalhsjm@redsalud.gov.cl" },
    { n: 168, anexo: "245647", unidad: "Imagenolgía", usuario: "Sala ecotomografia ginecologica", cargo: "Sala ecotomografia ginecologica", mail: "" },
    { n: 169, anexo: "245664", unidad: "SALA ESTAR MEDICOS", usuario: "", cargo: "", mail: "" },
    { n: 170, anexo: "245677", unidad: "SALA PRE-PARTO", usuario: "MATRONA DE TURNO", cargo: "", mail: "" },
    { n: 171, anexo: "245683", unidad: "SALA RECUPERACION", usuario: "TECNICO DE TURNO", cargo: "TECNICO DE TURNO", mail: "" },
    { n: 172, anexo: "245589", unidad: "SECRETARIA CAE", usuario: "CECILIA PEREZ", cargo: "SECRETARIA", mail: "cecilia.perezm@redsalud.gov.cl" },
    { n: 173, anexo: "245630", unidad: "CDT", usuario: "CAMILA ESPINOZA MORENO - SECRETARIA", cargo: "JEFE ODONTOLOGIA - SECRETARIA", mail: "camila.espinoza@redsalud.gov.cl - odontologiamelipilla@redsalud.gov.cl" },
    { n: 174, anexo: "245554", unidad: "SECRETARIA DIRECCION", usuario: "SECRETARIA DIRECCION", cargo: "SECRETARIA", mail: "secretaria.dir@redsalud.gov.cl" },
    { n: 175, anexo: "245671", unidad: "SECRETARIA SUBDIRECCION", usuario: "CAROL DURAN GUERRA", cargo: "SECRETARIA SUBDIRECCIONES", mail: "secretaria.sub@redsalud.gov.cl" },
    { n: 176, anexo: "245585", unidad: "Profesional planificacion y control de gestión", usuario: "Felipe Saavedra", cargo: "", mail: "" },
    { n: 177, anexo: "245742", unidad: "SECRETARIA RR.HH.", usuario: "SECRETARIA PERSONAL", cargo: "SECRETARIA PERSONAL", mail: "secretariapersonas@redsalud.gov.cl" },
    { n: 178, anexo: "245619", unidad: "SELECTOR", usuario: "TECNICO DE TURNO", cargo: "TECNICO DE TURNO", mail: "" },
    { n: 179, anexo: "245718", unidad: "Alimentación y SEDILE", usuario: "Victor Saavedra Barrera", cargo: "Nutricionista Jefe", mail: "victor.saavedra@redsalud.gov.cl" },
    { n: 180, anexo: "245737", unidad: "SSGG", usuario: "CRISTIAN MUÑOZ", cargo: "ADMINISTRATIVO", mail: "cristian.munozs@redsalud.gov.cl" },
    { n: 181, anexo: "245729", unidad: "SSGG", usuario: "MIGUEL JARA", cargo: "JEFATURA SSGG", mail: "miguel.jara@redsalud.gov.cl" },
    { n: 182, anexo: "245660", unidad: "SSGG SECRETARIA", usuario: "SECRETARIA SSGG", cargo: "SECRETARIA", mail: "ssgg.secretaria@redsalud.gov.cl" },
    { n: 183, anexo: "245551", unidad: "SUBDIRECCION ADMINISTRATIVA", usuario: "CAROLINA ROJAS ELGUETA", cargo: "SUBDIRECTORA ADMINISTRATIVA", mail: "sdahsjm@redsalud.gov.cl" },
    { n: 184, anexo: "245553", unidad: "SUBDIRECCION", usuario: "IVORY MONDINO BARRERA", cargo: "SUBDIRECCION G.C. DE MATRONERIA - SUBDIRECCION G.C. DE ENFERMERIA", mail: "sdmat.hsjm@redsalud.gov.cl - sgce.melipilla@redsalud.gov.cl" },
    { n: 185, anexo: "245587", unidad: "SUBDIRECCION MEDICA", usuario: "DRA. LUZ QUIROGA IRREÑO", cargo: "SUBDIRECTOR MEDICO", mail: "sdmhsjm@redsalud.gov.cl" },
    { n: 186, anexo: "245691", unidad: "SUPERVISORA CDT", usuario: "ELIZABETH ALLENDES FILIPPI", cargo: "ENFERMERA SUPERVISORA CAE", mail: "elizabeth.allendes@redsalud.gov.cl" },
    { n: 187, anexo: "245726", unidad: "TALLERES", usuario: "MAESTROS SSGG", cargo: "", mail: "" },
    { n: 188, anexo: "245558", unidad: "TESORERIA", usuario: "MONICA JARA", cargo: "ENCARGADA DE TESORERIA", mail: "monica.jarav@redsalud.gov.cl" },
    { n: 189, anexo: "245591", unidad: "UNIDAD GES", usuario: "DIGITADORAS SIGGES", cargo: "DIGITADORAS SIGGES", mail: "" },
    { n: 190, anexo: "245663", unidad: "UNIDAD GES", usuario: "ROSITA BLANCO", cargo: "DIGITADORA SIGGES", mail: "rosa.blanco@redsalud.gov.cl" },
    { n: 191, anexo: "245674", unidad: "URGENCIA MATERNAL", usuario: "MATRONA DE TURNO", cargo: "MATRONA DE TURNO", mail: "" },
    { n: 192, anexo: "245665", unidad: "URGENCIA PEDIATRICA", usuario: "PEDIATRA DE TURNO", cargo: "PEDIATRA DE TURNO", mail: "" },
    { n: 193, anexo: "245575", unidad: "Subdirección análisis de la información para la gestión", usuario: "Mackarena Zapata", cargo: "Subdirectora", mail: "sdaig.hsjm@redsalud.gov.cl" },
    { n: 194, anexo: "245575", unidad: "Subdirección Apoyo Clínico", usuario: "EU Flavia Romero Herrera", cargo: "Subdirección Apoyo Clínico", mail: "sdap.hsjm@redsalud.gov.cl" },
    { n: 195, anexo: "245666", unidad: "MEDICINA", usuario: "JOSE SUCCRE TALY", cargo: "JEFE SERVICIO MEDICINA", mail: "jose.sucre@redsalud.gov.cl" },
    { n: "S/N", anexo: "245755", unidad: "GESTION DE LA DEMANDA", usuario: "ROSSANA YAÑEZ ERCOLI", cargo: "JEFA GESTION DE LA DEMANDA", mail: "rossana.yanez@redsalud.gov.cl" },
    { n: "S/N", anexo: "245751", unidad: "UNIDAD PROCESO QUIRURGICO", usuario: "VIVIANA ACEVEDO VILLEGAS", cargo: "ENCARGADA UNIDAD PROCESO QUIRURGICO Y GESTION LEQ", mail: "viviana.acevedo@redsalud.gov.cl" },
    { n: "S/N", anexo: "245701", unidad: "AUDITORIA", usuario: "JUAN CARLOS DIAZ - ISABEL SILVA", cargo: "JEFE AUDITORIA - PROFESIONAL UNIDAD AUDITORIA", mail: "juancarlos.diaz@redsalud.gov.cl - isabel.silvah@redsalud.gov.cl" },
    { n: "S/N", anexo: "245574", unidad: "OIRS", usuario: "MARIANA LAZO", cargo: "ADMINISTRATIVO OIRS", mail: "mariana.lazo@redsalud.gov.cl" },
    { n: "S/N", anexo: "245719", unidad: "Planificación y control de gestión", usuario: "Claudia Perez", cargo: "Jefatura", mail: "claudia.perezh@redsalud.gov.cl" },
    { n: "S/N", anexo: "245687", unidad: "Planificación y control de gestión", usuario: "Felipe Saavedra", cargo: "Profesional planificacion y control de gestión", mail: "felipe.saavedra@redsalud.gov.cl" },
    { n: "S/N", anexo: "245649", unidad: "Laboratorio y UMT", usuario: "Waleska Parodi- Nicole Camus", cargo: "Toma de muestra", mail: "nicole.camus@redsalud.gov.cl" },
    { n: "S/N", anexo: "229305", unidad: "Salud de Personal", usuario: "Cristian Ull Galaz", cargo: "Medico Cirujano", mail: "" },
    { n: "S/N", anexo: "229302", unidad: "Personal", usuario: "Nicolas Mejias Zuñiga", cargo: "Analista Circuito de Firmas, dev. Tiempo, cargas familiares, lic.Medicas Rechazadas", mail: "nicolas.mejias@redsalud.gov.cl" },
    { n: "S/N", anexo: "245561", unidad: "Personal", usuario: "Alisson Berrios Mora", cargo: "Analista Horas Extras", mail: "alisson.berrios@redsalud.gov.cl" },
    { n: "S/N", anexo: "245680", unidad: "Pabellon Quirurgico", usuario: "Ivonne Cancino", cargo: "Supervisora", mail: "ivonne.cancino@redsalud.gov.cl" },
    { n: "S/N", anexo: "245657", unidad: "Urgencia", usuario: "Amelia Rodriguez", cargo: "Supervisora", mail: "supervisora.urghsjm@redsalud.gov.cl" },
    { n: "S/N", anexo: "245708", unidad: "GCE UPC", usuario: "Yenny Vera", cargo: "Supervisora", mail: "yenny.vera@redsalud.gov.cl" },
    { n: "S/N", anexo: "245776", unidad: "Polo-Cardiologia", usuario: "", cargo: "Cardiología - Broncopulmonar Ad. - Anestesiología", mail: "cardiologia.hsjm@redsalud.gov.cl" },
    { n: "S/N", anexo: "245621", unidad: "UMAH", usuario: "Cristina Solis Cárdenas", cargo: "", mail: "cristina.solis@redsalud.gov.cl" },
    { n: "S/N", anexo: "245638", unidad: "Programa Diabetes", usuario: "María Paz Toledo", cargo: "Programa Diabetes", mail: "programadiabeteshsjm@redsalud.gov.cl" },
    { n: "S/N", anexo: "245697", unidad: "Farmacia 24", usuario: "Jorge Aravena Venegas", cargo: "Encargado farmacia hospitalizados", mail: "jorge.aravenav@redsalud.gov.cl" },
  ];

  // LÓGICA DE FILTRADO REVISADA (ANTIERRORES)
  const filtrados = datosAnexos.filter(item => {
    const busquedaMinus = busqueda.toLowerCase();
    
    // Verificamos cada campo: si no existe, usamos texto vacío ""
    const unidad = (item.unidad || "").toLowerCase();
    const usuario = (item.usuario || "").toLowerCase();
    const cargo = (item.cargo || "").toLowerCase();
    const anexo = (item.anexo || "");

    return (
      unidad.includes(busquedaMinus) ||
      usuario.includes(busquedaMinus) ||
      cargo.includes(busquedaMinus) ||
      anexo.includes(busquedaMinus)
    );
  });

  const totalPaginas = Math.ceil(filtrados.length / registrosPorPagina);
  const indiceUltimo = paginaActual * registrosPorPagina;
  const indicePrimero = indiceUltimo - registrosPorPagina;
  const registrosActuales = filtrados.slice(indicePrimero, indiceUltimo);

  return (
    <section className="bg-white rounded-[3rem] p-4 md:p-10 shadow-2xl border border-slate-100 min-h-screen w-full font-sans animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <button onClick={() => onNavigate('inicio')} className="bg-slate-100 hover:bg-[#ffb81c] text-[#003876] px-4 py-2 rounded-full font-black flex items-center gap-2 transition-all mb-4 text-xs shadow-sm">
            <ChevronLeftIcon size={16} /> INICIO
          </button>
          <h2 className="text-4xl md:text-5xl font-black text-[#003876] uppercase italic tracking-tighter leading-none">
            Anexos <span className="text-cyan-600">Hospital</span>
          </h2>
        </div>

        <div className="relative w-full md:w-96">
          <div className="flex shadow-sm rounded-xl overflow-hidden border-2 border-slate-200 focus-within:border-cyan-500 transition-all">
            <input 
              type="text"
              placeholder="Search..."
              className="flex-grow px-4 py-2 outline-none font-bold text-slate-600"
              value={busqueda}
              onChange={(e) => { setBusqueda(e.target.value); setPaginaActual(1); }}
            />
            <button className="bg-[#003876] text-white p-3 hover:bg-cyan-600 transition-colors">
              <Search size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded-2xl border border-slate-200 shadow-sm">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-[#003876]">
              <th className="p-4 font-black text-[11px] uppercase">N°</th>
              <th className="p-4 font-black text-[11px] uppercase">Anexo</th>
              <th className="p-4 font-black text-[11px] uppercase">Servicio/Unidad</th>
              <th className="p-4 font-black text-[11px] uppercase">Usuario</th>
              <th className="p-4 font-black text-[11px] uppercase">Cargo</th>
              <th className="p-4 font-black text-[11px] uppercase">Mail</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {registrosActuales.map((item, index) => (
              <tr key={index} className="hover:bg-cyan-50/30 transition-colors group">
                <td className="p-4 text-xs text-slate-400 font-bold">{item.n}</td>
                <td className="p-4 text-sm font-black text-cyan-600 tracking-tight">{item.anexo}</td>
                <td className="p-4 text-xs font-bold text-slate-500 uppercase">{item.unidad}</td>
                <td className="p-4 text-xs font-black text-[#003876]">{item.usuario}</td>
                <td className="p-4 text-xs text-slate-500 font-bold">{item.cargo}</td>
                <td className="p-4">
                  {item.mail && (
                    <a href={`mailto:${item.mail}`} className="flex items-center gap-2 text-xs font-bold text-cyan-600 hover:text-[#003876] underline">
                      <Mail size={14} /> {item.mail}
                    </a>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 flex justify-end items-center gap-2">
        <button 
          disabled={paginaActual === 1}
          onClick={() => setPaginaActual(paginaActual - 1)}
          className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-30 flex-shrink-0">
          <ChevronLeftIcon size={18} />
        </button>

        <span className="md:hidden text-sm font-bold text-[#003876] px-4">
          Página {paginaActual} de {totalPaginas}
        </span>
        
        <div className="hidden md:flex flex-wrap justify-center items-center gap-2">
          {[...Array(totalPaginas)].map((_, i) => (
            <button
              key={i}
              onClick={() => setPaginaActual(i + 1)}
              className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${
                paginaActual === i + 1 
                ? 'bg-[#003876] text-white shadow-md' 
                : 'text-slate-500 hover:bg-slate-100'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

       <button 
          disabled={paginaActual === totalPaginas}
          onClick={() => setPaginaActual(paginaActual + 1)}
          className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-30 flex-shrink-0"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </section>
  );
};

export default Anexos;