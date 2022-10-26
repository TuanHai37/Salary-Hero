import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsEmail } from 'class-validator';

export class CreateCompanyDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  name?: string;
}

export class EditCompanyDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  name?: string;
}

export class CreateClientAdminDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  name?: string;

  @ApiProperty({ required: true })
  @IsNumber()
  @IsNotEmpty()
  company_id?: number;

  @ApiProperty({ required: true })
  @IsEmail()
  @IsNotEmpty()
  email?: string;
}
