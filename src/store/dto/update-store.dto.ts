import { IsOptional, IsString } from 'class-validator'

export class UpdateStoreDto {
  @IsString({ message: 'Por favor informe um nome' })
  @IsOptional()
  name: string

  @IsString({ message: 'Por favor informe uma cidade' })
  @IsOptional()
  city: string

  @IsString({ message: 'Por favor informe um estado' })
  @IsOptional()
  state: string

  @IsString({ message: 'Por favor informe um país' })
  @IsOptional()
  country: string
}
