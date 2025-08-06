/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - Added the required column `nickname` to the `GroupMember` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GroupMember" ADD COLUMN "nickname" TEXT NOT NULL DEFAULT 'default@nickname.com';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name";
