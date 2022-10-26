import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsEmail,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpsertEmployeeDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  name?: string;

  @ApiProperty({ required: true })
  @IsNumber()
  @IsNotEmpty()
  salary?: number;

  @ApiProperty({ required: true })
  @IsNumber()
  @IsNotEmpty()
  company_id?: number;

  @ApiProperty({ required: true })
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;
}

export class ImportEmployeesDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpsertEmployeeDto)
  employees: UpsertEmployeeDto[];
}
