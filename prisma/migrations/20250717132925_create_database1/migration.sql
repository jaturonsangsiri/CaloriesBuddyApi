/*
  Warnings:

  - You are about to drop the column `createBy` on the `Foods` table. All the data in the column will be lost.
  - Added the required column `updatedBy` to the `Foods` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `foodCategory` on the `Foods` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "FoodCategory" AS ENUM ('Proteins', 'carbohydrates', 'minerals', 'vitamins', 'fats');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "activityLevel" AS ENUM ('little', 'medium', 'alot');

-- CreateEnum
CREATE TYPE "ExerciseGoal" AS ENUM ('LoseWeight', 'GainWeight', 'Maintain');

-- CreateEnum
CREATE TYPE "MealType" AS ENUM ('MORNING', 'AFTER_NOON', 'EVENING', 'SNACKS');

-- CreateEnum
CREATE TYPE "MuscleType" AS ENUM ('Chest', 'Shoulder', 'Leg', 'Trisep', 'Bicep', 'Forearm', 'Back', 'Calf');

-- CreateEnum
CREATE TYPE "WorkoutDifficulty" AS ENUM ('Beginner', 'Intermediate', 'Advanced');

-- CreateEnum
CREATE TYPE "WorkoutEquipment" AS ENUM ('equipmentc');

-- AlterTable
ALTER TABLE "Foods" DROP COLUMN "createBy",
ADD COLUMN     "updatedBy" TEXT NOT NULL,
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "foodCategory",
ADD COLUMN     "foodCategory" "FoodCategory" NOT NULL;

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "accName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "age" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,
    "profileImg" TEXT NOT NULL,
    "activityLevel" "activityLevel" NOT NULL,
    "goal" "ExerciseGoal" NOT NULL,
    "dailyCalorieTarget" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FoodEaten" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "foodId" TEXT NOT NULL,
    "mealType" "MealType" NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "notes" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "UserFavFoods" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "foodId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Workout" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "detail" TEXT NOT NULL,
    "muscle" "MuscleType" NOT NULL,
    "calorieBurn" INTEGER NOT NULL,
    "difficulty" "WorkoutDifficulty" NOT NULL,
    "image" TEXT NOT NULL,
    "video" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "FavWorkout" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "workoutId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Activities" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "workoutId" TEXT NOT NULL,
    "sets" INTEGER NOT NULL,
    "reps" INTEGER NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "duration" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_name_key" ON "Users"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Users_accName_key" ON "Users"("accName");

-- CreateIndex
CREATE UNIQUE INDEX "FoodEaten_id_key" ON "FoodEaten"("id");

-- CreateIndex
CREATE UNIQUE INDEX "UserFavFoods_id_key" ON "UserFavFoods"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Notification_id_key" ON "Notification"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Workout_id_key" ON "Workout"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Workout_name_key" ON "Workout"("name");

-- CreateIndex
CREATE UNIQUE INDEX "FavWorkout_id_key" ON "FavWorkout"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Activities_id_key" ON "Activities"("id");
