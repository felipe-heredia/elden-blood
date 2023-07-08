import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'

import { PrismaService } from '@/prisma/service'

@Injectable()
export class PurchaseService {
  constructor(private prisma: PrismaService) {}

  create(createPurchase: Prisma.PurchaseCreateInput) {
    return this.prisma.purchase.create({ data: createPurchase })
  }

  findAll() {
    return this.prisma.purchase.findMany()
  }

  findOne(id: string) {
    return this.prisma.purchase.findUnique({ where: { id } })
  }

  update(id: string, purchase: Prisma.PurchaseUpdateInput) {
    return this.prisma.purchase.update({ where: { id }, data: purchase })
  }

  remove(id: string) {
    return this.prisma.purchase.delete({ where: { id } })
  }
}
