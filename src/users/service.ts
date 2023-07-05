import { Injectable } from '@nestjs/common'

import { UpdateUserDto } from './dto/update-user.dto'

import { PrismaService } from '@/prisma/service'

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  create(createUser: { name: string }) {
    return this.prisma.user.create({ data: createUser })
  }

  findAll() {
    return this.prisma.user.findMany()
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({ where: { id } })
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`
  }

  remove(id: number) {
    return `This action removes a #${id} user`
  }
}
