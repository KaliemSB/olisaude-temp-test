import { PrismaService } from "@/prisma/prisma.service";
import { Controller, Get, NotFoundException, Param } from "@nestjs/common";

@Controller("health-problems")
export class HealthProblemsController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  findMany() {
    return this.prisma.healthProblem.findMany();
  }

  @Get(":id")
  async findFirst(@Param("id") id: string) {
    const problem = await this.prisma.healthProblem.findUnique({ where: { id } });
    if (!problem) throw new NotFoundException();
    return problem;
  }
}
