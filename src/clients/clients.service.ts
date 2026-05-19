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

  async findOne(id: string) {
    const client = await this.prisma.client.findUnique({ where: { id } });
    if (!client) throw new NotFoundException();
    return client;
  }

  async update(id: string, updateClientDto: UpdateClientDto) {
    await this.findOne(id);
    return this.prisma.client.update({
      data: {
        ...updateClientDto,
        birthDate: updateClientDto.birthDate
          ? new Date(updateClientDto.birthDate)
          : undefined,
      },
      where: { id },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.client.delete({ where: { id } });
  }

  async attachHealthProblems(params: { clientId: string; healthProblemsIds: Array<string> }) {
    const client = await this.prisma.client.findFirst({
      where: { id: params.clientId },
    });

    if (!client) {
      throw new NotFoundException("Client not found");
    }

    const uniqueProblemIds = [...new Set(params.healthProblemsIds)];

    return this.prisma.$transaction(async (tx) => {
      const existing = await tx.healthProblem.findMany({
        where: { id: { in: uniqueProblemIds } },
        select: { id: true },
      });
      const existingIds = new Set(existing.map((p) => p.id));
      const missing = uniqueProblemIds.filter((id) => !existingIds.has(id));

      if (missing.length > 0) {
        throw new NotFoundException({
          message: "Health problem(s) not found",
          invalidIds: missing,
        });
      }

      return Promise.all(
        uniqueProblemIds.map((problemId) =>
          tx.clientHealthProblem.upsert({
            where: { clientId_problemId: { clientId: client.id, problemId } },
            create: { clientId: client.id, problemId },
            update: {},
          }),
        ),
      );
    });
  }

  async getRisk() {
    const clientsWithHealthProblems = await this.prisma.client.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
      include: {
        clientHealthProblems: {
          select: {
            healthProblem: {
              select: {
                severity: true,
              },
            },
          },
        },
      },
    });

    const clientsWithTotalRisk = clientsWithHealthProblems.map((client) => {
      const healthProblemSum = client.clientHealthProblems
        .map((i) => i.healthProblem.severity)
        .reduce((a, b) => a + b, 0);

      const { clientHealthProblems: _clientHealthProblems, ...rest } = client;

      return {
        ...rest,
        totalRisk: (1 / (1 + Math.exp(-(-2.8 + healthProblemSum)))) * 100,
      };
    });

    return clientsWithTotalRisk;
  }
}
