import { Injectable, InternalServerErrorException } from '@nestjs/common';
import {
  ENotificationChannel,
  INotificationChannel,
} from './interfaces/notification.channel.interface';

@Injectable()
export class NotificationChannelFactory {
  private notificationChannels: Record<
    ENotificationChannel,
    INotificationChannel
  > = {};

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
