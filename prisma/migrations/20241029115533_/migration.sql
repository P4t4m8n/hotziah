/*
  Warnings:

  - A unique constraint covering the columns `[viewType,postId,forumId,articleId,userId,visitorId]` on the table `UniqueView` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "UniqueView_postId_forumId_articleId_userId_visitorId_key";

-- AlterTable
ALTER TABLE "UniqueView" ALTER COLUMN "viewType" SET DEFAULT 'POST';

-- CreateIndex
CREATE UNIQUE INDEX "UniqueView_viewType_postId_forumId_articleId_userId_visitor_key" ON "UniqueView"("viewType", "postId", "forumId", "articleId", "userId", "visitorId");
