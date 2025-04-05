// Определяем типы для продукта
interface WorkerProduct {
    id: string;
    title: string;
    type: string;
    price: number;
  }
  
  // Определяем типы для результата статистики
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
  
  // Используем типизированную функцию
  function calculateTotalStatistics(products: WorkerProduct[]): ProductStatistics {
    // Simulate intensive calculation
    const startTime = performance.now();
    
    // Delay to simulate complex calculation
    while (performance.now() - startTime < 50) {
      // Busy wait to simulate CPU work
    }
    
    const stats: ProductStatistics = {
      totalProducts: products.length,
      totalValue: products.reduce((sum, p) => sum + p.price, 0),
      averagePrice: products.length 
        ? products.reduce((sum, p) => sum + p.price, 0) / products.length 
        : 0,
      productsByType: {},
      priceRanges: {
        low: 0,
        medium: 0,
        high: 0,
        premium: 0
      }
    };
    
    // Calculate products by type
    products.forEach(product => {
      if (!stats.productsByType[product.type]) {
        stats.productsByType[product.type] = 0;
      }
      stats.productsByType[product.type]++;
      
      // Calculate price ranges
      if (product.price < 20) {
        stats.priceRanges.low++;
      } else if (product.price < 100) {
        stats.priceRanges.medium++;
      } else if (product.price < 500) {
        stats.priceRanges.high++;
      } else {
        stats.priceRanges.premium++;
      }
    });
    
    return stats;
  }
  

  self.addEventListener('message', (event) => {
    const { products, action } = event.data;
    
    switch(action) {
      case 'calculateStats':
        const result = calculateTotalStatistics(products);
     
        self.postMessage({ type: 'calculation_result', data: result });
        break;
      default:

        self.postMessage({ type: 'error', message: 'Unknown action' });
    }
  });