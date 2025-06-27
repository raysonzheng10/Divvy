import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Purchase } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const body: Omit<Purchase, "id" | "createdAt"> = await req.json();

  const newPurchase = await prisma.purchase.create({
    data: body,
  });

  return NextResponse.json({ purchaseId: newPurchase.id });
}
