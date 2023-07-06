import { Test, TestingModule } from '@nestjs/testing'

import { PurchaseController } from './controller'
import { PurchaseService } from './service'

import { PrismaModule } from '@/prisma/module'

describe('UsersController', () => {
  let controller: PurchaseController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      controllers: [PurchaseController],
      providers: [PurchaseService],
    }).compile()

    controller = module.get<PurchaseController>(PurchaseController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
