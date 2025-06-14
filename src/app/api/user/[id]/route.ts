// src/app/api/user/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const params = await context.params; // await here
  const id = params.id;

  // now use id safely
  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  return NextResponse.json({ user });
}
