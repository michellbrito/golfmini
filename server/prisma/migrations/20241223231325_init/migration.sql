/*
  Warnings:

  - You are about to alter the column `city` on the `Locations` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `name` on the `Locations` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `street` on the `Locations` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `zipcode` on the `Locations` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `url` on the `Photos` table. The data in that column could be lost. The data in that column will be cast from `VarChar(2083)` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `Locations` MODIFY `city` VARCHAR(191) NOT NULL,
    MODIFY `name` VARCHAR(191) NOT NULL,
    MODIFY `street` VARCHAR(191) NOT NULL,
    MODIFY `zipcode` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Photos` MODIFY `url` VARCHAR(191) NOT NULL;
