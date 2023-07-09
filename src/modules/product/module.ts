import { Module } from '@nestjs/common'

import { ProductController } from './controller'
import { ProductService } from './service'

import { PrismaModule } from '@/prisma/module'

@Module({
  imports: [PrismaModule],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
