import mongoose, { Schema, Document } from 'mongoose';

export interface IOrder extends Document {
  title: string;
  date: Date;
  description?: string;
  products: mongoose.Types.ObjectId[];
}

const OrderSchema: Schema = new Schema({
  title: { type: String, required: true },
  date: { type: Date, default: Date.now },
  description: { type: String },
  products: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
});

export default mongoose.model<IOrder>('Order', OrderSchema);