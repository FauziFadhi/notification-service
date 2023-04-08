import { InternalServerErrorException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { EmailNotificationChannelModule } from './email/email.notification-channel.module';
import { EmailNotificationChannel } from './email/services/email.notification-channel.service';
import { ENotificationChannel } from './interfaces/notification.channel.interface';
import { NotificationChannelFactory } from './notification.channel.factory';
import { UINotificationChannel } from './ui/services/ui.notification-channel.service';
import { UINotificationChannelModule } from './ui/ui.notification-channel.module';

describe('NotificationChannelFactory', () => {
  let notificationChannelFactory: NotificationChannelFactory;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [EmailNotificationChannelModule, UINotificationChannelModule],
      providers: [NotificationChannelFactory],
    }).compile();

    notificationChannelFactory = app.get<NotificationChannelFactory>(
      NotificationChannelFactory,
    );
  });

  describe('getService', () => {
    it('should return Email Channel Service when channel is "email"', () => {
      const channel = notificationChannelFactory.getService(
        ENotificationChannel.Email,
      );

      expect(channel).toBeInstanceOf(EmailNotificationChannel);
    });

    it('should return UI Channel Service when channel is "ui"', () => {
      const channel = notificationChannelFactory.getService(
        ENotificationChannel.UI,
      );

      expect(channel).toBeInstanceOf(UINotificationChannel);
    });

    it('should throw InternalServerErrorException when provided channel is "invalid"', () => {
      const type = 'invalid' as ENotificationChannel;

      expect(() => notificationChannelFactory.getService(type)).toThrowError(
        InternalServerErrorException,
      );
    });
  });
});
