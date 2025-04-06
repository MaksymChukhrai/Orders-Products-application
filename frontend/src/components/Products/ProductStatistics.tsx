"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { formatPriceUSD } from '../../utils/priceFormat';
import styles from './ProductStatistics.module.scss';

interface ProductStatisticsProps {
  statistics: {
    totalProducts: number;
    totalValue: number;
    averagePrice: number;
    productsByType: Record<string, number>;
    priceRanges: {
      low: number;
      medium: number;
      high: number;
      premium: number;
    };
  };
}

const containerVariants = {
  hidden: { opacity: 0, height: 0 },
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

const ProductStatistics: React.FC<ProductStatisticsProps> = ({ statistics }) => {
  return (
    <motion.div 
      className={styles.statisticsContainer}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <h2>Product Statistics</h2>
      
      <div className={styles.statsGrid}>
        <div className={styles.statsCard}>
          <h3>Overview</h3>
          <ul>
            <li>
              <span>Total Products:</span>
              <span>{statistics.totalProducts}</span>
            </li>
            <li>
              <span>Total Value:</span>
              <span>{formatPriceUSD(statistics.totalValue)}</span>
            </li>
            <li>
              <span>Average Price:</span>
              <span>{formatPriceUSD(statistics.averagePrice)}</span>
            </li>
          </ul>
        </div>
        
        <div className={styles.statsCard}>
          <h3>Products by Type</h3>
          <ul>
            {Object.entries(statistics.productsByType).map(([type, count]) => (
              <li key={type}>
                <span>{type}:</span>
                <span>{count}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className={styles.statsCard}>
          <h3>Price Ranges</h3>
          <ul>
            <li>
              <span>Under $20 (Low):</span>
              <span>{statistics.priceRanges.low}</span>
            </li>
            <li>
              <span>$20-$99 (Medium):</span>
              <span>{statistics.priceRanges.medium}</span>
            </li>
            <li>
              <span>$100-$499 (High):</span>
              <span>{statistics.priceRanges.high}</span>
            </li>
            <li>
              <span>$500+ (Premium):</span>
              <span>{statistics.priceRanges.premium}</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className={styles.note}>
        <p>
          <strong>Note:</strong> These statistics are calculated in a separate thread using Web Workers to avoid blocking the UI.
        </p>
      </div>
    </motion.div>
  );
};

export default ProductStatistics;