import { Schema } from 'mongoose';

export const createdAt = (schema: Schema): void => {
  schema.add({ createdAt: { type: Date, default: Date.now } });
};
