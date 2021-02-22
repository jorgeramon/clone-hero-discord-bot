export interface FacebookNotification {
  content: string;
  embeds: NotificationData[];
}

export interface NotificationData {
  author: { name: string; icon_url: string };
  title: string;
  type: string;
  description: string;
  thumbnail: { url: string };
  image: { url: string };
}
