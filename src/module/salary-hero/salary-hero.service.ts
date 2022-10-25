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
  }

  async getCompanyById(company_id: number) {
    const company = await this.findOneById(company_id);
    if (!company) {
      throw new BadRequestException('No company found!');
    }

    return {
      ...company,
      name: titleCase(company.name),
    };
  }

  async createCompany(name: string) {
    name = name.toLowerCase();
    const existedCompany = await this.findOneByName(name);

    if (existedCompany) {
      throw new BadRequestException('Company already had name!');
    }

    return await this.companyRepository.save({ name });
  }

  async addClientAdmin(name: string, salary: number, company_id: any) {
    const existedCompany = await this.findOneById(company_id);

    if (!existedCompany) {
      throw new BadRequestException('No company found!');
    }

    return await this.userRepository.save({
      name,
      salary,
      company_id,
      role: Role.AdminCompany,
    });
  }

  async updateCompany(name: string, company_id: number) {
    name = name.toLowerCase();
    const existedCompany = await this.findOneById(company_id);

    if (!existedCompany) {
      throw new BadRequestException('No company found!');
    }

    const existedCompanyName = await this.findOneByNameAndId(name, company_id);

    if (existedCompanyName) {
      throw new BadRequestException('Company already had name!');
    }

    return await this.companyRepository.save({ company_id, name });
  }

  async deleteCompanyById(company_id: number) {
    const company = await this.findOneById(company_id);
    if (!company) {
      throw new BadRequestException('No company found!');
    }

    await this.companyRepository.delete({ company_id });
    return {
      message: 'delete company success',
    };
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
}

function titleCase(string) {
  const sentence = string.toLowerCase().split('');

  for (let i = 0; i < sentence.length; i++) {
    sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
  }
  return sentence.join('');
}