import Order from '../models/Order';
import Product, { ProductType } from '../models/Product';
import mongoose from 'mongoose';

export const resolvers = {
  Query: {
    orders: async () => {
      return await Order.find().populate('products');
    },
    order: async (_: any, { id }: { id: string }) => {
      return await Order.findById(id).populate('products');
    },
    products: async () => {
      return await Product.find().populate('order');
    },
    productsByType: async (_: any, { type }: { type: ProductType }) => {
      return await Product.find({ type }).populate('order');
    }
  },
  Order: {
    totalPrice: async (parent: any) => {
      if (parent.products && parent.products.length > 0) {
        return parent.products.reduce((sum: number, product: any) => sum + product.price, 0);
      }
      // If products are not populated, we need to calculate
      const products = await Product.find({ order: parent.id });
      return products.reduce((sum, product) => sum + product.price, 0);
    }
  },
  Mutation: {
    createOrder: async (_: any, { title, description }: { title: string, description?: string }) => {
      const order = new Order({ title, description });
      await order.save();
      return order;
    },
    updateOrder: async (_: any, { id, title, description }: { id: string, title?: string, description?: string }) => {
      return await Order.findByIdAndUpdate(
        id,
        { title, description },
        { new: true }
      );
    },
    deleteOrder: async (_: any, { id }: { id: string }) => {
      // Delete associated products first
      await Product.deleteMany({ order: id });
      const result = await Order.findByIdAndDelete(id);
      return !!result;
    },
    createProduct: async (_: any, args: any) => {
      const { title, type, price, orderId, guaranteeStart, guaranteeEnd } = args;
      
      // Validate that order exists
      const orderExists = await Order.findById(orderId);
      if (!orderExists) throw new Error('Order not found');
      
      const product = new Product({
        title,
        type,
        price,
        order: orderId,
        guarantee: {
          start: guaranteeStart ? new Date(guaranteeStart) : new Date(),
          end: guaranteeEnd ? new Date(guaranteeEnd) : new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) // Default 1 year
        }
      });
      
      await product.save();
      
      // Update order's products array
      await Order.findByIdAndUpdate(
        orderId,
        { $push: { products: product._id } }
      );
      
      return product;
    },
    updateProduct: async (_: any, args: any) => {
      const { id, title, type, price, guaranteeStart, guaranteeEnd } = args;
      
      const updateData: any = {};
      if (title !== undefined) updateData.title = title;
      if (type !== undefined) updateData.type = type;
      if (price !== undefined) updateData.price = price;
      
      if (guaranteeStart || guaranteeEnd) {
        updateData.guarantee = {};
        const product = await Product.findById(id);
        if (!product) throw new Error('Product not found');
        
        if (guaranteeStart) {
          updateData.guarantee.start = new Date(guaranteeStart);
        } else if (product.guarantee) {
          updateData.guarantee.start = product.guarantee.start;
        }
        
        if (guaranteeEnd) {
          updateData.guarantee.end = new Date(guaranteeEnd);
        } else if (product.guarantee) {
          updateData.guarantee.end = product.guarantee.end;
        }
      }
      
      return await Product.findByIdAndUpdate(
        id,
        updateData,
        { new: true }
      );
    },
    deleteProduct: async (_: any, { id }: { id: string }) => {
      const product = await Product.findById(id);
      if (!product) return false;
      
      // Remove reference from the order
      await Order.findByIdAndUpdate(
        product.order,
        { $pull: { products: id } }
      );
      
      const result = await Product.findByIdAndDelete(id);
      return !!result;
    }
  }
};