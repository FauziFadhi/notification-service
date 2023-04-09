import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from 'src/microservices/account-service/user/user.service';
import { CompanyService } from 'src/microservices/company-service/company.service';
import {
  ISendBirthdayNotifDTO,
  ISendLeaveBalanceNotifDTO,
  ISendMonthlyPayslipNotifDTO,
  ISendNotifDTO,
} from './interfaces/notification.interface';
import { intersection } from 'lodash';
import { NotificationFactory } from './notification.factory';
import { ENotificationType } from '../notification.enum';

import { InjectModel } from '@nestjs/mongoose';
import {
  UserNotification,
  UserNotificationDocument,
} from '@models/mongo/user-notification';
import { Model } from 'mongoose';

@Injectable()
export class NotificationService {
  constructor(
    private readonly notificationFactory: NotificationFactory,
    @InjectModel(UserNotification.name)
    private userNotifModel: Model<UserNotificationDocument>,
    private readonly userService: UserService,
    private readonly companyService: CompanyService,
    private readonly logger: Logger,
  ) {}

  async send(dto: ISendNotifDTO) {
    this.logger.log('-----START ----');
    const user = this.userService.getById(dto.userId);
    if (!user || user.companyId !== dto.companyId) {
      throw new NotFoundException('User data not found.');
    }
    this.logger.log(`USER CHANNEL`, user.notifChannels);

    const company = this.companyService.getById(dto.companyId);
    if (!company) {
      throw new NotFoundException('Company data not found.');
    }

    this.logger.log(`COMPANY CHANNEL`, company.notifChannels);

    const subscribedChannels = intersection(
      user.notifChannels,
      company.notifChannels,
    );

    this.logger.log(`SUBSCRIBED CHANNEL`, subscribedChannels);

    switch (dto.type) {
      case ENotificationType.HappyBirthday:
        return this.sendBirthdayNotif({
          user,
          company,
          type: dto.type,
          subscribedChannels,
        });

      case ENotificationType.LeaveBalanceReminder:
        return await this.sendLeaveBalanceLeaveReminderNotif({
          type: dto.type,
          user,
          subscribedChannels,
        });

      case ENotificationType.MonthlyPayslip:
        return await this.sendMonthlyPayslipNotif({
          type: dto.type,
          user,
          subscribedChannels,
        });

      default:
        throw new InternalServerErrorException('Invalid notification type');
    }
  }

  getUser;

  private async sendBirthdayNotif(dto: ISendBirthdayNotifDTO) {
    const notif = this.notificationFactory.setType(dto.type);

    return notif.send(
      {
        contact: {
          userId: dto.user.id,
          email: dto.user.email,
        },
        params: {
          companyName: dto.company.name,
          name: dto.user.name,
        },
      },
      dto.subscribedChannels,
    );
  }

  private async sendLeaveBalanceLeaveReminderNotif(
    dto: ISendLeaveBalanceNotifDTO,
  ) {
    const notif = this.notificationFactory.setType(dto.type);

    return notif.send(
      {
        contact: {
          userId: dto.user.id,
          email: dto.user.email,
        },
        params: {
          date: '2023-12-11',
        },
      },
      dto.subscribedChannels,
    );
  }

  private async sendMonthlyPayslipNotif(dto: ISendMonthlyPayslipNotifDTO) {
    const notif = this.notificationFactory.setType(dto.type);

    notif.send(
      {
        contact: {
          userId: dto.user.id,
          email: dto.user.email,
        },
        params: {
          amount: '10000',
        },
      },
      dto.subscribedChannels,
    );
  }

  async getUserNotifications(userId: number) {
    const userNotifications = await this.userNotifModel.find({ userId });

    return userNotifications;
  }
}
