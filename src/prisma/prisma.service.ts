import { Injectable } from "@nestjs/common";
import { PrismaClient } from "../../generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

const URL = process.env.DATABASE_URL;

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    if (!URL) {
      throw new Error("DATABASE_URL is not set");
    }

    const adapter = new PrismaLibSql({ url: URL });
    super({ adapter });
  }
}
