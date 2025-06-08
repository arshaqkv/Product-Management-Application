import mongoose from "mongoose";

export class SubCategory {
  constructor(
    public name: string,
    public category: mongoose.Types.ObjectId,
    public _id?: string
  ) {}
}
