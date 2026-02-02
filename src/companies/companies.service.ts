import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './company.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company) private companyRepo: Repository<Company>,
  ) {}

  create(name: string) {
    this.companyRepo.save({ name });
  }

  findAll() {
    this.companyRepo.find();
  }
}
