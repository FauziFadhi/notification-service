import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { NotificationService } from '../services/notification.service';
import { SendNotificationRequest } from './requests/apps.notification.request';

@Controller({ path: 'notifications', version: '1' })
export class AppsNotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post()
  async sendNotif(@Body() body: SendNotificationRequest) {
    await this.notificationService.send(body);
  }
}
