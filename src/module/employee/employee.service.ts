// import { BadRequestException, Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Company } from 'src/entities/companies.entity';
// import { User } from 'src/entities/users.entity';
// @Injectable()
// export class EmployeeService {
//   constructor(
//     @InjectRepository(Company) private companyRepository: Repository<Company>,
//     @InjectRepository(User) private userRepository: Repository<User>,
//   ) {}

//   async getEmployees() {
//     const employees = await this.findAllEmployees();
//     if (!employees) {
//       throw new BadRequestException(
//         'There are currently no registered emplpoyees!',
//       );
//     }

//     return employees;
//   }

//   async getEmployeeById(user_id: number) {
//     const employee = await this.findOneById(user_id);
//     if (!employee) {
//       throw new BadRequestException('No employee found!');
//     }

//     return employee;
//   }

//   async createEmployee(name: string, salary: number, company_id: any) {
//     const existedCompany = await this.findOneByCompanyId(company_id);

//     if (!existedCompany) {
//       throw new BadRequestException('No company found');
//     }

//     return await this.userRepository.save({
//       name,
//       salary,
//       company_id,
//     });
//   }

//   async updateEmployee(
//     name: string,
//     salary: number,
//     company_id: number,
//     user_id: number,
//   ) {
//     const existedEmployee = await this.findOneById(user_id);

//     if (!existedEmployee) {
//       throw new BadRequestException('No employee found!');
//     }

//     if (existedEmployee.company_id !== company_id) {
//       const existedCompany = await this.findOneByCompanyId(company_id);

//       if (!existedCompany) {
//         throw new BadRequestException('No company found');
//       }
//     }

//     await this.userRepository.update({ user_id }, { company_id, name, salary });

//     return {
//       ...existedEmployee,
//       company_id,
//       name,
//       salary,
//     };
//   }

//   async deleteEmployeeById(user_id: number) {
//     const employee = await this.findOneById(user_id);
//     if (!employee) {
//       throw new BadRequestException('No company found!');
//     }

//     await this.userRepository.delete({ user_id });
//     return {
//       message: 'delete company success',
//     };
//   }

//   findOneById(user_id: number) {
//     return this.userRepository.findOne({
//       where: {
//         user_id,
//       },
//     });
//   }

//   findOneByCompanyId(company_id: number) {
//     return this.companyRepository.findOne({
//       where: {
//         company_id,
//       },
//     });
//   }

//   findAllEmployees() {
//     return this.userRepository.find();
//   }
// }
