import { IsString } from 'class-validator'

export class CreateStoreDto {
  @IsString({ message: 'Por favor informe um nome' })
  name: string

  @IsString({ message: 'Por favor informe uma cidade' })
  city: string

  @IsString({ message: 'Por favor informe um estado' })
  state: string

  @IsString({ message: 'Por favor informe um país' })
  country: string
}
