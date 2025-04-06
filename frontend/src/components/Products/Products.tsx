"use client";

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { useProducts } from '../../hooks/useProducts';
import { useProductCalculations } from '../../hooks/useProductCalculations';
import { setSelectedType } from '../../redux/productSlice';
import { openDeleteModal } from '../../redux/uiSlice';
import DeleteConfirmation from '../DeleteConfirmation/DeleteConfirmation';
import ProductStatistics from './ProductStatistics';
import { formatDate } from '../../utils/dateFormat';
import { formatPriceUSD, formatPriceEUR } from '../../utils/priceFormat';
import { ProductType } from '../../types/Product';
import styles from './Products.module.scss';

const containerVariants = {
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

const Products: React.FC = () => {
  const dispatch = useDispatch();
  const { products, loading, error, deleteProduct } = useProducts();
  const [filter, setFilter] = useState<ProductType | ''>('');
  const { statistics, isCalculating } = useProductCalculations(products);
  const [showStatistics, setShowStatistics] = useState(false);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as ProductType | '';
    setFilter(value);
    dispatch(setSelectedType(value ? value as ProductType : null));
  };

  const handleDeleteClick = (e: React.MouseEvent, productId: string, title: string) => {
    e.preventDefault();
    dispatch(openDeleteModal({ id: productId, type: 'product', title }));
  };

  const toggleStatistics = () => {
    setShowStatistics(prev => !prev);
  };

  if (loading) return <div className={styles.loader}>Loading products...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.productsContainer}>
      <div className={styles.header}>
        <h1>Products</h1>
        <div className={styles.actions}>
          <div className={styles.filter}>
            <label htmlFor="type-filter">Filter by type:</label>
            <select 
              id="type-filter"
              value={filter}
              onChange={handleFilterChange}
            >
              <option value="">All Products</option>
              {Object.values(ProductType).map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          
          <button 
            className={styles.statsButton}
            onClick={toggleStatistics}
            disabled={products.length === 0 || isCalculating}
          >
            {showStatistics ? 'Hide Statistics' : 'Show Statistics'}
            {isCalculating && ' (Calculating...)'}
          </button>
        </div>
      </div>
      
      {showStatistics && statistics && (
        <ProductStatistics statistics={statistics} />
      )}
      
      {products.length === 0 ? (
        <div className={styles.emptyState}>
          {filter 
            ? `No products found with type "${filter}".` 
            : "No products found. Try adding some!"}
        </div>
      ) : (
        <motion.div 
          className={styles.productsGrid}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {products.map(product => (
            <motion.div 
              key={product.id}
              className={styles.productCard}
              variants={itemVariants}
            >
              <div className={styles.productHeader}>
                <h3>{product.title}</h3>
                <span className={styles.productType}>{product.type}</span>
              </div>
              
              <div className={styles.productDetails}>
                <div className={styles.detailRow}>
                  <span className={styles.label}>Price:</span>
                  <span className={styles.value}>{formatPriceUSD(product.price)}</span>
                  <span className={styles.altValue}>{formatPriceEUR(product.price)}</span>
                </div>
                
                <div className={styles.detailRow}>
                  <span className={styles.label}>Guarantee:</span>
                  <span className={styles.value}>
                    {formatDate(product.guarantee.start)} - {formatDate(product.guarantee.end)}
                  </span>
                </div>
                
                {product.order && (
                  <div className={styles.detailRow}>
                    <span className={styles.label}>Order:</span>
                    <span className={styles.value}>{product.order.title}</span>
                  </div>
                )}
              </div>
              
              <div className={styles.actions}>
                <button 
                  className={styles.deleteButton}
                  onClick={(e) => handleDeleteClick(e, product.id, product.title)}
                >
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
      
      <DeleteConfirmation onConfirm={deleteProduct} />
    </div>
  );
};

export default Products;