import { Test, TestingModule } from '@nestjs/testing'

import { PurchaseController } from './controller'
import { PurchaseService } from './service'

import { PrismaModule } from '@/prisma/module'
import { StoreModule } from '@/store/module'
import { UsersModule } from '@/users/module'

describe('UsersController', () => {
  let controller: PurchaseController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule, UsersModule, StoreModule],
      controllers: [PurchaseController],
      providers: [PurchaseService],
    }).compile()

    controller = module.get<PurchaseController>(PurchaseController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
