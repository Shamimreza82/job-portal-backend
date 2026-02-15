/*
  Warnings:

  - You are about to drop the `Candidate_references` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Candidate_references" DROP CONSTRAINT "Candidate_references_user_id_fkey";

-- DropTable
DROP TABLE "Candidate_references";

-- CreateTable
CREATE TABLE "base_city_corporations" (
    "id" SERIAL NOT NULL,
    "division_id" INTEGER NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "bn_name" VARCHAR(100) NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0),

    CONSTRAINT "base_city_corporations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "base_city_corporations_division_id_idx" ON "base_city_corporations"("division_id");

-- AddForeignKey
ALTER TABLE "base_city_corporations" ADD CONSTRAINT "base_city_corporations_division_id_fkey" FOREIGN KEY ("division_id") REFERENCES "base_divisions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
