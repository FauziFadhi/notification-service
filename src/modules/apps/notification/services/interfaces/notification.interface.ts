import { ENotificationType } from '../../notification.enum';

export interface ISendNotifDTO {
  userId: number;
  companyId: number;
  type: ENotificationType;
}
