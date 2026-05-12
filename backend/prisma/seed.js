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

  console.log('🔄 Limpiando tablas de documentos...');
  await prisma.documento.deleteMany({});

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
    where: { rut: '21245882-1' },
    update: {},
    create: {
      rut: '21245882-1',
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
    { titulo: "Unidad de salud Ocupacional y Gestión Ambiental", url: "USOAMBIENTAL.pdf", categoria: "accidentes" },
    { titulo: "Flujo de accidente trabajo", url: "FLUJOAT.pdf", categoria: "accidentes" },
    { titulo: "Flujo de accidente trabajo con exposición a fluidos", url: "FLUJO_ACCIDENTES_CON_EXPOSICION_A_FLUIDOS_CORPORALES_(MUTUAL_2017).pdf", categoria: "accidentes" },
    { titulo: "DIAT", url: "DIAT-mutual.pdf", categoria: "accidentes" },
    { titulo: "Consentimiento informado VIH", url: "CONSENTIMIENTO_VIH.pdf", categoria: "accidentes" },
    { titulo: "Rechazo de Atención", url: "Rechazo_de_Atenciones.pdf", categoria: "accidentes" },
    // === CATEGORIA: MANUAL DE ORGANIZACIÓN ===
    { titulo: "Manual de Organización", url: "manualOrganizacion/Manual-de-organizacion.pdf", categoria: "organizacion" },
    // === CATEGORIA: RESOLUCIÓN ORGANIGRAMA ===
    { titulo: "Resolución Organigrama", url: "organigrama/Resolucion_organigrama.pdf", categoria: "organigrama" },
    // === CATEGORIA: PARTICIPACIÓN CIUDADANA ===
    { titulo: "Plan de Trabajo y cronograma de actividades Unidad de Participación HSJM_2025", url: "participacionCiudadana/Plan-de-Trabajo-y-cronograma-de-actividades-Unidad-de-Participacion-HSJM_2025.pdf", categoria: "participacion" },
    { titulo: "Plan Anual de acciones de Participación y cronograma de actividades +Resolución Enc.Participación Indicador EAR C.4.2", url: "participacionCiudadana/Plan-Anual-de-acciones-de-Participacion-y-cronograma-de-actividades-Resolucion-Enc.Participacion-Indicador-EAR-C.4.2.pdf", categoria: "participacion" },
    { titulo: "Informe anual de cumplimiento de resultados alcanzados entre CCU y Dirección", url: "participacionCiudadana/Informe-anual-de-cumplimiento-de-resultados-alcanzados-entre-CCU-y-Direccion.pdf", categoria: "participacion" },
    // === CATEGORIA: PLAN ANUAL CCU ===
    { titulo: "Informe anual 2024 acuerdos CCU y Dirección HSJM", url: "planAnualCCU/Informe-anual-2024-acuerdos-CCU-y-Direccion-HSJM.pdf", categoria: "plan_anual_ccu" },
    // === CATEGORIA: PLANOS ===
    { titulo: "HSJM-AR-DW-000 (UNIDADES CLÍNICAS)", url: "planos/HSJM-AR-DW-000-UNIDADES-CLINICAS_Rev-6_SEREMI.pdf", categoria: "planos",subcategoria: "Índice" },

    // NIVEL -1
    { titulo: "HSJM-AR-DW-100 (PN-1_100) SEREMI-100", url: "Planos/HSJM-AR-DW-100-PN-1_100_Rev-6_SEREMI-100.pdf", categoria: "planos",subcategoria: "Nivel -1"},
    { titulo: "HSJM-AR-DW-100 (PN-1_100) SEREMI-200", url: "Planos/HSJM-AR-DW-100-PN-1_100_Rev-6_SEREMI-200.pdf", categoria: "planos",subcategoria: "Nivel -1"},
    { titulo: "HSJM-AR-DW-100 (PN-1_100) SEREMI-201", url: "Planos/HSJM-AR-DW-100-PN-1_100_Rev-6_SEREMI-201.pdf", categoria: "planos",subcategoria: "Nivel -1"},
    { titulo: "HSJM-AR-DW-100 (PN-1_100) SEREMI-300", url: "Planos/HSJM-AR-DW-100-PN-1_100_Rev-6_SEREMI-300.pdf", categoria: "planos",subcategoria: "Nivel -1"},
    { titulo: "HSJM-AR-DW-100 (PN-1_100) SEREMI-301", url: "Planos/HSJM-AR-DW-100-PN-1_100_Rev-6_SEREMI-301.pdf", categoria: "planos",subcategoria: "Nivel -1"},
    { titulo: "HSJM-AR-DW-100 (PN-1_100) SEREMI-500", url: "Planos/HSJM-AR-DW-100-PN-1_100_Rev-6_SEREMI-500.pdf", categoria: "planos",subcategoria: "Nivel -1"},
    { titulo: "HSJM-AR-DW-100 (PN-1_100) SEREMI-700", url: "Planos/HSJM-AR-DW-100-PN-1_100_Rev-6_SEREMI-700.pdf", categoria: "planos",subcategoria: "Nivel -1" },
    { titulo: "HSJM-AR-DW-100 (PN-1_100) SEREMI-800", url: "Planos/HSJM-AR-DW-100-PN-1_100_Rev-6_SEREMI-800.pdf", categoria: "planos",subcategoria: "Nivel -1" },
    { titulo: "HSJM-AR-DW-100 (PN-1_100) SEREMI-801", url: "Planos/HSJM-AR-DW-100-PN-1_100_Rev-6_SEREMI-801.pdf", categoria: "planos",subcategoria: "Nivel -1" },

    // NIVEL 1
    { titulo: "HSJM-AR-DW-101 (PN1_100) SEREMI-102", url: "Planos/HSJM-AR-DW-101-PN1_100_Rev-6_SEREMI-102.pdf", categoria: "planos",subcategoria: "Nivel 1" },
    { titulo: "HSJM-AR-DW-101 (PN1_100) SEREMI-204", url: "Planos/HSJM-AR-DW-101-PN1_100_Rev-6_SEREMI-204.pdf", categoria: "planos",subcategoria: "Nivel 1" },
    { titulo: "HSJM-AR-DW-101 (PN1_100) SEREMI-205", url: "Planos/HSJM-AR-DW-101-PN1_100_Rev-6_SEREMI-205.pdf", categoria: "planos",subcategoria: "Nivel 1" },
    { titulo: "HSJM-AR-DW-101 (PN1_100) SEREMI-302", url: "Planos/HSJM-AR-DW-101-PN1_100_Rev-6_SEREMI-302.pdf", categoria: "planos",subcategoria: "Nivel 1" },
    { titulo: "HSJM-AR-DW-101 (PN1_100) SEREMI-303", url: "Planos/HSJM-AR-DW-101-PN1_100_Rev-6_SEREMI-303.pdf", categoria: "planos",subcategoria: "Nivel 1" },
    { titulo: "HSJM-AR-DW-101 (PN1_100) SEREMI-304", url: "Planos/HSJM-AR-DW-101-PN1_100_Rev-6_SEREMI-304.pdf", categoria: "planos",subcategoria: "Nivel 1" },
    { titulo: "HSJM-AR-DW-101 (PN1_100) SEREMI-400", url: "Planos/HSJM-AR-DW-101-PN1_100_Rev-6_SEREMI-400.pdf", categoria: "planos",subcategoria: "Nivel 1" },
    { titulo: "HSJM-AR-DW-101 (PN1_100) SEREMI-501", url: "Planos/HSJM-AR-DW-101-PN1_100_Rev-6_SEREMI-501.pdf", categoria: "planos",subcategoria: "Nivel 1" },
    { titulo: "HSJM-AR-DW-101 (PN1_100) SEREMI-600", url: "Planos/HSJM-AR-DW-101-PN1_100_Rev-6_SEREMI-600.pdf", categoria: "planos",subcategoria: "Nivel 1" },
    { titulo: "HSJM-AR-DW-101 (PN1_100) SEREMI-701", url: "Planos/HSJM-AR-DW-101-PN1_100_Rev-6_SEREMI-701.pdf", categoria: "planos",subcategoria: "Nivel 1" },
    { titulo: "HSJM-AR-DW-101 (PN1_100) SEREMI-802", url: "Planos/HSJM-AR-DW-101-PN1_100_Rev-6_SEREMI-802.pdf", categoria: "planos",subcategoria: "Nivel 1" },
    { titulo: "HSJM-AR-DW-101 (PN1_100) SEREMI-803", url: "Planos/HSJM-AR-DW-101-PN1_100_Rev-6_SEREMI-803.pdf", categoria: "planos",subcategoria: "Nivel 1" },

    // NIVEL 2
    { titulo: "HSJM-AR-DW-102 (PN2_100) SEREMI-103", url: "Planos/HSJM-AR-DW-102-PN2_100_Rev-6_SEREMI-103.pdf", categoria: "planos",subcategoria: "Nivel 2" },
    { titulo: "HSJM-AR-DW-102 (PN2_100) SEREMI-206", url: "Planos/HSJM-AR-DW-102-PN2_100_Rev-6_SEREMI-206.pdf", categoria: "planos",subcategoria: "Nivel 2" },
    { titulo: "HSJM-AR-DW-102 (PN2_100) SEREMI-207", url: "Planos/HSJM-AR-DW-102-PN2_100_Rev-6_SEREMI-207.pdf", categoria: "planos",subcategoria: "Nivel 2" },
    { titulo: "HSJM-AR-DW-102 (PN2_100) SEREMI-305", url: "Planos/HSJM-AR-DW-102-PN2_100_Rev-6_SEREMI-305.pdf", categoria: "planos",subcategoria: "Nivel 2" },
    { titulo: "HSJM-AR-DW-102 (PN2_100) SEREMI-306", url: "Planos/HSJM-AR-DW-102-PN2_100_Rev-6_SEREMI-306.pdf", categoria: "planos",subcategoria: "Nivel 2" },
    { titulo: "HSJM-AR-DW-102 (PN2_100) SEREMI-401", url: "Planos/HSJM-AR-DW-102-PN2_100_Rev-6_SEREMI-401.pdf", categoria: "planos",subcategoria: "Nivel 2" },
    { titulo: "HSJM-AR-DW-102 (PN2_100) SEREMI-601", url: "Planos/HSJM-AR-DW-102-PN2_100_Rev-6_SEREMI-601.pdf", categoria: "planos",subcategoria: "Nivel 2" },

    // NIVEL 3
    { titulo: "HSJM-AR-DW-103 (PN3_100) SEREMI-104", url: "Planos/HSJM-AR-DW-103-PN3_100_Rev-6_SEREMI-104.pdf", categoria: "planos",subcategoria: "Nivel 3" },
    { titulo: "HSJM-AR-DW-103 (PN3_100) SEREMI-208", url: "planos/HSJM-AR-DW-103-PN3_100_Rev-6_SEREMI-208.pdf", categoria: "planos",subcategoria: "Nivel 3" },
    { titulo: "HSJM-AR-DW-103 (PN3_100) SEREMI-209", url: "planos/HSJM-AR-DW-103-PN3_100_Rev-6_SEREMI-209.pdf", categoria: "planos",subcategoria: "Nivel 3" },
    { titulo: "HSJM-AR-DW-103 (PN3_100) SEREMI-308", url: "Planos/HSJM-AR-DW-103-PN3_100_Rev-6_SEREMI-308.pdf", categoria: "planos",subcategoria: "Nivel 3" },
    { titulo: "HSJM-AR-DW-103 (PN3_100) SEREMI-602", url: "Planos/HSJM-AR-DW-103-PN3_100_Rev-6_SEREMI-602.pdf", categoria: "planos",subcategoria: "Nivel 3" }, 

        // NIVEL 4
    { titulo: "HSJM-AR-DW-104 (PN4_100) SEREMI-105", url: "Planos/HSJM-AR-DW-104-PN4_100_Rev-6_SEREMI-105.pdf", categoria: "planos",subcategoria: "Nivel 4" },
    { titulo: "HSJM-AR-DW-104 (PN4_100) SEREMI-210", url: "Planos/HSJM-AR-DW-104-PN4_100_Rev-6_SEREMI-210.pdf", categoria: "planos",subcategoria: "Nivel 4" },
    { titulo: "HSJM-AR-DW-104 (PN4_100) SEREMI-211", url: "Planos/HSJM-AR-DW-104-PN4_100_Rev-6_SEREMI-211.pdf", categoria: "planos",subcategoria: "Nivel 4" },
    { titulo: "HSJM-AR-DW-104 (PN4_100) SEREMI-309", url: "Planos/HSJM-AR-DW-104-PN4_100_Rev-6_SEREMI-309.pdf", categoria: "planos",subcategoria: "Nivel 4" },

    // NIVEL 5
    { titulo: "HSJM-AR-DW-105 (PN5_100) SEREMI-106", url: "Planos/HSJM-AR-DW-105-PN5_100_Rev-6_SEREMI-106.pdf", categoria: "planos",subcategoria: "Nivel 5" },
    { titulo: "HSJM-AR-DW-105 (PN5_100) SEREMI-212", url: "Planos/HSJM-AR-DW-105-PN5_100_Rev-6_SEREMI-212.pdf", categoria: "planos",subcategoria: "Nivel 5" },
    { titulo: "HSJM-AR-DW-105 (PN5_100) SEREMI-213", url: "Planos/HSJM-AR-DW-105-PN5_100_Rev-6_SEREMI-213.pdf", categoria: "planos",subcategoria: "Nivel 5" },

    // NIVEL 6
    { titulo: "HSJM-AR-DW-106 (PN6_100) SEREMI-214", url: "Planos/HSJM-AR-DW-106-PN6_100_Rev-6_SEREMI-214.pdf", categoria: "planos",subcategoria: "Nivel 6" },
    { titulo: "HSJM-AR-DW-106 (PN6_100) SEREMI-215", url: "Planos/HSJM-AR-DW-106-PN6_100_Rev-6_SEREMI-215.pdf", categoria: "planos",subcategoria: "Nivel 6" },

    // NIVEL 7
    { titulo: "HSJM-AR-DW-107 (PN7_100) SEREMI-216", url: "Planos/HSJM-AR-DW-107-PN7_100_Rev-5_SEREMI-216.pdf", categoria: "planos",subcategoria: "Nivel 7" },
    { titulo: "HSJM-AR-DW-107 (PN7_100) SEREMI-217", url: "Planos/HSJM-AR-DW-107-PN7_100_Rev-5_SEREMI-217.pdf", categoria: "planos",subcategoria: "Nivel 7" },
  

    // === CATEGORIA: PREVENCION DE RIESGOS ===
    { titulo: "Política de Seguridad y Salud en el trabajo SSMMOCC 25", url: "prevencionRiesgos/Capacitacion_uso_y_manejo_de_extintor_17_al_20_de_marzo_20251.pdf", categoria: "prevencion" },
    { titulo: "REGLAMENTO-INTERNO-2026-Nº994", url: "prevencionRiesgos/994-Reglamento-Interno-Higiene-y-Seguridad.pdf", categoria: "prevencion" },
    { titulo: "Plan Programa trabajo prevención de riesgos HSJM 2025", url: "prevencionRiesgos/PLAN-PROGRAMA-TRABAJO-PREVENCION-DE-RIESGOS-HSJM-2025.pdf", categoria: "prevencion" },
    { titulo: "Procedimiento actuación frente a la ocurrencia de accidentes de trabajo", url: "prevencionRiesgos/PROCEDIMIENTO_ACTUACION_ANTE_ACCIDENTES1.pdf", categoria: "prevencion" },
    { titulo: "Formulario DIAT", url: "prevencionRiesgos/DIAT1.pdf", categoria: "prevencion" },
    { titulo: "Formulario DIEP", url: "prevencionRiesgos/DIEP1.pdf", categoria: "prevencion" },
    { titulo: "Rechazo de atención", url: "prevencionRiesgos/Rechazo_de_Atenciones_MUTUAL1.pdf", categoria: "prevencion" },
    { titulo: "Consentimiento informado VIH", url: "prevencionRiesgos/CONSENTIMIENTO_INFORMADO_VIH_MUTUAL1.pdf", categoria: "prevencion" },
    { titulo: "Horario de atención", url: "prevencionRiesgos/Horario_de_atencion1.pdf", categoria: "prevencion" },
    { titulo: "Flujo de derivación", url: "prevencionRiesgos/FLUJO-DE-DERIVACION.pdf", categoria: "prevencion" },
    { titulo: "Resultados CEAL-SM 2024", url: "prevencionRiesgos/PPT-RESULTADOS-CEAL-SM-2024.pdf", categoria: "prevencion" },
    { titulo: "Difusión para funcionarios", url: "prevencionRiesgos/Difusion_para_funcionarios_TMERT1.pdf", categoria: "prevencion" },
    { titulo: "Tríptico difusión", url: "prevencionRiesgos/TRIPTICO_DIFUSION_TMERT1.pdf", categoria: "prevencion" },
    { titulo: "Difusión y capacitación de prexor", url: "prevencionRiesgos/ppt-difusion-y-capacitacion-de-prexor-v2021.pdf", categoria: "prevencion" },
    { titulo: "Fecha Ruido", url: "prevencionRiesgos/ficha-ruido-v4.pdf", categoria: "prevencion" },
    { titulo: "RESOLUCION PLAN DE EMERGENCIA 2023", url: "prevencionRiesgos/RESOLUCION-PLAN-DE-EMERGENCIA-2023.pdf", categoria: "prevencion" },
    { titulo: "Formulario denuncia", url: "prevencionRiesgos/Formilario_de_denuncia1.pdf", categoria: "prevencion" },
    { titulo: "Flujo activación APT", url: "prevencionRiesgos/Flujo_Activacion_APT1.pdf", categoria: "prevencion" },
    { titulo: "Formulario F.A.F", url: "prevencionRiesgos/F.A.F_formulario_Agresiones_Funcionarios1.pdf", categoria: "prevencion" },
    { titulo: "Protocolo de prevención AS-AL-VT", url: "prevencionRiesgos/Protocolo-de-prev-AS-AL-y-VT-Ley-21.6431.pdf", categoria: "prevencion" },
    { titulo: "Manual de buenas practicas", url: "prevencionRiesgos/Manual_de_buenas_practicas_laborales1.pdf", categoria: "prevencion" },
    { titulo: "Política de conciliación", url: "prevencionRiesgos/POLITICA_DE_CONCILIACIÓN_DE_LA_VIDA_LABORAL_Y_FAMILIAR_HSJM_20241.pdf", categoria: "prevencion" },
    { titulo: "Capacitación uso y manejo de extintor", url: "prevencionRiesgos/Capacitacion_uso_y_manejo_de_extintor_17_al_20_de_marzo_20251.pdf", categoria: "prevencion" },
    { titulo: "Capacitación de dosímetros", url: "prevencionRiesgos/Capacitacion_de_dosimetros1.pdf", categoria: "prevencion" },

    // === CATEGORIA: PROCURAMIENTO ===
    { titulo: "Clase proceso de donación y procuramiento de órganos y tejidos 2023", url: "procuramiento/Clase-proceso-de-donacion-y-procuramiento-de-organos-y-tejidos-2023.pptx", categoria: "procuramiento" },
    { titulo: "Clases Grabadas", url: "procuramiento/video/2018_El-mejor-regalo-de-la-vida_Minsal.mp4", categoria: "procuramiento" },
    { titulo: "Clases Grabadas", url: "procuramiento/video/EN-EL-LADO-DE-LA-VIDA.mp4", categoria: "procuramiento" },

    // === CATEGORIA: PRODUCCION Y ESTADÍSTICAS ===
    { titulo: "Actividades Produccion-H.-Melipilla_2025", url: "produccionEstadisticas/Actividades_Produccion_Melipilla_2025-1.xlsx", categoria: "estadisticas" },
    { titulo: "Actividades Producción H. Melipilla 2024", url: "produccionEstadisticas/Actividades-Produccion-H.-Melipilla_2024-Actualizado.xlsx", categoria: "estadisticas" },
    { titulo: "Actividades Producción H. Melipilla 2023", url: "produccionEstadisticas/Actividades-Produccion-H.-Melipilla_2023.xlsx", categoria: "estadisticas" },
    { titulo: "Actividades Producción H. Melipilla 2022", url: "produccionEstadisticas/Actividades-Produccion-H.-Melipilla_2022.xlsx", categoria: "estadisticas" },
    { titulo: "Manual-Series-REM-2023-V1", url: "produccionEstadisticas/Manual-Series-REM-2023-V1.pdf", categoria: "estadisticas" },
    { titulo: "2 Arancel MAI 2023 (con Res. 244)", url: "produccionEstadisticas/2-Arancel-MAI-2023con-Res.-244.xls", categoria: "estadisticas" },

    // === CATEGORIA: PROGRAMA BPSO ===
    { titulo: "SISTEMA DE CLASIFICACIÓN LESIONES POR PRESION", url: "Bpso/SISTEMA-DE-CLASIFICACION-LESIONES-POR-PRESION-1.pdf", categoria: "bpso" },
    
    // === CATEGORIA: PROTOCOLO DE ATENCION AL USUARIO ===
    { titulo: "Protocolo de Atencion al Usuario 2022", url: "protocoloAtencion/Protocolo-de-Atencion-al-Usuario-2022.pdf", categoria: "protocolo_usuario" },
    { titulo: "Díptico Protocolo Usuario", url: "protocoloAtencion/Protocolo-de-atencion-al-Usuario.-2022.pdf", categoria: "protocolo_usuario" },
    
    // === CATEGORIA: PROTOCOLOS Y ORDENES ===
    { titulo: "CONSENTIMIENTO SCANNER Y RESONANCIA CON CONTRASTE", url: "protocolosOrdenes/CONSENTIMIENTO-SCANNER-Y-RESONANCIA-CON-CONTRASTE.pdf", categoria: "protocolos_ordenes" },
    { titulo: "CUESTIONARIO SCANNER ACTUALIZADO", url: "protocolosOrdenes/CUESTIONARIO-SCANNER-ACTUALIZADO.pdf", categoria: "protocolos_ordenes" },
    { titulo: "ENCUESTA DE RESONANCIA", url: "protocolosOrdenes/ENCUESTA-DE-RESONANCIA.pdf", categoria: "protocolos_ordenes" },
    { titulo: "PREMEDICACION-HFB", url: "protocolosOrdenes/PREMEDICACION-HFB.pdf", categoria: "protocolos_ordenes" },
    { titulo: "Preparaciones HSJM", url: "protocolosOrdenes/Preparaciones-HSJM.docx", categoria: "protocolos_ordenes" },
    { titulo: "TAC-AUTORIZACION-crea-alta-ambulatorio", url: "protocolosOrdenes/TAC-AUTORIZACION-crea-alta-ambulatorio.doc", categoria: "protocolos_ordenes" },
    { titulo: "TAC-AUTORIZACION-PCTES-crea-alta-hospitalizado", url: "protocolosOrdenes/TAC-AUTORIZACION-PCTES-crea-alta-hospitalizado.doc", categoria: "protocolos_ordenes" },
 
    // === CATEGORIA: PROTOCOLO DE VIGILANCIA ===
    { titulo: "Protocolo de Vigilancia ", url: "protocoloVigilancia/videos/Protocolo-de-Vigilancia-de-Riesgos-Psicosociales-en-el-Trabajo.mp4", categoria: "protocolo_vigilancia" },
    { titulo: "Protocolo de Vigilancia Parte 2", url: "protocoloVigilancia/videos/Protocolo-de-Vigilancia-de-Riesgos-Psicosociales-en-el-Trabajo_2.mp4", categoria: "protocolo_vigilancia" },
    
    // === CATEGORIA: REACREDITACIÓN ===
    { titulo: "GRÁFICAS REACREDITACIÓN 1", url: "reacreditacion/GRAFICAS_REACREDITACION.pdf", categoria: "reacreditacion" },
    { titulo: "GRÁFICAS REACREDITACIÓN 2", url: "reacreditacion/GRAFICAS_REACREDITACION2.pdf", categoria: "reacreditacion" },

    // === CATEGORIA: REGLAMENTO INTERNO HIGIENE ===
    { titulo: "Reglamento Interno Higiene y Seguridad HSJM 2021", url: "reglamentoInternohigiene/Reglamento-Interno-Higiene-y-Seguridad-HSJM-2021.pdf", categoria: "reglamento_interno" },
    { titulo: "FIRMA RECEPCION DOCUMENTO", url: "reglamentoInternohigiene/FIRMA-RECEPCION-DOCUMENTO.pdf", categoria: "reglamento_interno" },

    // === CATEGORIA: REGLAMENTO INTERNO  ===
    { titulo: "Reglamento Interno ", url: "reglamentoInterno/994-Reglamento-Interno-Higiene-y-Seguridad.pdf", categoria: "reglamentointerno" },

    // === CATEGORIA: REGLAMENTO INTERNO Y PROTOCOLOS ===
    { titulo: "Protocolo de resguardo de pertenencias en Servicio de Urgencias ", url: "reglamentointernoprotocolo/protocolo-de-resguardo-de-pertenencias-en-Servicio-de-Urgencias.pdf", categoria: "reglamentointernoprotocolo" },

    // === CATEGORIA: RESOLUCIÓN ===
    { titulo: "Resolución N° 143 del HSJM. Formulario de notificación de agresiones hacia los funcionarios de la Salud Publica", url: "resolucion/9889.pdf", categoria: "resoluciones" },
    { titulo: "Resolución N° 9889, Protocolo de Ingreso y egreso unidad de cuidado intermedio pediátrico", url: "resolucion/Resolucion-N°-143-del-HSJM.-Formulario-de-notificacion-de-agresiones-hacia-los-funcionarios-de-la-Salud-Publica.pdf", categoria: "resoluciones" },

    // === CATEGORIA: REUNIONES ===
    { titulo: "SECUENCIA DE INTUBACION RAPIDA", url: "reuniones/ir.pptx", categoria: "reuniones" },
    { titulo: "ORGANIZACIÓN DURANTE RCP 2", url: "reuniones/2.pptx", categoria: "reuniones" },
    { titulo: "ACTUALIZACION PCR AHA", url: "reuniones/3.pptx", categoria: "reuniones" },
    { titulo: "MANEJO INICIAL DEL POLITRAUMA", url: "reuniones/4manejo.pptx", categoria: "reuniones" },
    { titulo: "PCR traumático", url: "reuniones/5.pptx", categoria: "reuniones" },
    { titulo: "TRAUMA RAQUIMEDULAR", url: "reuniones/6RAQUIMEDULAR.pptx", categoria: "reuniones" },
    { titulo: "CONVULSIONES EN PEDIATRIA", url: "reuniones/7.pptx", categoria: "reuniones" },
    { titulo: "TRAUMA OCULAR", url: "reuniones/8.pptx", categoria: "reuniones" },
    { titulo: "ACV ISQUEMICO Y HEMORRAGICO", url: "reuniones/9.pptx", categoria: "reuniones" },
    { titulo: "TROMBOEMBOLISMO PULMONAR", url: "reuniones/10.pptx", categoria: "reuniones" },
    { titulo: "MIOPERICARDITIS", url: "reuniones/11.pptx", categoria: "reuniones" },

    // === CATEGORIA: SEGURIDAD DEL PACIENTE ===
    { titulo: "Minuta para los Servicios de Salud y Establecimientos", url: "seguridadPaciente/Minuta-para-los-Servicios-de-Salud-y-Establecimientos.pdf", categoria: "seguridad_paciente" },
    { titulo: "10 Correcto", url: "seguridadPaciente/10-correctos.pdf", categoria: "seguridad_paciente" },
    { titulo: "Video Seguridad 1", url: "seguridadPaciente/videos/CAPSULA-MARIA-ELENA-OK.mp4", categoria: "seguridad_paciente" },
    { titulo: "Video Seguridad 2", url: "seguridadPaciente/videos/CAPSULA-IVANKA-OK.mp4", categoria: "seguridad_paciente" },
    { titulo: "Video Seguridad 3", url: "seguridadPaciente/videos/CAPSULA-FELIPE-OK.mp4", categoria: "seguridad_paciente" },
    { titulo: "Video Seguridad 4", url: "seguridadPaciente/videos/CAPSULA-JORGE-OK.mp4", categoria: "seguridad_paciente" },
    { titulo: "Video Seguridad 5", url: "seguridadPaciente/videos/Capsula-Medicacion-HSJM.mp4", categoria: "seguridad_paciente" },

    // === CATEGORIA: TUBERCULOSIS ===
    { titulo: "ACUALIZACION DEL ESQUEMA DE TRATAMIENTO DE LA TBC RESISTENTE A FARMACOS", url: "tuberculosis/ACUALIZACION-DEL-ESQUEMA-DE-TRATAMIENTO-DE-LA-TBC-RESISTENTE-A-FARMACOS.pdf", categoria: "tuberculosis" },
    { titulo: "NOTIFICACION Y SEGUIMIENTO TB DR Y PACIENTES COMITÉ 2025", url: "tuberculosis/NOTIFICACION-Y-SEGUIMIENTO-TB-DR-Y-PACIENTES-COMITE-2025.xlsx", categoria: "tuberculosis" },
    { titulo: "Protocolo de manejo del programa de control y eliminacion de la tuberculosis en area ambulatoria y hospitalizados", url: "tuberculosis/Protocolo-de-manejo-del-programa-de-control-y-eliminacion-de-la-tuberculosis-en-area-ambulatoria-y-hospitalizados.pdf", categoria: "tuberculosis" },
    { titulo: "Encuesta CPT 2025", url: "tuberculosis/Encuesta-CPT-2025.pdf", categoria: "tuberculosis" },
    { titulo: "Informe 1ER trimestre 2024", url: "tuberculosis/Informe-1ER-trimestre-2024.pdf", categoria: "tuberculosis" },
    { titulo: "Informe 2do trimestre 2024", url: "tuberculosis/Informe-2do-trimestre-2024.pdf", categoria: "tuberculosis" },
    { titulo: "Informe 3er trimestre 2024", url: "tuberculosis/Informe-3er-trimestre-2024.pdf", categoria: "tuberculosis" },
    { titulo: "Informe PROCET 4to trimestre -año2024", url: "tuberculosis/Informe-PROCET-4to-trimestre-ano2024.pdf", categoria: "tuberculosis" },
    { titulo: "Pauta de supervision servicios clinicos 2025", url: "tuberculosis/Pauta-de-supervision-servicios-clinicos-2025.pdf", categoria: "tuberculosis" },
    { titulo: "Plan Trabajo PROCET 2025", url: "tuberculosis/Plan-Trabajo-PROCET-2025.pdf", categoria: "tuberculosis" },
    { titulo: "Formulario de traslado nacional de pacientes en tratamiento por tuberculosis latente(quimioprofilaxis)", url: "tuberculosis/TRASLADO-NACIONAL_QUIMIOPROFILAXIS.pdf", categoria: "tuberculosis" },
    { titulo: "SOLICITUD-COMITE-TERAPEUTICA_v2", url: "tuberculosis/SOLICITUD-COMITE-TERAPEUTICA_v2.pdf", categoria: "tuberculosis" },
    { titulo: "Flujograma PROCET HSJM 2024", url: "tuberculosis/Flujograma-PROCET-HSJM-2024.pdf", categoria: "tuberculosis" },
    { titulo: "NUEVA SOLICITUD LABORATORIO TUBERCULOSIS", url: "tuberculosis/NUEVA-SOLICITUD-LABORATORIO-TUBERCULOSIS-.pdf", categoria: "tuberculosis" },
    { titulo: "PRESENTACION PROCET 2024", url: "tuberculosis/PRESENTACION-PROCET-2024.pdf", categoria: "tuberculosis" },
    { titulo: "DIAGNOSTICO BACTERIOLOGICO TBC", url: "tuberculosis/DIAGNOSTICO-BACTERIOLOGICO-TBC.pdf", categoria: "tuberculosis" },
    { titulo: "Encuesta CPT 2024", url: "tuberculosis/Encuesta-CPT-2024-1.pdf", categoria: "tuberculosis" },
    { titulo: "Informe 3 ER CUATRIMESTRE 2023.", url: "tuberculosis/Informe-3-ER-CUATRIMESTRE-2023.pdf", categoria: "tuberculosis" },
    { titulo: "TARJETA DE TRATAMIENTO TBC", url: "tuberculosis/TARJETA-DE-TRATAMIENTO-TBC.pdf", categoria: "tuberculosis" },
    { titulo: "TRASLADO INTERNACIONAL TBC", url: "tuberculosis/TRASLADO-INTERNACIONAL-TBC.pdf", categoria: "tuberculosis" },
    { titulo: "TRASLADO NACIONAL TBC", url: "tuberculosis/TRASLADO-NACIONAL-TBC.pdf", categoria: "tuberculosis" },
    { titulo: "NORMA-TECNICA-TUBERCULOSIS 2022", url: "tuberculosis/NORMA-TECNICA-TUBERCULOSIS-2022.pdf", categoria: "tuberculosis" },
    { titulo: "CUIDADOS TBC (+) AMBULATORIO", url: "tuberculosis/CUIDADOS-TBC-AMBULATORIO.pdf", categoria: "tuberculosis" },
    { titulo: "CUIDADOS TBC (+)HOSPITALIZADO", url: "tuberculosis/CUIDADOS-TBC-HOSPITALIZADO.pdf", categoria: "tuberculosis" },
    { titulo: "QUE ES LA TUBERCULOSIS", url: "tuberculosis/QUE-ES-LA-TUBERCULOSIS.pdf", categoria: "tuberculosis" },
    { titulo: "Informe 3er trimestre 2025", url: "tuberculosis/Informe-3er-trimestre-2025.pdf", categoria: "tuberculosis" },

    // === CATEGORIA: VIRUELA DEL MONO ===
    { titulo: "FORMULARIO DE NOTIFICACIÓN VIRUELA DEL MONO EDITABLE (003)", url: "viruela_mono/FORMULARIO-DE-NOTIFICACION-VIRUELA-DEL-MONO-EDITABLE-003.docx", categoria: "viruela_mono" },
    { titulo: "PPT Viruela del Mono 28-08-2024", url: "viruela_mono/PPT-Viruela-del-Mono-28-08-2024 (1).pptx", categoria: "viruela_mono" },
    { titulo: "Orientacion Tecnica Viruela del Mono 2022", url: "viruela_mono/Orientacion-Tecnica-Viruela-del-Mono-2022.pdf", categoria: "viruela_mono" },
    { titulo: "ORD-4160-Protocolo de vigilancia Epidemiológica de viruela del mono 31-08-2024", url: "viruela_mono/ORD-4160-Protocolo-de-vigilancia-Epidemiologica-de-viruela-del-mono-31-08-2024.pdf", categoria: "viruela_mono" },
    { titulo: "ORD-3888 LM en casos de viruela simica", url: "viruela_mono/ORD-3888-LM-en-casos-de-viruela-simica.pdf", categoria: "viruela_mono" },
    { titulo: "ORD- 1961-Protocolo preparación y respuesta viruela del simio", url: "viruela_mono/ORD-1961-Protocolo-preparacion-y-respuesta-viruela-del-simio.pdf", categoria: "viruela_mono" },
    { titulo: "Informe_ejecutivo_Mpox_junio_2024", url: "viruela_mono/Informe_ejecutivo_Mpox_junio_2024.pdf", categoria: "viruela_mono" },
    { titulo: "Formulario gral envio muestras clinicas analisis virologicos", url: "viruela_mono/Formulario-gral-envio-muestras-clinicas-analisis-virologicos.pdf", categoria: "viruela_mono" },
    { titulo: "INSTRUCTIVO MUESTRAS VIRUELA SIMICA -HSJM", url: "viruela_mono/INSTRUCTIVO-MUESTRAS-VIRUELA-SIMICA-HSJM.pdf", categoria: "viruela_mono" },
    { titulo: "Formulario envío de muestra dg diferencial", url: "viruela_mono/Formulario-envio-de-muestra-dg-diferencial.pdf", categoria: "viruela_mono" },
    { titulo: "Formulario envío de muestra dg diferencial sarampion rubeola", url: "viruela_mono/Formulario-envio-de-muestra-dg-diferencial-1.pdf", categoria: "viruela_mono" },
    { titulo: "Protocolo de manejo control y eliminacion TBC", url: "viruela_mono/Protocolo-de-manejo-del-programa-de-control-y-eliminacion-de-la-tuberculosis-en-area-ambulatoria-y-hospitalizados-1.pdf", categoria: "viruela_mono" },
    { titulo: "ORD-3888 instruccion emision de LM en viruela simica", url: "viruela_mono/ORD-3888-que-imparte-instrucciones-sobre-emision-de-LM-en-casos-de-viruela-simica.pdf", categoria: "viruela_mono" },
    { titulo: "ORD_609_Mpox_28_02_2025", url: "viruela_mono/ORD_609_Mpox_28_02_2025-1.pdf", categoria: "viruela_mono" },
    { titulo: "Anexo-3 FORMULARIO DE NOTIFICACIÓN MPOX EDITABLE", url: "viruela_mono/Anexo-3-FORMULARIO-DE-NOTIFICACION-MPOX-EDITABLE.pdf", categoria: "viruela_mono" },

    // === CATEGORIA: MIDAS ===
    { titulo: "DECRETO 1 REGLAMENTO DE PREVENCIÓN Y CONTROL DE LA RABIA EN EL HOMBRE Y EN LOS ANIMALES", url: "midas/DECREO-1-REGLAMENTO-DE-PREVENCION-Y-CONTROL-DE-LA-RABIA-EN-EL-HOMBRE-Y-EN-LOS-ANIMALES.pdf", categoria: "midas" },
    { titulo: "GLOSA ICONOGRAFICA", url: "midas/GLOSA-ICONOGRAFICA.pdf", categoria: "midas" },
    { titulo: "MANUAL MORDEDORES ESTABLECIMIENTOS DE SALUD 2024", url: "midas/MANUAL-MORDEDORES-ESTABLECIMIENTOS-DE-SALUD-2024.pdf", categoria: "midas" },
    { titulo: "FICHA NOTIFICACION DE MORDEDORES", url: "midas/FICHA-NOTIFICACION-DE-MORDEDORES.pdf", categoria: "midas" },
    { titulo: "Flujograma Rabia 2025 HSJM", url: "midas/Flujograma-Rabia-2025-HSJM.pdf", categoria: "midas" },

    // === CATEGORIA: VERSIONES ANTERIORES ===
    // AOC (Atención Obligatoria de Calidad)
    { titulo: "AOC 1.1 SISTEMA DE ALERTA ORGANIZACIÓN PARA ATENCIÓN DE EMERGENCIA Res N°295", url: "versionesAnteriores/AOC-1.1-SISTEMA-DE-ALERTA-ORGANIZACION-PARA-TENCION-DE-EMERGENCIA-Res-N°295.pdf", categoria: "versionesAnteriores" },
    { titulo: "AOC 1.1 acreditación 2023", url: "versionesAnteriores/AOC-1.1-Edic-4.pdf", categoria: "versionesAnteriores" },
    { titulo: "AOC 1.2 acreditacion 2023", url: "versionesAnteriores/AOC-1.2-Edic-5.pdf", categoria: "versionesAnteriores" },
    { titulo: "AOC 1.2 acreditación 2023 Categorización", url: "versionesAnteriores/AOC-1.2-ED.-7-CATEGORIZACION-PACIENTES-UEH-1.pdf", categoria: "versionesAnteriores" },
    { titulo: "AOC 1.3 APA acreditación 2023", url: "versionesAnteriores/AOC-1.3-APA-ED.-4-NOTIFICACIONES-RESULTADOS-CRITICOS-APA.pdf", categoria: "versionesAnteriores" },
    { titulo: "AOC 1.3 API acreditación 2023", url: "versionesAnteriores/AOC-1.3-API-ED-5.pdf", categoria: "versionesAnteriores" },
    { titulo: "AOC 1 3 ED 5 IMAG NOTIF RESULTADOS CRÍTICOS", url: "versionesAnteriores/AOC-1-3-ED-5-IMAG-NOTIF-RESULTADOS-DE-EX-CRITICOS.pdf", categoria: "versionesAnteriores" },
    { titulo: "AOC 1.3 APL acreditación 2023", url: "versionesAnteriores/RES-AOC-1.3-LAB-ED-5-1-1.pdf", categoria: "versionesAnteriores" },
    { titulo: "AOC 1 3 (APL) ED 5 NOTIFICACIÓN RIESGO LABORATORIO", url: "versionesAnteriores/AOC-1-3-APL-ED-5-NOTIFICACION-OPORTUNA-DE-RESULTADOS-DE-RIESGO-EN-LABORATORIO-1.pdf", categoria: "versionesAnteriores" },
    { titulo: "AOC 2.1 acreditación 2023 Derivación", url: "versionesAnteriores/AOC-2.1-ED-3-DERIVACION-DE-PCTES.pdf", categoria: "versionesAnteriores" },
    { titulo: "AOC 2.2 ENF acreditación 2023 Entrega Turno", url: "versionesAnteriores/RESOLUCION-AOC-2.2-ENTREGA-TURNO-EU.pdf", categoria: "versionesAnteriores" },
    { titulo: "AOC 2.2 ED. 2 ENTREGA DE TURNOS ENFERMERIA", url: "versionesAnteriores/AOC-2.2-ED.-2-ENTREGA-DE-TURNOS-ENFERMERIA.pdf", categoria: "versionesAnteriores" },
    { titulo: "AOC 2.2 MAT acreditación 2023", url: "versionesAnteriores/RESOLUCION-AOC-2.2-MATRONERIA.pdf", categoria: "versionesAnteriores" },
    { titulo: "AOC 2.2 ED. 1 ENTREGA DE TURNOS MATRONERIA", url: "versionesAnteriores/RESOLUCION-AOC-2.2-MATRONERIA.pdf", categoria: "versionesAnteriores" },

    // APA / APE (Anatomía Patológica / Esterilización)
    { titulo: "APA 1.2 acreditación 2023", url: "versionesAnteriores/ED-3-APA-1.2.pdf", categoria: "versionesAnteriores" },
    { titulo: "APA 1.2 ED. 3 ETAPA PRE ANALITICA BIOPSIAS", url: "versionesAnteriores/APA-1.2-ED.-3-ETAPA-PRE-ANALITICA-DEL-MANEJO-DE-BIOPSIAS-actual..pdf", categoria: "versionesAnteriores" },
    { titulo: "APE acreditación 2023 Manual Esterilización", url: "versionesAnteriores/APE-ED-3-manual-esterilizacion.pdf", categoria: "versionesAnteriores" },
    { titulo: "RESOLUCION APE 1.3-1.4-1.5 ED 3", url: "versionesAnteriores/APE-ED-3-manual-esterilizacion.pdf", categoria: "versionesAnteriores" },

    // APF (Farmacia e Insumos)
    { titulo: "APF 1.2 MED E INS acreditación 2023", url: "versionesAnteriores/APF-1-2-ED-4-ADQUISICION-DE-MEDICAMENTOS-3.pdf", categoria: "versionesAnteriores" },
    { titulo: "RESOLUCION APF 1.2 INSUMOS ED 4", url: "versionesAnteriores/RESOLUCION-APF-1.2-INSUMOS-ED-4.pdf", categoria: "versionesAnteriores" },
    { titulo: "Resolución APF 1.2 MEDIC ED 4", url: "versionesAnteriores/Resolucion-APF-1.2-MEDIC-ED-4.pdf", categoria: "versionesAnteriores" },
    { titulo: "APF 1.2 ED. 4 PROT ADQUISICIÓN INSUMOS", url: "versionesAnteriores/APF-1.2-ED.-4-PROT-PARA-LA-aDQUISICION-DE-INSUMOS-CLINICOS.pdf", categoria: "versionesAnteriores" },
    { titulo: "APF 1.3 acreditación 2023 Stock", url: "versionesAnteriores/APF-1.3-Edicion-5-2018.pdf", categoria: "versionesAnteriores" },
    { titulo: "APF 1.3 Responsables Stock Mínimo", url: "versionesAnteriores/APF-1.3-Responsables-Stock-Minimo.pdf", categoria: "versionesAnteriores" },
    { titulo: "RES EXENTA RESPONSABLES STOCK CRITICO", url: "versionesAnteriores/RES-EXENTA-RESPONSABLES-STOCK-CRITICO.pdf", categoria: "versionesAnteriores" },
    { titulo: "Responsables Stock Minimos Medicamentos Res 572", url: "versionesAnteriores/Responsables-Stock-Minimos-Medicamentos-Res-N°572-2019.pdf", categoria: "versionesAnteriores" },
    { titulo: "APF 1.3 ED. 6 STOCK MÍNIMO", url: "versionesAnteriores/APF-1.3-ED.-6-STOCK-MINIMO.pdf", categoria: "versionesAnteriores" },

    // API / APK / APL (Imagen / Kine / Lab)
    { titulo: "API 1.3 acreditación 2023 Solicitudes", url: "versionesAnteriores/Res-Exenta-API-1.3-Requisitos-Solicitudes-Edicion-2.pdf", categoria: "versionesAnteriores" },
    { titulo: "API 1.3 ED. 2 SOL IND IMAGENOLOGIA", url: "versionesAnteriores/API-1.3-ED.-2-SOL-IND-IMAGENOLOGIA.pdf", categoria: "versionesAnteriores" },
    { titulo: "API 1.3 ED 3 REQUISITOS EXÁMENES", url: "versionesAnteriores/API-1.3-ED-3-REQUISITOS-SOLICITUD-EXAMENES-IMAGENOLOGIA.pdf", categoria: "versionesAnteriores" },
    { titulo: "APK 1.2 acreditación 2023 Kine Resp", url: "versionesAnteriores/Resolucion-APK-1.2-Edicion-3.pdf", categoria: "versionesAnteriores" },
    { titulo: "APK 1.2 ED. 3 PREPARACIÓN KINE RESP", url: "versionesAnteriores/Resolucion-APK-1.2-Edicion-3.pdf", categoria: "versionesAnteriores" },
    { titulo: "APK 1.3 acreditación 2023 Rehab", url: "versionesAnteriores/RESOLUCION-APK-1.3-ED-4-.pdf", categoria: "versionesAnteriores" },
    { titulo: "APK 1.3 ED 4 PREV EA REHABILITACION", url: "versionesAnteriores/APK-1.3-ED-4-PREV-EA-REHABILITACION-KINESICA.pdf", categoria: "versionesAnteriores" },
    { titulo: "APL 1.2 acreditación 2023 Lab", url: "versionesAnteriores/APL-1.2-ED-3-RESOLUCION.pdf", categoria: "versionesAnteriores" },
    { titulo: "APL 1.2 ED 3 PROTOCOLO LAB", url: "versionesAnteriores/APL-1.2-ED-3-PROTOCOLO.pdf", categoria: "versionesAnteriores" },
    { titulo: "APL 1. 3 Edicion 2", url: "versionesAnteriores/APL-1.-3-Edicion-2.pdf", categoria: "versionesAnteriores" },
    { titulo: "APL 1.4 acreditación 2023 Bioseguridad", url: "versionesAnteriores/Resolucion-APL-1.4-Edicion-3-2018.pdf", categoria: "versionesAnteriores" },
    { titulo: "APL 1.4 Edición 3 2018", url: "versionesAnteriores/Resolucion-APL-1.4-Edicion-3-2018.pdf", categoria: "versionesAnteriores" },
    { titulo: "APL 1.5 acreditación 2023 Bioseguridad", url: "versionesAnteriores/APL-1.5-ED-4-PROTOCOLO-BIOSEGURIDAD.pdf", categoria: "versionesAnteriores" },
    { titulo: "RESOL APL 1.5 ED 4", url: "versionesAnteriores/RESOL-APL-1.5-ED-4.pdf", categoria: "versionesAnteriores" },

    // APT / APTR (Transporte / Transfusión)
    { titulo: "APT 1.2 acreditación 2023 Transporte", url: "versionesAnteriores/APT-1.2-ED.-3-CONDICIONES-MINIMAS-DE-TRANSPORTE-ACTUALIZADO.pdf", categoria: "versionesAnteriores" },
    { titulo: "APTR 1.2- 1.3 acreditación 2023 UMT", url: "versionesAnteriores/APTr-1.2-y-1.3-ED-3-MANUAL-UMT-copia.pdf", categoria: "versionesAnteriores" },

    // CAL (Calidad)
    { titulo: "CAL 1.1 ENC acreditación 2023 Encargados", url: "versionesAnteriores/CAL-1.1-ENCARGADOS-CALIDAD-2020-.pdf", categoria: "versionesAnteriores" },
    { titulo: "Res.Exenta 840 Complementa funciones Enc Calidad", url: "versionesAnteriores/Res.Exenta-840-HSJM-Complementa-funciones-Enc-Calidad.pdf", categoria: "versionesAnteriores" },
    { titulo: "Res.Exenta 771 Jefatura Calidad", url: "versionesAnteriores/Res.Exenta-771-Jefatura-Calidad-Jamie-Perez.pdf", categoria: "versionesAnteriores" },
    { titulo: "CAL 1.1 Evaluación Calidad 2021 Res. 158", url: "versionesAnteriores/CAL-1.1-Evaluacion-Calidad-ano-2021-Res.-N°-158.pdf", categoria: "versionesAnteriores" },
    { titulo: "CAL 1.1 Evaluación Calidad 2020", url: "versionesAnteriores/CAL-1.1-Evaluacion-Calidad-ano-2020-ultima-version.pdf", categoria: "versionesAnteriores" },
    { titulo: "CAL 1.1 POLIT acreditación 2023 Políticas", url: "versionesAnteriores/CAL-1.1-ED.-4-POLITICAS-DE-CALIDAD-2017.pdf", categoria: "versionesAnteriores" },
    { titulo: "CAL-1.1-POLITICAS-DE-CALIDAD-2021", url: "versionesAnteriores/CAL-1.1-POLITICAS-DE-CALIDAD-2021.pdf", categoria: "versionesAnteriores" },
    { titulo: "CAL-1.1-PROG CALIDAD Y SEGURIDAD 2023", url: "versionesAnteriores/CAL-1.1-PROGRAMA-DE-CALIDAD-Y-SEGURIDAD-DEL-PACIENTE-ANO-2023.pdf", categoria: "versionesAnteriores" },
    { titulo: "CAL-1.2-METAS-CALIDAD-2023", url: "versionesAnteriores/CAL-1.2-METAS-CALIDAD-2023.pdf", categoria: "versionesAnteriores" },
    { titulo: "CAL 1.1 PROG acreditación 2020", url: "versionesAnteriores/RES-PROG-CALIDAD-2020.pdf", categoria: "versionesAnteriores" },
    { titulo: "CAL 1.1 PROG CALIDAD 2020 MEEP", url: "versionesAnteriores/CAL-1.1-PROGRAMA-DE-CALIDAD-2020-meep-110320.pdf", categoria: "versionesAnteriores" },
    { titulo: "CAL 1.1 Programa calidad 2022 Res 157", url: "versionesAnteriores/CAL-1.1-Programa-calidad-ano-2022-Res-N°157.pdf", categoria: "versionesAnteriores" },
    { titulo: "CAL 1.1 Programa Calidad 2021", url: "versionesAnteriores/CAL-1.1-Programa-Calidad-2021.pdf", categoria: "versionesAnteriores" },
    { titulo: "CAL 1.1 Anexo programa calidad 2021", url: "versionesAnteriores/CAL-1.1-Anexo-programa-calidad-y-Seguridad-ano-2021.pdf", categoria: "versionesAnteriores" },
    { titulo: "CAL 1.2 METAS Y RESP Responsables 2023", url: "versionesAnteriores/RESPONSABLES-DE-CALIDAD-2023.pdf", categoria: "versionesAnteriores" },
    { titulo: "Res.Exenta 870 Calidad", url: "versionesAnteriores/Res.Exenta-870.pdf", categoria: "versionesAnteriores" },
    { titulo: "Res.Exenta 382 Calidad", url: "versionesAnteriores/Res.Exenta-382.pdf", categoria: "versionesAnteriores" },
    { titulo: "Res Exenta 164 Responsables Calidad", url: "versionesAnteriores/Res-Exenta-164-Responsables-calidad.pdf", categoria: "versionesAnteriores" },
    { titulo: "RESOL CAL 1.2 ED 7 METAS 2019", url: "versionesAnteriores/RESOL-CAL-1.2-ED-7-METAS-DE-CALIDAD-2019.pdf", categoria: "versionesAnteriores" },
    { titulo: "CAL 1.2 ED. 7 FE DE ERRATA METAS 2019", url: "versionesAnteriores/CAL-1.2-ED.-7-FE-DE-ERRATA-METAS-CALIDAD-2019.pdf", categoria: "versionesAnteriores" },
    { titulo: "CAL 1.2 Ed 8 Metas 2021", url: "versionesAnteriores/CAL-1.2-Ed-8-Metas-de-Calidad-2021.pdf", categoria: "versionesAnteriores" },
    { titulo: "CAL 1.2 RES 938 RESPONSABLES", url: "versionesAnteriores/CAL-1.2-RES-938-RESPONSABLES.pdf", categoria: "versionesAnteriores" },

    // DP (Derechos de los Pacientes)
    { titulo: "DP 2.1 CONSENTIMIENTO INFORMADO ED 4", url: "versionesAnteriores/DP-2.1-CONSENTIMIENTO-INFORMADO-ED-4-.pdf", categoria: "versionesAnteriores" },
    { titulo: "DP 1.2 acreditación 2023 Reclamos", url: "versionesAnteriores/Resolucion-DP-1.2-Edicion-2-2017.pdf", categoria: "versionesAnteriores" },
    { titulo: "DP 1.2 ED 3 Gestión de Reclamo", url: "versionesAnteriores/DP-1.2-ED-3-Procedimientos-de-Gestion-de-Reclamo.pdf", categoria: "versionesAnteriores" },
    { titulo: "DP 1 2 ED 2 GESTION RECLAMOS 2017", url: "versionesAnteriores/DP-1-2-ED-2-PROTOCOLO-DE-GESTION-DE-RECLAMOS-2017.pdf", categoria: "versionesAnteriores" },
    { titulo: "DP-4.2-ED.-3-ALUMNOS-TECNOLOGIA-MEDICA", url: "versionesAnteriores/DP-4.2-ED.-3-ALUMNOS-DE-TECNOLOGIA-MEDICA-1.pdf", categoria: "versionesAnteriores" },
    { titulo: "DP 1.3 acreditación 2023 Respeto", url: "versionesAnteriores/Resolucion-DP-1.3-Edicion-2.pdf", categoria: "versionesAnteriores" },
    { titulo: "DP 1.3 ED 3 EVALUACIÓN RESPETO DERECHO", url: "versionesAnteriores/DP-1.3-ED-3-EVALUACION-RESPETO-DERECHO-A-PACIENTES.pdf", categoria: "versionesAnteriores" },
    { titulo: "DP 1 3 ED 2 PROTOCOLO DERECHOS", url: "versionesAnteriores/DP-1-3-ED-2-PROTOCOLO-DE-DERECHOS.pdf", categoria: "versionesAnteriores" },
    { titulo: "DP 2.1 acreditación 2023 Consentimiento", url: "versionesAnteriores/DP-2-1-CONSENTIMIENTO-INFORMADO.pdf", categoria: "versionesAnteriores" },
    { titulo: "RESOLUCION DP 2.1", url: "versionesAnteriores/RESOLUCION-DP-2.1.pdf", categoria: "versionesAnteriores" },
    { titulo: "DP 4.2 PROG SUPERV acreditación 2023", url: "versionesAnteriores/DP-4.2-ED-3-PROGRAMA-SUPERVISION-HSJM.pdf", categoria: "versionesAnteriores" },

    // EQ (Equipamiento)
    { titulo: "EQ-1.1-ED-3 ADQUISICION EQUIPAMIENTO", url: "versionesAnteriores/EQ-1.1-ED-3-PROCEDIMIENTO-ADQUISICION-DE-EQUIPAMIENTO.pdf", categoria: "versionesAnteriores" },
    { titulo: "EQ-1.1-PROCEDIMIENTO ADQUISICION", url: "versionesAnteriores/EQ-1.1-PROCEDIMIENTO-PARA-LA-ADQUISICION-DE-EQUIPAMIENTO.pdf", categoria: "versionesAnteriores" },
    { titulo: "EQ-1.2-ED.-2-VIDA UTIL EQUIPOS", url: "versionesAnteriores/EQ-1.2-ED.-2-SEGUIMIENTO-DE-VIDA-UTIL.pdf", categoria: "versionesAnteriores" },
    { titulo: "EQ-1.1-ED.-3 ADQUISICION Res", url: "versionesAnteriores/EQ-1.1-ED.-3-PROCEDIMIENTO-ADQUISICION-DE-EQUIPAMIENTO-Resolucion.pdf", categoria: "versionesAnteriores" },
    { titulo: "EQ 2.1 acreditación 2023 Mantención", url: "versionesAnteriores/RESOLUCION-EQ-2.1-ED-5.pdf", categoria: "versionesAnteriores" },
    { titulo: "PROTOCOLO EQ 2 1 ED 5 MANTENCION PREVENTIVA", url: "versionesAnteriores/PROTOCOLO-EQ-2-1-ED-5-PROGRAMA-DE-MANTENCION-PREVENTIVA-.pdf", categoria: "versionesAnteriores" },
    { titulo: "EQ 2.1 ENCARGADOS", url: "versionesAnteriores/EQ-2.1-ENCARGADOS-.pdf", categoria: "versionesAnteriores" },
    { titulo: "Res. Encargados Mantenimiento EQ 2.1", url: "versionesAnteriores/Res.-Encargados-Mantenimiento-EQ-2.1-Res-N°-6-2022.pdf", categoria: "versionesAnteriores" },
    { titulo: "Informe EQ 1.2 año 2022", url: "versionesAnteriores/Informe-EQ-1.2-ano-2022.-.pdf", categoria: "versionesAnteriores" },
    { titulo: "Informe mantención equipos críticos 2020", url: "versionesAnteriores/Informe-cumplimiento-mantenimiento-preventivo-Equipos-criticos-1er-semestre-2020.pdf", categoria: "versionesAnteriores" },
    { titulo: "Informe anual mantención preventiva 2020", url: "versionesAnteriores/Informe-cumplimiento-mantenimiento-preventivo-de-equipos-criticos-hsjm-ano-2020.pdf", categoria: "versionesAnteriores" },

    // GCL (Gestión Clínica)
    { titulo: "GCL 1.1 acreditación 2023 Preanestésica", url: "versionesAnteriores/GCL-1.1-EVALUACION-PREANESTESICA.pdf", categoria: "versionesAnteriores" },
    { titulo: "GCL 1.2 acreditación 2023 Enfermería", url: "versionesAnteriores/GCL-1.2-CUIDADO-DE-ENFERMERIA.pdf", categoria: "versionesAnteriores" },
    { titulo: "GCL 1.3 ED 2 MANEJO DEL DOLOR", url: "versionesAnteriores/GCL-1.3-ED-2-MANEJO-DEL-DOLOR.pdf", categoria: "versionesAnteriores" },
    { titulo: "ED 2 GCL 1.3 Dolor", url: "versionesAnteriores/ED-2-GCL-1.3.pdf", categoria: "versionesAnteriores" },
    { titulo: "GCL-2.2.2 ED.-4 PREVENCION CAIDAS", url: "versionesAnteriores/GCL-2-2-2-ED.-4-PREVENCION-DE-CAIDAS.pdf", categoria: "versionesAnteriores" },
    { titulo: "GCL 1.5 acreditación 2023 UPC", url: "versionesAnteriores/GCL-1.5-ED-4-INGRESO-Y-EGRESO-A-UPC.pdf", categoria: "versionesAnteriores" },
    { titulo: "GCL 1.6 acreditación 2023 Cesárea", url: "versionesAnteriores/Res-Exenta-GCL-1.6-Edicion-3.pdf", categoria: "versionesAnteriores" },
    { titulo: "GCL 1.6 ED 3 INDICACION CESAREA 2017", url: "versionesAnteriores/GCL-1.6-ED-3-INDICACION-DE-CESAREA-2017.pdf", categoria: "versionesAnteriores" },
    { titulo: "GCL 1.7 acreditación 2023 Transfusión", url: "versionesAnteriores/GCL-1.7-ED-5-INDICACION-TRANSFUSION.pdf", categoria: "versionesAnteriores" },
    { titulo: "GCL 1.7 RES ED 5 Transfusión", url: "versionesAnteriores/GCL-1.7-RES-ED-5.pdf", categoria: "versionesAnteriores" },
    { titulo: "GCL-1.7 ED.-6 CRITERIOS TRANSFUSION", url: "versionesAnteriores/GCL-1.7-ED.-6-CRITERIOS-DE-TRANSFUSION-DE-HEMOCOMPONENTES-ED.-6.pdf", categoria: "versionesAnteriores" },
    { titulo: "Res.-Comite Oncologico Pediatrico", url: "versionesAnteriores/Res.-Comite-Oncologico-paciente-Pediatrico-1.pdf", categoria: "versionesAnteriores" },
    { titulo: "Res.-Comite Oncologico Adulto", url: "versionesAnteriores/Res.-Comite-Oncologico-paciente-Adulto.pdf", categoria: "versionesAnteriores" },
    { titulo: "Res. Exenta 245 Integrantes Oncologico", url: "versionesAnteriores/Res.-Exenta-245-Integrantes-Comite-Oncologico-del-Hsjm.pdf", categoria: "versionesAnteriores" },
    { titulo: "Derivación uro-oncológicos HSJD", url: "versionesAnteriores/Protocolo-de-derivacion-pacientes-uro-oncologicos-a-HSJD-11-2-21.doc", categoria: "versionesAnteriores" },
    { titulo: "Res.Exenta 693-1 Comité Oncológico", url: "versionesAnteriores/Res.Exenta-693-1-Comite-Gestion-Oncologica-HSJM-29-10-20.pdf", categoria: "versionesAnteriores" },
    { titulo: "GCL 1.9 ED 2 AGITACION PSICOMOTORA", url: "versionesAnteriores/GCL-1.9-ED-2-PREV-EA-AGITACION-PSICOMOTORA-2017.pdf", categoria: "versionesAnteriores" },
    { titulo: "Res Exenta Contención Física 2017", url: "versionesAnteriores/Res-Exenta-Prev-EA-Contencion-Fisica-Agitacion-Edicion-2-2017.pdf", categoria: "versionesAnteriores" },
    { titulo: "GCL 1.11 ED 4 BIOPSIAS", url: "versionesAnteriores/GCL-1.11-ED-4-BIOPSIAS-.pdf", categoria: "versionesAnteriores" },
    { titulo: "GCL 1.11 Protocolo Atención Usuario", url: "versionesAnteriores/Protocolo-de-Atencion-al-Usuario-2022.pdf", categoria: "versionesAnteriores" },
    { titulo: "GCL-1.12 ED.-4 IDENTIFICACION PACIENTES", url: "versionesAnteriores/GCL-1.12-ED.-4-IDENTIFICACION-DE-PACIENTES.pdf", categoria: "versionesAnteriores" },
    { titulo: "GCL-2.2.2 ED.-4 CAIDAS (Julio)", url: "versionesAnteriores/GCL-2-2-2-ED.-4-PREVENCION-DE-CAIDAS.pdf", categoria: "versionesAnteriores" },
    { titulo: "Res.Exenta 382 Vigencia 2020", url: "versionesAnteriores/vigencia-2020-Res.Exenta-382.pdf", categoria: "versionesAnteriores" },
    { titulo: "RESOLUCION GCL 2.1 Quirúrgicos", url: "versionesAnteriores/RESOLUCION-GCL-2.1.pdf", categoria: "versionesAnteriores" },
    { titulo: "GCL 2.1 ED. 3 ERRATA QUIRURGICOS", url: "versionesAnteriores/GCL-2.1-ED.-3-FE-DE-ERRATA-EVE.-ADV.-PROC.-QUIRURGICOS.pdf", categoria: "versionesAnteriores" },
    { titulo: "GCL 2.2 LPP acreditación 2023 UPP", url: "versionesAnteriores/GCL-2.2-ED.-4-PREVENCION-DE-UPP.pdf", categoria: "versionesAnteriores" },
    { titulo: "GCL 2.3 acreditación 2023 Evento Adverso", url: "versionesAnteriores/GCL-2.3-ED.-3-NOTIF-EVENTO-ADVERSO.pdf", categoria: "versionesAnteriores" },
    { titulo: "GCL 3.3 ED 5 ANTISÉPTICOS", url: "versionesAnteriores/Res-Exenta-Uso-desinfectantes-y-antisepticos-Edicion-4.pdf", categoria: "versionesAnteriores" },
    { titulo: "GCL 3.3 ED 5 RES ANTISÉPTICOS", url: "versionesAnteriores/GCL-33-ED-5-RES-ANTISP-Y-DESINF.pdf", categoria: "versionesAnteriores" },
    { titulo: "GCL 3.3 ED 5 MANUAL ANTISÉPTICOS", url: "versionesAnteriores/GCL-3.3-ED-5-ANTISEPTICOS-Y-DESINFECTANTES-.pdf", categoria: "versionesAnteriores" },
    { titulo: "Res Exenta GCL 3.3 Cateter Urinario", url: "versionesAnteriores/Res-Exenta-GCL-3.3-Prev-Cateter-urinario-Edicion-4-2017.pdf", categoria: "versionesAnteriores" },
    { titulo: "GCL 3.3 IAAS CATETER URINARIO 2017", url: "versionesAnteriores/GCL-3.3-IAAS-EN-CATETER-URINARIO-Edicion-4-2017.pdf", categoria: "versionesAnteriores" },
    { titulo: "GCL 3.3 ED 5 CATETER URINARIO", url: "versionesAnteriores/GCL-3.3-ED-5-CATETER-URINARIO.pdf", categoria: "versionesAnteriores" },
    { titulo: "RES EXENTA CATETER VENOSO PERIFERICO", url: "versionesAnteriores/RES-EXENTA-CATETER-VENOSO-PERIFERICO-Edicion-3-.pdf", categoria: "versionesAnteriores" },
    { titulo: "GCL 3.3 CATETER VENOSO 2107", url: "versionesAnteriores/GCL-3.3-CATETER-VENOSO-PERIFERICO-Edicion-3-2107-.pdf", categoria: "versionesAnteriores" },
    { titulo: "RES EXENTA ENDOMETRITIS PUERPERAL", url: "versionesAnteriores/RES-EXENTA-ENDOMETRITIS-PUERPERAL-Edicion-4-.pdf", categoria: "versionesAnteriores" },
    { titulo: "GCL 3.3 ENDOMETRITIS 2017", url: "versionesAnteriores/GCL-3.3-ENDOMETRITIS-Edicion-4-2017.pdf", categoria: "versionesAnteriores" },
    { titulo: "GCL 3.3 PREC ESTANDAR acreditación 2023", url: "versionesAnteriores/RESOL-GCL-3.3-ED-4-PREC-ESTANDAR.pdf", categoria: "versionesAnteriores" },
    { titulo: "GCL 3.3 ED 4 AISLAMIENTO 2019", url: "versionesAnteriores/GCL-3.3-ED-4-PREC.BASADAS-MECANISMO-DE-TRANSMISION-Y-AISLAMIENTO-2019.pdf", categoria: "versionesAnteriores" },
    { titulo: "GCL 3.3 RES ED 4 EP Aislamiento", url: "versionesAnteriores/GCL-3.3-RES-ED-4-EP-.pdf", categoria: "versionesAnteriores" },

    // INS / REG (Instalaciones / Registros)
    { titulo: "INS 2.1 acreditación 2023 (RES ED 3)", url: "versionesAnteriores/RES.-INS-2.1-ED-3.pdf", categoria: "versionesAnteriores" },
    { titulo: "INS 2.1 ED 3 PLAN EMERGENCIA", url: "versionesAnteriores/INS-2.1-ED-3-PLAN-DE-EMERGENCIA.pdf", categoria: "versionesAnteriores" },
    { titulo: "REG 1.1 acreditación 2023 (RESOL ED 5)", url: "versionesAnteriores/RESOL.-REG-1.1-ED-5.pdf", categoria: "versionesAnteriores" },
    { titulo: "REG 1.1 ED 5 Ficha Clínica", url: "versionesAnteriores/REG-1.1-ED-5.pdf", categoria: "versionesAnteriores" },
    { titulo: "REG 1.1 ED 5 - V5", url: "versionesAnteriores/REG-1.1-ED-5-V5.pdf", categoria: "versionesAnteriores" },
    { titulo: "REG 1.1 ED 6 RES 1705 - V6", url: "versionesAnteriores/REG-1.1-ED-6-RES-1705-V6.pdf", categoria: "versionesAnteriores" },
    { titulo: "REG 1.2-1.3 ED. 3 REGISTROS MINIMOS", url: "versionesAnteriores/REG-1.-2-1.-3-ED.-3-REGISTROS-MINIMOS-Y-SEGUIMIENTO.pdf", categoria: "versionesAnteriores" },
    { titulo: "REG-1.4 ED.-3 CONSERVACION FICHA CLINICA", url: "versionesAnteriores/REG-1.4-ED.-3-SOLICITUD-ENTREGA-RECEPCION-CONSERVACION-FICHA-CLINICA.pdf", categoria: "versionesAnteriores" },
    { titulo: "REG 1.4 acreditación 2023 (RESOL ED 2)", url: "versionesAnteriores/RESOLUCION-REG-1.4-ED-2.pdf", categoria: "versionesAnteriores" },
    { titulo: "REG 1.4 ED 2 FE ERRATAS", url: "versionesAnteriores/REG-1.4-ED-2-CON-FE-DE-ERRATAS.pdf", categoria: "versionesAnteriores" },

    // RH (Recursos Humanos)
    { titulo: "RH 2.1 acreditación 2023 (RESOL ED 4)", url: "versionesAnteriores/RH-2.1-RESOL-ED-4.pdf", categoria: "versionesAnteriores" },
    { titulo: "RH 2.1 ED 4 MANUAL INDUCCIÓN", url: "versionesAnteriores/RH-2.1-ED-4-MANUAL-INDUCCION.pdf", categoria: "versionesAnteriores" },
    { titulo: "RH 3.1 acreditación 2023 Capacitación", url: "versionesAnteriores/RH-3.1-ED.-2-CAPACITACION-IAAS-Y-RCP-Edicion-2-2017.pdf", categoria: "versionesAnteriores" },
    { titulo: "Resolución RH 3.1 ed 2 Capacitación", url: "versionesAnteriores/Resolucion-RH-3.1-ed-2-Capacitacion-IAAS-y-RCP.pdf", categoria: "versionesAnteriores" },
    { titulo: "RH 4.2 acreditación 2023 (RESOL ED 5)", url: "versionesAnteriores/RH-4.2-RESOL-ED-5.pdf", categoria: "versionesAnteriores" },
    { titulo: "RH 4.2 ED 5 MANEJO ACP 2019", url: "versionesAnteriores/RH-4-2-ED-5-MANEJO-DE-ACP-final-13-6-19-.pdf", categoria: "versionesAnteriores" },
    { titulo: "RH 4.3 acreditación 2023 Hepatitis", url: "versionesAnteriores/RH-4.3-ED.-2-Inmunizacion-Hepatitis.pdf", categoria: "versionesAnteriores" },
    { titulo: "Resolución RH 4.3 Edición 2 2017", url: "versionesAnteriores/Resolucion-RH-4.3-Edicion-2-2017.pdf", categoria: "versionesAnteriores" }
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
  console.log("✅ Documentos de accidentes insertados/actualizados");
}

main()
  .catch((e) => {
    console.error("❌ Error en el seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });