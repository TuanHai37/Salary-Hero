import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { Company } from 'src/entities/companies.entity';
import { User } from 'src/entities/users.entity';
import { Role } from 'src/common/enums/role.enum';

@Injectable()
export class SalaryHeroService {
  constructor(
    @InjectRepository(Company) private companyRepository: Repository<Company>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getAllCompany() {
    try {
      const companies = await this.findAllCompany();
      if (!companies) {
        throw new BadRequestException(
          'There are currently no registered companies!',
        );
      }

      return companies.map((company) => {
        return {
          ...company,
          name: titleCase(company.name),
        };
      });
    } catch (err) {
      return {
        message: err,
      };
    }
  }

  async getCompanyById(company_id: number) {
    try {
      const company = await this.findOneById(company_id);
      if (!company) {
        throw new BadRequestException('No company found!');
      }

      return {
        ...company,
        name: titleCase(company.name),
      };
    } catch (err) {
      return {
        message: err,
      };
    }
  }

  async createCompany(name: string) {
    try {
      name = name.toLowerCase();
      const existedCompany = await this.findOneByName(name);

      if (existedCompany) {
        throw new BadRequestException('Company already had name!');
      }

      return await this.companyRepository.save({ name });
    } catch (err) {
      return {
        message: err,
      };
    }
  }

  async addClientAdmin(name: string, email: string, company_id: any) {
    try {
      email = email.toLowerCase();
      const existedCompany = await this.findOneById(company_id);

      if (!existedCompany) {
        throw new BadRequestException('No company found!');
      }

      const existedEmail = await this.findOneByEmail(email);

      if (existedEmail) {
        throw new BadRequestException('Email had already exists!');
      }

      return await this.userRepository.save({
        name,
        company_id,
        email,
        role: Role.AdminCompany,
      });
    } catch (err) {
      return {
        message: err,
      };
    }
  }

  async updateCompany(name: string, company_id: number) {
    try {
      name = name.toLowerCase();
      const existedCompany = await this.findOneById(company_id);

      if (!existedCompany) {
        throw new BadRequestException('No company found!');
      }

      const existedCompanyName = await this.findOneByNameAndId(
        name,
        company_id,
      );

      if (existedCompanyName) {
        throw new BadRequestException('Company already had name!');
      }

      await this.companyRepository.update({ company_id }, { name });

      return {
        ...existedCompany,
        name,
      };
    } catch (err) {
      return {
        message: err,
      };
    }
  }

  async deleteCompanyById(company_id: number) {
    try {
      const company = await this.findOneById(company_id);
      if (!company) {
        throw new BadRequestException('No company found!');
      }

      await this.companyRepository.delete({ company_id });
      return {
        message: 'delete company success',
      };
    } catch (err) {
      return {
        message: err,
      };
    }
  }

  findOneByName(name: string) {
    return this.companyRepository.findOne({
      where: {
        name,
      },
      select: ['company_id', 'name'],
    });
  }

  findOneByNameAndId(name: string, company_id: number) {
    return this.companyRepository.findOne({
      where: {
        name,
        company_id: Not(company_id),
      },
      select: ['company_id', 'name'],
    });
  }

  findOneById(company_id: number) {
    return this.companyRepository.findOne({
      where: {
        company_id,
      },
    });
  }

  findAllCompany() {
    return this.companyRepository.find();
  }

  findOneByEmail(email: string) {
    return this.userRepository.findOne({
      where: {
        email,
      },
    });
  }
}

function titleCase(string) {
  const sentence = string.toLowerCase().split('');

  for (let i = 0; i < sentence.length; i++) {
    sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
  }
  return sentence.join('');
}
