/*
  Warnings:

  - Added the required column `location` to the `Contact` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Contact" ADD COLUMN     "company" TEXT,
ADD COLUMN     "industry" TEXT,
ADD COLUMN     "location" TEXT NOT NULL;
