/*
  Warnings:

  - Added the required column `purchaseId` to the `purchase_condition` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "purchase_condition" ADD COLUMN     "purchaseId" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "purchase_condition" ADD CONSTRAINT "purchase_condition_purchaseId_fkey" FOREIGN KEY ("purchaseId") REFERENCES "purchase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
