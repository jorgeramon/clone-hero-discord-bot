import { ITwitchEvent } from './twitch-event.interface';
import { ITwitchSubscription } from './twitch-subscription.interface';

export interface ITwitchNotification {
  subscription: ITwitchSubscription;
  event: ITwitchEvent;
}
