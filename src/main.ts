import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfigService } from 'app-config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(AppConfigService);
  app.enableCors();
  await app.listen(configService.port);
}
bootstrap();
