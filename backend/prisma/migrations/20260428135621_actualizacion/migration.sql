-- CreateTable
CREATE TABLE "usuarios" (
    "id" SERIAL NOT NULL,
    "rut" TEXT NOT NULL,
    "nombres" TEXT NOT NULL,
    "apellido_paterno" TEXT NOT NULL,
    "apellido_materno" TEXT,
    "fecha_nacimiento" TIMESTAMP(3) NOT NULL,
    "area_trabajo" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "rol" TEXT NOT NULL DEFAULT 'funcionario',

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_rut_key" ON "usuarios"("rut");
