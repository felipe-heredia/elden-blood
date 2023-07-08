import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'

import { PrismaService } from '@/prisma/service'

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  create(createUser: Prisma.UserCreateInput) {
    return this.prisma.user.create({ data: createUser })
  }

  findAll() {
    return this.prisma.user.findMany()
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({ where: { id } })
  }

  update(id: string, user: Prisma.UserUpdateInput) {
    return this.prisma.user.update({ where: { id }, data: user })
  }

  remove(id: string) {
    return this.prisma.user.delete({ where: { id } })
  }
}
