import { PartialType } from '@nestjs/swagger';
import { CreateCaracteristicaDto } from './create-caracteristica.dto';

export class UpdateCaracteristicaDto extends PartialType(
  CreateCaracteristicaDto,
) {}
