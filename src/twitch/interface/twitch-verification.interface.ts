import { ITwitchSubscription } from './twitch-subscription.interface';

export interface ITwitchVerification {
  challenge: string;
  subscription: ITwitchSubscription;
}
