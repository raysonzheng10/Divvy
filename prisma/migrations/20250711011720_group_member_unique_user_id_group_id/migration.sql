/*
  Warnings:

  - A unique constraint covering the columns `[userId,groupId]` on the table `GroupMember` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "GroupMember_userId_groupId_key" ON "GroupMember"("userId", "groupId");
