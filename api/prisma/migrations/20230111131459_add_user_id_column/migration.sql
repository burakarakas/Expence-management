/*
  Warnings:

  - Added the required column `userId` to the `urun` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "urun" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "urun" ADD CONSTRAINT "urun_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
