import { DynamicModule, Module } from '@nestjs/common';

import { BotMentionGuard } from '@shared/guard/bot-mention.guard';
import { ChristmasGuard } from '@shared/guard/christmas.guard';
import { EmptyMentionGuard } from '@shared/guard/empty-mention.guard';
import { FunaModule } from '@funa/funa.module';
import { LupitaGuard } from '@shared/guard/lupita.guard';
import { SpecialDateService } from './service/special-date.service';

@Module({
  providers: [SpecialDateService],
  exports: [SpecialDateService],
})
export class SharedModule {
  static forRootGuards(): DynamicModule {
    return {
      module: SharedModule,
      imports: [FunaModule],
      providers: [
        BotMentionGuard,
        EmptyMentionGuard,
        LupitaGuard,
        ChristmasGuard,
      ],
    };
  }
}
