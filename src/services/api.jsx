// API service layer with dummy data for PHP-compatible REST API structure
import axios from 'axios';

// Base URL - would be replaced with actual API endpoint
const API_BASE_URL = 'http://localhost/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Dummy data generators
const generateDummyData = () => {
  const products = [
    {
      id: 1,
      name: 'Classic Denim Jacket',
      price: 89.99,
      discount: 15,
      stock: 45,
      category: 'Men',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Blue', 'Black'],
      fabric: 'Denim',
      fit: 'Regular',
      images: ['/api/images/product1.jpg'],
      featured: true,
      newArrival: false,
      bestSeller: true,
      seoTitle: 'Classic Denim Jacket - Premium Quality',
      seoDescription: 'Stylish denim jacket for men',
    },
    {
      id: 2,
      name: 'Floral Summer Dress',
      price: 59.99,
      discount: 20,
      stock: 32,
      category: 'Women',
      sizes: ['XS', 'S', 'M', 'L'],
      colors: ['Pink', 'White'],
      fabric: 'Cotton',
      fit: 'Regular',
      images: ['/api/images/product2.jpg'],
      featured: true,
      newArrival: true,
      bestSeller: false,
      seoTitle: 'Floral Summer Dress - Elegant Style',
      seoDescription: 'Beautiful floral dress for summer',
    },
  ];

  const categories = [
    { id: 1, name: 'Men', image: '/api/images/cat-men.jpg', active: true },
    { id: 2, name: 'Women', image: '/api/images/cat-women.jpg', active: true },
    { id: 3, name: 'Kids', image: '/api/images/cat-kids.jpg', active: true },
    { id: 4, name: 'Accessories', image: '/api/images/cat-acc.jpg', active: true },
  ];

  const orders = [
    {
      id: 1,
      orderNumber: 'ORD-2024-001',
      customer: { name: 'John Doe', email: 'john@example.com', phone: '+1234567890' },
      items: [
        { product: 'Classic Denim Jacket', quantity: 1, price: 89.99, size: 'M', color: 'Blue' },
      ],
      total: 89.99,
      status: 'Pending',
      shippingAddress: {
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        zip: '10001',
        country: 'USA',
      },
      payment: { method: 'Credit Card', status: 'Paid', transactionId: 'TXN-12345' },
      createdAt: '2024-01-15T10:30:00Z',
    },
  ];

  const users = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1234567890',
      role: 'Customer',
      status: 'Active',
      createdAt: '2024-01-01T00:00:00Z',
    },
  ];

  const inquiries = [
    {
      id: 1,
      name: 'Jane Smith',
      email: 'jane@example.com',
      subject: 'Product Inquiry',
      message: 'Do you have this in size XL?',
      status: 'Pending',
      createdAt: '2024-01-15T09:00:00Z',
    },
  ];

  return { products, categories, orders, users, inquiries };
};

// Store dummy data
let dummyData = generateDummyData();

// Dashboard API
export const getDashboardStats = async () => {
  // Simulate API call
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
};

export const getMonthlySales = async () => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return [
    { month: 'Jan', sales: 12000 },
    { month: 'Feb', sales: 15000 },
    { month: 'Mar', sales: 18000 },
    { month: 'Apr', sales: 14000 },
    { month: 'May', sales: 22000 },
    { month: 'Jun', sales: 25000 },
  ];
};

export const getOrderTrends = async () => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return [
    { week: 'Week 1', orders: 45 },
    { week: 'Week 2', orders: 52 },
    { week: 'Week 3', orders: 48 },
    { week: 'Week 4', orders: 61 },
  ];
};

export const getCategorySales = async () => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return [
    { name: 'Men', value: 45000 },
    { name: 'Women', value: 55000 },
    { name: 'Kids', value: 15000 },
    { name: 'Accessories', value: 10000 },
  ];
};

export const getLatestOrders = async () => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return dummyData.orders.slice(0, 5);
};

export const getNewSignups = async () => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return dummyData.users.slice(0, 5);
};

export const getLowInventory = async () => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return dummyData.products.filter(p => p.stock < 50).slice(0, 5);
};

// Products API
export const getProducts = async (params = {}) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  let filtered = [...dummyData.products];
  
  if (params.search) {
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(params.search.toLowerCase())
    );
  }
  
  if (params.category) {
    filtered = filtered.filter(p => p.category === params.category);
  }
  
  return {
    data: filtered,
    total: filtered.length,
    page: params.page || 1,
    perPage: params.perPage || 10,
  };
};

