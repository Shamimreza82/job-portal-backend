/*
  Warnings:

  - You are about to drop the `districts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `divisions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `municipalities` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `police_stations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `post_offices` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `union_parishads` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `upazilas` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "districts" DROP CONSTRAINT "districts_division_id_fkey";

-- DropForeignKey
ALTER TABLE "municipalities" DROP CONSTRAINT "municipalities_upazila_id_fkey";

-- DropForeignKey
ALTER TABLE "police_stations" DROP CONSTRAINT "police_stations_district_id_fkey";

-- DropForeignKey
ALTER TABLE "post_offices" DROP CONSTRAINT "post_offices_district_id_fkey";

-- DropForeignKey
ALTER TABLE "post_offices" DROP CONSTRAINT "post_offices_upazila_id_fkey";

-- DropForeignKey
ALTER TABLE "union_parishads" DROP CONSTRAINT "union_parishads_upazila_id_fkey";

-- DropForeignKey
ALTER TABLE "upazilas" DROP CONSTRAINT "upazilas_district_id_fkey";

-- AlterTable
ALTER TABLE "base_divisions" ALTER COLUMN "geo_code" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "districts";

-- DropTable
DROP TABLE "divisions";

-- DropTable
DROP TABLE "municipalities";

-- DropTable
DROP TABLE "police_stations";

-- DropTable
DROP TABLE "post_offices";

-- DropTable
DROP TABLE "union_parishads";

-- DropTable
DROP TABLE "upazilas";
