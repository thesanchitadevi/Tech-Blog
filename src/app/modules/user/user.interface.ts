import { Model } from 'mongoose';

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  isBlocked: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserStaticModel extends Model<IUser> {
  // check if the user is exists by custom id
  isEmailTaken(id: string): Promise<IUser>;

  // check if password is matched with hashed password
  isPasswordMatched(
    plainPassword: string,
    hashPassword: string,
  ): Promise<boolean>;
}
