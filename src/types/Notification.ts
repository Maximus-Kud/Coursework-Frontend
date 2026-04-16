export type NotificationType = 'info' | 'success' | 'warning' | 'error';

export type AppNotification = {
  message: string,
  type: NotificationType,
}