// src/app/api/user/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { userId } = body;

  const newGroup = await prisma.group.create({
    data: {},
  });

  console.log("new group created", newGroup);
  const newGroupMember = await prisma.groupMember.create({
    data: {
      userId: userId,
      groupId: newGroup.id,
    },
  });

  //? Need to figure what to return, just retuning groupMemberId for now
  return NextResponse.json({ groupMemberId: newGroupMember.id });
}
