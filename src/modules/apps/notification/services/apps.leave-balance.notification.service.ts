import { Injectable } from '@nestjs/common';
import { ENotificationChannel } from '@modules/middleware/notification-channel/interfaces/notification.channel.interface';
import { NotificationChannelFactory } from '@modules/middleware/notification-channel/notification.channel.factory';
import { ENotificationType } from '../notification.enum';
import { intersection } from 'lodash';
import {
  INotification,
  NotificationDTO,
} from './interfaces/apps.notification-factory.interface';

@Injectable()
export class AppsLeaveBalanceNotificationService
  implements INotification<ENotificationType.LeaveBalanceReminder>
{
  readonly channels = [ENotificationChannel.UI];
  constructor(
    private readonly notificationChannelFactory: NotificationChannelFactory,
  ) {}
  async send(
    dto: NotificationDTO<ENotificationType.LeaveBalanceReminder>,
    subscribedChannels: ENotificationChannel[],
  ): Promise<any> {
    const usedChannel: ENotificationChannel[] = intersection(
      subscribedChannels,
      this.channels,
    );

    await Promise.all(
      usedChannel.map(async (channel) => {
        const channelService =
          this.notificationChannelFactory.getService(channel);

        channelService.send({
          type: ENotificationType.LeaveBalanceReminder,
          contact: dto.contact,
          params: dto.params,
        });
      }),
    );
  }
}
