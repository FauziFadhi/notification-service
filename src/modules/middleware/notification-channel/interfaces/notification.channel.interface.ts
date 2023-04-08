export enum ENotificationChannel {
  Email = 'email',
  UI = 'ui',
}

interface IContact {
  userId: number;
  email: string;
}

export interface INotificationChannelDTO {
  type: string;
  contact: IContact;
  params: unknown;
  attachmentNames?: string[];
}

export interface INotificationChannel {
  send(dto: INotificationChannelDTO): Promise<any>;
}
