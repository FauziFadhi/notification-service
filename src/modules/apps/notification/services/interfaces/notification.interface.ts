import { ENotificationType } from '../../notification.enum';

export interface INotificationBirthday {
  name: ENotificationType.HappyBirthday;
  params: {
    name: string;
  };
}

export interface INotificationPayment {
  name: ENotificationType.MonthlyPayslip;
  params: {
    amount: string;
  };
}

export interface IUserContact {
  userId: number;
  email: string;
}

export interface INotification {
  send(dto: unknown): Promise<any>;
}
