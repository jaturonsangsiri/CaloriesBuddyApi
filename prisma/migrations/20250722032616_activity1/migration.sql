/*
  Warnings:

  - The values [equipmentc] on the enum `WorkoutEquipment` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "WorkoutEquipment_new" AS ENUM ('Dumbbell', 'Barbell', 'Incline_Bench');
ALTER TYPE "WorkoutEquipment" RENAME TO "WorkoutEquipment_old";
ALTER TYPE "WorkoutEquipment_new" RENAME TO "WorkoutEquipment";
DROP TYPE "WorkoutEquipment_old";
COMMIT;

-- AlterTable
ALTER TABLE "Workout" ALTER COLUMN "difficulty" SET DEFAULT 'Beginner';

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activities" ADD CONSTRAINT "Activities_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activities" ADD CONSTRAINT "Activities_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
