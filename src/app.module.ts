import { Module } from "@nestjs/common";
import { ClientsModule } from "./clients/clients.module";
import { PrismaModule } from "./prisma/prisma.module";
import { HealthProblemsModule } from './health-problems/health-problems.module';

@Module({
  imports: [PrismaModule, ClientsModule, HealthProblemsModule],
})
export class AppModule {}
