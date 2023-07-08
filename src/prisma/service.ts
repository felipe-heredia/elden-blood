import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common'
import { Prisma, PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect()
    this.$use(this.softDeleteMiddleware)
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close()
    })
  }

  softDeleteMiddleware: Prisma.Middleware = async (params, next) => {
    if (params.action === 'delete') {
      return next({
        ...params,
        action: 'update',
        args: {
          ...params.args,
          data: {
            deletedAt: new Date(),
          },
        },
      })
    }

    if (params.action === 'findMany') {
      return next({
        ...params,
        action: params.action,
        args: { ...params.args, where: { deletedAt: null } },
      })
    }

    return next(params)
  }
}
