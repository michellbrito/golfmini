-- AlterTable
ALTER TABLE `Locations` MODIFY `website` VARCHAR(191) NULL,
    MODIFY `type` ENUM('INDOOR', 'OUTDOOR') NULL;
