import { IsOptional, IsString } from 'class-validator'

export class UpdateBrandDto {
  @IsOptional()
  @IsString({ message: 'Por favor, informe o nome da marca' })
  name?: string
}
