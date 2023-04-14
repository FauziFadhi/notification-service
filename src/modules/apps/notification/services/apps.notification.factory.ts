import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ENotificationType } from '../notification.enum';
import { AppsHappyBirthdayNotificationService } from './apps.happy-birthday.notification.service';
import { INotification } from './interfaces/apps.notification-factory.interface';
import { AppsLeaveBalanceNotificationService } from './apps.leave-balance.notification.service';
import { AppsMonthlyPaymentSlipNotificationService } from './apps.mothly-payment-slip.notification.service';

@Injectable()
export class AppsNotificationFactory {
  constructor(
    private readonly happyBirthdayService: AppsHappyBirthdayNotificationService,
    private readonly monthlyPaymentSlipService: AppsMonthlyPaymentSlipNotificationService,
    private readonly leaveBalanceService: AppsLeaveBalanceNotificationService,
  ) {
    this.notificationType = {
      [ENotificationType.HappyBirthday]: this.happyBirthdayService,
      [ENotificationType.LeaveBalanceReminder]: this.leaveBalanceService,
      [ENotificationType.MonthlyPayslip]: this.monthlyPaymentSlipService,
    };
  }

  private notificationType: Record<ENotificationType, INotification<any>>;

  setType<T extends ENotificationType>(type: T): INotification<T> {
    const notificationByType = this.notificationType[type];

    if (!notificationByType) {
      throw new InternalServerErrorException(
        'Failed to set notification type' + type,
      );
    }

    return notificationByType;
  }
}
