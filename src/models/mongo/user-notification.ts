import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as Schemas } from 'mongoose';

export type UserNotificationDocument = UserNotification & Document;

@Schema({
  collection: 'user-notifications',
  autoCreate: true,
  timestamps: true,
  autoIndex: true,
})
export class UserNotification {
  @Prop({ required: true })
  userId: number;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ type: Schemas.Types.Mixed })
  params: unknown;

  @Prop({ type: Date })
  createdAt: string;

  @Prop({ type: Date })
  updatedAt: string;
}

export const UserNotificationSchema = SchemaFactory.createForClass(
  UserNotification,
).index({ userId: 1, createdAt: -1 });
