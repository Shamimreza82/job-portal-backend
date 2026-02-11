/*
  Warnings:

  - The `status` column on the `base_municipalities` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `base_union_parishads` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "base_municipalities" DROP COLUMN "status",
ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "base_union_parishads" DROP COLUMN "status",
ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT true;
