import { Injectable, NotFoundException } from '@nestjs/common'

import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'

import { PrismaService } from '@/prisma/service'

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ name, brandId }: CreateProductDto) {
    const findBrand = await this.prisma.brand.findUnique({
      where: { id: brandId },
    })

    if (!findBrand || findBrand.deletedAt) {
      throw new NotFoundException('Fabricante não encontrado!')
    }

    const product = await this.prisma.product.create({
      data: {
        name,
        brandId,
      },
    })

    return product
  }

  async findAll() {
    return await this.prisma.product.findMany()
  }

  async findOne(id: string) {
    return await this.prisma.product.findUnique({
      where: { id },
    })
  }

  async update(id: string, { name, brandId }: UpdateProductDto) {
    const findBrand = await this.prisma.brand.findUnique({
      where: { id: brandId },
    })

    if (!findBrand || findBrand.deletedAt) {
      throw new NotFoundException('Fabricante não encontrado!')
    }

    return await this.prisma.product.update({
      where: { id },
      data: { name, brandId },
    })
  }

  async remove(id: string) {
    return await this.prisma.product.delete({ where: { id } })
  }
}
