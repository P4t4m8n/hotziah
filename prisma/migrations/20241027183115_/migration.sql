/*
  Warnings:

  - The `type` column on the `Forum` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `subjects` column on the `Forum` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Forum" ALTER COLUMN "title" SET DEFAULT 'New Forum',
ALTER COLUMN "description" SET DEFAULT 'New Forum',
DROP COLUMN "type",
ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'Public',
DROP COLUMN "subjects",
ADD COLUMN     "subjects" TEXT[] DEFAULT ARRAY['General']::TEXT[];
