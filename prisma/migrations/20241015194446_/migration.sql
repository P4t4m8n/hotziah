/*
  Warnings:

  - Made the column `firstName` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lastName` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `imgUrl` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "firstName" SET NOT NULL,
ALTER COLUMN "firstName" SET DEFAULT 'New User',
ALTER COLUMN "lastName" SET NOT NULL,
ALTER COLUMN "lastName" SET DEFAULT 'New User',
ALTER COLUMN "imgUrl" SET NOT NULL,
ALTER COLUMN "imgUrl" SET DEFAULT '';
