import mongoose from 'mongoose';
import Order from '../models/Order';
import Product, { ProductType } from '../models/Product';

export async function seedDatabase() {
  // Clear database
  await Order.deleteMany({});
  await Product.deleteMany({});

  // Create orders
  const order1 = new Order({
    title: 'December Supplies',
    date: new Date('2023-12-10'),
    description: 'End of year office supplies'
  });

  const order2 = new Order({
    title: 'Q1 Electronics',
    date: new Date('2024-01-15'),
    description: 'New equipment for development team'
  });

  const order3 = new Order({
    title: 'Office Furniture',
    date: new Date('2024-02-01'),
    description: 'New desks and chairs'
  });

  await order1.save();
  await order2.save();
  await order3.save();

  // Create products
  const products = [
    // Order 1 products
    {
      title: 'Notebooks',
      type: ProductType.Books,
      price: 15.50,
      order: order1._id,
      guarantee: {
        start: new Date('2023-12-10'),
        end: new Date('2024-12-10')
      }
    },
    {
      title: 'Pens (box)',
      type: ProductType.Other,
      price: 8.75,
      order: order1._id,
      guarantee: {
        start: new Date('2023-12-10'),
        end: new Date('2024-06-10')
      }
    },
    {
      title: 'Paper reams',
      type: ProductType.Other,
      price: 22.99,
      order: order1._id,
      guarantee: {
        start: new Date('2023-12-10'),
        end: new Date('2024-12-10')
      }
    },
    
    // Order 2 products
    {
      title: 'Laptops',
      type: ProductType.Electronics,
      price: 1299.99,
      order: order2._id,
      guarantee: {
        start: new Date('2024-01-15'),
        end: new Date('2026-01-15')
      }
    },
    {
      title: 'Monitors',
      type: ProductType.Electronics,
      price: 349.50,
      order: order2._id,
      guarantee: {
        start: new Date('2024-01-15'),
        end: new Date('2026-01-15')
      }
    },
    {
      title: 'Keyboards',
      type: ProductType.Electronics,
      price: 89.99,
      order: order2._id,
      guarantee: {
        start: new Date('2024-01-15'),
        end: new Date('2025-01-15')
      }
    },
    
    // Order 3 products
    {
      title: 'Ergonomic chairs',
      type: ProductType.Other,
      price: 249.99,
      order: order3._id,
      guarantee: {
        start: new Date('2024-02-01'),
        end: new Date('2027-02-01')
      }
    },
    {
      title: 'Standing desks',
      type: ProductType.Other,
      price: 499.50,
      order: order3._id,
      guarantee: {
        start: new Date('2024-02-01'),
        end: new Date('2029-02-01')
      }
    }
  ];

  // Save products and update order references
  for (const productData of products) {
    const product = new Product(productData);
    await product.save();
    
    // Update the order with the product reference
    await Order.findByIdAndUpdate(
      productData.order,
      { $push: { products: product._id } }
    );
  }

  console.log('Database seeded successfully!');
}