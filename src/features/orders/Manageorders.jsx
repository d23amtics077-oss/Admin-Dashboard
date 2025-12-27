import { useState } from 'react';
import { Eye, Trash2, Truck } from 'lucide-react';

const Manageorders = () => {
  const [orders] = useState([
    {
      id: 'ORD-101',
      customer: 'Sarah Johnson',
      date: '2023-06-15',
      amount: 145.99,
      items: 2,
      status: 'Processing',
      type: 'Women'
    },
    {
      id: 'ORD-102',
      customer: 'Emily Davis',
      date: '2023-06-14',
      amount: 89.5,
      items: 3,
      status: 'Shipped',
      type: 'Women'
    },
    {
      id: 'ORD-201',
      customer: 'John Smith',
      date: '2023-06-14',
      amount: 120.0,
      items: 1,
      status: 'Processing',
      type: 'Men'
    },
    {
      id: 'ORD-202',
      customer: 'Robert Brown',
      date: '2023-06-13',
      amount: 210.75,
      items: 4,
      status: 'Delivered',
      type: 'Men'
    }
  ]);

  const statusBadge = (status) => {
    switch (status) {
      case 'Processing':
        return 'bg-yellow-100 text-yellow-700';
      case 'Shipped':
        return 'bg-blue-100 text-blue-700';
      case 'Delivered':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-1">All Orders</h1>
      <p className="text-gray-500 mb-6">Manage men's and women's orders together</p>

      <div className="bg-white rounded-2xl shadow p-4">
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search orders..."
            className="border rounded-lg px-3 py-2 w-64"
          />

          <select className="border rounded-lg px-3 py-2">
            <option>All Orders</option>
            <option>Men</option>
            <option>Women</option>
          </select>
        </div>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b text-gray-600">
              <th className="py-3">Order ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Items</th>
              <th>Type</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b last:border-none">
                <td className="py-3 font-medium">{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.date}</td>
                <td>${order.amount}</td>
                <td>{order.items}</td>
                <td>
                  <span className={`px-3 py-1 rounded-full text-sm ${order.type === 'Men' ? 'bg-indigo-100 text-indigo-700' : 'bg-pink-100 text-pink-700'}`}>
                    {order.type}
                  </span>
                </td>
                <td>
                  <span className={`px-3 py-1 rounded-full text-sm ${statusBadge(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="flex gap-3 py-3">
                  <Eye className="text-blue-600 cursor-pointer" size={18} />
                  <Truck className="text-green-600 cursor-pointer" size={18} />
                  <Trash2 className="text-red-600 cursor-pointer" size={18} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
          <span>Showing 1 to {orders.length} of {orders.length} results</span>
          <div className="flex gap-2">
            <button className="border rounded-lg px-3 py-1">Previous</button>
            <button className="bg-indigo-600 text-white rounded-lg px-3 py-1">1</button>
            <button className="border rounded-lg px-3 py-1">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Manageorders;
