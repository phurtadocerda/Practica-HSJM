require('dotenv').config();
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');


const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL 
});


const adapter = new PrismaPg(pool);


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
    { titulo: "Resolución RH 4.3 Edición 2 2017", url: "versionesAnteriores/Resolucion-RH-4.3-Edicion-2-2017.pdf", categoria: "versionesAnteriores" },
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