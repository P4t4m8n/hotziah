-- AlterTable
ALTER TABLE "UniqueView" ADD COLUMN     "commentId" TEXT;

-- AddForeignKey
ALTER TABLE "UniqueView" ADD CONSTRAINT "UniqueView_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
