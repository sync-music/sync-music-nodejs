import {
    Schema, Types, Document, Model, model,
} from 'mongoose';

const UserSchema = new Schema({
    email: { type: 'string', unique: true, required: true },
    firebaseId: { type: 'string', unique: true, required: true },
    registrationDate: { type: 'number' },
    isAdmin: { type: 'boolean', default: false },
    __v: { type: Number, select: false },
});

export interface User extends Document {
  _id: Types.ObjectId;
  email: string;
  firebaseId: string;
  registrationDate: number;
  isAdmin: boolean;
}

export const UserModel: Model<User> = model<User>('User', UserSchema);
