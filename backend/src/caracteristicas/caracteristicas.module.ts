import { Module } from '@nestjs/common';
import { CaracteristicasController } from './caracteristicas.controller';
import { CaracteristicasService } from './caracteristicas.service';

@Module({
  controllers: [CaracteristicasController],
  providers: [CaracteristicasService],
})
export class CaracteristicasModule {}
