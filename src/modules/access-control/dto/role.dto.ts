import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, ArrayNotEmpty } from 'class-validator';

export class RoleBaseDTO {
  @ApiProperty({ type: String, example: 'user' })
  @IsString()
  name: string;

  @IsArray()
  @ArrayNotEmpty()
  @ApiProperty({ type: String, example: ['user:create'], isArray: true })
  can: string[] = [];

  @IsArray()
  @ApiProperty({ type: String, example: ['user'], isArray: true })
  inherits: string[] = [];
}

export class RoleDTO extends RoleBaseDTO {
  @ApiProperty({
    type: String,
    example: '94758744-4145-48b2-b176-388ddaa5807d',
  })
  @IsString()
  _id: string;
}
