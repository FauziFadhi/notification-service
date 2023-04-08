import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ENotificationType } from '../notification.enum';
import { INotification } from './interfaces/notification.interface';

@Injectable()
export class NotificationFactory {
  private notificationType: Record<ENotificationType, INotification> = {
    // [ENotificationType.HappyBirthday]
  };

  setType(type: ENotificationType): INotification {
    const notificationByType = this.notificationType[type];

    if (!notificationByType) {
      throw new InternalServerErrorException(
        'Failed to set notification type' + type,
      );
    }

    return notificationByType;
  }
}
