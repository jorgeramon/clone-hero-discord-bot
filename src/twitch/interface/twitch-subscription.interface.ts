export interface ITwitchSubscription {
  id: string;
  status: string;
  type: string;
  version: string;
  condition: { broadcaster_user_id: string };
  transport: { method: string; callback: string };
  createdAt: string;
}
