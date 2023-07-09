import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'

import { CreatePurchaseConditionDto } from './dto/create-purchase-condition.dto'
import { UpdatePurchaseConditionDto } from './dto/update-purchase-condition.dto'
import { PurchaseConditionService } from './service'

@Controller('purchase-condition')
export class PurchaseConditionController {
  constructor(private readonly purchaseConditionService: PurchaseConditionService) {}

  @Post()
  create(@Body() createPurchaseConditionDto: CreatePurchaseConditionDto) {
    return this.purchaseConditionService.create(createPurchaseConditionDto)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.purchaseConditionService.findOne(id)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePurchaseConditionDto: UpdatePurchaseConditionDto
  ) {
    return this.purchaseConditionService.update(id, updatePurchaseConditionDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.purchaseConditionService.remove(id)
  }
}
