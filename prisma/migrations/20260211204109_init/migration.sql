/*
  Warnings:

  - The `status` column on the `base_districts` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `base_divisions` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `base_police_stations` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `base_upazila` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `geo_code` to the `base_municipalities` table without a default value. This is not possible if the table is not empty.
  - Made the column `geo_code` on table `base_police_stations` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "base_districts" ALTER COLUMN "geo_code" SET DATA TYPE TEXT,
DROP COLUMN "status",
ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "base_divisions" DROP COLUMN "status",
ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "base_municipalities" ADD COLUMN     "geo_code" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "base_police_stations" ALTER COLUMN "geo_code" SET NOT NULL,
ALTER COLUMN "geo_code" SET DATA TYPE TEXT,
DROP COLUMN "status",
ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "base_union_parishads" ALTER COLUMN "geo_code" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "base_upazila" ALTER COLUMN "geo_code" SET DATA TYPE TEXT,
DROP COLUMN "status",
ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT true;
