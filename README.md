# Practica HSJM - Sistema de Intranet del Hospital

Sistema completo de intranet para el Hospital San Jos+e de Melipilla (HSJM).

## 📋 Tabla de Contenidos

- [Características](#características)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Infraestructura Tecnológica](#infraestructura-tecnológica)
- [Scripts Disponibles](#scripts-disponibles)
- [API Endpoints](#api-endpoints)
- [Notas de Desarrollo](#notas-de-desarrollo)
- [Deployment](#deployment)

## ✨ Características

- **Autenticación**: Sistema de login seguro con JWT
- **Gestión de Documentos**: Organización por categorías (accidentes, protocolos, calidad, etc.)
- **Directorio Telefónico**: Anexos y contactos del personal hospitalario
- **Calendario de Cumpleaños**: Gestión de fechas especiales del personal
- **Panel Administrativo**: Control de registro de usuarios
- **Interfaz Responsiva**: Diseño moderno con Tailwind CSS

## 🔧 Requisitos Previos

- **Node.js** v16 o superior
- **npm** o **yarn**
- **PostgreSQL** v12 o superior
- **Git** (para clonar el repositorio)

## 📦 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/phurtadocerda/Practica-HSJM.git
cd Practica-HSJM
```

### 2. Instalar dependencias del Backend

```bash
cd backend
npm install
```

### 3. Instalar dependencias del Frontend

```bash
cd ../frontend
npm install
```

### 4. Configurar Variables de Entorno

Copiar los archivos de ejemplo y crear tus propias variables:

```bash
# Backend
cd ../backend
cp .env.example .env
# Editar .env con tus credenciales

# Frontend
cd ../frontend
cp .env.example .env
# Editar .env con la URL del backend
```

## ⚙️ Configuración

### Variables de Entorno - Backend

Crear archivo `.env` en la carpeta `backend/`:

```env
# Base de datos PostgreSQL
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/hospital_db"

# Servidor
PORT=5000

# JWT Secret (generar con: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
JWT_SECRET="tu_secret_jwt_generado_aqui"

# CORS (opcional)
CORS_ORIGIN="http://localhost:3000"
```

### Variables de Entorno - Frontend

Crear archivo `.env` en la carpeta `frontend/`:

```env
# URL del Backend
REACT_APP_API_URL=http://localhost:5000/api
```

### Control de Versiones

**Importante:** Los archivos `.env` están en `.gitignore` y NO deben ser comiteados. 

Para facilitar el setup del proyecto, crear archivos de ejemplo:

**`backend/.env.example`**
```env
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/hospital_db"
PORT=5000
JWT_SECRET="tu_secret_jwt_generado_aqui"
CORS_ORIGIN="http://localhost:3000"
```

**`frontend/.env.example`**
```env
REACT_APP_API_URL=http://localhost:5000/api
```

#### Notas sobre variables de entorno:

- **Backend**: `PORT` y `DATABASE_URL` son críticas
- **Frontend**: `REACT_APP_` es el prefijo requerido por React para leer variables en tiempo de build
- En desarrollo, cambiar `.env` y reiniciar el servidor para que se apliquen
- Las URLs se leen desde `frontend/src/config/constans.js` y se aplican automáticamente en toda la app

Esto permite que otros desarrolladores sepan qué variables necesitan configurar sin exponer datos sensibles.

### Configuración de Base de Datos

1. Crear la base de datos PostgreSQL:

```bash
createdb hospital_db
```

2. Ejecutar migraciones de Prisma:

```bash
cd backend
npx prisma migrate deploy
```

3. (Opcional) Poblar datos iniciales:

```bash
node prisma/seed.js
```

## 📁 Estructura del Proyecto

```
Practica-HSJM/
├── backend/
│   ├── src/
│   │   ├── controllers/        # Lógica de negocio
│   │   ├── routes/             # Rutas de la API
│   │   ├── middlewares/        # Autenticación y validación
│   │   ├── config/             # Configuración (Prisma)
│   │   └── services/           # Servicios auxiliares
│   ├── prisma/
│   │   ├── schema.prisma       # Esquema de base de datos
│   │   ├── migrations/         # Historial de cambios DB
│   │   └── seed.js             # Datos iniciales
│   ├── uploads/                # Archivos subidos
│   ├── server.js               # Punto de entrada
│   └── package.json
│
├── frontend/
│   ├── public/                 # Archivos estáticos
│   ├── src/
│   │   ├── components/         # Componentes reutilizables
│   │   ├── views/              # Páginas principales
│   │   ├── pages/              # Páginas adicionales
│   │   ├── routes/             # Configuración de rutas
│   │   ├── services/           # Servicios API
│   │   ├── api/                # Configuración Axios
│   │   ├── assets/             # Imágenes y recursos
│   │   ├── context/            # Context API
│   │   ├── hooks/              # Custom hooks
│   │   └── App.js              # Componente principal
│   ├── build/                  # Build de producción
│   └── package.json
│
└── README.md
```

## 🔒 Archivos Ignorados (.gitignore)

El proyecto ignora automáticamente archivos sensibles y no necesarios:

```
# Nunca se comitean
.env, .env.local          # Variables de entorno con credenciales
node_modules/             # Dependencias (se instalan con npm install)
build/, dist/             # Builds generados

# Tampoco se comitean
.vscode/, .idea/          # Configuración de IDEs
*.log, logs/              # Archivos de log
.DS_Store, Thumbs.db      # Archivos de SO
```

## 🏗️ Infraestructura Tecnológica

### Backend
- **Express.js** v5.2.1 - Framework web
- **Prisma** v7.8.0 - ORM para base de datos
- **PostgreSQL** - Base de datos relacional
- **JWT** - Autenticación y autorización
- **bcrypt** - Hash de contraseñas
- **CORS** - Control de acceso cross-origin
- **dotenv** - Gestión de variables de entorno

### Frontend
- **React** v18.2.0 - Librería UI
- **React Router** v7.14.2 - Enrutamiento
- **Tailwind CSS** v3.3.0 - Estilos CSS
- **Axios** v1.15.2 - Cliente HTTP
- **Lucide React** v0.263.1 - Iconos
- **Sonner** v2.0.7 - Notificaciones Toast

### Base de Datos
- **PostgreSQL** - Motor SQL
- **Prisma** - ORM con migraciones automáticas

### Modelos de Datos

#### Usuario
- `id` - Identificador único
- `rut` - RUT único del usuario
- `nombres` - Nombres
- `apellido_paterno` / `apellido_materno`
- `fecha_nacimiento`
- `area_trabajo`
- `password` - Hash de contraseña
- `rol` - Nivel de acceso (funcionario, administrador)

#### Documento
- `id` - Identificador único
- `titulo` - Nombre del documento
- `url` - Ruta del archivo
- `categoria` - Clasificación (accidentes, protocolos, calidad, etc.)
- `createdAt` - Fecha de creación

#### Anexo
- `id` - Identificador único
- `anexo` - Número de anexo
- `unidad` - Departamento/Servicio
- `usuario` - Nombre del responsable
- `cargo` - Posición
- `email` - Correo electrónico

#### Area
- `id` - Identificador único
- `nombre` - Nombre del área/departamento

## 🚀 Scripts Disponibles

### Backend

```bash
# Iniciar servidor en desarrollo
npm start

# Ejecutar migraciones
npx prisma migrate dev

# Ver base de datos en Prisma Studio
npx prisma studio

# Generar cliente de Prisma
npx prisma generate
```

### Frontend

```bash
# Iniciar en modo desarrollo
npm start

# Compilar para producción
npm run build

# Deploy a XAMPP (Windows)
npm run deploy
```

## 📡 API Endpoints

### Autenticación

- `POST /api/auth/login` - Iniciar sesión
- `POST /api/auth/register` - Registrar nuevo usuario
- `GET /api/auth/areas` - Obtener lista de áreas

### Documentos

- `GET /api/documentos?categoria=accidentes` - Obtener documentos por categoría

### Anexos

- `GET /api/anexos` - Obtener todos los anexos
- `POST /api/anexos` - Crear nuevo anexo (admin)
- `PUT /api/anexos/:id` - Actualizar anexo (admin)
- `DELETE /api/anexos/:id` - Eliminar anexo (admin)

### Cumpleaños (Protegida)

- `GET /api/cumpleanos` - Obtener cumpleaños del mes

## 📝 Notas de Desarrollo

### Desarrollo en Modo Stricto

React 18 incluye `StrictMode` en desarrollo que monta componentes dos veces. Esto puede causar que los `useEffect` se ejecuten dos veces y, si hay toasts de error, se mostrarán duplicados. **Es normal en desarrollo y no ocurre en producción**.

Para evitar esto, se utiliza `useRef` como guard en los efectos que generan notificaciones.

### Autenticación JWT

- Los tokens JWT se almacenan en `localStorage`
- Incluir token en header: `Authorization: Bearer {token}`
- Tokens expiran según configuración del backend

### Manejo de Errores

- El backend devuelve `{ success: false, message: "..." }` en errores
- El frontend muestra notificaciones con `toast` de la librería Sonner
- Ver estado de carga con ícono spinner mientras se fetching datos

### Migraciones de Base de Datos

Cualquier cambio en `schema.prisma` requiere:

```bash
# Crear nueva migración
npx prisma migrate dev --name nombre_cambio

# En producción
npx prisma migrate deploy
```

## 🌐 Deployment

### Frontend en XAMPP

```bash
cd frontend
npm run build
# Se copia automáticamente a C:/xampp/htdocs/WEB_HOSPITAL/react-app
```

### Backend en Producción

1. Configurar variables de entorno en servidor
2. Ejecutar migraciones: `npx prisma migrate deploy`
3. Iniciar con: `npm start` (usar PM2 o similar para mantener proceso activo)

### Consideraciones de Producción

- Cambiar `JWT_SECRET` a un valor seguro
- Usar HTTPS
- Configurar CORS correctamente
- Usar base de datos en servidor remoto
- Implementar logging centralizado
- Configurar backups automáticos de BD
- Usar reverse proxy (Nginx/Apache)



