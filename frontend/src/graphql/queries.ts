import { gql } from '@apollo/client';

export const GET_ORDERS = gql`
  query GetOrders {
    orders {
      id
      title
      date
      description
      totalPrice
      products {
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
  }
`;

export const GET_ORDER_BY_ID = gql`
  query GetOrderById($id: ID!) {
    order(id: $id) {
      id
      title
      date
      description
      totalPrice
      products {
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
  }
`;

export const GET_PRODUCTS = gql`
  query GetProducts {
    products {
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

export const GET_PRODUCTS_BY_TYPE = gql`
  query GetProductsByType($type: ProductType) {
    productsByType(type: $type) {
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