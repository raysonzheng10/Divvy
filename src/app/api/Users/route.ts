import { createUser, getUserById } from "@/backend/repositories/userRepo";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { userId, userEmail } = await req.json();

    if (!userId || !userEmail) {
      return NextResponse.json(
        { error: "Missing required fields: userId or userEmail" },
        { status: 400 },
      );
    }

    // Check if user already exists
    const existingUser = await getUserById(userId);
    if (existingUser) {
      return NextResponse.json({ user: existingUser });
    }

    // Create new user
    const newUser = await createUser({ id: userId, email: userEmail });
    return NextResponse.json({ user: newUser });
  } catch (error) {
    console.error("Error in POST /users:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
