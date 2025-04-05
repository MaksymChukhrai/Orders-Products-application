// src/hooks/useProductCalculations.ts
import { useState, useEffect } from 'react';
import { Product } from '../types/Product';

interface ProductStatistics {
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
}

export const useProductCalculations = (products: Product[]) => {
  const [statistics, setStatistics] = useState<ProductStatistics | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  useEffect(() => {
    if (!products.length) {
      setStatistics(null);
      return;
    }

    let worker: Worker | null = null;

    const startCalculation = () => {
      setIsCalculating(true);
      
      // Create a new worker
      worker = new Worker(new URL('../workers/productCalculations.worker.ts', import.meta.url), {
        type: 'module'
      });

      // Listen for messages from the worker
      worker.onmessage = (event) => {
        if (event.data.type === 'calculation_result') {
          setStatistics(event.data.data);
          setIsCalculating(false);
        } else if (event.data.type === 'error') {
          console.error('Worker error:', event.data.message);
          setIsCalculating(false);
        }
      };

      // Send products to the worker
      worker.postMessage({ 
        action: 'calculateStats', 
        products 
      });
    };

    startCalculation();

    // Clean up the worker when the component unmounts
    return () => {
      if (worker) {
        worker.terminate();
      }
    };
  }, [products]);

  return { statistics, isCalculating };
};