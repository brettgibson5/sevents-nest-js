/*
  Warnings:

  - Added the required column `slug` to the `cities` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cities" ADD COLUMN     "slug" TEXT NOT NULL;
