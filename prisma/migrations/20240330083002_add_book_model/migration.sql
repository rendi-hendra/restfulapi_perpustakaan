-- CreateTable
CREATE TABLE `books` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `judul` VARCHAR(255) NOT NULL,
    `penulis` VARCHAR(100) NOT NULL,
    `harga` VARCHAR(100) NOT NULL,
    `stok` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
