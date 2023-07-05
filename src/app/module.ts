import { Module } from '@nestjs/common'

import { AppController } from './controller'
import { AppService } from './service'

import { UsersModule } from '@/users/module'

@Module({
  imports: [UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
