// import {
//   Body,
//   Controller,
//   Delete,
//   Get,
//   Param,
//   Post,
//   Put,
//   UseGuards,
// } from '@nestjs/common';
// import { ApiHeader, ApiTags } from '@nestjs/swagger';
// import { AuthGuard } from '@nestjs/passport';
// import { EmployeeService } from './employee.service';

// @Controller('/employee')
// @ApiTags('employee')
// @UseGuards(AuthGuard('salary-hero-api-key'))
// @ApiHeader({
//   name: 'X-API-KEY',
//   allowEmptyValue: false,
// })
// export class EmployeeController {
//   constructor(private adminCompanyService: EmployeeService) {}

//   @Get('/get-employees')
//   getAllCompany() {
//     return this.adminCompanyService.getEmployees();
//   }

//   @Get('/get-employee/:user_id')
//   getCompany(@Param('user_id') user_id: number) {
//     return this.adminCompanyService.getEmployeeById(user_id);
//   }

//   @Post('/create-employee')
//   createCompany(@Body() { name, salary, company_id }: CreateEmployeeDto) {
//     return this.adminCompanyService.createEmployee(name, salary, company_id);
//   }

//   @Put('/update-employee/:user_id')
//   async updateEmployee(
//     @Body() { name, salary, company_id }: EditEmployeeDto,
//     @Param('user_id') user_id: number,
//   ) {
//     return await this.adminCompanyService.updateEmployee(
//       name,
//       salary,
//       company_id,
//       user_id,
//     );
//   }

//   @Delete('/delete-employee/:user_id')
//   deleteCompanyById(@Param('user_id') user_id: number) {
//     return this.adminCompanyService.deleteEmployeeById(user_id);
//   }
// }
