import { prisma } from "@/lib/prisma";

async function main() {
  console.log("🚀 Prisma was connected to db 😄");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
