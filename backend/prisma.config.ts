import { defineConfig } from '@prisma/config';
import * as dotenv from 'dotenv';

// Carga el archivo .env manualmente para el configurador
dotenv.config();

export default defineConfig({
  migrations: {
    seed: 'node ./prisma/seed.js',
  },
  datasource: {
    url: process.env.DATABASE_URL,
  },
});