export const getProduct = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  const product = dummyData.products.find(p => p.id === parseInt(id));
  if (!product) throw new Error('Product not found');
  return product;
};

export const createProduct = async (data) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const newProduct = {
    id: dummyData.products.length + 1,
    ...data,
    createdAt: new Date().toISOString(),
  };
  dummyData.products.push(newProduct);
  return newProduct;
};

export const updateProduct = async (id, data) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const index = dummyData.products.findIndex(p => p.id === parseInt(id));
  if (index === -1) throw new Error('Product not found');
  dummyData.products[index] = { ...dummyData.products[index], ...data };
  return dummyData.products[index];
};

export const deleteProduct = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  dummyData.products = dummyData.products.filter(p => p.id !== parseInt(id));
  return { success: true };
};

// Categories API
export const getCategories = async () => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return dummyData.categories;
};

export const getCategory = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return dummyData.categories.find(c => c.id === parseInt(id));
};

export const createCategory = async (data) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const newCategory = {
    id: dummyData.categories.length + 1,
    ...data,
  };
  dummyData.categories.push(newCategory);
  return newCategory;
};

export const updateCategory = async (id, data) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const index = dummyData.categories.findIndex(c => c.id === parseInt(id));
  if (index === -1) throw new Error('Category not found');
  dummyData.categories[index] = { ...dummyData.categories[index], ...data };
  return dummyData.categories[index];
};

// Orders API
export const getOrders = async (params = {}) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  let filtered = [...dummyData.orders];
  
  if (params.status) {
    filtered = filtered.filter(o => o.status === params.status);
  }
  
  return {
    data: filtered,
    total: filtered.length,
  };
};

export const getOrder = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return dummyData.orders.find(o => o.id === parseInt(id));
};

export const updateOrderStatus = async (id, status) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const index = dummyData.orders.findIndex(o => o.id === parseInt(id));
  if (index === -1) throw new Error('Order not found');
  dummyData.orders[index].status = status;
  return dummyData.orders[index];
};

// Users API
export const getUsers = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return dummyData.users;
};

export const getUser = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return dummyData.users.find(u => u.id === parseInt(id));
};

export const updateUserStatus = async (id, status) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const index = dummyData.users.findIndex(u => u.id === parseInt(id));
  if (index === -1) throw new Error('User not found');
  dummyData.users[index].status = status;
  return dummyData.users[index];
};

// Inquiries API
export const getInquiries = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return dummyData.inquiries;
};

export const updateInquiryStatus = async (id, status) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const index = dummyData.inquiries.findIndex(i => i.id === parseInt(id));
  if (index === -1) throw new Error('Inquiry not found');
  dummyData.inquiries[index].status = status;
  return dummyData.inquiries[index];
};

export const replyToInquiry = async (id, reply) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const index = dummyData.inquiries.findIndex(i => i.id === parseInt(id));
  if (index === -1) throw new Error('Inquiry not found');
  dummyData.inquiries[index].reply = reply;
  dummyData.inquiries[index].status = 'Completed';
  return dummyData.inquiries[index];
};

// Payments API
export const getPayments = async (params = {}) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const payments = [
    {
      id: 1,
      orderId: 1,
      amount: 89.99,
      method: 'Razorpay',
      status: 'Success',
      transactionId: 'TXN-12345',
      createdAt: '2024-01-15T10:30:00Z',
    },
  ];
  
  if (params.status) {
    return payments.filter(p => p.status === params.status);
  }
  
  return payments;
};

// Settings API
export const getSettings = async () => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return {
    homeBanner: '/api/images/banner.jpg',
    aboutUs: 'We are a premium clothing brand...',
    contactPhone: '+1234567890',
    contactEmail: 'support@clothingbrand.com',
    supportEmail: 'support@clothingbrand.com',
    logo: '/api/images/logo.png',
    seoTitle: 'Clothing Brand - Premium Fashion',
    seoDescription: 'Shop the latest fashion trends',
  };
};

export const updateSettings = async (data) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return data;
};

// Auth API
export const login = async (email, password) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  if (email === 'admin@example.com' && password === 'admin123') {
    const token = 'dummy-jwt-token-' + Date.now();
    localStorage.setItem('token', token);
    return { token, user: { id: 1, name: 'Admin User', email: 'admin@example.com' } };
  }
  throw new Error('Invalid credentials');
};

export const logout = () => {
  localStorage.removeItem('token');
};

export const changePassword = async (oldPassword, newPassword) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return { success: true };
};

export default api;


