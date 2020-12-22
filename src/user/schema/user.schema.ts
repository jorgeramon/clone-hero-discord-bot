import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Collections } from '@shared/enum/colllections.enum';
import { Document } from 'mongoose';
import { IDocumentTimestamp } from '@shared/interface/document-timestamp.interface';

export type UserDocument = UserModel & Document & IDocumentTimestamp;

@Schema({ collection: Collections.USERS, timestamps: true })
export class UserModel {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true, unique: true })
  tag: string;

  @Prop()
  twitchAccount?: string;

  @Prop()
  twitchId?: string;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
