import { FunaModel, FunaSchema } from '@funa/schema/funa.schema';

import { FunaGateway } from '@funa/gateway/funa.gateway';
import { FunaRepository } from '@funa/repository/funa.repository';
import { FunaService } from '@funa/service/funa.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from '@user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: FunaModel.name, schema: FunaSchema }]),
    UserModule,
  ],
  providers: [FunaGateway, FunaService, FunaRepository],
  exports: [FunaService],
})
export class FunaModule {}
