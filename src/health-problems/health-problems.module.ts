import { Module } from "@nestjs/common";
import { HealthProblemsController } from "./health-problems.controller";

@Module({
  controllers: [HealthProblemsController],
})
export class HealthProblemsModule {}
