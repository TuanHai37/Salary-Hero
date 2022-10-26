import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { ApiKeyStrategy } from 'src/guard/strategy/apiKey.strategy';
import { Requests } from 'src/entities/requests.entity';
import { User } from 'src/entities/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [EmployeeService, ApiKeyStrategy],
  controllers: [EmployeeController],
  imports: [TypeOrmModule.forFeature([Requests, User])],
})
export class EmployeeModule {}
