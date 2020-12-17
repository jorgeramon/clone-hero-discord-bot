import { Observable, Subject } from 'rxjs';

import { User } from 'discord.js';

export class ReactiveFunaService {
  private static instance: ReactiveFunaService;
  private readonly $channel: Subject<Record<string, User>> = new Subject();

  private constructor() {}

  static getInstance(): ReactiveFunaService {
    if (!ReactiveFunaService.instance) {
      ReactiveFunaService.instance = new ReactiveFunaService();
    }

    return ReactiveFunaService.instance;
  }

  next(from: User, to: User): void {
    this.$channel.next({ from, to });
  }

  listen(): Observable<Record<string, User>> {
    return this.$channel.asObservable();
  }
}
