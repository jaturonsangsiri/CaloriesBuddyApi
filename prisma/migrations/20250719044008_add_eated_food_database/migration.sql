/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `FoodEaten` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[foodId]` on the table `FoodEaten` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "activityLevel" SET DEFAULT 'MEDIUM',
ALTER COLUMN "goal" SET DEFAULT 'LOSE_WEIGHT',
ALTER COLUMN "tdee" SET DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "FoodEaten_userId_key" ON "FoodEaten"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "FoodEaten_foodId_key" ON "FoodEaten"("foodId");

-- AddForeignKey
ALTER TABLE "FoodEaten" ADD CONSTRAINT "FoodEaten_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodEaten" ADD CONSTRAINT "FoodEaten_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "Foods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
