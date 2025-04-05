import mongoose, { Schema, Document } from 'mongoose';

export enum ProductType {
  Electronics = 'Electronics',
  Clothing = 'Clothing',
  Food = 'Food',
  Books = 'Books',
  Other = 'Other'
}

export interface IProduct extends Document {
  title: string;
  type: ProductType;
  price: number;
  order: mongoose.Types.ObjectId;
  guarantee: {
    start: Date;
    end: Date;
  };
}

const ProductSchema: Schema = new Schema({
  title: { type: String, required: true },
  type: { 
    type: String, 
    enum: Object.values(ProductType),
    default: ProductType.Other 
  },
  price: { type: Number, required: true },
  order: { type: Schema.Types.ObjectId, ref: 'Order' },
  guarantee: {
    start: { type: Date, default: Date.now },
    end: { type: Date }
  }
});

export default mongoose.model<IProduct>('Product', ProductSchema);