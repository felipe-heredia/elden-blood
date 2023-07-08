import { Test, TestingModule } from '@nestjs/testing'

import { ProductService } from './service'

import { BrandModule } from '@/brand/module'
import { PrismaService } from '@/prisma/service'

const product = { name: 'Arroz', brandId: 'camil-brand-uuid-mocked' }
const deletedProduct = { ...product, deletedAt: new Date() }

const products = [
  { ...product },
  { name: 'Água Mineral', brandId: 'crystal-brand-uuid-mocked' },
  { name: 'Leite Integral', brandId: 'italac-brand-uuid-mock' },
]

const brand = { name: 'Camil' }

const db = {
  product: {
    findMany: jest.fn().mockReturnValue(products),
    findUnique: jest.fn().mockReturnValue(product),
    create: jest.fn().mockReturnValue(product),
    update: jest.fn().mockReturnValue({ ...product, name: 'Arroz Branco' }),
    delete: jest.fn().mockReturnValue(deletedProduct),
  },
  brand: {
    findUnique: jest.fn().mockReturnValue(brand),
  },
}

describe('ProductService', () => {
  let service: ProductService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [BrandModule],
      providers: [ProductService, { provide: PrismaService, useValue: db }],
    }).compile()

    service = module.get<ProductService>(ProductService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('create product', () => {
    it('should successfully insert a product', async () => {
      const localProduct = await service.create(product)
      expect(localProduct).toEqual(product)
    })
  })

  describe('find many', () => {
    it('should return an array of products', async () => {
      const manyProducts = await service.findAll()
      expect(manyProducts).toEqual(products)
    })
  })

  describe('find one product', () => {
    it('should find one products by id', async () => {
      const localProduct = await service.findOne('a mock uuid')
      expect(localProduct).toEqual(product)
    })
  })

  describe('update product', () => {
    it('should update product', async () => {
      const localProduct = await service.update('a mock uuid', {
        ...product,
        name: 'Arroz Branco',
      })
      expect(localProduct).toEqual({ ...product, name: 'Arroz Branco' })
    })
  })

  describe('remote product', () => {
    it('should soft delete a product', async () => {
      const localProduct = await service.remove('a mock uuid')
      expect(localProduct).toEqual(deletedProduct)
    })
  })
})
