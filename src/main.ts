import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { engines } from '../package.json';
import { satisfies } from 'semver';
import { ConfigService } from '@nestjs/config';
import { CustomValidationPipe } from '@utils/pipes';
import { VersioningType } from '@nestjs/common';
import { AllExceptionsFilter } from '@utils/filters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const version = engines.node;
  if (!satisfies(process.version, version)) {
    console.log(
      `Required node version ${version} not satisfied with current version ${process.version}.`,
    );
    process.exit(1);
  }

  app.useGlobalFilters(new AllExceptionsFilter());

  app.useGlobalPipes(
    new CustomValidationPipe({
      whitelist: true,
      transform: true,
      stopAtFirstError: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.setGlobalPrefix('api');

  const configService = app.get(ConfigService);
  const appPort = configService.get<number>('app.port');
  await app.listen(appPort || 3000);
}
bootstrap();
