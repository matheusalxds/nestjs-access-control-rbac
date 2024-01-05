import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UUID } from 'mongodb';

import { createdAt, updatedAt } from '@/shared/database/mongodb/plugins';

@Schema({ collection: 'roles' })
export class Role {
  @Prop({ type: UUID, isRequired: true })
  _id: string;

  @Prop({ isRequired: true })
  name: string;

  @Prop({ isRequired: true, type: Array })
  can: string[];

  @Prop({ isRequired: true, type: Array })
  inherits: string[];
}

export const RoleSchema = SchemaFactory.createForClass(Role);

RoleSchema.plugin(createdAt);
RoleSchema.plugin(updatedAt);
