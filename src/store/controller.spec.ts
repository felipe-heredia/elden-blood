import { Test, TestingModule } from '@nestjs/testing'

import { StoreController } from './controller'

import { PrismaModule } from '@/prisma/module'

describe('StoreController', () => {
  let controller: StoreController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      controllers: [StoreController],
    }).compile()

    controller = module.get<StoreController>(StoreController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
