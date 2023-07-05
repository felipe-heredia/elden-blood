import { Test, TestingModule } from '@nestjs/testing'
import { User } from '@prisma/client'

import { UsersController } from './controller'
import { UsersService } from './service'

import { PrismaModule } from '@/prisma/module'
import { PrismaService } from '@/prisma/service'

const db = {}

describe('UsersController', () => {
  let controller: UsersController
  let prisma: PrismaService
  let user: User

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: db,
        },
      ],
    }).compile()

    controller = module.get<UsersController>(UsersController)
    prisma = module.get<PrismaService>(PrismaService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('root', () => {
    it('should create a user', () => {
      expect(controller.create({ name: 'John Doe ' })).toBe(undefined)
    })
  })
})
