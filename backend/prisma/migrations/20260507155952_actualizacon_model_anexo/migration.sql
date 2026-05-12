/*
  Warnings:

  - You are about to drop the column `numero` on the `anexos` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[anexo]` on the table `anexos` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `anexo` to the `anexos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "anexos" DROP COLUMN "numero",
ADD COLUMN     "anexo" TEXT NOT NULL,
ALTER COLUMN "cargo" DROP NOT NULL,
ALTER COLUMN "usuario" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "anexos_anexo_key" ON "anexos"("anexo");
