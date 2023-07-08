import { Test, TestingModule } from '@nestjs/testing'

import { StoreService } from './service'

import { PrismaModule } from '@/prisma/module'
import { PrismaService } from '@/prisma/service'

const andorinha = { name: 'Andorinha', city: 'São Paulo', state: 'SP', country: 'Brasil' }
const angeloni = {
  name: 'Angeloni',
  city: 'Florianópolis',
  state: 'SC',
  country: 'Brasil',
}
const fort = {
  name: 'Fort Atacadista',
  city: 'Florianópolis',
  state: 'SP',
  country: 'Brasil',
}
const deletedAndorinha = { ...andorinha, deletedAt: new Date() }

const stores = [{ ...andorinha }, { ...angeloni }, { ...fort }]

const db = {
  store: {
    findMany: jest.fn().mockReturnValue(stores),
    findUnique: jest.fn().mockReturnValue(andorinha),
    create: jest.fn().mockReturnValue(andorinha),
    update: jest.fn().mockReturnValue({ ...andorinha, name: 'Andorinha Hiper Center' }),
    delete: jest.fn().mockReturnValue(deletedAndorinha),
  },
}

describe('StoreService', () => {
  let service: StoreService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [StoreService, { provide: PrismaService, useValue: db }],
    }).compile()

    service = module.get<StoreService>(StoreService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('create store', () => {
    it('should successfully insert a store', async () => {
      const store = await service.create(andorinha)
      expect(store).toEqual(andorinha)
    })
  })

  describe('find many', () => {
    it('should return an array of stores', async () => {
      const manyStores = await service.findAll()
      expect(manyStores).toEqual(stores)
    })
  })

  describe('find one store', () => {
    it('should find one stores by id', async () => {
      const store = await service.findOne('a mock uuid')
      expect(store).toEqual(andorinha)
    })
  })

  describe('update store', () => {
    it('should update store', async () => {
      const updatedAndorinha = { ...andorinha, name: 'Andorinha Hiper Center' }
      const store = await service.update('a mock uuid', updatedAndorinha)
      expect(store).toEqual(updatedAndorinha)
    })
  })

  describe('remote store', () => {
    it('should soft delete a store', async () => {
      const store = await service.remove('a mock uuid')
      expect(store).toEqual(deletedAndorinha)
    })
  })
})
