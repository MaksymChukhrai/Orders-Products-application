import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  enum ProductType {
    Electronics
    Clothing
    Food
    Books
    Other
  }

  type Guarantee {
    start: String
    end: String
  }

  type Product {
    id: ID!
    title: String!
    type: ProductType!
    price: Float!
    order: Order
    guarantee: Guarantee
  }

  type Order {
    id: ID!
    title: String!
    date: String!
    description: String
    products: [Product]
    totalPrice: Float
  }

  type Query {
    orders: [Order]
    order(id: ID!): Order
    products: [Product]
    productsByType(type: ProductType): [Product]
  }

  type Mutation {
    createOrder(title: String!, description: String): Order
    updateOrder(id: ID!, title: String, description: String): Order
    deleteOrder(id: ID!): Boolean
    
    createProduct(
      title: String!, 
      type: ProductType!, 
      price: Float!, 
      orderId: ID!, 
      guaranteeStart: String, 
      guaranteeEnd: String
    ): Product
    
    updateProduct(
      id: ID!, 
      title: String, 
      type: ProductType, 
      price: Float, 
      guaranteeStart: String, 
      guaranteeEnd: String
    ): Product
    
    deleteProduct(id: ID!): Boolean
  }
`;