/*
  Warnings:

  - Added the required column `calories` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `carbohydrate` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fat` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maxCabohydrate` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maxFat` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maxProtien` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `protien` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "calories" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "carbohydrate" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "fat" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "maxCabohydrate" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "maxFat" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "maxProtien" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "protien" DOUBLE PRECISION NOT NULL;
