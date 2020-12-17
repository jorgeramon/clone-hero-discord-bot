import * as moment from 'moment';

import { Injectable } from '@nestjs/common';

@Injectable()
export class SpecialDateService {
  isLupitaDay(): boolean {
    const now = moment();
    return now.date() === 12 && now.month() === 11;
  }

  isChristmas(): boolean {
    const now = moment();
    return now.date() === 25 && now.month() === 11;
  }

  isWonkyDay(): boolean {
    const dayOfWeek = moment().day();
    return dayOfWeek === 2;
  }

  daysUntilChristmas(): number {
    const now = moment();
    const christmas = moment().month(11).date(25).startOf('day');
    return christmas.diff(now, 'days');
  }

  daysUntilWonkyDay(): number {
    const dayOfWeek = moment().day();
    return dayOfWeek < 2 ? 2 - dayOfWeek : 9 - dayOfWeek;
  }
}
