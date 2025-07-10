import { createUser, getUserByName } from "@/backend/repositories/userRepo";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  //? Consider wrapping the json unwrapping in try block
  const body = await req.json();
  const username: string = body?.username?.trim();

  if (!username) {
    return NextResponse.json(
      { error: "Username is required" },
      { status: 400 },
    );
  }

  try {
    let user = await getUserByName(username);
    if (!user) {
      user = await createUser({
        name: username,
        email: `${username}@gmail`,
      });
    }
    return NextResponse.json({ user });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
