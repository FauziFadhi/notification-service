import { Injectable } from '@nestjs/common';
import {
  INotificationChannel,
  INotificationChannelDTO,
} from '../../interfaces/notification.channel.interface';

@Injectable()
export class EmailNotificationChannel implements INotificationChannel {
  send(dto: INotificationChannelDTO): Promise<any> {
    console.log('send email notification', dto.type);
  }
}
