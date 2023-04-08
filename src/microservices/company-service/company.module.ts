import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';

@Module({
  imports: [],
  controllers: [],
  providers: [CompanyService],
  exports: [CompanyService],
})
export class CompanyModule {}
