/*
  Warnings:

  - Added the required column `address` to the `events` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "events" ADD COLUMN     "address" TEXT NOT NULL;
