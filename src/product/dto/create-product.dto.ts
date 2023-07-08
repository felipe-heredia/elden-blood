import { IsString, IsUUID } from 'class-validator'

export class CreateProductDto {
  @IsString({ message: 'Por favor, informe o nome do produto' })
  name: string

  @IsUUID('4', { message: 'Por favor, informe a fabricante do produto' })
  brandId: string
}
