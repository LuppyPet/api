/* eslint-disable @typescript-eslint/ban-ts-comment */
import { PrismaClient } from "@prisma/client";
import fs from "fs";
const prisma = new PrismaClient();

async function main() {
  const rawEstados = fs.readFileSync("./prisma/estados.json");
  const rawCidades = fs.readFileSync("./prisma/cidades.json");

  const cidades: {
    latitude: number;
    longitude: number;
    nome: string;
    ddd: number;
    codigo_uf: number;
    // @ts-ignore
  }[] = JSON.parse(rawCidades);
  const estados: { uf: string; nome: string; codigo_uf: number }[] =
    // @ts-ignore
    JSON.parse(rawEstados);

  const brazil = await prisma.country.create({
    data: {
      code: "BR",
      nameEn: "Brazil",
      namePt: "Brasil",
    },
  });

  await prisma.state.createMany({
    data: estados.map((state) => ({
      code: state.uf,
      countryId: brazil.id,
      nameEn: state.nome,
      namePt: state.nome,
      uf_code: state.codigo_uf,
    })),
  });

  const states = await prisma.state.findMany();

  await prisma.city.createMany({
    data: cidades.map((city) => ({
      latitude: city.latitude,
      longitude: city.longitude,
      nameEn: city.nome,
      namePt: city.nome,
      ddd: city.ddd,
      stateId:
        states.find((state) => city.codigo_uf === state.uf_code)?.id ?? "",
    })),
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
