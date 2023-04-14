import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AppsNotificationService } from '../services/apps.notification.service';
import { SendNotificationRequest } from './requests/apps.notification.request';

@Controller({ path: 'notifications', version: '1' })
export class AppsNotificationController {
  constructor(private readonly notificationService: AppsNotificationService) {}

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post()
  async sendNotif(@Body() body: SendNotificationRequest) {
    await this.notificationService.send(body);
  }
}
