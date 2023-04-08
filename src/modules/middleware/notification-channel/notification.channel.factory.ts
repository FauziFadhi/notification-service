import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { EmailNotificationChannel } from './email/services/email.notification-channel.service';
import {
  ENotificationChannel,
  INotificationChannel,
} from './interfaces/notification.channel.interface';

@Injectable()
export class NotificationChannelFactory {
  constructor(private readonly emailChannel: EmailNotificationChannel) {}
  private notificationChannels: Record<
    ENotificationChannel,
    INotificationChannel
  > = {
    [ENotificationChannel.Email]: this.emailChannel,
  };

  getService(channel: ENotificationChannel): INotificationChannel {
    const service = this.notificationChannels[channel];

    if (!service) {
      throw new InternalServerErrorException(
        'Failed to get notification channel' + channel + ' from server',
      );
    }

    return service;
  }
}
