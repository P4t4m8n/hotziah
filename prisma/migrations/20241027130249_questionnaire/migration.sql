/*
  Warnings:

  - The primary key for the `Answer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Answer` table. All the data in the column will be lost.
  - The primary key for the `Question` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Question` table. All the data in the column will be lost.
  - The `type` column on the `Question` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `_id` to the `Answer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `_id` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Made the column `questionnaireId` on table `Question` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "QuestionType" AS ENUM ('TEXT', 'MULTIPLE_CHOICE', 'YES_NO', 'SCALE');

-- DropForeignKey
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_nextQuestionId_fkey";

-- DropForeignKey
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_questionId_fkey";

-- DropForeignKey
ALTER TABLE "Questionnaire" DROP CONSTRAINT "Questionnaire_rootQuestionId_fkey";

-- DropIndex
DROP INDEX "Answer_nextQuestionId_key";

-- DropIndex
DROP INDEX "Answer_questionId_key";

-- DropIndex
DROP INDEX "Question_questionnaireId_key";

-- DropIndex
DROP INDEX "Questionnaire_rootQuestionId_key";

-- AlterTable
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_pkey",
DROP COLUMN "id",
ADD COLUMN     "_id" VARCHAR(255) NOT NULL,
ALTER COLUMN "answerText" SET DEFAULT 'New Answer',
ADD CONSTRAINT "Answer_pkey" PRIMARY KEY ("_id");

-- AlterTable
ALTER TABLE "Question" DROP CONSTRAINT "Question_pkey",
DROP COLUMN "id",
ADD COLUMN     "_id" VARCHAR(255) NOT NULL,
ALTER COLUMN "questionText" SET DEFAULT 'New Question',
DROP COLUMN "type",
ADD COLUMN     "type" "QuestionType" NOT NULL DEFAULT 'TEXT',
ALTER COLUMN "questionnaireId" SET NOT NULL,
ADD CONSTRAINT "Question_pkey" PRIMARY KEY ("_id");

-- AlterTable
ALTER TABLE "Questionnaire" ALTER COLUMN "title" SET DEFAULT 'New Questionnaire',
ALTER COLUMN "description" SET DEFAULT 'New Questionnaire',
ALTER COLUMN "subjects" SET DEFAULT ARRAY['New']::TEXT[];

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "imgUrl" SET DEFAULT 'imgs/avatarDefault.svg';

-- DropEnum
DROP TYPE "QustionType";

-- CreateIndex
CREATE INDEX "Answer__id_idx" ON "Answer"("_id");

-- CreateIndex
CREATE INDEX "Question__id_idx" ON "Question"("_id");

-- AddForeignKey
ALTER TABLE "Questionnaire" ADD CONSTRAINT "Questionnaire_rootQuestionId_fkey" FOREIGN KEY ("rootQuestionId") REFERENCES "Question"("_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_nextQuestionId_fkey" FOREIGN KEY ("nextQuestionId") REFERENCES "Question"("_id") ON DELETE SET NULL ON UPDATE CASCADE;
