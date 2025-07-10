import { prisma } from "../db";

// get groups
export async function getGroupById(id: string) {
  return prisma.group.findUnique({ where: { id } });
}

// create groups
export async function createGroup(data: {
  name?: string | null;
  description?: string | null;
}) {
  return prisma.group.create({ data });
}
