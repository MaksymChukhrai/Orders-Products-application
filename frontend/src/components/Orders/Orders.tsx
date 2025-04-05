import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { useOrders } from '../../hooks/useOrders';
import { openDeleteModal } from '../../redux/uiSlice';
import { setSelectedOrder } from '../../redux/orderSlice';
import DeleteConfirmation from '../DeleteConfirmation/DeleteConfirmation';
import { formatDate, formatMonthYear } from '../../utils/dateFormat';
import { formatPriceUSD, formatPriceEUR } from '../../utils/priceFormat';
import styles from './Orders.module.scss';

const listVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.1 
    } 
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.3
    }
  }
};

const detailsVariants = {
  hidden: { opacity: 0, height: 0, overflow: 'hidden' },
  visible: { 
    opacity: 1, 
    height: 'auto',
    transition: {
      duration: 0.3
    }
  },
  exit: { 
    opacity: 0, 
    height: 0,
    transition: {
      duration: 0.2
    }
  }
};

const Orders: React.FC = () => {
  const dispatch = useDispatch();
  const { orders, selectedOrder, loading, error, deleteOrder } = useOrders();
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const handleOrderClick = (order: Order) => {
    if (selectedOrderId === order.id) {
      setSelectedOrderId(null);
      dispatch(setSelectedOrder(null));
    } else {
      setSelectedOrderId(order.id);
      dispatch(setSelectedOrder(order));
    }
  };

  const handleDeleteClick = (e: React.MouseEvent, orderId: string, title: string) => {
    e.stopPropagation();
    dispatch(openDeleteModal({ id: orderId, type: 'order', title }));
  };

  if (loading) return <div className={styles.loader}>Loading orders...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.ordersContainer}>
      <h1>Orders</h1>
      
      {orders.length === 0 ? (
        <div className={styles.emptyState}>No orders found. Try adding some!</div>
      ) : (
        <motion.ul 
          className={styles.ordersList}
          variants={listVariants}
          initial="hidden"
          animate="visible"
        >
          {orders.map(order => (
            <motion.li 
              key={order.id}
              className={`${styles.orderItem} ${selectedOrderId === order.id ? styles.selected : ''}`}
              variants={itemVariants}
              onClick={() => handleOrderClick(order)}
            >
              <div className={styles.orderHeader}>
                <h3>{order.title}</h3>
                <div className={styles.orderMeta}>
                  <span className={styles.productsCount}>
                    {order.products.length} {order.products.length === 1 ? 'product' : 'products'}
                  </span>
                  <button 
                    className={styles.deleteButton}
                    onClick={(e) => handleDeleteClick(e, order.id, order.title)}
                  >
                    Delete
                  </button>
                </div>
              </div>
              
              <AnimatePresence>
                {selectedOrderId === order.id && (
                  <motion.div 
                    className={styles.orderDetails}
                    variants={detailsVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <div className={styles.detailRow}>
                      <span className={styles.label}>Created on:</span>
                      <span>{formatDate(order.date)}</span>
                      <span className={styles.altFormat}>{formatMonthYear(order.date)}</span>
                    </div>
                    
                    {order.description && (
                      <div className={styles.detailRow}>
                        <span className={styles.label}>Description:</span>
                        <span>{order.description}</span>
                      </div>
                    )}
                    
                    <div className={styles.detailRow}>
                      <span className={styles.label}>Total Price:</span>
                      <span>{formatPriceUSD(order.totalPrice)}</span>
                      <span className={styles.altFormat}>{formatPriceEUR(order.totalPrice)}</span>
                    </div>
                    
                    <div className={styles.productsList}>
                      <h4>Products in this order:</h4>
                      {order.products.length > 0 ? (
                        <ul>
                          {order.products.map(product => (
                            <li key={product.id}>
                              <span>{product.title}</span>
                              <span className={styles.productPrice}>{formatPriceUSD(product.price)}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p>No products in this order.</p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.li>
          ))}
        </motion.ul>
      )}
      
      <DeleteConfirmation onConfirm={deleteOrder} />
    </div>
  );
};

export default Orders;