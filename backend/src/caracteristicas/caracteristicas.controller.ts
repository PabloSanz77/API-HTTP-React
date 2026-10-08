import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Caracteristica } from './caracteristica.entity';
import { CaracteristicasService } from './caracteristicas.service';
import { CreateCaracteristicaDto } from './dto/create-caracteristica.dto';
import { ReplaceCaracteristicaDto } from './dto/replace-caracteristica.dto';
import { UpdateCaracteristicaDto } from './dto/update-caracteristica.dto';

@ApiTags('caracteristicas')
@Controller('caracteristicas')
export class CaracteristicasController {
  constructor(private readonly service: CaracteristicasService) {}

  @Get()
  @ApiOkResponse({ description: 'Colección de características' })
  findAll(): Caracteristica[] {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Característica encontrada' })
  @ApiNotFoundResponse({ description: 'ID inexistente' })
  findOne(@Param('id', ParseIntPipe) id: number): Caracteristica {
    return this.service.findOne(id);
  }

  @Post()
  @ApiCreatedResponse({ description: 'Característica creada' })
  @ApiBadRequestResponse({ description: 'Datos inválidos' })
  @ApiConflictResponse({ description: 'Nombre duplicado' })
  create(@Body() dto: CreateCaracteristicaDto): Caracteristica {
    return this.service.create(dto);
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'Característica actualizada parcialmente' })
  @ApiBadRequestResponse({ description: 'Datos inválidos' })
  @ApiNotFoundResponse({ description: 'ID inexistente' })
  @ApiConflictResponse({ description: 'Nombre duplicado' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCaracteristicaDto,
  ): Caracteristica {
    return this.service.update(id, dto);
  }

  @Put(':id')
  @ApiOkResponse({ description: 'Característica reemplazada completamente' })
  @ApiBadRequestResponse({ description: 'Datos inválidos' })
  @ApiNotFoundResponse({ description: 'ID inexistente' })
  @ApiConflictResponse({ description: 'Nombre duplicado' })
  replace(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ReplaceCaracteristicaDto,
  ): Caracteristica {
    return this.service.replace(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({ description: 'Característica eliminada' })
  @ApiNotFoundResponse({ description: 'ID inexistente' })
  remove(@Param('id', ParseIntPipe) id: number): void {
    this.service.remove(id);
  }
}
