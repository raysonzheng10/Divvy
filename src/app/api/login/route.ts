// src/app/api/user/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const username = body?.username?.trim();

    if (!username) {
      return NextResponse.json(
        { error: "Username is required" },
        { status: 400 },
      );
    }

    // Check if user exists
    let user = await prisma.user.findFirst({
      where: { name: username },
    });

    // Create new user if not found
    if (!user) {
      user = await prisma.user.create({
        data: {
          name: username,
          email: `${username}@gmail.com`, // Replace as needed
        },
      });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
