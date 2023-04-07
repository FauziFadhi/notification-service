import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { engines } from '../package.json';
import { satisfies } from 'semver';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const version = engines.node;
  if (!satisfies(process.version, version)) {
    console.log(
      `Required node version ${version} not satisfied with current version ${process.version}.`,
    );
    process.exit(1);
  }

  const configService = app.get(ConfigService);
  const appPort = configService.get<number>('app.port');
  await app.listen(appPort || 3000, '0.0.0.0');
}
bootstrap();
