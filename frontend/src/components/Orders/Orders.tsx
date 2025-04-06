// src/components/Orders/Orders.tsx
"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { useOrders } from "../../hooks/useOrders";
import { openDeleteModal } from "../../redux/uiSlice";
import { setSelectedOrder } from "../../redux/orderSlice";
import DeleteConfirmation from "../DeleteConfirmation/DeleteConfirmation";
import { formatDate } from "../../utils/dateFormat";
import { formatPriceUSD } from "../../utils/priceFormat";
import styles from "./Orders.module.scss";
import { Order } from "../../types/Order";

const Orders: React.FC = () => {
  const dispatch = useDispatch();
  const { orders, loading, error, deleteOrder } = useOrders();
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

  const handleDeleteClick = (
    e: React.MouseEvent,
    orderId: string,
    title: string
  ) => {
    e.stopPropagation();
    dispatch(openDeleteModal({ id: orderId, type: "order", title }));
  };

  if (loading) return <div className={styles.loader}>Loading orders...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.ordersContainer}>
      <div className={styles.header}>
        <div className={styles.titleContainer}>
          <button className={styles.addButton}>+</button>
          <h1>Приходы / 25</h1>
        </div>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Поиск"
            className={styles.searchInput}
          />
        </div>
      </div>

      <div className={styles.ordersContent}>
        {orders.length === 0 ? (
          <div className={styles.emptyState}>
            No orders found. Try adding some!
          </div>
        ) : (
          <div className={styles.ordersList}>
            {orders.map((order) => (
              <div
                key={order.id}
                className={`${styles.orderItem} ${selectedOrderId === order.id ? styles.selected : ""}`}
                onClick={() => handleOrderClick(order)}
              >
                <div className={styles.orderTitle}>{order.title}</div>
                <div className={styles.orderMeta}>
                  <div className={styles.productsInfo}>
                    <span className={styles.productsIcon}>
                      <svg viewBox="0 0 24 24" width="16" height="16">
                        <path
                          fill="currentColor"
                          d="M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M10,17L5,12L6.41,10.59L10,14.17L17.59,6.58L19,8L10,17Z"
                        />
                      </svg>
                    </span>
                    <span>{order.productsCount} Продукта</span>
                  </div>
                  <div className={styles.dateInfo}>
                    <span className={styles.date}>
                      {formatDate(order.date, "dd / MMM / yyyy")}
                    </span>
                  </div>
                  <div className={styles.priceInfo}>
                    {Array.isArray(order.totalPrice) &&
                    order.totalPrice.length > 0 ? (
                      <>
                        <span className={styles.price}>
                          {formatPriceUSD(order.totalPrice[0].value)} UAH
                        </span>
                      </>
                    ) : (
                      <span className={styles.price}>0 UAH</span>
                    )}
                  </div>
                  <button
                    className={styles.deleteButton}
                    onClick={(e) => handleDeleteClick(e, order.id, order.title)}
                  >
                    <svg viewBox="0 0 24 24" width="16" height="16">
                      <path
                        fill="currentColor"
                        d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"
                      />
                    </svg>
                  </button>
                </div>

                <AnimatePresence>
                  {selectedOrderId === order.id && (
                    <motion.div
                      className={styles.orderDetails}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <div className={styles.productsGrid}>
                        {order.products.map((product) => (
                          <div key={product.id} className={styles.productCard}>
                            <div className={styles.productImage}>
                              <Image
                                src="/product-placeholder.webp"
                                alt={product.title}
                                width={50}
                                height={50}
                              />
                            </div>
                            <div className={styles.productInfo}>
                              <h4>{product.title}</h4>
                              <div className={styles.productMeta}>
                                {Array.isArray(product.price) &&
                                product.price.length > 0 ? (
                                  <span className={styles.productPrice}>
                                    {formatPriceUSD(product.price[0].value)} UAH
                                  </span>
                                ) : (
                                  <span className={styles.productPrice}>
                                    {formatPriceUSD(product.price)} UAH
                                  </span>
                                )}
                                <span className={styles.productStatus}>
                                  Свободен
                                </span>
                              </div>
                            </div>
                            <button className={styles.productDeleteButton}>
                              <svg viewBox="0 0 24 24" width="16" height="16">
                                <path
                                  fill="currentColor"
                                  d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"
                                />
                              </svg>
                            </button>
                          </div>
                        ))}
                        <button className={styles.addProductButton}>
                          <span>+</span> Добавить продукт
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        )}
      </div>

      <DeleteConfirmation onConfirm={deleteOrder} />
    </div>
  );
};

export default Orders;
