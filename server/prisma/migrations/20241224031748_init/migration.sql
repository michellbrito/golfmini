/*
  Warnings:

  - Added the required column `type` to the `Locations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Locations` ADD COLUMN `theme` ENUM('PIRATE', 'JUNGLE', 'GLOW_IN_THE_DARK') NULL,
    ADD COLUMN `type` ENUM('INDOOR', 'OUTDOOR') NOT NULL,
    MODIFY `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
