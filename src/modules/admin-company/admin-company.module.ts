import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminCompanyService } from './admin-company.service';
import { AdminCompanyController } from './admin-company.controller';
import { User } from 'src/entities/users.entity';
import { Company } from 'src/entities/companies.entity';
import { ApiKeyStrategy } from 'src/guard/strategy/apiKey.strategy';

@Module({
  providers: [AdminCompanyService, ApiKeyStrategy],
  controllers: [AdminCompanyController],
  imports: [TypeOrmModule.forFeature([Company, User])],
})
export class AdminCompanyModule {}
