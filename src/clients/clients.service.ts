import { PrismaService } from "@/prisma/prisma.service";
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateClientDto } from "./dto/create-client.dto";
import { UpdateClientDto } from "./dto/update-client.dto";

@Injectable()
export class ClientsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createClientDto: CreateClientDto) {
    return this.prisma.client.create({
      data: {
        ...createClientDto,
        birthDate: new Date(createClientDto.birthDate),
      },
    });
  }

  findAll() {
    return this.prisma.client.findMany();
  }

  findOne(id: string) {
    return this.prisma.client
      .findFirstOrThrow({
        where: {
          id,
        },
      })
      .catch(() => new NotFoundException());
  }

  update(id: string, updateClientDto: UpdateClientDto) {
    return this.prisma.client
      .update({
        data: updateClientDto,
        where: {
          id,
        },
      })
      .catch(() => new NotFoundException());
  }

  remove(id: string) {
    return this.prisma.client
      .delete({
        where: {
          id,
        },
      })
      .catch(() => new NotFoundException());
  }

  async attachHealthProblems(params: { clientId: string; healthProblemsIds: Array<string> }) {
    const client = await this.prisma.client.findFirst({
      where: { id: params.clientId },
    });

    if (!client) {
      throw new NotFoundException("Client not found");
    }

    const existing = await this.prisma.healthProblem.findMany({
      where: { id: { in: params.healthProblemsIds } },
      select: { id: true },
    });
    const existingIds = new Set(existing.map((p) => p.id));
    const missing = params.healthProblemsIds.filter((id) => !existingIds.has(id));

    if (missing.length > 0) {
      throw new NotFoundException({
        message: "Health problem(s) not found",
        invalidIds: missing,
      });
    }

    return this.prisma.$transaction(
      params.healthProblemsIds.map((problemId) =>
        this.prisma.clientHealthProblem.upsert({
          where: { clientId_problemId: { clientId: client.id, problemId } },
          create: { clientId: client.id, problemId },
          update: {},
        }),
      ),
    );
  }
}
