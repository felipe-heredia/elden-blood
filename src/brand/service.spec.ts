import { Test, TestingModule } from '@nestjs/testing'

import { BrandService } from './service'

import { PrismaModule } from '@/prisma/module'
import { PrismaService } from '@/prisma/service'

const camil = { name: 'Camil' }
const deletedCamil = { name: 'Camil', deletedAt: new Date() }

const brands = [{ ...camil }, { name: 'Crystal' }, { name: 'Italac' }]

const db = {
  brand: {
    findMany: jest.fn().mockReturnValue(brands),
    findUnique: jest.fn().mockReturnValue(camil),
    create: jest.fn().mockReturnValue(camil),
    update: jest.fn().mockReturnValue({ name: 'Camil Brasil' }),
    delete: jest.fn().mockReturnValue(deletedCamil),
  },
}

describe('BrandService', () => {
  let service: BrandService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [BrandService, { provide: PrismaService, useValue: db }],
    }).compile()

    service = module.get<BrandService>(BrandService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('create brand', () => {
    it('should successfully insert a brand', async () => {
      const brand = await service.create(camil)
      expect(brand).toEqual(camil)
    })
  })

  describe('find many', () => {
    it('should return an array of brands', async () => {
      const manyBrands = await service.findAll()
      expect(manyBrands).toEqual(brands)
    })
  })

  describe('find one brand', () => {
    it('should find one brands by id', async () => {
      const brand = await service.findOne('a mock uuid')
      expect(brand).toEqual(camil)
    })
  })

  describe('update brand', () => {
    it('should update brand', async () => {
      const brand = await service.update('a mock uuid', { name: 'Camil Brasil' })
      expect(brand).toEqual({ name: 'Camil Brasil' })
    })
  })

  describe('remote brand', () => {
    it('should soft delete a brand', async () => {
      const brand = await service.remove('a mock uuid')
      expect(brand).toEqual(deletedCamil)
    })
  })
})
