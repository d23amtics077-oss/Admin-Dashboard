import { useEffect, useState } from 'react';
import Card from '../../components/ui/Card';
import ChartArea from '../../components/charts/ChartArea';
import ChartLine from '../../components/charts/ChartLine';
import ChartPie from '../../components/charts/ChartPie';
import Table from '../../components/ui/Table';
import {
  getDashboardStats,
  getMonthlySales,
  getOrderTrends,
  getCategorySales,
  getLatestOrders,
  getNewSignups,
  getLowInventory,
} from '../../services/api';
import {
  Package,
  FolderTree,
  ShoppingCart,
  DollarSign,
  Calendar,
  Clock,
  Users,
  RefreshCw,
} from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [monthlySales, setMonthlySales] = useState([]);
  const [orderTrends, setOrderTrends] = useState([]);
  const [categorySales, setCategorySales] = useState([]);
  const [latestOrders, setLatestOrders] = useState([]);
  const [newSignups, setNewSignups] = useState([]);
  const [lowInventory, setLowInventory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [
        statsData,
        salesData,
        trendsData,
        categoryData,
        ordersData,
        signupsData,
        inventoryData,
      ] = await Promise.all([
        getDashboardStats(),
        getMonthlySales(),
        getOrderTrends(),
        getCategorySales(),
        getLatestOrders(),
        getNewSignups(),
        getLowInventory(),
      ]);

      setStats(statsData);
      setMonthlySales(salesData);
      setOrderTrends(trendsData);
      setCategorySales(categoryData);
      setLatestOrders(ordersData);
      setNewSignups(signupsData);
      setLowInventory(inventoryData);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ icon: Icon, label, value, color = 'primary' }) => {
    const colorClasses = {
      primary: 'text-primary bg-primary/10',
      accent: 'text-accent bg-accent/10',
    };
    const iconColor = color === 'primary' ? 'text-primary' : 'text-accent';
    const valueColor = color === 'primary' ? 'text-primary' : 'text-accent';
    
    return (
      <Card>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-1">{label}</p>
            <p className={`text-2xl font-bold ${valueColor}`}>{value}</p>
          </div>
          <div className={`p-3 rounded-lg ${colorClasses[color] || colorClasses.primary}`}>
            <Icon className={iconColor} size={24} />
          </div>
        </div>
      </Card>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <button
          onClick={loadDashboardData}
          className="btn-secondary flex items-center gap-2"
        >
          <RefreshCw size={18} />
          Refresh
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Package}
          label="Total Products"
          value={stats?.totalProducts || 0}
          color="primary"
        />
        <StatCard
          icon={FolderTree}
          label="Total Categories"
          value={stats?.totalCategories || 0}
          color="primary"
        />
        <StatCard
          icon={ShoppingCart}
          label="Total Orders"
          value={stats?.totalOrders || 0}
          color="primary"
        />
        <StatCard
          icon={DollarSign}
          label="Total Revenue"
          value={`$${stats?.totalRevenue?.toLocaleString() || 0}`}
          color="accent"
        />
        <StatCard
          icon={Calendar}
          label="Today's Orders"
          value={stats?.todayOrders || 0}
          color="primary"
        />
        <StatCard
          icon={Clock}
          label="Pending Orders"
          value={stats?.pendingOrders || 0}
          color="accent"
        />
        <StatCard
          icon={Users}
          label="Total Users"
          value={stats?.totalUsers || 0}
          color="primary"
        />
        <StatCard
          icon={RefreshCw}
          label="Return Requests"
          value={stats?.returnRequests || 0}
          color="accent"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Sales */}
        <Card>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Monthly Sales</h2>
          <ChartArea data={monthlySales} dataKey="sales" color="#3A3D98" />
        </Card>

        {/* Order Trends */}
        <Card>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Trends</h2>
          <ChartLine data={orderTrends} dataKey="orders" color="#FF6F61" />
        </Card>
      </div>

      {/* Category Sales */}
      <Card>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Category Sales Distribution</h2>
        <ChartPie data={categorySales} />
      </Card>

      {/* Lists Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Latest Orders */}
        <Card>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Latest Orders</h2>
          <div className="space-y-3">
            {latestOrders.length > 0 ? (
              latestOrders.map((order) => (
                <div
                  key={order.id}
                  className="p-3 bg-gray-50 rounded-lg border border-gray-100"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">{order.orderNumber}</p>
                      <p className="text-xs text-gray-500">{order.customer.name}</p>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        order.status === 'Pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-gray-900 mt-2">
                    ${order.total}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No recent orders</p>
            )}
          </div>
        </Card>

        {/* New Signups */}
        <Card>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">New Signups</h2>
          <div className="space-y-3">
            {newSignups.length > 0 ? (
              newSignups.map((user) => (
                <div
                  key={user.id}
                  className="p-3 bg-gray-50 rounded-lg border border-gray-100"
                >
                  <p className="font-medium text-sm">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No new signups</p>
            )}
          </div>
        </Card>

        {/* Low Inventory */}
        <Card>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Low Inventory</h2>
          <div className="space-y-3">
            {lowInventory.length > 0 ? (
              lowInventory.map((product) => (
                <div
                  key={product.id}
                  className="p-3 bg-gray-50 rounded-lg border border-gray-100"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-sm">{product.name}</p>
                    <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">
                      {product.stock} left
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{product.category}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">All items in stock</p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;

