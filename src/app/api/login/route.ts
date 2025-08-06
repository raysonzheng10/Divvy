import { createUser, getUserByEmail } from "@/backend/repositories/userRepo";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  //? Consider wrapping the json unwrapping in try block
  const body = await req.json();
  const email: string = body?.email?.trim();

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  try {
    let user = await getUserByEmail(email);
    if (!user) {
      user = await createUser({
        email: email,
      });
    }
    return NextResponse.json({ user });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
