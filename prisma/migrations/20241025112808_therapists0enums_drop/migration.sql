/*
  Warnings:

  - The `languages` column on the `Therapist` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `meetingType` column on the `Therapist` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `education` column on the `Therapist` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Therapist" DROP COLUMN "languages",
ADD COLUMN     "languages" TEXT[] DEFAULT ARRAY['Hebrew']::TEXT[],
DROP COLUMN "meetingType",
ADD COLUMN     "meetingType" TEXT[] DEFAULT ARRAY['In Person']::TEXT[],
DROP COLUMN "education",
ADD COLUMN     "education" TEXT[] DEFAULT ARRAY['Psychology']::TEXT[];
