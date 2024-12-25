/*
  Warnings:

  - Added the required column `phoneNumber` to the `Locations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `website` to the `Locations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Locations` ADD COLUMN `phoneNumber` VARCHAR(191) NOT NULL,
    ADD COLUMN `website` VARCHAR(191) NOT NULL;
