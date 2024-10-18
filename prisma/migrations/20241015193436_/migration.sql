ALTER TABLE "User"
ALTER COLUMN "permission" DROP DEFAULT;

ALTER TABLE "User"
ALTER COLUMN "permission" TYPE "Permission" USING "permission"::text::"Permission";

ALTER TABLE "User"
ALTER COLUMN "permission" SET DEFAULT 'USER';

ALTER TABLE "User"
ALTER COLUMN "permission" SET NOT NULL;
