// scripts/test.ts
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.findFirst({ where: { name: "rayson" } });
  console.log(user);
}
main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
