import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from 'src/microservices/account-service/user/user.service';
import { CompanyService } from 'src/microservices/company-service/company.service';
import { ISendNotifDTO } from './interfaces/notification.interface';
import { intersection } from 'lodash';
import { NotificationFactory } from './notification.factory';
import { ENotificationType } from '../notification.enum';

@Injectable()
export class NotificationService {
  constructor(
    private readonly notificationFactory: NotificationFactory,
    private readonly userService: UserService,
    private readonly companyService: CompanyService,
  ) {}

  async send(dto: ISendNotifDTO) {
    console.log('-----START ----');
    const user = this.userService.getById(dto.userId);
    if (!user || user.companyId !== dto.companyId) {
      throw new NotFoundException('User data not found.');
    }
    console.log(`USER CHANNEL`, user.notifChannels);

    const company = this.companyService.getById(dto.companyId);
    if (!company) {
      throw new NotFoundException('Company data not found.');
    }

    console.log(`COMPANY CHANNEL`, company.notifChannels);

    
    const subsribedChannels = intersection(
      user.notifChannels,
      company.notifChannels,
    );

    console.log(`SUBSCRIBED CHANNEL`, subsribedChannels);

    const notif = this.notificationFactory.setType(dto.type);
    switch (dto.type) {
      case ENotificationType.HappyBirthday:
        return notif.send(
          {
            contact: {
              userId: user.id,
              email: user.email,
            },
            params: {
              companyName: company.name,
              name: user.name,
            },
          },
          subsribedChannels,
        );

      case ENotificationType.LeaveBalanceReminder:
        return notif.send(
          {
            contact: {
              userId: user.id,
              email: user.email,
            },
            params: {
              date: '2023-12-11',
            },
          },
          subsribedChannels,
        );

      case ENotificationType.MonthlyPayslip:
        return notif.send(
          {
            contact: {
              userId: user.id,
              email: user.email,
            },
            params: {
              amount: '10000',
            },
          },
          subsribedChannels,
        );

      default:
        throw new InternalServerErrorException('Invalid notification type');
    }
  }
}
