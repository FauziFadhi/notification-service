export enum ENotificationChannel {
  Email = 'email',
  UI = 'ui',
}

interface IContact {
  userId: number;
  email: string;
}

export interface INotificationChannelDTO {
  contact: IContact;
  params: unknown;
}

export interface INotificationChannel {
  send(dto: INotificationChannelDTO): Promise<any>;
}
