import { NextRequest, NextResponse } from "next/server";
import { getGroupsByUserId } from "@/backend/services/groupServices";
import { supabaseClient } from "@/app/supabaseClient";

export async function GET(req: NextRequest) {
  // 1. Get token from headers
  const authHeader = req.headers.get("Authorization");
  if (!authHeader)
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const token = authHeader.replace("Bearer ", "");
  const {
    data: { user },
    error: userError,
  } = await supabaseClient.auth.getUser(token);

  if (userError || !user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  // 2. Fetch groups for this authenticated user
  const groups = await getGroupsByUserId(user.id);

  return NextResponse.json({ groups });
}
