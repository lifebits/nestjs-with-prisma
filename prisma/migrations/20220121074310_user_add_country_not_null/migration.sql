-- AlterTable


UPDATE "User" SET "country"='Russia' WHERE "country" IS NULL;

ALTER TABLE "User" ALTER COLUMN     "country" SET NOT NULL;
