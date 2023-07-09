import { Module } from '@nestjs/common'

import { PurchaseConditionController } from './controller'
import { PurchaseConditionService } from './service'

import { PrismaModule } from '@/prisma/module'
import { ProductModule } from '@/product/module'
import { PurchaseModule } from '@/purchase/module'

@Module({
  imports: [PrismaModule, ProductModule, PurchaseModule],
  controllers: [PurchaseConditionController],
  providers: [PurchaseConditionService],
})
export class PurchaseConditionModule {}
