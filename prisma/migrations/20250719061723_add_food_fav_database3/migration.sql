/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `UserFavFoods` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[foodId]` on the table `UserFavFoods` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserFavFoods_userId_key" ON "UserFavFoods"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserFavFoods_foodId_key" ON "UserFavFoods"("foodId");

-- AddForeignKey
ALTER TABLE "UserFavFoods" ADD CONSTRAINT "UserFavFoods_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFavFoods" ADD CONSTRAINT "UserFavFoods_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "Foods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
