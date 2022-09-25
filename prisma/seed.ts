import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.country.create({
    data: {
      code: "BR",
      nameEn: "Brazil",
      namePt: "Brasil",
      State: {
        create: {
          code: "SP",
          nameEn: "São Paulo",
          namePt: "São Paulo",
          City: {
            create: {
              code: "SOROCABA",
              nameEn: "Sorocaba",
              namePt: "Sorocaba",
            },
          },
        },
      },
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
