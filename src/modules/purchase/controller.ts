import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'

import { CreatePurchaseDto } from './dto/create-purchase.dto'
import { UpdatePurchaseDto } from './dto/update-purchase.dto'
import { PurchaseService } from './service'

@Controller('users')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Post()
  create(@Body() createPurchase: CreatePurchaseDto) {
    // return this.purchaseService.create(createPurchase)
  }

  @Get()
  findAll() {
    return this.purchaseService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.purchaseService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePurchase: UpdatePurchaseDto) {
    // return this.purchaseService.update(id, updatePurchase)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.purchaseService.remove(id)
  }
}
