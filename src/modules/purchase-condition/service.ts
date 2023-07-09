import { Injectable, NotFoundException } from '@nestjs/common'

import { CreatePurchaseConditionDto } from './dto/create-purchase-condition.dto'
import { UpdatePurchaseConditionDto } from './dto/update-purchase-condition.dto'

import { PrismaService } from '@/prisma/service'
import { ProductService } from '@/product/service'
import { PurchaseService } from '@/purchase/service'

@Injectable()
export class PurchaseConditionService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly productService: ProductService,
    private readonly purchaseService: PurchaseService
  ) {}

  async create({ price, productId, purchaseId }: CreatePurchaseConditionDto) {
    const product = await this.productService.findOne(productId)

    if (!product) throw new NotFoundException('Produto não encontrado!')

    const purchase = await this.purchaseService.findOne(purchaseId)
    if (!purchase) throw new NotFoundException('Compra não encontrada!')

    return await this.prisma.purchaseCondition.create({
      data: {
        price,
        productId,
        purchaseId,
      },
    })
  }

  async findOne(id: string) {
    return await this.prisma.purchaseCondition.findUnique({ where: { id } })
  }

  async update(id: string, { purchaseId, productId, price }: UpdatePurchaseConditionDto) {
    if (productId) {
      const product = await this.productService.findOne(productId)
      if (!product && productId) throw new NotFoundException('Produto não encontrado!')
    }

    if (purchaseId) {
      const purchase = await this.purchaseService.findOne(purchaseId)
      if (!purchase && purchaseId) throw new NotFoundException('Compra não encontrada!')
    }

    return await this.prisma.purchaseCondition.update({
      where: { id },
      data: {
        price,
        productId: productId || undefined,
        purchaseId: purchaseId || undefined,
      },
    })
  }

  async remove(id: string) {
    return await this.prisma.purchaseCondition.delete({ where: { id } })
  }
}
