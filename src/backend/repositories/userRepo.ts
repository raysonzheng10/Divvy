import { prisma } from "../db";

// get users
export async function getUserById(id: string) {
  return prisma.user.findUnique({ where: { id } });
}

export async function getUserByName(name: string) {
  return prisma.user.findFirst({ where: { name } });
}

// create users
export async function createUser(data: {
  name?: string | null;
  email: string;
}) {
  return prisma.user.create({ data });
}
