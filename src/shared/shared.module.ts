import { Module } from '@nestjs/common';
import { SpecialDateService } from '@shared/service/special-date.service';

@Module({
  providers: [SpecialDateService],
  exports: [SpecialDateService],
})
export class SharedModule {}
