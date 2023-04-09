import { Expose, Transform } from 'class-transformer';

export class AppsUserNotificationVm {
  @Transform(({ obj }) => obj._id || null)
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  content: string;

  @Expose()
  params;
  

  @Expose()
  createdAt: string;

  _id: string;

  constructor(args: Omit<AppsUserNotificationVm, 'id'>) {}
}
