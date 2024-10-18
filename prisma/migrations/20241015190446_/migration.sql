/*
  Warnings:

  - You are about to drop the column `isTherpist` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "isTherpist",
ADD COLUMN     "isTherapist" BOOLEAN NOT NULL DEFAULT false;
