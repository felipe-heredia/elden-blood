import { Module } from '@nestjs/common'

import { PurchaseController } from './controller'
import { PurchaseService } from './service'

import { PrismaModule } from '@/prisma/module'
import { StoreModule } from '@/store/module'
import { UsersModule } from '@/users/module'

@Module({
  imports: [PrismaModule, UsersModule, StoreModule],
  controllers: [PurchaseController],
  providers: [PurchaseService],
  exports: [PurchaseService],
})
export class PurchaseModule {}
