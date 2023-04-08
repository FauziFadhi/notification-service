import { Injectable } from '@nestjs/common';
import { ENotificationChannel } from 'src/modules/middleware/notification-channel/interfaces/notification.channel.interface';
import { NotificationChannelFactory } from 'src/modules/middleware/notification-channel/notification.channel.factory';
import { ENotificationType } from '../notification.enum';
import { intersection } from 'lodash';
import {
  INotification,
  NotificationDTO,
} from './interfaces/notification.interface';

@Injectable()
export class MonthlyPaymentSlipNotificationService
  implements INotification<ENotificationType.MonthlyPayslip>
{
  private channels = [ENotificationChannel.Email];
  constructor(
    private readonly notificationChannelFactory: NotificationChannelFactory,
  ) {}
  async send(
    dto: NotificationDTO<ENotificationType.MonthlyPayslip>,
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
          type: ENotificationType.MonthlyPayslip,
          contact: dto.contact,
          params: dto.params,
        });
      }),
    );
  }
}