import { ArrayMinSize, IsArray, IsString } from "class-validator";

export class AttachHealthProblemDTO {
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  problems: Array<string>;
}
