import {
  Controller,
  Post,
  Get,
  UseGuards,
  Patch,
  Delete,
  Param,
  ParseIntPipe,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { JwtGuard, RoleGuard } from '../auth/guard';
import { CityService } from './city.service';
import { CreateCityDto } from './dto/create-city.dto';
import { EditCityDto } from './dto/edit-city.dto';
import { Roles } from 'src/auth/roles/roles.decorator';
import { Role } from 'src/auth/enum/role.enum';

@UseGuards(JwtGuard, RoleGuard)
@Controller('cities')
export class CityController {
  constructor(private cityService: CityService) {}

  @Roles(Role.Admin)
  @Post()
  createCity(@Body() dto: CreateCityDto) {
    return this.cityService.createCity(dto);
  }

  @Get()
  getCities() {
    return this.cityService.getCities();
  }

  @Get(':id')
  getCityById(@Param('id', ParseIntPipe) cityId: number) {
    return this.cityService.getCityById(cityId);
  }

  @Roles(Role.Admin)
  @Patch(':id')
  editCityById(
    @Param('id', ParseIntPipe) cityId: number,
    @Body() dto: EditCityDto,
  ) {
    return this.cityService.editCityById(cityId, dto);
  }

  @Roles(Role.Admin)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteCityById(@Param('id', ParseIntPipe) cityId: number) {
    return this.cityService.deleteCityById(cityId);
  }
}
