import { useEffect, useState } from 'react';
import { getPayments } from '../../services/api';
import { DollarSign, CheckCircle, XCircle } from 'lucide-react';
import Card from '../../components/ui/Card';
import Table from '../../components/ui/Table';
import ChartArea from '../../components/charts/ChartArea';

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    loadPayments();
  }, [statusFilter]);

  const loadPayments = async () => {
    try {
      setLoading(true);
      const data = await getPayments({ status: statusFilter || undefined });
      setPayments(data);
    } catch (error) {
      console.error('Error loading payments:', error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate revenue summary
  const revenueData = [
    { month: 'Jan', revenue: 12000 },
    { month: 'Feb', revenue: 15000 },
    { month: 'Mar', revenue: 18000 },
    { month: 'Apr', revenue: 14000 },
    { month: 'May', revenue: 22000 },
    { month: 'Jun', revenue: 25000 },
  ];

  const totalRevenue = payments
    .filter((p) => p.status === 'Success')
    .reduce((sum, p) => sum + p.amount, 0);

  const successCount = payments.filter((p) => p.status === 'Success').length;
  const failedCount = payments.filter((p) => p.status === 'Failed').length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-900">Payments</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
              <p className="text-2xl font-bold text-primary">${totalRevenue.toLocaleString()}</p>
            </div>
            <div className="p-3 rounded-lg bg-primary/10">
              <DollarSign className="text-primary" size={24} />
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Successful Payments</p>
              <p className="text-2xl font-bold text-green-600">{successCount}</p>
            </div>
            <div className="p-3 rounded-lg bg-green-100">
              <CheckCircle className="text-green-600" size={24} />
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Failed Payments</p>
              <p className="text-2xl font-bold text-red-600">{failedCount}</p>
            </div>
            <div className="p-3 rounded-lg bg-red-100">
              <XCircle className="text-red-600" size={24} />
            </div>
          </div>
        </Card>
      </div>

      {/* Revenue Chart */}
      <Card>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Revenue Summary</h2>
        <ChartArea data={revenueData} dataKey="revenue" color="#3A3D98" />
      </Card>

      {/* Filters */}
      <Card>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="input-field max-w-xs"
        >
          <option value="">All Payments</option>
          <option value="Success">Success</option>
          <option value="Failed">Failed</option>
        </select>
      </Card>

      {/* Payments Table */}
      <Card>
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          </div>
        ) : payments.length > 0 ? (
          <Table
            headers={['Transaction ID', 'Order ID', 'Amount', 'Method', 'Status', 'Date']}
          >
            {payments.map((payment) => (
              <tr key={payment.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <p className="font-medium text-gray-900">{payment.transactionId}</p>
                </td>
                <td className="px-4 py-3">
                  <p className="text-gray-700">#{payment.orderId}</p>
                </td>
                <td className="px-4 py-3">
                  <p className="font-semibold text-gray-900">${payment.amount}</p>
                </td>
                <td className="px-4 py-3">
                  <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                    {payment.method}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 text-sm rounded-full ${
                      payment.status === 'Success'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {payment.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <p className="text-sm text-gray-600">
                    {new Date(payment.createdAt).toLocaleString()}
                  </p>
                </td>
              </tr>
            ))}
          </Table>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No payments found</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Payments;


