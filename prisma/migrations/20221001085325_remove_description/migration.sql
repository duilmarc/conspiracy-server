/*
  Warnings:

  - You are about to drop the column `description` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `short_description` on the `event` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "event" DROP COLUMN "description",
DROP COLUMN "short_description";
