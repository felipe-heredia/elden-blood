import { Injectable, NotFoundException } from '@nestjs/common'

import { CreatePurchaseDto } from './dto/create-purchase.dto'
import { UpdatePurchaseDto } from './dto/update-purchase.dto'

import { PrismaService } from '@/prisma/service'
import { StoreService } from '@/store/service'
import { UsersService } from '@/users/service'

@Injectable()
export class PurchaseService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UsersService,
    private readonly storeService: StoreService
  ) {}

  async create({ userId, storeId }: CreatePurchaseDto) {
    const user = await this.userService.findOne(userId)

    if (!user) throw new NotFoundException('Usuário não encontrado!')

    const store = await this.storeService.findOne(storeId)

    if (!store) throw new NotFoundException('Loja não encontrada!')

    return await this.prisma.purchase.create({
      data: { userId, storeId },
    })
  }

  findOne(id: string) {
    return this.prisma.purchase.findUnique({
      where: { id },
      include: { purchaseConditions: true },
    })
  }

  async update(id: string, { userId, storeId }: UpdatePurchaseDto) {
    if (userId) {
      const user = await this.userService.findOne(userId)
      if (!user) throw new NotFoundException('Usuário não encontrado!')
    }

    if (storeId) {
      const store = await this.storeService.findOne(storeId)
      if (!store) throw new NotFoundException('Loja não encontrada!')
    }

    return await this.prisma.purchase.update({
      where: { id },
      data: {
        storeId: storeId || undefined,
        userId: userId || undefined,
      },
    })
  }

  remove(id: string) {
    return this.prisma.purchase.delete({ where: { id } })
  }
}
