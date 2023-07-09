import { IsOptional, IsUUID } from 'class-validator'

export class UpdatePurchaseDto {
  @IsOptional()
  @IsUUID('4', { message: 'Por favor informe um usuário válido' })
  userId?: string

  @IsOptional()
  @IsUUID('4', { message: 'Por favor informe uma loja válida' })
  storeId?: string
}
