import { model, Schema } from 'mongoose';
import { IUser, IUserStaticModel } from './user.interface';
import config from '../../config';
import bcrypt from 'bcrypt';

const userSchema = new Schema<IUser, IUserStaticModel>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// Middleware - pre save hook
userSchema.pre('save', async function (next) {
  // Hash the password
  this.password = await bcrypt.hash(this.password, Number(config.bycrpt_salt));

  next();
});

// Middleware - post save hook
userSchema.post('save', function (doc, next) {
  // doc
  doc.password = '**********'; // Hide the password
  next();
});

userSchema.statics.isEmailTaken = async function (email: string) {
  return await UserModel.findOne({ email });
};

userSchema.statics.isPasswordMatched = async function (
  plainPassword: string,
  hashPassword: string,
) {
  return await bcrypt.compare(plainPassword, hashPassword);
};

export const UserModel = model<IUser, IUserStaticModel>('User', userSchema);
