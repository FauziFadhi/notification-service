import { ENotificationChannel } from 'src/modules/middleware/notification-channel/interfaces/notification.channel.interface';
import { ENotificationType } from '../../notification.enum';

export interface INotificationBirthday {
  params: {
    name: string;
    companyName: string;
  };
}

export interface INotificationLeaveBalance {
  params: {
    date: string;
  };
}

export interface INotificationPayment {
  params: {
    amount: string;
  };
}

export interface IUserContact {
  userId: number;
  email: string;
}

export type NotificationDTO<type extends ENotificationType> = {
  contact: IUserContact;
} & (type extends ENotificationType.HappyBirthday
  ? INotificationBirthday
  : type extends ENotificationType.MonthlyPayslip
  ? INotificationPayment
  : type extends ENotificationType.LeaveBalanceReminder
  ? INotificationLeaveBalance
  : never);

export interface INotification<type extends ENotificationType> {
  send(
    dto: NotificationDTO<type>,
    subscribedChannels: ENotificationChannel[],
  ): Promise<any>;
}
