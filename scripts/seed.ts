import { PrismaLibSql } from "@prisma/adapter-libsql";
import { PrismaClient } from "../generated/prisma/client";

const URL = process.env.DATABASE_URL;

if (!URL) {
  throw new Error("DATABASE_URL is not set");
}

const client = new PrismaClient({
  adapter: new PrismaLibSql({ url: URL }),
});

await client.healthProblem.createMany({
  data: [
    "Hypertension",
    "Type 2 Diabetes",
    "Asthma",
    "Migraine",
    "Depression",
    "Osteoarthritis",
    "Gastroesophageal Reflux Disease (GERD)",
    "Chronic Obstructive Pulmonary Disease (COPD)",
    "Anemia",
    "Hypothyroidism",
  ].map((item) => ({
    id: Bun.randomUUIDv7(),
    name: item,
    severity: Math.floor(Math.random() * 2) + 1,
  })),
});
