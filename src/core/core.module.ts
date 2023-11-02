import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Module,
  ValidationPipe,
} from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigModule, AppConfigService } from 'app-config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [AppConfigModule],
      useFactory: (appConfig: AppConfigService) => appConfig.db,
      inject: [AppConfigService],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/schema.gql',
    }),
  ],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        transform: true,
        /**
         *
         * @param errors the errors from class-validator
         * @returns An object, where keys are properties of object being validated, and value is the first error encountered on that property
         */
        exceptionFactory: (errors) => {
          const mappedError: { [field: string]: string } = {};
          for (const error of errors) {
            mappedError[error.property] = Object.entries(
              error.constraints,
            )[0][1];
          }
          return new HttpException(
            {
              message: mappedError,
              statusCode: HttpStatus.BAD_REQUEST,
            },
            HttpStatus.BAD_REQUEST,
          );
        },
      }),
    },
  ],
})
export class CoreModule {}
