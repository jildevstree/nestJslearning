import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create.user.dto';
import { Role } from 'src/roles/roles.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(User) private readonly roleRepository: Repository<Role>,
  ) {}

  deleteUser(id: number) {
    return { success: true, deletedId: id };
  }

  create(data: CreateUserDto & { companyId: number }) {
    const user = this.userRepository.create({
      ...data,
      company: { id: data.companyId },
    });
    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find({ relations: ['company'] });
  }

  findOne(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  async assignRole(userId: number, roleId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['roles'],
    });

    const role = await this.roleRepository.findOne({ where: { id: roleId } });

    if (!user || !role) throw new Error('User or role not found');

    user.roles.push(role);
    return this.userRepository.save(user);
  }
}
