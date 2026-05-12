-- CreateTable
CREATE TABLE "anexos" (
    "id" SERIAL NOT NULL,
    "numero" TEXT NOT NULL,
    "unidad" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,
    "usuario" TEXT NOT NULL,
    "email" TEXT,

    CONSTRAINT "anexos_pkey" PRIMARY KEY ("id")
);
