import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) { }
  async create(registerUserDto: RegisterUserDto): Promise<User> {

    const existingUSer = await this.findByName(registerUserDto.username!);

    if(existingUSer) {
      throw new ConflictException();
    }

    const user = new User();
    user.username = registerUserDto.username!;
    user.password = registerUserDto.password!; // TODO: HASH
    return await this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async checkIfUserExists(username: string) {
    return await this.userRepository.existsBy({ username: username });
  }

  async findOne(id: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { user_id: id } });
  }

  async findByName(username: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { username: username } });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { user_id: id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.userRepository.update({ user_id: id }, updateUserDto);
    return user;
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
