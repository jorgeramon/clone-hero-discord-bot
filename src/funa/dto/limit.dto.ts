import { ArgNum } from 'discord-nestjs';

export class LimitDTO {
  @ArgNum(0)
  limit?: string;
}
