-- CreateEnum
CREATE TYPE "AchievementType" AS ENUM ('PROFESSIONAL_CERTIFICATION', 'TRAINING', 'WORKSHOP', 'SEMINAR', 'AWARD', 'HONOR', 'COMPETITION', 'PUBLICATION', 'PROJECT', 'OTHER');

-- CreateTable
CREATE TABLE "candidate_achievements" (
    "id" TEXT NOT NULL,
    "type" "AchievementType" NOT NULL,
    "title" TEXT NOT NULL,
    "organization_name" TEXT NOT NULL,
    "url" TEXT,
    "location" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "certificate_path" TEXT NOT NULL,
    "certificate_size" INTEGER NOT NULL,
    "certificate_type" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "candidate_achievements_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "candidate_achievements" ADD CONSTRAINT "candidate_achievements_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
