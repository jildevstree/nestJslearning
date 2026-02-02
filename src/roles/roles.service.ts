import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './roles.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
  constructor(@InjectRepository(Role) private roleRepo: Repository<Role>) {}

  async create(name: string) {
    const role = this.roleRepo.create({ name });
    return this.roleRepo.save;
    role;
  }

  findAll() {
    return this.roleRepo.find();
  }

  findByName(name: string) {
    return this.roleRepo.findOne({ where: { name } });
  }

  
}
