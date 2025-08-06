-- CreateTable
CREATE TABLE "Settlement" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "payerId" UUID NOT NULL,
    "recipientId" UUID NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Settlement_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Settlement" ADD CONSTRAINT "Settlement_payerId_fkey" FOREIGN KEY ("payerId") REFERENCES "GroupMember"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Settlement" ADD CONSTRAINT "Settlement_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "GroupMember"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
