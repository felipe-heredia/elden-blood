import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'

import { PrismaService } from '@/prisma/service'

@Injectable()
export class BrandService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createBrand: Prisma.BrandCreateInput) {
    return await this.prisma.brand.create({ data: createBrand })
  }

  async findAll() {
    return await this.prisma.brand.findMany()
  }

  async findOne(id: string) {
    return await this.prisma.brand.findUnique({ where: { id } })
  }

  async update(id: string, updateBrand: Prisma.BrandUpdateInput) {
    return await this.prisma.brand.update({ where: { id }, data: updateBrand })
  }

  async remove(id: string) {
    return await this.prisma.brand.delete({ where: { id } })
  }
}
