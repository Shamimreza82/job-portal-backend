/*
  Warnings:

  - You are about to drop the column `division_id` on the `base_city_corporations` table. All the data in the column will be lost.
  - Added the required column `district_id` to the `base_city_corporations` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "base_city_corporations" DROP CONSTRAINT "base_city_corporations_division_id_fkey";

-- DropIndex
DROP INDEX "base_city_corporations_division_id_idx";

-- AlterTable
ALTER TABLE "base_city_corporations" DROP COLUMN "division_id",
ADD COLUMN     "baseDivisionId" INTEGER,
ADD COLUMN     "district_id" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "base_city_corporations_district_id_idx" ON "base_city_corporations"("district_id");

-- AddForeignKey
ALTER TABLE "base_city_corporations" ADD CONSTRAINT "base_city_corporations_district_id_fkey" FOREIGN KEY ("district_id") REFERENCES "base_districts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "base_city_corporations" ADD CONSTRAINT "base_city_corporations_baseDivisionId_fkey" FOREIGN KEY ("baseDivisionId") REFERENCES "base_divisions"("id") ON DELETE SET NULL ON UPDATE CASCADE;
