/*
  Warnings:

  - The values [TRISEP] on the enum `MuscleType` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('USER', 'ADMIN', 'SUPER_ADMIN');

-- CreateEnum
CREATE TYPE "WorkoutEquipment" AS ENUM ('DUMBBELL', 'BARBELL', 'INCLINE_BENCH');

-- AlterEnum
BEGIN;
CREATE TYPE "MuscleType_new" AS ENUM ('CHEST', 'SHOULDER', 'LEG', 'TRICEP', 'BICEP', 'FOREARM', 'BACK', 'CALF');
ALTER TABLE "Workout" ALTER COLUMN "muscle" TYPE "MuscleType_new" USING ("muscle"::text::"MuscleType_new");
ALTER TYPE "MuscleType" RENAME TO "MuscleType_old";
ALTER TYPE "MuscleType_new" RENAME TO "MuscleType";
DROP TYPE "MuscleType_old";
COMMIT;

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "role" "Roles" NOT NULL DEFAULT 'USER';
