import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './app-config/app-config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigService } from 'app-config';
import { BooksModule } from './books/books.module';

@Module({
  imports: [
    AppConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [AppConfigModule],
      useFactory: (appConfig: AppConfigService) => appConfig.db,
      inject: [AppConfigService],
    }),
    BooksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
