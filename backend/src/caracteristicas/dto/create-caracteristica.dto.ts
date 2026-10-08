import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateCaracteristicaDto {
  @ApiProperty({ example: 'Color' })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  nombre: string;

  @ApiProperty({ example: 'Color principal del producto' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  descripcion: string;

  @ApiProperty({ example: 'texto' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  tipo: string;

  @ApiProperty({ example: 'Rojo' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  valor: string;

  @ApiProperty({ example: true, default: true })
  @IsBoolean()
  activo: boolean;
}
