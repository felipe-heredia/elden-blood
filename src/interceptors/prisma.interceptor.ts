import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
} from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { Observable } from 'rxjs'
import { catchError } from 'rxjs/operators'

@Injectable()
export class PrismaInterceptor implements NestInterceptor {
  intercept(_: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError(error => {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          console.log(error)

          const errorMessage = this.extractErrorMessage(error.message)
          const errors = this.extractErrors(errorMessage)

          if (errors) {
            throw new BadRequestException({
              errors,
              message: errorMessage,
            })
          }
        } else if (error instanceof Prisma.PrismaClientValidationError) {
          throw new BadRequestException(error.message)
        }

        throw error
      })
    )
  }

  private extractErrorMessage(fullErrorMessage: string): string {
    const splitStr = '\nUnique constraint failed on the '
    return fullErrorMessage.split(splitStr)[1] || fullErrorMessage
  }

  private extractErrors(errorMessage: string): Record<string, string> | null {
    const regex = /\((.*?)\)/g
    const matches = errorMessage.match(regex)

    if (matches) {
      const fields = matches.map(match => match.replace(/[\(\)]/g, ''))
      const errors = fields.reduce((acc, field) => {
        acc[field] = `Unique constraint failed on field: ${field}`
        return acc
      }, {})

      return errors
    }

    return null
  }
}
