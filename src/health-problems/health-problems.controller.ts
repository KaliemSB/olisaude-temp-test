import { PrismaService } from "@/prisma/prisma.service";
import { Controller, Get, Inject, NotFoundException, Param } from "@nestjs/common";

@Controller("health-problems")
export class HealthProblemsController {
  constructor(@Inject() private readonly prisma: PrismaService) {}

  @Get()
  findMany() {
    return this.prisma.healthProblem.findMany();
  }

  @Get(":id")
  findFirst(@Param("id") id: string) {
    return this.prisma.healthProblem
      .findFirstOrThrow({
        where: {
          id,
        },
      })
      .catch(() => new NotFoundException());
  }
}
