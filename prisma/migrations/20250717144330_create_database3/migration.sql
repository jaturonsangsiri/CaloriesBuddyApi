/*
  Warnings:

  - You are about to drop the column `dailyCalorieTarget` on the `Users` table. All the data in the column will be lost.
  - Added the required column `tdee` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Foods" ALTER COLUMN "description" SET DEFAULT '',
ALTER COLUMN "image" DROP NOT NULL,
ALTER COLUMN "image" SET DEFAULT '';

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "dailyCalorieTarget",
ADD COLUMN     "tdee" INTEGER NOT NULL;
