import { IsString } from 'class-validator'

export class CreateBrandDto {
  @IsString({ message: 'Por favor, informe o nome da marca' })
  name: string
}
