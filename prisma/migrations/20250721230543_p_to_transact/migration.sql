/*
  Warnings:

  - You are about to drop the column `purchaseId` on the `Expense` table. All the data in the column will be lost.
  - Added the required column `transactionId` to the `Expense` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Expense" DROP CONSTRAINT "Expense_purchaseId_fkey";

-- AlterTable
ALTER TABLE "Expense" DROP COLUMN "purchaseId",
ADD COLUMN     "transactionId" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
