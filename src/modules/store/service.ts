import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'

import { PrismaService } from '@/prisma/service'

@Injectable()
export class StoreService {
  constructor(private prisma: PrismaService) {}

  create(createStore: Prisma.StoreCreateInput) {
    return this.prisma.store.create({ data: createStore })
  }

  findAll() {
    return this.prisma.store.findMany()
  }

  findOne(id: string) {
    return this.prisma.store.findUnique({ where: { id } })
  }

  update(id: string, store: Prisma.StoreUpdateInput) {
    return this.prisma.store.update({ where: { id }, data: store })
  }

  remove(id: string) {
    return this.prisma.store.delete({ where: { id } })
  }
}
