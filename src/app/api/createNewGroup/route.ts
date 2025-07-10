import { createNewGroupForUserId } from "@/backend/services/groupServices";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { userId } = body;

  const userGroup = await createNewGroupForUserId(userId);

  return NextResponse.json({ userGroup: userGroup });
}
