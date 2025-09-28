import { NextRequest } from "next/server";
import { supabaseClient } from "./supabaseClient";

export async function getAuthenticatedUser(req: NextRequest) {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader) throw new Error("Not authenticated");

  const token = authHeader.replace("Bearer ", "");
  const {
    data: { user },
    error,
  } = await supabaseClient.auth.getUser(token);

  if (error || !user) throw new Error("Not authenticated");

  return user;
}
