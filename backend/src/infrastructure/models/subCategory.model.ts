import mongoose, { Document, Schema } from "mongoose";

interface ISubCategory extends Document {
  name: string;
  category: mongoose.Types.ObjectId;
}

const SubCategorySchema = new Schema<ISubCategory>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  { timestamps: true }
);

export const SubCategoryModel = mongoose.model<ISubCategory>(
  "SubCategory",
  SubCategorySchema
);
