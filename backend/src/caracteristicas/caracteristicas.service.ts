import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Caracteristica } from './caracteristica.entity';
import { CreateCaracteristicaDto } from './dto/create-caracteristica.dto';
import { ReplaceCaracteristicaDto } from './dto/replace-caracteristica.dto';
import { UpdateCaracteristicaDto } from './dto/update-caracteristica.dto';

@Injectable()
export class CaracteristicasService {
  private caracteristicas: Caracteristica[] = [
    {
      id: 1,
      nombre: 'Color',
      descripcion: 'Color principal del producto',
      tipo: 'texto',
      valor: 'Rojo',
      activo: true,
    },
    {
      id: 2,
      nombre: 'Peso',
      descripcion: 'Peso aproximado del producto',
      tipo: 'numero',
      valor: '2 kg',
      activo: true,
    },
    {
      id: 3,
      nombre: 'Material',
      descripcion: 'Material de fabricación',
      tipo: 'texto',
      valor: 'Acero',
      activo: true,
    },
  ];

  private nextId = 4;

  findAll(): Caracteristica[] {
    return this.caracteristicas;
  }

  findOne(id: number): Caracteristica {
    const item = this.caracteristicas.find((c) => c.id === id);

    if (!item) {
      throw new NotFoundException(`No existe la característica con id ${id}`);
    }

    return item;
  }

  create(dto: CreateCaracteristicaDto): Caracteristica {
    const duplicate = this.caracteristicas.some(
      (c) => c.nombre.toLowerCase() === dto.nombre.toLowerCase(),
    );

    if (duplicate) {
      throw new ConflictException(
        `Ya existe una característica con el nombre "${dto.nombre}"`,
      );
    }

    const item: Caracteristica = {
      id: this.nextId++,
      ...dto,
    };

    this.caracteristicas.push(item);
    return item;
  }

  update(id: number, dto: UpdateCaracteristicaDto): Caracteristica {
    const item = this.findOne(id);

if (dto.nombre) {
  const nombre = dto.nombre.toLowerCase();

  const duplicate = this.caracteristicas.some(
    (c) => c.id !== id && c.nombre.toLowerCase() === nombre,
  );

  if (duplicate) {
    throw new ConflictException(
      `Ya existe otra característica con el nombre "${dto.nombre}"`,
    );
  }
} {
      throw new ConflictException(
        `Ya existe otra característica con el nombre "${dto.nombre}"`,
      );
    }

    Object.assign(item, dto);
    return item;
  }

  replace(id: number, dto: ReplaceCaracteristicaDto): Caracteristica {
    const item = this.findOne(id);

    const duplicate = this.caracteristicas.some(
      (c) =>
        c.id !== id && c.nombre.toLowerCase() === dto.nombre.toLowerCase(),
    );

    if (duplicate) {
      throw new ConflictException(
        `Ya existe otra característica con el nombre "${dto.nombre}"`,
      );
    }

    Object.assign(item, dto);
    return item;
  }

  remove(id: number): void {
    const index = this.caracteristicas.findIndex((c) => c.id === id);

    if (index === -1) {
      throw new NotFoundException(`No existe la característica con id ${id}`);
    }

    this.caracteristicas.splice(index, 1);
  }
}
