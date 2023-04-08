import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ENotificationType } from '../notification.enum';
import { HappyBirthdayNotificationService } from './happy-birthday.notification.service';
import { INotification } from './interfaces/notification.interface';
import { LeaveBalanceNotificationService } from './leave-balance.notification.service';
import { MonthlyPaymentSlipNotificationService } from './mothly-payment-slip.notification.service';

@Injectable()
export class NotificationFactory {
  constructor(
    private readonly happyBirthdayService: HappyBirthdayNotificationService,
    private readonly monthlyPaymentSlipService: MonthlyPaymentSlipNotificationService,
    private readonly leaveBalanceService: LeaveBalanceNotificationService,
  ) {}

  private notificationType: Record<ENotificationType, INotification<any>> = {
    [ENotificationType.HappyBirthday]: this.happyBirthdayService,
    [ENotificationType.LeaveBalanceReminder]: this.leaveBalanceService,
    [ENotificationType.MonthlyPayslip]: this.monthlyPaymentSlipService,
  };

  setType(type: ENotificationType): INotification<any> {
    const notificationByType = this.notificationType[type];

    if (!notificationByType) {
      throw new InternalServerErrorException(
        'Failed to set notification type' + type,
      );
    }

    return notificationByType;
  }
}
