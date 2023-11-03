import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from 'app-config/app-config.module';
import { BooksModule } from 'books/books.module';
import { CoreModule } from 'core/core.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AppConfigModule, CoreModule, BooksModule, CoreModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
