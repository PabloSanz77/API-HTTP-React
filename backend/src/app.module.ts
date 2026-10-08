import { Module } from '@nestjs/common';
import { CaracteristicasModule } from './caracteristicas/caracteristicas.module';

@Module({
  imports: [CaracteristicasModule],
})
export class AppModule {}
