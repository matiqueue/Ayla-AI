import { prisma } from "@/lib/prisma";

function generujLicencje(): string {
  const number = Math.floor(Math.random() * 1000000000);
  return number.toString().padStart(9, "0");
  //return number.toString();
}

async function main() {
  for (let i = 0; i < 20; i++) {
    const licencja = generujLicencje();
    console.log("licencja: ", licencja);
  }
  //const licencja = generujLicencje();
  //console.log("licencja: ", licencja);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
