import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { userId, groupId } = body;

  if (!userId || !groupId || groupId.trim() === "") {
    return NextResponse.json(
      { error: "Missing or invalid userId/groupId" },
      { status: 400 },
    );
  }

  const groupToJoin = await prisma.group.findUnique({
    where: { id: groupId },
  });

  console.log(groupToJoin);
  if (!groupToJoin) {
    return NextResponse.json({ error: "Invalid GroupId" }, { status: 400 });
  }

  const newGroupMember = await prisma.groupMember.create({
    data: {
      userId: userId,
      groupId: groupId,
    },
  });

  //? Need to figure what to return, just retuning groupMemberId for now
  return NextResponse.json({ groupMemberId: newGroupMember.id });
}
