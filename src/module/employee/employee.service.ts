import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/users.entity';
import { Requests } from 'src/entities/requests.entity';
@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Requests)
    private requestsRepository: Repository<Requests>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async transactions(amount: number, user_id: number) {
    const employee = await this.findOneById(user_id);
    if (!employee) {
      throw new BadRequestException('No employee found!');
    }

    const salary = Number(employee?.salary);
    const halfSalaryOfEmployee = salary / 2;
    if (amount > halfSalaryOfEmployee) {
      throw new BadRequestException(
        'Request amount is going to be over 50% of your salary',
      );
    }
    return this.requestsRepository.save({ user_id, amount });
  }

  findOneById(user_id: number) {
    return this.userRepository.findOne({
      where: {
        user_id,
      },
    });
  }
}
