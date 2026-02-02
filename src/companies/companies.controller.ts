import { Body, Controller, Get, Post } from '@nestjs/common';
import { CompaniesService } from './companies.service';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly service: CompaniesService) {}

  @Post()
  create(@Body('name') name: string) {
    return this.service.create(name);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
