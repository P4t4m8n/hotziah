/*
  Warnings:

  - You are about to drop the column `thereapistType` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "thereapistType",
ADD COLUMN     "therapistType" TEXT;
