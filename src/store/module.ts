import { Module } from '@nestjs/common'

import { StoreController } from './controller'
import { StoreService } from './service'

import { PrismaModule } from '@/prisma/module'

@Module({
  imports: [PrismaModule],
  controllers: [StoreController],
  providers: [StoreService],
})
export class StoreModule {}
