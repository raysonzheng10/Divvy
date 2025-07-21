import { prisma } from "../db";

// get users
export async function getUserById(id: string) {
  return prisma.user.findUnique({ where: { id } });
}

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}

// create users
export async function createUser(data: { email: string }) {
  return prisma.user.create({ data });
}
