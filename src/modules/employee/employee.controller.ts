import {
  Body,
  Controller,
  Param,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { EmployeeService } from './employee.service';
import { TransactionDto } from './dto/transtation.dto';
import { Role } from 'src/common/enums/role.enum';
import { Roles } from 'src/shared/decorators/roles.decorator';

@Controller('/sh/employee')
@ApiTags('employee')
@UseGuards(AuthGuard('salary-hero-api-key'))
@ApiHeader({
  name: 'X-API-KEY',
  allowEmptyValue: false,
})
export class EmployeeController {
  constructor(private employeeService: EmployeeService) {}

  @Post('/transactions/:user_id')
  @Roles(Role.AdminCompany, Role.SalaryHero, Role.Employee)
  transactions(
    @Body(new ValidationPipe()) { amount }: TransactionDto,
    @Param('user_id') user_id: number,
  ) {
    return this.employeeService.transactions(amount, user_id);
  }
}
