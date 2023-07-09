import { IsNumber, IsUUID } from 'class-validator'

export class CreatePurchaseConditionDto {
  @IsNumber(
    { maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false },
    { message: 'Por favor, informe o preço' }
  )
  price: number

  @IsUUID('4', { message: 'Por favor, informe o produto' })
  productId: string

  @IsUUID('4', { message: 'Por favor, informe a compra' })
  purchaseId: string
}
