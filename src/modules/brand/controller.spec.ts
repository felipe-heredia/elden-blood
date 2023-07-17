import { Test, TestingModule } from '@nestjs/testing'

import { BrandController } from './controller'
import { BrandService } from './service'

import { PrismaModule } from '@/prisma/module'

describe('BrandController', () => {
  let controller: BrandController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      controllers: [BrandController],
      providers: [BrandService],
    }).compile()

    controller = module.get<BrandController>(BrandController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
