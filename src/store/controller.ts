import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'

import { CreateStoreDto } from './dto/create-store.dto'
import { UpdateStoreDto } from './dto/update-store.dto'
import { StoreService } from './service'

@Controller('users')
export class StoreController {
  constructor(private readonly usersService: StoreService) {}

  @Post()
  create(@Body() createStore: CreateStoreDto) {
    return this.usersService.create(createStore)
  }

  @Get()
  findAll() {
    return this.usersService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStore: UpdateStoreDto) {
    return this.usersService.update(id, updateStore)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id)
  }
}
