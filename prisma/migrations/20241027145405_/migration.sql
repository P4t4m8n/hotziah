/*
  Warnings:

  - You are about to drop the column `questionnaireId` on the `Question` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_questionnaireId_fkey";

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "questionnaireId";
