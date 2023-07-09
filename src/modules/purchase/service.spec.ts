import { Test, TestingModule } from '@nestjs/testing'

import { PurchaseService } from './service'

import { PrismaModule } from '@/prisma/module'
import { PrismaService } from '@/prisma/service'
import { UsersService } from '@/users/service'
import { StoreService } from '@/store/service'

const purchaseData = { userId: 'user-mocked-uuid', storeId: 'store-mocked-uuid' }

const deletedPurchaseData = { ...purchaseData, deletedAt: new Date() }

const db = {
  purchase: {
    findUnique: jest.fn().mockReturnValue(purchaseData),
    create: jest.fn().mockReturnValue(purchaseData),
    update: jest.fn().mockReturnValue({ ...purchaseData, storeId: 'store-uuid-mocked' }),
    delete: jest.fn().mockReturnValue(deletedPurchaseData),
  },
}

const user = {
  findOne: jest.fn().mockReturnValue({ name: 'John Doe' }),
}
const store = {
  findOne: jest.fn().mockReturnValue({
    name: 'Andorinha',
    city: 'São Paulo',
    state: 'SP',
    country: 'Brasil',
  }),
}

describe('PurchaseService', () => {
  let service: PurchaseService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [
        PurchaseService,
        { provide: PrismaService, useValue: db },
        { provide: UsersService, useValue: user },
        { provide: StoreService, useValue: store },
      ],
    }).compile()

    service = module.get<PurchaseService>(PurchaseService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('create purchase', () => {
    it('should successfully insert a purchase', async () => {
      const purchase = await service.create(purchaseData)
      expect(purchase).toEqual(purchaseData)
    })
  })

  describe('find one purchase', () => {
    it('should find one purchases by id', async () => {
      const purchase = await service.findOne('a mock uuid')
      expect(purchase).toEqual(purchaseData)
    })
  })

  describe('update purchase', () => {
    it('should update purchase', async () => {
      const purchase = await service.update('a mock uuid', {
        ...purchaseData,
        storeId: 'store-uuid-mocked',
      })
      expect(purchase).toEqual({ ...purchaseData, storeId: 'store-uuid-mocked' })
    })
  })

  describe('remote purchase', () => {
    it('should soft delete a purchase', async () => {
      const purchase = await service.remove('a mock uuid')
      expect(purchase).toEqual(deletedPurchaseData)
    })
  })
})
