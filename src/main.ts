import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'

import { PrismaInterceptor } from './interceptors/prisma.interceptor'
import { AppModule } from './modules/app/module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transformOptions: { enableImplicitConversion: true },
      forbidUnknownValues: true,
      skipMissingProperties: false,
      transform: true,
    })
  )

  app.useGlobalInterceptors(new PrismaInterceptor())

  await app.listen(3000)
}
bootstrap()
