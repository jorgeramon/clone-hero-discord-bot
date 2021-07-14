import { Module } from '@nestjs/common';
import { DialogflowService } from './service/dialogflow.service';

@Module({
  providers: [DialogflowService],
  exports: [DialogflowService],
})
export class DialogFlowModule {}
