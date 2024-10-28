-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "isPinned" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "content" SET DEFAULT 'New Comment';

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "isPinned" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "title" SET DEFAULT 'New Post',
ALTER COLUMN "content" SET DEFAULT 'New Post';
