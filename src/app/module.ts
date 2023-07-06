import { Module } from '@nestjs/common'

import { AppController } from './controller'
import { AppService } from './service'

import { StoreModule } from '@/store/module'
import { UsersModule } from '@/users/module'

@Module({
  imports: [UsersModule, StoreModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
