# API HTTP validada con NestJS + React

Proyecto para la actividad **[S10] API HTTP validada con cliente React**.

## Tecnologías
- Backend: NestJS + TypeScript
- Validación: class-validator + class-transformer
- Documentación: Swagger / OpenAPI
- Frontend: React + Vite + TypeScript
- Persistencia: memoria (sin base de datos)

## Estructura

```text
HTTP_React_NestJS/
├── backend/
└── frontend/
```

## 1. Ejecutar backend

```bash
cd backend
npm install
npm run start:dev
```

Backend:
- API: http://localhost:3000
- Swagger: http://localhost:3000/api

## 2. Ejecutar frontend

En otra terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend:
- http://localhost:5173

El backend permite CORS únicamente para `http://localhost:5173`.

## Rutas

| Método | Ruta | Éxito | Uso |
|---|---|---:|---|
| GET | `/caracteristicas` | 200 | Listar |
| GET | `/caracteristicas/:id` | 200 | Obtener detalle |
| POST | `/caracteristicas` | 201 | Crear |
| PATCH | `/caracteristicas/:id` | 200 | Actualización parcial |
| PUT | `/caracteristicas/:id` | 200 | Reemplazo completo |
| DELETE | `/caracteristicas/:id` | 204 | Eliminar |

Errores demostrables:
- `400`: datos inválidos o propiedades desconocidas
- `404`: recurso inexistente
- `409`: nombre duplicado

No se fabrica un error 500.

## Validación

El backend usa:

```ts
ValidationPipe({
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true,
})
```

Por eso:
- se validan campos requeridos;
- se validan tipos;
- se aplican restricciones;
- se rechazan propiedades desconocidas.

## Datos iniciales

Los datos se almacenan en memoria. Al reiniciar el backend vuelven a aparecer los datos iniciales.

## Pruebas para el video

1. Abrir Swagger en `http://localhost:3000/api`.
2. Mostrar `GET /caracteristicas`.
3. Ejecutar un POST inválido para provocar `400`.
4. Ejecutar POST válido y mostrar `201`.
5. Desde React editar un recurso y mostrar `PATCH 200`.
6. Desde React eliminar un recurso y mostrar `204`.
7. Intentar consultar un ID inexistente y mostrar `404`.
8. Intentar crear un nombre repetido y mostrar `409`.
9. Abrir DevTools > Network y mostrar las solicitudes.

## Guion corto del video

**0:00 - 0:30**: Presentación de arquitectura y Swagger.

**0:30 - 1:00**: Mostrar validación con una solicitud inválida y el `400`.

**1:00 - 1:40**: Crear un recurso desde React y mostrar la respuesta confirmada `201`.

**1:40 - 2:15**: Editar y eliminar desde React. Mostrar `PATCH 200` y `DELETE 204`.

**2:15 - 2:40**: Mostrar `404` y `409`, y finalmente Network.

## GitHub

Desde la carpeta raíz:

```bash
git init
git add .
git commit -m "Implementar API NestJS y cliente React"
git branch -M main
git remote add origin URL_DE_TU_REPOSITORIO
git push -u origin main
```
