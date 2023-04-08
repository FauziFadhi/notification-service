import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { EmailNotificationChannel } from './email/services/email.notification-channel.service';
import {
  ENotificationChannel,
  INotificationChannel,
} from './interfaces/notification.channel.interface';
import { UINotificationChannel } from './ui/services/ui.notification-channel.service';

@Injectable()
export class NotificationChannelFactory {
  constructor(
    private readonly emailChannel: EmailNotificationChannel,
    private readonly uiChannel: UINotificationChannel,
  ) {
    this.notificationChannels = {
      [ENotificationChannel.Email]: this.emailChannel,
      [ENotificationChannel.UI]: this.uiChannel,
    };
  }
  private notificationChannels: Record<
    ENotificationChannel,
    INotificationChannel
  >;

  getService(channel: ENotificationChannel): INotificationChannel {
    const service = this.notificationChannels[channel];

    if (!service) {
      throw new InternalServerErrorException(
        'Failed to get notification channel ' + channel + ' from server',
      );
    }

    return service;
  }
}
