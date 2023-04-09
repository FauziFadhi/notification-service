import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  UserNotification,
  UserNotificationDocument,
} from '@models/mongo/user-notification';
import { Model } from 'mongoose';

import {
  INotificationChannel,
  INotificationChannelDTO,
} from '../../interfaces/notification.channel.interface';

@Injectable()
export class UINotificationChannel implements INotificationChannel {
  constructor(
    @InjectModel(UserNotification.name)
    private userNotifModel: Model<UserNotificationDocument>,
  ) {}
  async send(dto: INotificationChannelDTO): Promise<any> {
    console.log('send ui notification', dto.type);

    this.userNotifModel
      .create({
        title: 'template title',
        content: 'template content',
        params: dto.params,
        userId: dto.contact.userId,
      })
      .catch(() => {
        console.log('failed storing ui notification', dto.type);
      });
  }
}
