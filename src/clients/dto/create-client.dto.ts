import { IsEnum, IsISO8601, IsString } from "class-validator";
import { type Prisma, Sex } from "../../../generated/prisma/client";

export class CreateClientDto implements Omit<
  Prisma.ClientCreateInput,
  "id" | "createdAt" | "updatedAt"
> {
  @IsString()
  name: string;

  @IsISO8601({ strict: true })
  birthDate: string;

  @IsEnum(Sex)
  sex: Sex;
}
