import { Module } from '@nestjs/common'

import { PurchaseController } from './controller'
import { PurchaseService } from './service'

import { PrismaModule } from '@/prisma/module'

@Module({
  imports: [PrismaModule],
  controllers: [PurchaseController],
  providers: [PurchaseService],
})
export class UsersModule {}
