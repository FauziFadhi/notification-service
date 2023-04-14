import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { transformer } from '@utils/helpers';
import { AppsNotificationService } from '../services/apps.notification.service';
import { AppsUserNotificationVm } from './viewmodels/apps.user-notification.viewmodel';

@Controller({ path: 'users/:userId/notifications', version: '1' })
export class AppsUserNotificationController {
  constructor(private readonly notificationService: AppsNotificationService) {}

  @Get()
  async sendNotif(@Param('userId') userId: number) {
    const userNotifications =
      await this.notificationService.getUserNotifications(userId);
    return { data: transformer(AppsUserNotificationVm, userNotifications) };
  }
}
