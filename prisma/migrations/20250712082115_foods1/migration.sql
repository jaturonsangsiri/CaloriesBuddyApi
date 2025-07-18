/*
  Warnings:

  - Added the required column `calories` to the `Foods` table without a default value. This is not possible if the table is not empty.
  - Added the required column `carb` to the `Foods` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fat` to the `Foods` table without a default value. This is not possible if the table is not empty.
  - Added the required column `foodCategory` to the `Foods` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Foods` table without a default value. This is not possible if the table is not empty.
  - Added the required column `protein` to the `Foods` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Foods" ADD COLUMN     "calories" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "carb" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "fat" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "foodCategory" TEXT NOT NULL,
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "protein" DOUBLE PRECISION NOT NULL;
