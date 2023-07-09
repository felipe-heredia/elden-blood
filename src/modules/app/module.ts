import { Module } from '@nestjs/common'

import { AppController } from './controller'
import { AppService } from './service'

import { BrandModule } from '@/brand/module'
import { ProductModule } from '@/product/module'
import { PurchaseModule } from '@/purchase/module'
import { PurchaseConditionModule } from '@/purchase-condition/module'
import { StoreModule } from '@/store/module'
import { UsersModule } from '@/users/module'

@Module({
  imports: [
    UsersModule,
    StoreModule,
    BrandModule,
    ProductModule,
    PurchaseModule,
    PurchaseConditionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
