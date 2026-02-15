/*
  Warnings:

  - You are about to drop the column `baseDivisionId` on the `base_city_corporations` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "base_city_corporations" DROP CONSTRAINT "base_city_corporations_baseDivisionId_fkey";

-- AlterTable
ALTER TABLE "base_city_corporations" DROP COLUMN "baseDivisionId";
