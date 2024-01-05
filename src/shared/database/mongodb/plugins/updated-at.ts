import { Schema } from 'mongoose';

export const updatedAt = (schema: Schema): void => {
  schema.add({ updatedAt: Date });
  schema.pre('findOneAndUpdate', function (next) {
    if (this) {
      this.set({ updatedAt: new Date() });
    }
    next();
  });
};
