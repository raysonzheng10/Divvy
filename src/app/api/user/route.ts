// src/app/api/user/route.ts
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  const user = await prisma.user.findFirst({
    where: { name: "rayson" },
  });
  return NextResponse.json(user);
}
