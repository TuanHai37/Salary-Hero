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
import { SalaryHeroService } from './salary-hero.service';
import {
  CreateClientAdminDto,
  CreateCompanyDto,
  EditCompanyDto,
} from './dto/salary-hero.dto';

@Controller('/sh/salary-hero')
@ApiTags('salary-hero')
@UseGuards(AuthGuard('salary-hero-api-key'))
@ApiHeader({
  name: 'X-API-KEY',
  allowEmptyValue: false,
})
export class SalaryHeroController {
  constructor(private salaryHeroService: SalaryHeroService) {}

  @Get('/get-company')
  getAllCompany() {
    return this.salaryHeroService.getAllCompany();
  }

  @Get('/get-company/:company_id')
  getCompany(@Param('company_id') company_id: number) {
    return this.salaryHeroService.getCompanyById(company_id);
  }

  @Post('/create-company')
  createCompany(@Body(new ValidationPipe()) { name }: CreateCompanyDto) {
    return this.salaryHeroService.createCompany(name);
  }

  @Post('/add-client-admin')
  addClientAdmin(
    @Body(new ValidationPipe())
    { name, email, company_id }: CreateClientAdminDto,
  ) {
    return this.salaryHeroService.addClientAdmin(name, email, company_id);
  }

  @Put('/update-company/:company_id')
  editCompany(
    @Body(new ValidationPipe()) { name }: EditCompanyDto,
    @Param('company_id') company_id: number,
  ) {
    return this.salaryHeroService.updateCompany(name, company_id);
  }

  @Delete('/delete-company/:company_id')
  deleteCompanyById(@Param('company_id') company_id: number) {
    return this.salaryHeroService.deleteCompanyById(company_id);
  }
}
