/*
  Warnings:

  - You are about to drop the column `brand` on the `product` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name,brandId]` on the table `product` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "product_name_brand_key";

-- AlterTable
ALTER TABLE "product" DROP COLUMN "brand";

-- CreateIndex
CREATE UNIQUE INDEX "product_name_brandId_key" ON "product"("name", "brandId");
