import { Module } from '@nestjs/common'

import { AppController } from './controller'
import { AppService } from './service'

import { BrandModule } from '@/brand/module'
import { ProductModule } from '@/product/module'
import { StoreModule } from '@/store/module'
import { UsersModule } from '@/users/module'

@Module({
  imports: [UsersModule, StoreModule, BrandModule, ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
