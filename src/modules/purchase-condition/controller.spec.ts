import { Test, TestingModule } from '@nestjs/testing'

import { PurchaseConditionController } from './controller'
import { PurchaseConditionService } from './service'

import { PrismaModule } from '@/prisma/module'
import { ProductModule } from '@/product/module'
import { PurchaseModule } from '@/purchase/module'

describe('PurchaseConditionController', () => {
  let controller: PurchaseConditionController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule, ProductModule, PurchaseModule],
      controllers: [PurchaseConditionController],
      providers: [PurchaseConditionService],
    }).compile()

    controller = module.get<PurchaseConditionController>(PurchaseConditionController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
