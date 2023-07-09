import { IsNumber, IsOptional, IsUUID } from 'class-validator'

export class UpdatePurchaseConditionDto {
  @IsOptional()
  @IsNumber(
    { maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false },
    { message: 'Por favor, informe o preço' }
  )
  price?: number

  @IsOptional()
  @IsUUID('4', { message: 'Por favor, informe o produto' })
  productId: string

  @IsOptional()
  @IsUUID('4', { message: 'Por favor, informe a compra' })
  purchaseId: string
}
