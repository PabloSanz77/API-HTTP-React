import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS exacto para el frontend React de Vite.
  app.enableCors({
    origin: 'http://localhost:5173',
  });

  // Validación global:
  // - whitelist: conserva solamente propiedades declaradas en el DTO.
  // - forbidNonWhitelisted: rechaza propiedades desconocidas con 400.
  // - transform: transforma valores según los tipos declarados.
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('API de Características')
    .setDescription('API HTTP validada para la actividad S10')
    .setVersion('1.0')
    .addTag('caracteristicas')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}

bootstrap();
