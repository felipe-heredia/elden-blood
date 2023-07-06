/*
  Warnings:

  - Made the column `storeId` on table `purchase` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "purchase" DROP CONSTRAINT "purchase_storeId_fkey";

-- AlterTable
ALTER TABLE "purchase" ALTER COLUMN "storeId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "purchase" ADD CONSTRAINT "purchase_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
