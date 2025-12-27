// Dashboard Service
import { dummyData } from './mockData';

export const dashboardService = {
  // Get dashboard statistics
  getStats: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      totalProducts: dummyData.products.length,
      totalCategories: dummyData.categories.length,
      totalOrders: dummyData.orders.length,
      totalRevenue: 125000.50,
      todayOrders: 12,
      pendingOrders: 5,
      totalUsers: dummyData.users.length,
      returnRequests: 3,
    };
  },

  // Get monthly sales data
  getMonthlySales: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [
      { month: 'Jan', sales: 12000 },
      { month: 'Feb', sales: 15000 },
      { month: 'Mar', sales: 18000 },
      { month: 'Apr', sales: 14000 },
      { month: 'May', sales: 22000 },
      { month: 'Jun', sales: 25000 },
    ];
  },

  // Get order trends
  getOrderTrends: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [
      { week: 'Week 1', orders: 45 },
      { week: 'Week 2', orders: 52 },
      { week: 'Week 3', orders: 48 },
      { week: 'Week 4', orders: 61 },
    ];
  },

  // Get category sales
  getCategorySales: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [
      { name: 'Men', value: 45000 },
      { name: 'Women', value: 55000 },
      { name: 'Kids', value: 15000 },
      { name: 'Accessories', value: 10000 },
    ];
  },

  // Get latest orders
  getLatestOrders: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return dummyData.orders.slice(0, 5);
  },

  // Get new signups
  getNewSignups: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return dummyData.users.slice(0, 5);
  },

  // Get low inventory products
  getLowInventory: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return dummyData.products.filter(p => p.stock < 50).slice(0, 5);
  },
};
