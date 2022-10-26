import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalaryHeroService } from './salary-hero.service';
import { SalaryHeroController } from './salary-hero.controller';
import { Company } from 'src/entities/companies.entity';
import { ApiKeyStrategy } from 'src/guard/strategy/apiKey.strategy';
import { User } from 'src/entities/users.entity';

@Module({
  providers: [SalaryHeroService, ApiKeyStrategy],
  controllers: [SalaryHeroController],
  imports: [TypeOrmModule.forFeature([Company, User])],
})
export class SalaryHeroModule {}
