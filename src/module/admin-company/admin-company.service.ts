import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { Company } from 'src/entities/companies.entity';
import { User } from 'src/entities/users.entity';
import { ImportEmployeesDto } from './dto/admin-company.dto';
@Injectable()
export class AdminCompanyService {
  constructor(
    @InjectRepository(Company) private companyRepository: Repository<Company>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getEmployees() {
    try {
      const employees = await this.findAllEmployees();
      if (!employees) {
        throw new BadRequestException(
          'There are currently no registered emplpoyees!',
        );
      }

      return employees;
    } catch (err) {
      return {
        message: err,
      };
    }
  }

  async getEmployeeById(user_id: number) {
    try {
      const employee = await this.findOneById(user_id);
      if (!employee) {
        throw new BadRequestException('No employee found!');
      }

      return employee;
    } catch (err) {
      return {
        message: err,
      };
    }
  }

  async createEmployee(
    name: string,
    email: string,
    salary: number,
    company_id: any,
  ) {
    try {
      email = email.toLowerCase();
      const existedCompany = await this.findOneByCompanyId(company_id);

      if (!existedCompany) {
        throw new BadRequestException('No company found');
      }

      const existedEmail = await this.findOneByEmail(email);

      if (existedEmail) {
        throw new BadRequestException('Email had already exists!');
      }

      return await this.userRepository.save({
        name,
        salary,
        company_id,
        email,
      });
    } catch (err) {
      return {
        message: err,
      };
    }
  }

  async updateEmployee(
    name: string,
    salary: number,
    email: string,
    company_id: number,
    user_id: number,
  ) {
    try {
      email = email.toLowerCase();
      const existedEmployee = await this.findOneById(user_id);

      if (!existedEmployee) {
        throw new BadRequestException('No employee found!');
      }

      const existedEmail = await this.findOneByEmailNotCurrentUser(
        email,
        user_id,
      );

      if (existedEmail) {
        throw new BadRequestException('Email had already exists!');
      }

      if (existedEmployee.company_id !== company_id) {
        const existedCompany = await this.findOneByCompanyId(company_id);

        if (!existedCompany) {
          throw new BadRequestException('No company found');
        }
      }

      await this.userRepository.update(
        { user_id },
        { company_id, name, salary },
      );

      return {
        ...existedEmployee,
        company_id,
        name,
        salary,
        email,
      };
    } catch (err) {
      return {
        message: err,
      };
    }
  }

  async deleteEmployeeById(user_id: number) {
    try {
      const employee = await this.findOneById(user_id);
      if (!employee) {
        throw new BadRequestException('No company found!');
      }

      await this.userRepository.delete({ user_id });
      return {
        message: 'delete company success',
      };
    } catch (err) {
      return {
        message: err,
      };
    }
  }

  async upsertEmployee(employees: ImportEmployeesDto['employees']) {
    try {
      const users = await this.findAllEmployees();
      const cloneUsers = users.reduce((init, currentUser) => {
        init[currentUser.email] = currentUser;
        return init;
      }, {});

      const companies = await this.findAllCompany();
      const cloneCompanies = companies.reduce((init, currentCompany) => {
        init[currentCompany.company_id] = currentCompany;
        return init;
      }, {});

      for (const employee of employees) {
        if (!cloneCompanies[employee.company_id]) {
          return {
            message: 'No company found',
            data: employee,
          };
        }
      }

      employees.forEach(async (employee) => {
        if (cloneUsers[employee.email]) {
          return await this.userRepository.update(
            { email: employee.email },
            {
              name: employee.name,
              salary: employee.salary,
              company_id: employee.company_id,
            },
          );
        }
        return await this.userRepository.save(employee);
      });

      return {
        message: 'upsert employees success',
      };
    } catch (err) {
      return {
        message: err,
      };
    }
  }

  findOneById(user_id: number) {
    return this.userRepository.findOne({
      where: {
        user_id,
      },
    });
  }

  findOneByCompanyId(company_id: number) {
    return this.companyRepository.findOne({
      where: {
        company_id,
      },
    });
  }

  findOneByEmailNotCurrentUser(email: string, user_id: number) {
    return this.userRepository.findOne({
      where: {
        email,
        user_id: Not(user_id),
      },
    });
  }

  findOneByEmail(email: string) {
    return this.userRepository.findOne({
      where: {
        email,
      },
    });
  }

  findAllEmployees() {
    return this.userRepository.find();
  }

  findAllCompany() {
    return this.companyRepository.find();
  }
}
