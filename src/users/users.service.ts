import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatedUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(filter: string) {
    let search = {};
    if (filter) {
      search = {
        OR: [
          {name: {contains: filter}}
        ]}
    }
    
    return await this.prisma.users.findMany({where: search, orderBy: [{createdAt: "desc"}]})
  }

  async findOne(id: string) {
    const result = await this.prisma.users.findUnique({where: {id}});
    return result;
  }

  async create(createUserDto: CreateUserDto) {
    await this.prisma.users.create({data: createUserDto});
    return {message: 'Added user successfull!'};
  }

  async update(id: string, updateUserDto: UpdatedUserDto) {
    await this.prisma.users.update({where: {id}, data: updateUserDto});
  }

  async delete(id: string) {
    await this.prisma.users.delete({where: {id}});
  }

  async login(user: UpdatedUserDto) {
    await this.prisma.users.findFirst({where: {accName: user.accName, password: user.password}});
    return {message: 'Logined sucessfuly!'};
  }
}
