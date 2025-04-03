import prisma from './index';
import { generateLicenceCode } from '../utils/generateLicenceCode';

async function main() {
  for (let i = 0; i < 5; i++) {
    const code = generateLicenceCode();
    await prisma.license.create({
      data: { code },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });