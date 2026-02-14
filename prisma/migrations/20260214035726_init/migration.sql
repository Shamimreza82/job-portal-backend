/*
  Warnings:

  - You are about to drop the column `certificate_path` on the `candidate_achievements` table. All the data in the column will be lost.
  - You are about to drop the column `certificate_size` on the `candidate_achievements` table. All the data in the column will be lost.
  - You are about to drop the column `certificate_type` on the `candidate_achievements` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "candidate_achievements" DROP COLUMN "certificate_path",
DROP COLUMN "certificate_size",
DROP COLUMN "certificate_type";
