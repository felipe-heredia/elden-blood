import { Test, TestingModule } from '@nestjs/testing'

import { UsersService } from './service'

import { PrismaModule } from '@/prisma/module'
import { PrismaService } from '@/prisma/service'

const JohnDoe = { name: 'John Doe' }

const users = [{ ...JohnDoe }, { name: 'Geralt of Rivia' }, { name: 'Yennefer' }]

const db = {
  user: {
    findMany: jest.fn().mockReturnValue(users),
    findUnique: jest.fn().mockReturnValue(JohnDoe),
    create: jest.fn().mockReturnValue(JohnDoe),
  },
}

describe('UsersService', () => {
  let service: UsersService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: db,
        },
      ],
    }).compile()

    service = module.get<UsersService>(UsersService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('create user', () => {
    it('should successfully insert a user', async () => {
      const user = await service.create(JohnDoe)
      expect(user).toEqual(JohnDoe)
    })
  })

  describe('find many', () => {
    it('should return an array of users', async () => {
      const manyUsers = await service.findAll()
      expect(manyUsers).toEqual(manyUsers)
    })
  })

  describe('find one users', () => {
    it('should find one users by id', async () => {
      const user = await service.findOne('a mock uuid')
      expect(user).toEqual(JohnDoe)
    })
  })
})
