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
      rut: '18869522-1',
      nombres: 'Patricio Eduardo',
      apellido_paterno: 'Hurtado',
      apellido_materno: 'Cerda',
      fecha_nacimiento: new Date('1990-04-28'),
      area_trabajo: 'Transformacion Digital',
      password: await bcrypt.hash('1234', 10),
      rol: 'Administrador',
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
    { titulo: "Rechazo de Atención", url: "Rechazo_de_Atenciones.pdf", categoria: "accidentes" }
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