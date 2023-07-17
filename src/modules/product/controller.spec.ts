import { Test, TestingModule } from '@nestjs/testing'

import { ProductController } from './controller'
import { ProductService } from './service'

import { PrismaModule } from '@/prisma/module'

describe('ProductController', () => {
  let controller: ProductController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      controllers: [ProductController],
      providers: [ProductService],
    }).compile()

    controller = module.get<ProductController>(ProductController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
