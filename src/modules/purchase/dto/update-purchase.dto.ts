import { IsOptional, IsString } from 'class-validator'

export class UpdatePurchaseDto {
  @IsString()
  @IsOptional()
  name?: string
}
