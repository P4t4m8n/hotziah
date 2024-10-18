/*
  Warnings:

  - You are about to drop the column `subject` on the `Forum` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Forum" DROP COLUMN "subject",
ADD COLUMN     "subjects" "ForumSubject"[];
