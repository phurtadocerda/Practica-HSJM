require('dotenv').config();
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');

// 1. Configuración del Pool de conexión
const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL 
});

// 2. Creamos el adaptador para Prisma
const adapter = new PrismaPg(pool);

// 3. Inicializamos el cliente usando el adaptador
const prisma = new PrismaClient({ adapter });

async function main() {

  console.log("🧹 Limpiando tabla de documentos y anexos");
  await prisma.documento.deleteMany({});
  await prisma.anexo.deleteMany({});
  console.log('🌱 Iniciando el sembrado de datos con Adaptador PG y hashing de contraseñas...');

  const areas = [
    'Urgencias',
    'Pabellón',
    'Administración',
    'Imagenología',
    'Transformacion Digital'
  ];

  for (const nombre of areas) {
    await prisma.area.upsert({
      where: { nombre },
      update: {},
      create: { nombre }
    });
  }

  console.log('✅ Tabla de áreas poblada');

  // Usuario Jefe
  const admin = await prisma.usuario.upsert({
    where: { rut: '18869522-1' },
    update: {},
    create: {
      rut: '18869522-1',
      nombres: 'Patricio Eduardo',
      apellido_paterno: 'Hurtado',
      apellido_materno: 'Cerda',
      fecha_nacimiento: new Date('1990-04-28'),
      area_trabajo: 'Transformacion Digital',
      password: await bcrypt.hash('1234', 10),
      rol: 'administrador',
    },
  });

  console.log(`✅ Usuario jefe creado/actualizado: ${admin.rut}`);

  // Usuario Funcionario 1
  const user1 = await prisma.usuario.upsert({
    where: { rut: '12345678-9' },
    update: {},
    create: {
      rut: '12345678-9',
      nombres: 'Juan',
      apellido_paterno: 'Pérez',
      apellido_materno: 'Gómez',
      fecha_nacimiento: new Date('1985-04-29'),
      area_trabajo: 'Urgencias',
      password: await bcrypt.hash('password1', 10),
      rol: 'funcionario',
    },
  });

  console.log(`✅ Usuario funcionario creado/actualizado: ${user1.rut}`);

  // Usuario Funcionario 2
  const user2 = await prisma.usuario.upsert({
    where: { rut: '98765432-1' },
    update: {},
    create: {
      rut: '98765432-1',
      nombres: 'María',
      apellido_paterno: 'López',
      apellido_materno: 'Rodríguez',
      fecha_nacimiento: new Date('1992-04-30'),
      area_trabajo: 'Administración',
      password: await bcrypt.hash('password2', 10),
      rol: 'funcionario',
    },
  });

  console.log(`✅ Usuario funcionario creado/actualizado: ${user2.rut}`);

  const docsAccidentes = [
    // === CATEGORÍA: ACCIDENTES DE TRABAJO ===
    { titulo: "Unidad de salud Ocupacional y Gestión Ambiental", url: "accidentes/USOAMBIENTAL.pdf", categoria: "accidentes" },
    { titulo: "Flujo de accidente trabajo", url: "accidentes/FLUJOAT.pdf", categoria: "accidentes" },
    { titulo: "Flujo de accidente trabajo con exposición a fluidos", url: "accidentes/FLUJO_ACCIDENTES_CON_EXPOSICION_A_FLUIDOS_CORPORALES_(MUTUAL_2017).pdf", categoria: "accidentes" },
    { titulo: "DIAT", url: "accidentes/DIAT-mutual.pdf", categoria: "accidentes" },
    { titulo: "Consentimiento informado VIH", url: "accidentes/CONSENTIMIENTO_VIH.pdf", categoria: "accidentes" },
    { titulo: "Rechazo de Atención", url: "accidentes/Rechazo_de_Atenciones.pdf", categoria: "accidentes" },
    // === CATEGORÍA: AGENDAMIENTO GIS (MANUALES) ===
    { titulo: "Ingresar Interconsultas", url: "agendamiento/manuales/Ingresar-Interconsultas.pdf", categoria: "agendamiento_gis_manual" },
    { titulo: "Estado de Solicitudes", url: "agendamiento/manuales/Estado-de-Solicitudes.pdf", categoria: "agendamiento_gis_manual" },
    { titulo: "Nóminas de Atención", url: "agendamiento/manuales/Nominas-de-Atencion.pdf", categoria: "agendamiento_gis_manual" },
    { titulo: "Profesionales", url: "agendamiento/manuales/Profesionales.pdf", categoria: "agendamiento_gis_manual" },
    // === CATEGORÍA: AGENDAMIENTO GIS (VIDEOS) ===
    { titulo: "Tutorial 1: Agendar Pacientes", url: "agendamiento/videos/Agendar-Pacientes.mp4", categoria: "agendamiento_gis_video" },
    { titulo: "Tutorial 2: Bloqueo de Agendas", url: "agendamiento/videos/Bloqueo-y-recuperacion-de-agendas.mp4", categoria: "agendamiento_gis_video" },
    { titulo: "Tutorial 3: Copiar Nóminas de Atención", url: "agendamiento/videos/Copiar-Nominas-de-Atencion.mp4", categoria: "agendamiento_gis_video" },
    { titulo: "Tutorial 4: Crear Agendas", url: "agendamiento/videos/Crear-Agendas.mp4", categoria: "agendamiento_gis_video" },
    { titulo: "Tutorial 5: Definir Ausencias Médicas", url: "agendamiento/videos/Definir-Ausencias-Medicas.mp4", categoria: "agendamiento_gis_video" },
  ];

  for (const doc of docsAccidentes) {
    await prisma.documento.upsert({
      where: { url: doc.url }, 
      update: {
        titulo: doc.titulo,
        categoria: doc.categoria
      },
      create: doc
    });
  }
  console.log("✅ Documentos insertados/actualizados");

  const anexos = [
      { anexo: "245639", unidad: "ABASTECIMIENTO", usuario: "ABASTECIMIENTO", cargo: "ABASTECIMIENTO", email: "" },
      { anexo: "245634", unidad: "Abastecimiento", usuario: "María de los Ángeles Morales Jorquera", cargo: "Jefa de abastecimiento", email: "maria.moralesj@redsalud.gov.cl" },
      { anexo: "245736", unidad: "ABASTECIMIENTO", usuario: "JEFATURA DE ABASTECIMIENTO/ENCARGADA DE CONVENIOS", cargo: "", email: "maria.moralesj@redsalud.gov.cl" },
      { anexo: "245636", unidad: "ABASTECIMIENTO", usuario: "EJECUTIVO DE COMPRAS", cargo: "EJECUTIVO DE COMPRAS", email: "" },
      { anexo: "245637", unidad: "ABASTECIMIENTO", usuario: "ENCARGADA DE CONVENIOS", cargo: "ENCARGADA DE CONVENIOS", email: "" },
      { anexo: "245672", unidad: "COMUNICACIONES", usuario: "LUIS DUARTE", cargo: "CENTRAL TELEFONICA", email: "luis.duarte@redsalud.gov.cl" },
      { anexo: "245669", unidad: "APOYO URGENCIA", usuario: "RECAUDADOR", cargo: "RECAUDADOR", email: "" },
      { anexo: "245642", unidad: "ARCHIVO", usuario: "Ximena Pinto", cargo: "", email: "patricia.pinto@redsalud.gov.cl" },
      { anexo: "245648", unidad: "Imagenolgía", usuario: "Sala informes medico radiologo", cargo: "Sala informes medico radiologo", email: "" },
      { anexo: "245748", unidad: "Archivo", usuario: "Alejandra Chamizo", cargo: "Jefatura", email: "maria.chamizo@redsalud.gov.cl" },
      { anexo: "245652", unidad: "ARCHIVO PASIVO", usuario: "Patricio Ballesteros", cargo: "", email: "patricio.ballesteros@redsalud.gov.cl" },
      { anexo: "245584", unidad: "ASISTENTE SOCIAL", usuario: "SONIA ALVARADO", cargo: "ENCARGADA BIENESTAR", email: "sonia.alvarado@redsalud.gov.cl" },
      { anexo: "245704", unidad: "BIOPSIAS", usuario: "ELIZABETH JORQUERA", cargo: "ENCARGADA BIOPSIAS", email: "elizabeth.jorqueraf@redsalud.gov.cl" },
      { anexo: "245568", unidad: "Bodega abastecimiento", usuario: "Jorge Roblero", cargo: "Jefa de bodega", email: "" },
      { anexo: "245725", unidad: "Bodega Farmacia", usuario: "Euguenio Vargas Chávez", cargo: "Encargado Bodega de Farmacia", email: "eugenio.vargas@redsalud.gov.cl" },
      { anexo: "245773", unidad: "BOTIQUIN FARMACIA", usuario: "BOTIQUIN FARMACIA", cargo: "", email: "" },
      { anexo: "245615", unidad: "Proced. Endoscópicos - Cir. Menor - Proceso Qx. Oftalmológico", usuario: "Francisca Arenas Carvajal", cargo: "Proced. Endoscópicos - Cir. Menor - Proceso Qx. Oftalmológico", email: "procedimientos.cae@redsalud.gov.cl" },
      { anexo: "245616", unidad: "GES, SIGGES, GESTION ONCOLOGICA", usuario: "ANTONIETA OLIVARES O.", cargo: "JEFE GES, SIGGES, GESTION ONCOLOGICA", email: "antonieta.olivares@redsalud.gov.cl" },
      { anexo: "245617", unidad: "BOX 13 CIRUGIA AMBULATORIA", usuario: "", cargo: "TECNICO DE TURNO", email: "" },
      { anexo: "245618", unidad: "BOX 14 OFTALMOLOGIA", usuario: "DRA. COLL", cargo: "OFTALMOLOGA", email: "" },
      { anexo: "245619", unidad: "BOX 15", usuario: "", cargo: "MEDICO DE TURNO", email: "" },
      { anexo: "245620", unidad: "BOX 16", usuario: "", cargo: "MEDICO DE TURNO", email: "" },
      { anexo: "245625", unidad: "TACO", usuario: "Stephanie Bruna Véliz", cargo: "TACO", email: "stephanie.bruna@redsalud.gov.cl" },
      { anexo: "245626", unidad: "BOX 20", usuario: "DENTAL", cargo: "DENTISTA DE TURNO", email: "" },
      { anexo: "245627", unidad: "BOX 21", usuario: "DENTAL", cargo: "DENTISTA DE TURNO", email: "" },
      { anexo: "245628", unidad: "BOX 22", usuario: "DENTAL", cargo: "DENTISTA DE TURNO", email: "" },
      { anexo: "245629", unidad: "BOX 23", usuario: "DENTAL", cargo: "DENTISTA DE TURNO", email: "" },
      { anexo: "245705", unidad: "BOX 24", usuario: "DENTAL", cargo: "DENTISTA DE TURNO", email: "" },
      { anexo: "245631", unidad: "BOX 25", usuario: "DENTAL", cargo: "DENTISTA DE TURNO", email: "" },
      { anexo: "245632", unidad: "BOX 26", usuario: "LABORATORIO DENTAL", cargo: "", email: "" },
      { anexo: "245593", unidad: "BOX 27", usuario: "UMAH", cargo: "ENFERMERA", email: "" },
      { anexo: "245594", unidad: "BOX 28", usuario: "BOX GINECOLOGICO", cargo: "GINECOLOGO DE TURNO", email: "" },
      { anexo: "245595", unidad: "BOX 29", usuario: "GINECOLOGIA GENERAL", cargo: "GINECOLOGO DE TURNO", email: "" },
      { anexo: "245608", unidad: "BOX 2 TRAUMATOLOGIA", usuario: "TRAUMATOLOGIA", cargo: "", email: "" },
      { anexo: "245596", unidad: "BOX 30", usuario: "SALUD SEXUAL", cargo: "MATRONA DE TURNO", email: "" },
      { anexo: "245597", unidad: "BOX 31", usuario: "MONICA WALTON", cargo: "MATRONA CAE", email: "monica.walton@redsalud.gov.cl" },
      { anexo: "245599", unidad: "BOX 33", usuario: "OFICINA MONITOREO", cargo: "", email: "" },
      { anexo: "245600", unidad: "BOX 34", usuario: "MONITORA SIGGES", cargo: "MONITORA SIGGES", email: "" },
      { anexo: "245601", unidad: "BOX 35", usuario: "DR. CARMONA", cargo: "COLOPROCTOLOGIA- PSIQUIATRIA", email: "" },
      { anexo: "245602", unidad: "PARTICIPACION CIUDADANA", usuario: "MARITZA CARRASCO", cargo: "ENCARGADA PARTICIPACION CIUDADANA", email: "maritza.carrasco@redsalud.gov.cl" },
      { anexo: "245603", unidad: "OIRS", usuario: "LEYLA VALLADARES - JEANNETTE CEA", cargo: "JEFATURA OIRS - PROFESIONAL APOYO OIRS", email: "leyla.valladares@redsalud.gov.cl" },
      { anexo: "245605", unidad: "OIRS", usuario: "RAUL BUSTAMANTE", cargo: "ASISTENTE SOCIAL OIRS", email: "raul.bustante@redsalud.gov.cl" },
      { anexo: "245604", unidad: "BOX 38", usuario: "OIRS", cargo: "MARIANA LAZO- ISABEL VARGAS", email: "mariana.lazo@redsalud.gov.cl" },
      { anexo: "245633", unidad: "COMUNICACIONES", usuario: "BERNARDITA RAMIREZ", cargo: "ATENCION PACIENTES HOSPITALIZADOS", email: "bernardita.ramirez@redsalud.gov.cl" },
      { anexo: "245590", unidad: "BOX 40", usuario: "CECILIA ELGUETA - WOLFGANG KAGELMACHER", cargo: "JEFATURA CAE", email: "ana.elgueta@redsalud.gov.cl" },
      { anexo: "245612", unidad: "BOX 45", usuario: "ROSSANA YAÑEZ", cargo: "JEFATURA", email: "rossana.yanez@redsalud.gov.cl" },
      { anexo: "245609", unidad: "Polos Especialidades CDT", usuario: "Carolina Emack Magaña", cargo: "Traumatología", email: "esp.traumatologia@redsalud.gov.cl" },
      { anexo: "245610", unidad: "BOX 5 PEDIATRIA CAE", usuario: "", cargo: "", email: "" },
      { anexo: "245611", unidad: "BOX 6 PEDIATRIA CAE", usuario: "", cargo: "", email: "" },
      { anexo: "245659", unidad: "BOX URGENCIA ADULTOS", usuario: "TECNICO DE TURNO", cargo: "", email: "" },
      { anexo: "245732", unidad: "CALDERA", usuario: "", cargo: "", email: "" },
      { anexo: "245747", unidad: "CALIDAD", usuario: "JAMIE PEREZ AEDO", cargo: "JEFATURA CALIDAD Y SEGURIDAD PACIENTE", email: "calidad.hsjm@redsalud.gov.cl" },
      { anexo: "245707", unidad: "CALIDAD", usuario: "SECRETARIA", cargo: "SECRETARIA CALIDAD", email: "" },
      { anexo: "245588", unidad: "IAAS / EPIDEMIOLOGIA", usuario: "GIANINA CAÑAS / DR. SALOME CASTILLO", cargo: "JEFATURA", email: "iaashsjm@redsalud.gob.cl" },
      { anexo: "247610", unidad: "Estadisticas", usuario: "Olivia Carrasco", cargo: "", email: "olivia.carrasco@redsalud.gov.cl" },
      { anexo: "245745", unidad: "CALL-CENTER", usuario: "ROSA ESCARATE", cargo: "", email: "" },
      { anexo: "247613", unidad: "CALL- CENTER", usuario: "SONIA FARIAS", cargo: "", email: "" },
      { anexo: "247612", unidad: "POLO OFTALMOLOGIA", usuario: "ROMINA MARTINEZ", cargo: "", email: "" },
      { anexo: "247614", unidad: "CALL- CENTER", usuario: "JACQUELINE PEREZ", cargo: "", email: "" },
      { anexo: "247615", unidad: "UNIDAD LISTA DE ESPERA", usuario: "KAREN SANTIBAÑEZ ARCUCH", cargo: "ENCARGADA", email: "karen.santibanez@redsalud.gov.cl" },
      { anexo: "247611", unidad: "Censo - Estadisticas", usuario: "Juana Cortéz - Francisca Rivera", cargo: "", email: "jluisa.cortes@redsalud.gov.cl" },
      { anexo: "245567", unidad: "CAPACITACION", usuario: "ALBERTO OVALLE", cargo: "ENCARGADO", email: "alberto.ovalle@redsalud.gov.cl" },
      { anexo: "229203", unidad: "Capacitación y Formación", usuario: "Carlos Schulmeyer Jara", cargo: "Profesional", email: "carlos.schulmeyer@redsalud.gov.cl" },
      { anexo: "245598", unidad: "CASA CLUB", usuario: "CASA CLUB", cargo: "", email: "" },
      { anexo: "245722", unidad: "CENTRAL ESTERILIZACION", usuario: "ENCARGADA DE TURNO", cargo: "", email: "" },
      { anexo: "245555", unidad: "COMUNICACIONES", usuario: "LUIS DUARTE", cargo: "ENCARGADO CENTRAL TELEFONICA", email: "luis.duarte@redsalud.gov.cl" },
      { anexo: "247618", unidad: "Chile Crece Contigo", usuario: "Marie Claire Lacouture", cargo: "Psicóloga", email:"marie.lacouture@redsalud.gov.cl" },
      { anexo: "245702", unidad: "CHOFERES", usuario: "CHOFER DE TURNO", cargo: "", email: "" },
      { anexo: "245684", unidad: "CMA", usuario: "LAURA ECHEVERRIA", cargo: "SUPERVISORA", email: "laura.echeverria@redsalud.gov.cl" },
      { anexo: "245570", unidad: "CONTABILIDAD", usuario: "", cargo: "", email: "stephanie.vargasp@redsalud.gov.cl" },
      { anexo: "245571", unidad: "CONTABILIDAD", usuario: "LUIS FARIAS", cargo: "", email: "luis.farias@redsalud.gov.cl" },
      { anexo: "245569", unidad: "CONTABILIDAD", usuario: "CONTABILIDAD", cargo: "JEFATURA", email: "" },
      { anexo: "245572", unidad: "CONTABILIDAD", usuario: "ELIAS HERNANDEZ", cargo: "", email: "elias.hernandez@redsalud.gov.cl" },
      { anexo: "245689", unidad: "CONTROL DE GESTION", usuario: "CLAUDIA PEREZ", cargo: "JEFATURA", email: "claudia.perezh@redsalud.gov.cl" },
      { anexo: "245770", unidad: "CTA", usuario: "SUSANA PIZARRO", cargo: "JEFA UNIDAD", email: "susana.pizarros@redsalud.gov.cl" },
      { anexo: "245622", unidad: "Programa CP y AD", usuario: "Denisse Hinojosa", cargo: "Programa CP y AD", email: "denisse.hinojosa@redsalud.gov.cl" },
      { anexo: "245566", unidad: "Calidad de Vida", usuario: "Silvana Muñoz Cañete", cargo: "Profesional", email: "silvana.munoz@redsalud.gov.cl" },
      { anexo: "245661", unidad: "DESARROLLO ORGANIZACIONAL", usuario: "SILVANA MUÑOZ CAÑETE", cargo: "ENCARGADA", email: "silvana.munozc@redsalud.gov.cl" },
      { anexo: "245552", unidad: "DIRECCION", usuario: "OSCAR VARGAS DURANTI", cargo: "DIRECTOR", email: "oscar.vargasd@redsalud.gov.cl" },
      { anexo: "245623", unidad: "HOSPITALIZACION DOMICILIARIA", usuario: "DRA. VICTORIA DIAZ-GRANADOS", cargo: "MEDICO JEFE", email: "victoria.diazg@redsalud.gov.cl" },
      { anexo: "245710", unidad: "Cirugia", usuario: "Patricio Muñoz", cargo: "Supervisor", email: "scirugia.hsjm@redsalud.gov.cl" },
      { anexo: "245643", unidad: "ESTADISTICA", usuario: "VIVIANA PIÑEIRO", cargo: "JEFE", email: "viviana.pineiro@redsalud.gov.cl" },
      { anexo: "245641", unidad: "ESTADISTICA", usuario: "Daniela Escalona", cargo: "", email: "daniela.escalona@redsalud.gov.c" },
      { anexo: "245640", unidad: "EST. ENFER CAE", usuario: "TECNICO DE TURNO", cargo: "TECNICO DE TURNO", email: "" },
      { anexo: "245709", unidad: "CIRUGIA", usuario: "SECRETARIA", cargo: "SECRETARIA", email: "secretariacirgugia@redsalud.gov.cl" },
      { anexo: "245685", unidad: "EST ENFER. MATERNIDAD", usuario: "MATRONA DE TURNO", cargo: "", email: "" },
      { anexo: "245706", unidad: "EST.ENFERMERIA MATERNIDAD", usuario: "MEDICOS DE TURNO", cargo: "", email: "" },
      { anexo: "245698", unidad: "UCI", usuario: "YENNY VERA", cargo: "ENFERMERA SUPERVISORA", email: "yenny.vera@redsalud.gob.cl" },
      { anexo: "245699", unidad: "EST.ENFERMERIA MEDICINA B", usuario: "", cargo: "", email: "" },
      { anexo: "245713", unidad: "PEDIATRIA", usuario: "ESTACION", cargo: "SUPERVISORA", email: "margarita.tapia@redsalud.gob.cl" },
      { anexo: "245686", unidad: "Pensionado", usuario: "Nicole Tapia", cargo: "Supervisora", email: "" },
      { anexo: "245586", unidad: "EST. ENFER UTI", usuario: "Cecilia Echeverria", cargo: "GCE Uti", email: "cecilia.echeverriam@redsalud.gov.cl" },
      { anexo: "245721", unidad: "Esterilización", usuario: "Judith Herrada", cargo: "Supervisora", email: "judith.herrada@redsalud.gov.cl" },
      { anexo: "245697", unidad: "Farmacia 24", usuario: "Elizabeth Yévenes Jerez", cargo: "Jefa de Farmacia", email: "elizabeth.yevenes@redsalud.gov.cl" },
      { anexo: "245696", unidad: "FARMACIA 24 HRS", usuario: "SECRETARIA F24", cargo: "", email: "" },
      { anexo: "245607", unidad: "Farmacia Atencion Abierta", usuario: "Felipe Fuentes Viveros", cargo: "Encargado", email: "felipe.fuentesv@redsalud.gov.cl" },
      { anexo: "722696939", unidad: "FINIS TERRAE", usuario: "", cargo: "", email: "" },
      { anexo: "245693", unidad: "GESTION DE CAMAS", usuario: "KARLA ARAYA", cargo: "SUPERVISORA", email: "karla.araya@redsalud.gov.cl" },
      { anexo: "245720", unidad: "GESTION DE CAMAS", usuario: "INES MALLEA", cargo: "SECRETARIA", email: "ines.mallea@redsalud.gov.cl" },
      { anexo: "245581", unidad: "Contabilidad", usuario: "Carlos Quiroga Catalán", cargo: "Jefe", email: "carlos.quiroga@redsalud.gov.cl" },
      { anexo: "245582", unidad: "GESTION FINANCIERA", usuario: "", cargo: "", email: "" },
      { anexo: "245746", unidad: "Finanzas", usuario: "Ana María Villouta Villarroel", cargo: "Jefa", email: "ana.villouta@redsalud.gov.cl" },
      { anexo: "245613", unidad: "GESTORA GES", usuario: "QUIRURGICA", cargo: "", email: "" },
      { anexo: "245557", unidad: "GRD", usuario: "BELEN GONZALEZ LECAROS", cargo: "JEFA", email: "belen.gonzalezl@redsalud.gov.cl" },
      { anexo: "245580", unidad: "INFORMATICA", usuario: "SOPORTE", cargo: "", email: "" },
      { anexo: "245579", unidad: "INFORMATICA", usuario: "ALDO PIZARRO PIZARRO", cargo: "JEFATURA", email: "aldo.pizarro@redsalud.gov.cl" },
      { anexo: "245592", unidad: "Desarrollo Organizacional", usuario: "Alejandro Muñoz", cargo: "Profesional", email: "alejandro.munoz@redsalud.gov.cl" },
      { anexo: "245655", unidad: "Laboratorio y UMT", usuario: "Tiare Zuchel", cargo: "Jefatura", email: "tiare.zuchel@redsalud.gov.cl" },
      { anexo: "245749", unidad: "JURIDICA", usuario: "JORGE HERRERA FIGUEROA", cargo: "JEFE", email: "jorge.herreraf@redsalud.gov.cl" },
      { anexo: "245556", unidad: "JURIDICA", usuario: "ROBERTO MASSARELI", cargo: "PROFESIONAL", email: "juridica.hsjm@redsalud.gov.cl" },
      { anexo: "245645", unidad: "Medicina Fisica", usuario: "Secretaria Kinesiologia", cargo: "", email: "rhb.secretaria@redsalud.gov.cl" },
      { anexo: "245651", unidad: "Laboratorio y UMT", usuario: "TM Turno", cargo: "", email: "" },
      { anexo: "245730", unidad: "LAVANDERIA", usuario: "", cargo: "", email: "" },
      { anexo: "245771", unidad: "MATERNIDAD", usuario: "ARIEL GUIÑEZ", cargo: "SUPERVISOR", email: "supgo.hsjm@redsalud.gob.cl" },
      { anexo: "245703", unidad: "MEDICINA", usuario: "IBONNE CATALAN", cargo: "SUPERVISORA", email: "ibonne.catalan@redsalud.gov.cl" },
      { anexo: "245700", unidad: "MEDICINA", usuario: "SECRETARIA", cargo: "", email: "carola.contrerasf@redsalud.gob.cl" },
      { anexo: "247616", unidad: "MODULO 1", usuario: "ADMISION SOME", cargo: "", email: "" },
      { anexo: "247622", unidad: "Polos especialidades", usuario: "Daniela Allende Rojo", cargo: "Interna", email: "" },
      { anexo: "247617", unidad: "Polos Especialidades", usuario: "Romina Martínez Ortíz", cargo: "Pediatría", email: "esp.infantileshjsm@redsalud.gov.cl" },
      { anexo: "245638", unidad: "Polos especialidades", usuario: "Catalina Gutierrez Núñez", cargo: "Urología", email: "esp.uronefrohsjm@redsalud.gov.cl" },
      { anexo: "247621", unidad: "Polos Especialidades", usuario: "Victoria Alvarez", cargo: "Cirugía", email: "policirugia.hsjm@redsalud.gov.cl" },
      { anexo: "247620", unidad: "Polos especialidades", usuario: "Bárbara Catalán Sánchez", cargo: "Oftalmología", email: "polo.oftalmologia@redsalud.gov.cl" },
      { anexo: "247635", unidad: "MODULO 7", usuario: "", cargo: "ADMISION SOME", email: "" },
      { anexo: "245712", unidad: "NEONATOLOGIA", usuario: "MARCELA UTEAU", cargo: "PEDIATRA", email: "marcela.uteau@redsalud.gov.cl" },
      { anexo: "245658", unidad: "OBSERVACION URGENCIA", usuario: "MEDICO TURNO", cargo: "", email: "" },
      { anexo: "245710", unidad: "CIRUGIA", usuario: "EDUARDO MORALES MEZA", cargo: "JEFE", email: "scirugia.hsjm@redsalud.gov.cl" },
      { anexo: "245576", unidad: "COMUNICACIONES", usuario: "CHRISTIAN CADENAS", cargo: "ADMIN", email: "esteban.cadenas.c@gemail.com" },
      { anexo: "245681", unidad: "OFICINA JEFE PABELLON", usuario: "PABELLON", cargo: "", email: "" },
      { anexo: "245694", unidad: "GINECOLOGIA", usuario: "ARIEL GUIÑEZ", cargo: "SUPERVISOR", email: "ariel.guinez@redsalud.gov.cl" },
      { anexo: "245682", unidad: "OFICINA MEDICOS PABELLON", usuario: "", cargo: "SECRETARIA", email: "" },
      { anexo: "245708", unidad: "UPC", usuario: "GALO AVENDAÑO A.", cargo: "JEFE", email: "jefeupchsjm@redsalud.gov.cl" },
      { anexo: "245723", unidad: "OFICINA NUTRICIONISTAS", usuario: "VALERIA PIZARRO", cargo: "NUTRICIONISTA", email: "" },
      { anexo: "245578", unidad: "OFICINA PARTES", usuario: "PAOLA MUÑOZ", cargo: "ENCARGADA", email: "oficinapartes.hsjm@redsalud.gov.cl" },
      { anexo: "245678", unidad: "OFICINA PRE-PARTO", usuario: "", cargo: "", email: "" },
      { anexo: "245560", unidad: "S.O.G.A", usuario: "CAMILA SANTIS", cargo: "PROFESIONAL", email: "camila.santis@redsalud.gov.cl" },
      { anexo: "245680", unidad: "PABELLONES", usuario: "GERARDO VALDIVIA SALGADO", cargo: "MEDICO JEFE", email: "gerardo.valdivias@redsalud.gov.cl" },
      { anexo: "245656", unidad: "SERVICIO URGENCIA", usuario: "JOSE VILLASMIL NUÑEZ", cargo: "JEFE", email: "jose.villasmil@redsalud.gov.cl" },
      { anexo: "245654", unidad: "Imagenolgía", usuario: "Edgardo Hernandez Lucero", cargo: "jefatura", email: "jefeimagen.hsjm@redsalud.gov.cl" },
      { anexo: "245711", unidad: "OF. JEFE CIRUGIA", usuario: "SECRETARIA", cargo: "", email: "" },
      { anexo: "245644", unidad: "OF. KINESIOLOGIA", usuario: "RICARDO CONTRERAS", cargo: "Jefatura", email: "ricardo.contreras@redsalud.gov.cl" },
      { anexo: "245714", unidad: "OF. MEDICOS PEDIATRIA", usuario: "MEDICO TURNO", cargo: "PEDIATRA", email: "" },
      { anexo: "245670", unidad: "OIRS URGENCIA", usuario: "ASISTENTE SOCIAL", cargo: "", email: "" },
      { anexo: "245676", unidad: "PASILLO PRE-PARTO", usuario: "MATRONA TURNO", cargo: "", email: "" },
      { anexo: "245752", unidad: "PEDIATRIA", usuario: "MARGARITA TAPIA", cargo: "SUPERVISORA", email: "margarita.tapia@redsalud.gob.cl" },
      { anexo: "245614", unidad: "COMUNICACIONES", usuario: "GRETHEL DURAN", cargo: "JEFE", email: "grethel.duran@redsalud.gov.cl" },
      { anexo: "245583", unidad: "PERSONAL", usuario: "JAVIER MIRANDA MANZO", cargo: "ANALISTA", email: "javier.miranda@redsalud.gov.cl" },
      { anexo: "245562", unidad: "Personal", usuario: "jenniffer Cerda Cortez", cargo: "Analista", email: "jenniffer.cerda@redsalud.gov.cl" },
      { anexo: "245563", unidad: "Personal", usuario: "Jenny Farias Troncoso", cargo: "Analista", email: "jenny.farias@redsalud.gov.cl" },
      { anexo: "229304", unidad: "Personal", usuario: "Pamela Sotomayor Aedo", cargo: "Analista", email: "pamela.sotomayor@redsalud.gov.cl" },
      { anexo: "245565", unidad: "Personal", usuario: "Fabian Maureira Matus", cargo: "Analista", email: "fabian.maureira@redsalud.gov.cl" },
      { anexo: "245559", unidad: "Personal", usuario: "Alberto Rodriguez Hernandez", cargo: "Analista", email: "alberto.rodriguez@redsalud.gov.cl" },
      { anexo: "245577", unidad: "Analista Ley Medica", usuario: "Carlos Retamales Nuñez", cargo: "Profesional", email: "carlos.retamalesn@redsalud.gov.cl" },
      { anexo: "245667", unidad: "PORTERIA URGENCIA", usuario: "", cargo: "", email: "" },
      { anexo: "229309", unidad: "PRAIS", usuario: "SECRETARIA", cargo: "", email: "prais.melipilla@redsalud.gov.cl" },
      { anexo: "245772", unidad: "PRAIS", usuario: "MARIA PAZ JORQUERA", cargo: "JEFATURA", email: "mariapaz.jorquera@redsalud.gov.cl" },
      { anexo: "245573", unidad: "PROCESO QUIRURGICO", usuario: "VIVIANA ACEVEDO VILLEGAS", cargo: "ENCARGADA", email: "viviana.acevedo@redsalud.gov.cl" },
      { anexo: "245606", unidad: "REAUDACION CAE", usuario: "RECAUDADOR", cargo: "", email: "" },
      { anexo: "245733", unidad: "Cobranzas", usuario: "Javier Inostroza", cargo: "Encargado", email: "javier.inostroza@redsalud.gov.cl" },
      { anexo: "245741", unidad: "RECAUDACION CENTRAL", usuario: "PABLO MARTINEZ", cargo: "JEFATURA", email: "pablo.martinez@redsalud.gov.cl" },
      { anexo: "245688", unidad: "RECAUDACION PENSIONADO", usuario: "PIA FAUNDEZ", cargo: "RECAUDADOR", email: "pia.faundez@redsalud.gov.cl" },
      { anexo: "245690", unidad: "RECAUDACION PENSIONADO", usuario: "RECAUDACION", cargo: "", email: "" },
      { anexo: "245668", unidad: "RECAUDACION URGENCIA", usuario: "RECAUDADOR", cargo: "", email: "" },
      { anexo: "245650", unidad: "Laboratorio", usuario: "Lesly Manzo", cargo: "Secretaria", email: "secrelaboratoriohsjm@redsalud.gov.cl" },
      { anexo: "245646", unidad: "Imagenolgía", usuario: "Admision", cargo: "", email: "" },
      { anexo: "245679", unidad: "RESIDENCIA MATRONAS", usuario: "", cargo: "", email: "" },
      { anexo: "245564", unidad: "Personal", usuario: "Sebastian Aguilar Reyes", cargo: "Jefe", email: "jefepersonalhsjm@redsalud.gov.cl" },
      { anexo: "245647", unidad: "Imagenolgía", usuario: "Ecotomografia", cargo: "", email: "" },
      { anexo: "245664", unidad: "SALA ESTAR MEDICOS", usuario: "", cargo: "", email: "" },
      { anexo: "245677", unidad: "SALA PRE-PARTO", usuario: "MATRONA TURNO", cargo: "", email: "" },
      { anexo: "245683", unidad: "SALA RECUPERACION", usuario: "TECNICO TURNO", cargo: "", email: "" },
      { anexo: "245589", unidad: "SECRETARIA CAE", usuario: "CECILIA PEREZ", cargo: "SECRETARIA", email: "cecilia.perezm@redsalud.gov.cl" },
      { anexo: "245630", unidad: "CDT", usuario: "CAMILA ESPINOZA MORENO", cargo: "JEFE ODONTOLOGIA", email: "camila.espinoza@redsalud.gov.cl" },
      { anexo: "245554", unidad: "SECRETARIA DIRECCION", usuario: "DIRECCION", cargo: "SECRETARIA", email: "secretaria.dir@redsalud.gov.cl" },
      { anexo: "245671", unidad: "SECRETARIA SUBDIRECCION", usuario: "CAROL DURAN GUERRA", cargo: "SECRETARIA", email: "secretaria.sub@redsalud.gov.cl" },
      { anexo: "245585", unidad: "Control Gestión", usuario: "Felipe Saavedra", cargo: "", email: "" },
      { anexo: "245742", unidad: "SECRETARIA RR.HH.", usuario: "SECRETARIA", cargo: "", email: "secretariapersonas@redsalud.gov.cl" },
      { anexo: "245619", unidad: "SELECTOR", usuario: "TECNICO TURNO", cargo: "", email: "" },
      { anexo: "245718", unidad: "Alimentación", usuario: "Victor Saavedra Barrera", cargo: "Nutricionista Jefe", email: "victor.saavedra@redsalud.gov.cl" },
      { anexo: "245737", unidad: "SSGG", usuario: "CRISTIAN MUÑOZ", cargo: "ADMIN", email: "cristian.munozs@redsalud.gov.cl" },
      { anexo: "245729", unidad: "SSGG", usuario: "MIGUEL JARA", cargo: "JEFATURA", email: "miguel.jara@redsalud.gov.cl" },
      { anexo: "245660", unidad: "SSGG SECRETARIA", usuario: "SECRETARIA", cargo: "", email: "ssgg.secretaria@redsalud.gov.cl" },
      { anexo: "245551", unidad: "SUBDIRECCION ADM", usuario: "CAROLINA ROJAS ELGUETA", cargo: "SUBDIRECTORA", email: "sdahsjm@redsalud.gov.cl" },
      { anexo: "245553", unidad: "SUBDIRECCION ENF/MAT", usuario: "IVORY MONDINO BARRERA", cargo: "SUBDIRECCION", email: "sdmat.hsjm@redsalud.gov.cl" },
      { anexo: "245587", unidad: "SUBDIRECCION MEDICA", usuario: "DRA. LUZ QUIROGA IRREÑO", cargo: "SUBDIRECTOR", email: "sdmhsjm@redsalud.gov.cl" },
      { anexo: "245691", unidad: "SUPERVISORA CDT", usuario: "ELIZABETH ALLENDES FILIPPI", cargo: "SUPERVISORA", email: "elizabeth.allendes@redsalud.gov.cl" },
      { anexo: "245726", unidad: "TALLERES", usuario: "MAESTROS SSGG", cargo: "", email: "" },
      { anexo: "245558", unidad: "TESORERIA", usuario: "MONICA JARA", cargo: "ENCARGADA", email: "monica.jarav@redsalud.gov.cl" },
      { anexo: "245591", unidad: "UNIDAD GES", usuario: "DIGITADORAS", cargo: "", email: "" },
      { anexo: "245663", unidad: "UNIDAD GES", usuario: "ROSITA BLANCO", cargo: "DIGITADORA", email: "rosa.blanco@redsalud.gov.cl" },
      { anexo: "245674", unidad: "URGENCIA MATERNAL", usuario: "MATRONA TURNO", cargo: "", email: "" },
      { anexo: "245665", unidad: "URGENCIA PEDIATRICA", usuario: "PEDIATRA TURNO", cargo: "", email: "" },
      { anexo: "245575", unidad: "Subdirección Gestión", usuario: "Mackarena Zapata", cargo: "Subdirectora", email: "sdaig.hsjm@redsalud.gov.cl" },
      { anexo: "245666", unidad: "MEDICINA", usuario: "JOSE SUCCRE TALY", cargo: "JEFE SERVICIO", email: "jose.sucre@redsalud.gov.cl" },
      { anexo: "245680", unidad: "Pabellon Quirurgico", usuario: "Ivonne Cancino", cargo: "Supervisora", email: "ivonne.cancino@redsalud.gov.cl" },
      { anexo: "245755", unidad: "GESTION DE LA DEMANDA", usuario: "ROSSANA YAÑEZ ERCOLI", cargo: "JEFA GESTION DE LA DEMANDA", email: "rossana.yanez@redsalud.gov.cl" },
      { anexo: "245751", unidad: "UNIDAD PROCESO QUIRURGICO", usuario: "VIVIANA ACEVEDO VILLEGAS", cargo: "ENCARGADA UNIDAD PROCESO QUIRURGICO Y GESTION LEQ", email: "viviana.acevedo@redsalud.gov.cl" },
      { anexo: "245701", unidad: "AUDITORIA", usuario: "JUAN CARLOS DIAZ - ISABEL SILVA", cargo: "JEFE AUDITORIA - PROFESIONAL UNIDAD AUDITORIA", email: "juancarlos.diaz@redsalud.gov.cl" },
      { anexo: "245574", unidad: "OIRS", usuario: "MARIANA LAZO", cargo: "ADMINISTRATIVO OIRS", email: "mariana.lazo@redsalud.gov.cl" },
      { anexo: "245719", unidad: "Planificación y control de gestión", usuario: "Claudia Perez", cargo: "Jefatura", email: "claudia.perezh@redsalud.gov.cl" },
      { anexo: "245687", unidad: "Planificación y control de gestión", usuario: "Felipe Saavedra", cargo: "Profesional", email: "felipe.saavedra@redsalud.gov.cl" },
      { anexo: "245649", unidad: "Laboratorio y UMT", usuario: "Waleska Parodi- Nicole Camus", cargo: "Toma de muestra", email: "nicole.camus@redsalud.gov.cl" },
      { anexo: "229305", unidad: "Salud de Personal", usuario: "Cristian Ull Galaz", cargo: "Medico Cirujano", email: "" },
      { anexo: "229302", unidad: "Personal", usuario: "Nicolas Mejias Zuñiga", cargo: "Analista", email: "nicolas.mejias@redsalud.gov.cl" },
      { anexo: "245561", unidad: "Personal", usuario: "Alisson Berrios Mora", cargo: "Analista Horas Extras", email: "alisson.berrios@redsalud.gov.cl" },
      { anexo: "245680", unidad: "Pabellon Quirurgico", usuario: "Ivonne Cancino", cargo: "Supervisora", email: "ivonne.cancino@redsalud.gov.cl" },
      { anexo: "245657", unidad: "Urgencia", usuario: "Amelia Rodriguez", cargo: "Supervisora", email: "supervisora.urghsjm@redsalud.gov.cl" },
      { anexo: "245708", unidad: "GCE UPC", usuario: "Yenny Vera", cargo: "Supervisora", email: "yenny.vera@redsalud.gov.cl" },
      { anexo: "245776", unidad: "Polo-Cardiologia", usuario: "", cargo: "Cardiología - Broncopulmonar - Anestesiología", email: "cardiologia.hsjm@redsalud.gov.cl" },
      { anexo: "245621", unidad: "UMAH", usuario: "Cristina Solis Cárdenas", cargo: "", email: "cristina.solis@redsalud.gov.cl" },
      { anexo: "245638", unidad: "Programa Diabetes", usuario: "María Paz Toledo", cargo: "Programa Diabetes", email: "programadiabeteshsjm@redsalud.gov.cl" },
      { anexo: "245697", unidad: "Farmacia 24", usuario: "Jorge Aravena Venegas", cargo: "Encargado farmacia hospitalizados", email: "jorge.aravenav@redsalud.gov.cl" }
    ];
    for (const anexo of anexos) {
    await prisma.anexo.upsert({
      where: {
        anexo: anexo.anexo
      },
      update: {
        unidad: anexo.unidad,
        usuario: anexo.usuario,
        cargo: anexo.cargo,
        email: anexo.email
      },
      create: {
        anexo: anexo.anexo,
        unidad: anexo.unidad,
        usuario: anexo.usuario,
        cargo: anexo.cargo,
        email: anexo.email
      }
    });
    console.log("✅ Anexos insertados correctamente");
  }

}

main()
  .catch((e) => {
    console.error("❌ Error en el seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });