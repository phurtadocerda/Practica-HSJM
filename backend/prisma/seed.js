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

  // Usuario Jefe
  const admin = await prisma.usuario.upsert({
    where: { rut: '21245882-1' },
    update: {},
    create: {
      rut: '21245882-1',
      nombres: 'Admin',
      apellido_paterno: 'Sistema',
      apellido_materno: 'TI',
      fecha_nacimiento: new Date('1990-04-28'),
      area_trabajo: 'Informática',
      password: await bcrypt.hash('1234', 10),
      rol: 'jefe',
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
      area_trabajo: 'Enfermería',
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
}

main()
  .catch((e) => {
    console.error("❌ Error en el seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });