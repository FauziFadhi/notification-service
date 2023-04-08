import { IsIn, IsNotEmpty, IsNumber } from 'class-validator';
import { ENotificationType } from '../../notification.enum';

export class SendNotificationRequest {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  companyId: number;

  @IsNotEmpty()
  @IsIn(Object.values(ENotificationType))
  type: ENotificationType;
}
