import { NotificationChannelModule } from '@modules/middleware/notification-channel/notification.channel.module';
import { InternalServerErrorException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ENotificationType } from '../notification.enum';
import { HappyBirthdayNotificationService } from './happy-birthday.notification.service';
import { LeaveBalanceNotificationService } from './leave-balance.notification.service';
import { MonthlyPaymentSlipNotificationService } from './mothly-payment-slip.notification.service';
import { NotificationFactory } from './notification.factory';

describe('NotificationFactory', () => {
  let notificationFactory: NotificationFactory;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [NotificationChannelModule],
      providers: [
        HappyBirthdayNotificationService,
        LeaveBalanceNotificationService,
        MonthlyPaymentSlipNotificationService,
        NotificationFactory,
      ],
    }).compile();

    notificationFactory = app.get<NotificationFactory>(NotificationFactory);
  });

  describe('setType', () => {
    it('should return happy birthday notif  Service when type is "happy-birthday"', () => {
      const channel = notificationFactory.setType(
        ENotificationType.HappyBirthday,
      );

      expect(channel).toBeInstanceOf(HappyBirthdayNotificationService);
    });

    it('should return monthly payment slip notification Service when type is "monthly-payslip"', () => {
      const channel = notificationFactory.setType(
        ENotificationType.MonthlyPayslip,
      );

      expect(channel).toBeInstanceOf(MonthlyPaymentSlipNotificationService);
    });
    it('should return leave balance reminder notification Service when type is "leave-balance-reminder"', () => {
      const channel = notificationFactory.setType(
        ENotificationType.LeaveBalanceReminder,
      );

      expect(channel).toBeInstanceOf(LeaveBalanceNotificationService);
    });

    it('should throw InternalServerErrorException when provided type is "invalid"', () => {
      const type = 'invalid' as ENotificationType;

      expect(() => notificationFactory.setType(type)).toThrowError(
        InternalServerErrorException,
      );
    });
  });
});
