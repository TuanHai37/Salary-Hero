import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class TransactionDto {
  @ApiProperty({ required: true })
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  amount: number;
}
