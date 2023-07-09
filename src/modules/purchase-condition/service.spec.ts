import { Test, TestingModule } from '@nestjs/testing'

import { PurchaseConditionService } from './service'

import { PrismaService } from '@/prisma/service'
import { ProductService } from '@/product/service'
import { PurchaseModule } from '@/purchase/module'
import { PurchaseService } from '@/purchase/service'

const purchaseCondition = {
  price: 100.2,
  productId: 'product-mocked-uuid',
  purchaseId: 'purchase-mocked-uuid',
}

const deletedPurchaseCondition = { ...purchaseCondition, deletedAt: new Date() }

const productData = {
  name: 'Arroz',
  brandId: 'brand-mocker-uuid',
}

const purchaseData = {
  userId: 'user-mocked-uuid',
  storeId: 'store-mocked-uuid',
}

const db = {
  purchaseCondition: {
    create: jest.fn().mockReturnValue(purchaseCondition),
    findUnique: jest.fn().mockReturnValue(purchaseCondition),
    update: jest.fn().mockReturnValue({ ...purchaseCondition, price: 109 }),
    delete: jest.fn().mockReturnValue(deletedPurchaseCondition),
  },
}

describe('PurchaseConditionService', () => {
  let service: PurchaseConditionService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PurchaseModule],
      providers: [
        PurchaseConditionService,
        { provide: PrismaService, useValue: db },
        {
          provide: ProductService,
          useValue: { findOne: jest.fn().mockResolvedValue(productData) },
        },
        {
          provide: PurchaseService,
          useValue: { findOne: jest.fn().mockReturnValue(purchaseData) },
        },
      ],
    }).compile()

    service = module.get<PurchaseConditionService>(PurchaseConditionService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('create purchaseCondition', () => {
    it('should successfully insert a purchaseCondition', async () => {
      const localPurchaseCondition = await service.create(purchaseCondition)
      expect(localPurchaseCondition).toEqual(purchaseCondition)
    })
  })

  describe('find one purchaseCondition', () => {
    it('should find one purchaseConditions by id', async () => {
      const localPurchaseCondition = await service.findOne('a mock uuid')
      expect(localPurchaseCondition).toEqual(purchaseCondition)
    })
  })

  describe('update purchaseCondition', () => {
    it('should update purchaseCondition', async () => {
      const localPurchaseCondition = await service.update('a mock uuid', {
        ...purchaseCondition,
        price: 109,
      })
      expect(localPurchaseCondition).toEqual({ ...purchaseCondition, price: 109 })
    })
  })

  describe('remove purchaseCondition', () => {
    it('should soft delete a purchaseCondition', async () => {
      const localPurchaseCondition = await service.remove('a mock uuid')
      expect(localPurchaseCondition).toEqual(deletedPurchaseCondition)
    })
  })
})
