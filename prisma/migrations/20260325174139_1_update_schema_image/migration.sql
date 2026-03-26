/*
  Warnings:

  - Added the required column `url` to the `Image` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `version` on the `Image` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "url" TEXT NOT NULL,
ALTER COLUMN "format" DROP NOT NULL,
DROP COLUMN "version",
ADD COLUMN     "version" INTEGER NOT NULL;
