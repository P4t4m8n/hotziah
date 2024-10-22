/*
  Warnings:

  - Added the required column `isAccessible` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "isAccessible" BOOLEAN NOT NULL;
