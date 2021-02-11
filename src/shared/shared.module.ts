import { DynamicModule, Module } from '@nestjs/common';

import { BotMentionGuard } from '@shared/guard/bot-mention.guard';
import { ChristmasGuard } from '@shared/guard/christmas.guard';
import { EmptyMentionGuard } from '@shared/guard/empty-mention.guard';
import { EnvironmentService } from './service/environment.service';
import { FunaModule } from '@funa/funa.module';
import { IsAdminGuard } from './guard/is-admin.guard';
import { LupitaGuard } from '@shared/guard/lupita.guard';
import { SpecialDateService } from './service/special-date.service';
import { WonkyDayGuard } from './guard/wonky-day.guard';

@Module({
  providers: [SpecialDateService, EnvironmentService],
  exports: [SpecialDateService, EnvironmentService],
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
        IsAdminGuard,
        WonkyDayGuard,
      ],
    };
  }
}
