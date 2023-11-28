import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCityDto } from './dto/create-city.dto';
import { EditCityDto } from './dto/edit-city.dto';

@Injectable()
export class CityService {
  constructor(private prisma: PrismaService) {}
  getCities() {
    return this.prisma.city.findMany();
  }

  getCityById(cityId: number) {
    return this.prisma.city.findFirst({
      where: {
        id: cityId,
      },
    });
  }

  async createCity(dto: CreateCityDto) {
    const city = await this.prisma.city.create({
      data: { ...dto },
    });

    return city;
  }

  async editCityById(cityId: number, dto: EditCityDto) {
    const city = await this.prisma.city.findUnique({
      where: {
        id: cityId,
      },
    });
    if (!city) {
      throw new ForbiddenException('Access denied');
    }
    return this.prisma.city.update({
      where: {
        id: cityId,
      },
      data: { ...dto },
    });
  }

  async deleteCityById(cityId: number) {
    const city = await this.prisma.city.findUnique({
      where: {
        id: cityId,
      },
    });
    if (!city) {
      throw new ForbiddenException('Access denied');
    }
    await this.prisma.city.delete({
      where: {
        id: cityId,
      },
    });
  }
}
