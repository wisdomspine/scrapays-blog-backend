import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppConfigService } from './app-config.service';
import { configLoader } from './loaders/db-config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configLoader],
    }),
  ],
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class AppConfigModule {}
