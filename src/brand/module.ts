import { Module } from '@nestjs/common'

import { BrandController } from './controller'
import { BrandService } from './service'

import { PrismaModule } from '@/prisma/module'

@Module({
  imports: [PrismaModule],
  controllers: [BrandController],
  providers: [BrandService],
})
export class BrandModule {}
