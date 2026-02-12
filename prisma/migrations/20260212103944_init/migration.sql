/*
  Warnings:

  - Added the required column `companyName` to the `candidate_references` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "candidate_references" ADD COLUMN     "companyName" TEXT NOT NULL;
