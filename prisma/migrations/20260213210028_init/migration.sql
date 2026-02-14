/*
  Warnings:

  - You are about to drop the column `addressLine` on the `address` table. All the data in the column will be lost.
  - You are about to drop the column `addressTypeId` on the `address` table. All the data in the column will be lost.
  - You are about to drop the column `districtId` on the `address` table. All the data in the column will be lost.
  - You are about to drop the column `divisionId` on the `address` table. All the data in the column will be lost.
  - You are about to drop the column `isCityCorporation` on the `address` table. All the data in the column will be lost.
  - You are about to drop the column `isSameAsPresent` on the `address` table. All the data in the column will be lost.
  - You are about to drop the column `municipalityId` on the `address` table. All the data in the column will be lost.
  - You are about to drop the column `policeStationId` on the `address` table. All the data in the column will be lost.
  - You are about to drop the column `postOfficeId` on the `address` table. All the data in the column will be lost.
  - You are about to drop the column `unionParishadId` on the `address` table. All the data in the column will be lost.
  - You are about to drop the column `upazilaId` on the `address` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `address` table. All the data in the column will be lost.
  - You are about to drop the column `wardNo` on the `address` table. All the data in the column will be lost.
  - You are about to drop the column `zipCode` on the `address` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id,address_type_id]` on the table `address` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `address_line` to the `address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address_type_id` to the `address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `district_id` to the `address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `division_id` to the `address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `upazila_id` to the `address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `address` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "address" DROP CONSTRAINT "address_addressTypeId_fkey";

-- DropForeignKey
ALTER TABLE "address" DROP CONSTRAINT "address_userId_fkey";

-- DropIndex
DROP INDEX "address_userId_addressTypeId_key";

-- AlterTable
ALTER TABLE "address" DROP COLUMN "addressLine",
DROP COLUMN "addressTypeId",
DROP COLUMN "districtId",
DROP COLUMN "divisionId",
DROP COLUMN "isCityCorporation",
DROP COLUMN "isSameAsPresent",
DROP COLUMN "municipalityId",
DROP COLUMN "policeStationId",
DROP COLUMN "postOfficeId",
DROP COLUMN "unionParishadId",
DROP COLUMN "upazilaId",
DROP COLUMN "userId",
DROP COLUMN "wardNo",
DROP COLUMN "zipCode",
ADD COLUMN     "address_line" TEXT NOT NULL,
ADD COLUMN     "address_type_id" TEXT NOT NULL,
ADD COLUMN     "district_id" TEXT NOT NULL,
ADD COLUMN     "division_id" TEXT NOT NULL,
ADD COLUMN     "is_city_corporation" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_same_as_present" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "municipality_id" TEXT,
ADD COLUMN     "police_station_id" TEXT,
ADD COLUMN     "post_office_id" TEXT,
ADD COLUMN     "union_parishad_id" TEXT,
ADD COLUMN     "upazila_id" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL,
ADD COLUMN     "ward_no" TEXT,
ADD COLUMN     "zip_code" TEXT;

-- AlterTable
ALTER TABLE "documents" ADD COLUMN     "document_no" TEXT,
ADD COLUMN     "issue_authority" TEXT,
ADD COLUMN     "issue_date" TIMESTAMP(3),
ADD COLUMN     "remarks" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "address_user_id_address_type_id_key" ON "address"("user_id", "address_type_id");

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_address_type_id_fkey" FOREIGN KEY ("address_type_id") REFERENCES "address_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
