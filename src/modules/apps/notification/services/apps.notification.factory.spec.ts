import { NotificationChannelModule } from '@modules/middleware/notification-channel/notification.channel.module';
import { InternalServerErrorException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ENotificationType } from '../notification.enum';
import { AppsHappyBirthdayNotificationService } from './apps.happy-birthday.notification.service';
import { AppsLeaveBalanceNotificationService } from './apps.leave-balance.notification.service';
import { AppsMonthlyPaymentSlipNotificationService } from './apps.mothly-payment-slip.notification.service';
import { AppsNotificationFactory } from './apps.notification.factory';

describe('NotificationFactory', () => {
  let notificationFactory: AppsNotificationFactory;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [NotificationChannelModule],
      providers: [
        AppsHappyBirthdayNotificationService,
        AppsLeaveBalanceNotificationService,
        AppsMonthlyPaymentSlipNotificationService,
        AppsNotificationFactory,
      ],
    }).compile();

    notificationFactory = app.get<AppsNotificationFactory>(
      AppsNotificationFactory,
    );
  });

  describe('setType', () => {
    it('should return happy birthday notif  Service when type is "happy-birthday"', () => {
      const channel = notificationFactory.setType(
        ENotificationType.HappyBirthday,
      );

      expect(channel).toBeInstanceOf(AppsHappyBirthdayNotificationService);
    });

    it('should return monthly payment slip notification Service when type is "monthly-payslip"', () => {
      const channel = notificationFactory.setType(
        ENotificationType.MonthlyPayslip,
      );

      expect(channel).toBeInstanceOf(AppsMonthlyPaymentSlipNotificationService);
    });
    it('should return leave balance reminder notification Service when type is "leave-balance-reminder"', () => {
      const channel = notificationFactory.setType(
        ENotificationType.LeaveBalanceReminder,
      );

      expect(channel).toBeInstanceOf(AppsLeaveBalanceNotificationService);
    });

    it('should throw InternalServerErrorException when provided type is "invalid"', () => {
      const type = 'invalid' as ENotificationType;

      expect(() => notificationFactory.setType(type)).toThrowError(
        InternalServerErrorException,
      );
    });
  });
});
