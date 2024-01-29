import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UserRole } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  private users: CreateUserDto[] = [];

  create(createUserDto: CreateUserDto): string {
    // Set default role to 'normal' if not provided
    const role = createUserDto.role || UserRole.Normal;
    // Check if user has the 'admin' role before allowing registration
    if (role !== UserRole.Admin) {
      throw new ForbiddenException('Only admins can register users');
    }
    this.users.push({ ...createUserDto, role });
    return `${createUserDto.firstName} successfully registered.`;
  }
  

  findAll() {
    console.log('Length of Array', this.users.length)
    return this.users;
  }

  findOne(regNumber: string): CreateUserDto {
    const user = this.users.find((user) => user.regNumber === regNumber);
    console.log(`Id passed ${regNumber}`);
    if (!user) {
      throw new NotFoundException(`User with registration number ${regNumber} not found`);
    }
    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const userIndex = this.users.findIndex((user) => user.regNumber === id);
    if (userIndex === -1) {
      throw new NotFoundException(`User with registration number ${id} not found`);
    }
    this.users[userIndex] = { ...this.users[userIndex], ...updateUserDto };
    return `User with registration number ${id} has been pdated sccessfully`
  }

  remove(id: string) {
    const userIndex = this.users.findIndex((user) => user.regNumber === id);
    if (userIndex === -1) {
      throw new NotFoundException(`User with registration number ${id} not found`);
    }
    this.users.splice(userIndex, 1);
    return `User with registration number ${id} has been successfully removed`;
  }
}
