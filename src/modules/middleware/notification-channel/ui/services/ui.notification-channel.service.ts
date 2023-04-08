import { Injectable } from '@nestjs/common';
import {
  INotificationChannel,
  INotificationChannelDTO,
} from '../../interfaces/notification.channel.interface';

@Injectable()
export class UINotificationChannel implements INotificationChannel {
  async send(dto: INotificationChannelDTO): Promise<any> {
    console.log('send ui notification', dto.type);

    // TODO: storing notif for list notif
  }
}
