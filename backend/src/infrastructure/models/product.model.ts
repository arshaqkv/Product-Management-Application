import mongoose, { Document, Schema } from "mongoose";

interface IVariant extends Document {
  ram: string;
  price: number;
  quantity: number;
}

interface IProduct extends Document {
  title: string;
  subCategory: string;
  description: string;
  variants: IVariant[];
  image: string[];
}

const variantSchema = new Schema<IVariant>({
  ram: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const productSchema = new Schema<IProduct>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    subCategory: {
      type: String,
      ref: "SubCategory",
    },
    description: {
      type: String,
    },
    variants: [variantSchema],
  },
  { timestamps: true }
);

export const ProductModel = mongoose.model<IProduct>("Product", productSchema);
