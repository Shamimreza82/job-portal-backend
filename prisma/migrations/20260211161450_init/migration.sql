/*
  Warnings:

  - A unique constraint covering the columns `[user_id,company_name,designation,department,company_business_type,responsibilities]` on the table `candidate_experiences` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `responsibilities` to the `candidate_experiences` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "candidate_experiences_user_id_company_name_designation_depa_key";

-- AlterTable
ALTER TABLE "candidate_experiences" ADD COLUMN     "responsibilities" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "candidate_experiences_user_id_company_name_designation_depa_key" ON "candidate_experiences"("user_id", "company_name", "designation", "department", "company_business_type", "responsibilities");
