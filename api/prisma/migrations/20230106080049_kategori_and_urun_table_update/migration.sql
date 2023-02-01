/*
  Warnings:

  - You are about to drop the column `kat_id` on the `urun` table. All the data in the column will be lost.
  - Added the required column `kat_Id` to the `urun` table without a default value. This is not possible if the table is not empty.
  - Added the required column `urunfiyat` to the `urun` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "urun" DROP CONSTRAINT "urun_kat_id_fkey";

-- AlterTable
ALTER TABLE "urun" DROP COLUMN "kat_id",
ADD COLUMN     "kat_Id" INTEGER NOT NULL,
ADD COLUMN     "urunfiyat" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "urun" ADD CONSTRAINT "urun_kat_Id_fkey" FOREIGN KEY ("kat_Id") REFERENCES "kategori"("katId") ON DELETE RESTRICT ON UPDATE CASCADE;
