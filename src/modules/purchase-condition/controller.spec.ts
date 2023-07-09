import { Test, TestingModule } from '@nestjs/testing'

import { PurchaseConditionController } from './controller'
import { PurchaseConditionService } from './service'

describe('PurchaseConditionController', () => {
  let controller: PurchaseConditionController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PurchaseConditionController],
      providers: [PurchaseConditionService],
    }).compile()

    controller = module.get<PurchaseConditionController>(PurchaseConditionController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
