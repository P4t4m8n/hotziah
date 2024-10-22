/*
  Warnings:

  - You are about to drop the column `educations` on the `Therapist` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Therapist" DROP COLUMN "educations",
ADD COLUMN     "education" "TherapistEducation"[];
