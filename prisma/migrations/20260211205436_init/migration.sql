/*
  Warnings:

  - You are about to drop the `base_upazila` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "base_municipalities" DROP CONSTRAINT "base_municipalities_upazila_id_fkey";

-- DropForeignKey
ALTER TABLE "base_post_offices" DROP CONSTRAINT "base_post_offices_upazila_id_fkey";

-- DropForeignKey
ALTER TABLE "base_union_parishads" DROP CONSTRAINT "base_union_parishads_upazila_id_fkey";

-- DropForeignKey
ALTER TABLE "base_upazila" DROP CONSTRAINT "base_upazila_district_id_fkey";

-- DropTable
DROP TABLE "base_upazila";

-- CreateTable
CREATE TABLE "base_upazilas" (
    "id" SERIAL NOT NULL,
    "geo_code" TEXT NOT NULL,
    "district_id" INTEGER NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "bn_name" VARCHAR(100) NOT NULL,
    "url" VARCHAR(300) NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0),

    CONSTRAINT "base_upazilas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "base_upazilas_district_id_idx" ON "base_upazilas"("district_id");

-- AddForeignKey
ALTER TABLE "base_upazilas" ADD CONSTRAINT "base_upazilas_district_id_fkey" FOREIGN KEY ("district_id") REFERENCES "base_districts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "base_union_parishads" ADD CONSTRAINT "base_union_parishads_upazila_id_fkey" FOREIGN KEY ("upazila_id") REFERENCES "base_upazilas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "base_post_offices" ADD CONSTRAINT "base_post_offices_upazila_id_fkey" FOREIGN KEY ("upazila_id") REFERENCES "base_upazilas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "base_municipalities" ADD CONSTRAINT "base_municipalities_upazila_id_fkey" FOREIGN KEY ("upazila_id") REFERENCES "base_upazilas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
