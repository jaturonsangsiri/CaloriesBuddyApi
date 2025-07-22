/*
  Warnings:

  - You are about to alter the column `weight` on the `Activities` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Activities" ALTER COLUMN "weight" SET DATA TYPE INTEGER;

-- AddForeignKey
ALTER TABLE "FavWorkout" ADD CONSTRAINT "FavWorkout_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavWorkout" ADD CONSTRAINT "FavWorkout_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
