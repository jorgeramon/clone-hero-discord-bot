import { AppModule } from './app.module';
import { FunaService } from '@funa/service/funa.service';
import { NestFactory } from '@nestjs/core';
import { ReactiveFunaService } from '@shared/service/reactive-funa.service';
import { User } from 'discord.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const funaService = app.get<FunaService>(FunaService);
  const reactiveFunaService = ReactiveFunaService.getInstance();

  reactiveFunaService
    .listen()
    .subscribe(({ from, to }: Record<string, User>) =>
      funaService.funa(from, to),
    );

  await app.listen(3000);
}

bootstrap();
