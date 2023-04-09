import { ENotificationChannel } from '@modules/middleware/notification-channel/interfaces/notification.channel.interface';
import { ENotificationType } from '../../notification.enum';

export interface ISendNotifDTO {
  userId: number;
  companyId: number;
  type: ENotificationType;
}

type SubscribedChannel = ENotificationChannel;
export interface ISendBirthdayNotifDTO {
  type: ENotificationType;
  user: { id: number; name: string; email: string };
  company: { id: number; name: string };
  subscribedChannels: SubscribedChannel[];
}

export interface ISendLeaveBalanceNotifDTO {
  type: ENotificationType;
  user: { id: number; name: string; email: string };
  subscribedChannels: SubscribedChannel[];
}
export interface ISendMonthlyPayslipNotifDTO {
  type: ENotificationType;
  user: { id: number; name: string; email: string };
  subscribedChannels: SubscribedChannel[];
}
