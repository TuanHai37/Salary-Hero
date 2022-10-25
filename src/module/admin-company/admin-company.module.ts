import { Module } from '@nestjs/common';
import { AdminCompanyService } from './admin-company.service';
import { AdminCompanyController } from './admin-company.controller';

@Module({
  providers: [AdminCompanyService],
  controllers: [AdminCompanyController],
})
export class AdminCompanyModule {}
