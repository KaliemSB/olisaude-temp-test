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
}
