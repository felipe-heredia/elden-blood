import { IsUUID } from 'class-validator'

export class CreatePurchaseDto {
  @IsUUID('4', { message: 'Por favor informe um usuário válido' })
  userId: string

  @IsUUID('4', { message: 'Por favor informe uma loja válida' })
  storeId: string
}
