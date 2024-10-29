/*
  Warnings:

  - A unique constraint covering the columns `[postId,forumId,articleId,userId,visitorId]` on the table `UniqueView` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "UniqueView_postId_forumId_userId_visitorId_key";

-- AlterTable
ALTER TABLE "UniqueView" ADD COLUMN     "articleId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "UniqueView_postId_forumId_articleId_userId_visitorId_key" ON "UniqueView"("postId", "forumId", "articleId", "userId", "visitorId");

-- AddForeignKey
ALTER TABLE "UniqueView" ADD CONSTRAINT "UniqueView_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE CASCADE ON UPDATE CASCADE;
