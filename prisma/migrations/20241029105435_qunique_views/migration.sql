/*
  Warnings:

  - You are about to drop the `PostView` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "ViewType" AS ENUM ('POST', 'FORUM', 'ARTICLE');

-- DropForeignKey
ALTER TABLE "PostView" DROP CONSTRAINT "PostView_postId_fkey";

-- DropTable
DROP TABLE "PostView";

-- CreateTable
CREATE TABLE "UniqueView" (
    "id" TEXT NOT NULL,
    "viewType" "ViewType" NOT NULL,
    "postId" TEXT,
    "forumId" TEXT,
    "userId" TEXT,
    "visitorId" TEXT,
    "viewedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UniqueView_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UniqueView_postId_forumId_userId_visitorId_key" ON "UniqueView"("postId", "forumId", "userId", "visitorId");

-- AddForeignKey
ALTER TABLE "UniqueView" ADD CONSTRAINT "UniqueView_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UniqueView" ADD CONSTRAINT "UniqueView_forumId_fkey" FOREIGN KEY ("forumId") REFERENCES "Forum"("id") ON DELETE CASCADE ON UPDATE CASCADE;
