import { gql } from '@apollo/client';

export const CREATE_ORDER = gql`
  mutation CreateOrder($title: String!, $description: String) {
    createOrder(title: $title, description: $description) {
      id
      title
      date
      description
    }
  }
`;

export const UPDATE_ORDER = gql`
  mutation UpdateOrder($id: ID!, $title: String, $description: String) {
    updateOrder(id: $id, title: $title, description: $description) {
      id
      title
      date
      description
    }
  }
`;

export const DELETE_ORDER = gql`
  mutation DeleteOrder($id: ID!) {
    deleteOrder(id: $id)
  }
`;

export const CREATE_PRODUCT = gql`
  mutation CreateProduct(
    $title: String!, 
    $type: ProductType!, 
    $price: Float!, 
    $orderId: ID!, 
    $guaranteeStart: String, 
    $guaranteeEnd: String
  ) {
    createProduct(
      title: $title, 
      type: $type, 
      price: $price, 
      orderId: $orderId, 
      guaranteeStart: $guaranteeStart, 
      guaranteeEnd: $guaranteeEnd
    ) {
      id
      title
      type
      price
      guarantee {
        start
        end
      }
      order {
        id
        title
      }
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct(
    $id: ID!, 
    $title: String, 
    $type: ProductType, 
    $price: Float, 
    $guaranteeStart: String, 
    $guaranteeEnd: String
  ) {
    updateProduct(
      id: $id, 
      title: $title, 
      type: $type, 
      price: $price, 
      guaranteeStart: $guaranteeStart, 
      guaranteeEnd: $guaranteeEnd
    ) {
      id
      title
      type
      price
      guarantee {
        start
        end
      }
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(id: $id)
  }
`;