/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Therapist` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Therapist_userId_key" ON "Therapist"("userId");
