import { createNewGroupByUserId } from "@/backend/services/groupServices";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { userId } = body;

  try {
    const userGroup = await createNewGroupByUserId(userId);
    return NextResponse.json({ userGroup: userGroup });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
