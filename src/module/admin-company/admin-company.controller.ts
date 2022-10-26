import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AdminCompanyService } from './admin-company.service';
import { ImportEmployeesDto, UpsertEmployeeDto } from './dto/admin-company.dto';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
@Controller('/sh/admin-company')
@ApiTags('admin-company')
@UseGuards(AuthGuard('salary-hero-api-key'))
@ApiHeader({
  name: 'X-API-KEY',
  allowEmptyValue: false,
})
export class AdminCompanyController {
  constructor(private adminCompanyService: AdminCompanyService) {}

  @Get('/get-employees')
  @Roles(Role.AdminCompany, Role.SalaryHero)
  getAllCompany() {
    return this.adminCompanyService.getEmployees();
  }

  @Get('/get-employee/:user_id')
  @Roles(Role.AdminCompany, Role.SalaryHero)
  getCompany(@Param('user_id') user_id: number) {
    return this.adminCompanyService.getEmployeeById(user_id);
  }

  @Post('/create-employee')
  @Roles(Role.AdminCompany, Role.SalaryHero)
  createCompany(
    @Body(new ValidationPipe())
    { name, email, salary, company_id }: UpsertEmployeeDto,
  ) {
    return this.adminCompanyService.createEmployee(
      name,
      email,
      salary,
      company_id,
    );
  }

  @Put('/update-employee/:user_id')
  @Roles(Role.AdminCompany, Role.SalaryHero)
  async updateEmployee(
    @Body(new ValidationPipe())
    { name, email, salary, company_id }: UpsertEmployeeDto,
    @Param('user_id') user_id: number,
  ) {
    return await this.adminCompanyService.updateEmployee(
      name,
      salary,
      email,
      company_id,
      user_id,
    );
  }

  @Delete('/delete-employee/:user_id')
  @Roles(Role.AdminCompany, Role.SalaryHero)
  deleteCompanyById(@Param('user_id') user_id: number) {
    return this.adminCompanyService.deleteEmployeeById(user_id);
  }

  @Post('/upsert-employee')
  @Roles(Role.AdminCompany, Role.SalaryHero)
  async upsertEmployee(@Body(new ValidationPipe()) dto: ImportEmployeesDto) {
    return await this.adminCompanyService.upsertEmployee(dto.employees);
  }
}
