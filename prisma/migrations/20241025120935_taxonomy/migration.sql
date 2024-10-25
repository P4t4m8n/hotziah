-- CreateTable
CREATE TABLE "Taxonomy" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "enums" TEXT[],

    CONSTRAINT "Taxonomy_pkey" PRIMARY KEY ("id")
);
