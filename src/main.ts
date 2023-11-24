import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './shared/http-exception.filter';
import { json } from 'express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // const { httpAdapter } = app.get(HttpAdapterHost);

  // app.useGlobalFilters(new HttpExceptionFilter(httpAdapter));
  app.use(json({ limit: '100mb' }));
  app.enableCors();
  app.setGlobalPrefix('api/v1');
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });
  app.useStaticAssets(join(__dirname, '..', 'admin'), {
    prefix: '/admin/',
  });


  await app.listen(3011); // Main port 3001
}
bootstrap();
