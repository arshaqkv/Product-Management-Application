import mongoose, { Document, Schema } from "mongoose";

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  _id: string
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const UserModel = mongoose.model<IUser>("User", UserSchema);
