import { Module } from '@nestjs/common'

import { UsersController } from './controller'
import { UsersService } from './service'

import { PrismaModule } from '@/prisma/module'

@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
