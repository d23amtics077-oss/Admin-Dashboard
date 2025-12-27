import React, { useState, useEffect } from 'react';

import { Edit, Trash2, Eye } from 'lucide-react';
import axios from 'axios';
const Manage = () => {

  const [customer, setCustomer] = useState([]);

  useEffect(() => {


    axios.get("http://localhost/apifolder/viewCustomer.php").then((response) => {

      if (response.status == 200) {

        

        const data = response.data.data;
        setCustomer(data)

        console.log(response.data.data)
      }
    })

  }, []);



  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sub Categories</h1>
          <p className="text-gray-600 mt-2">
            View, edit, and manage all sub categories.
          </p>
        </div>
        {/* <Link
          to="/categories/sub/add"
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-800"
        >
          <Plus size={18} />
          Add Sub Category
        </Link> */}
      </div>

      <Card>
        <div className="p-6">
          {/* Search + Filter */}
          <div className="flex justify-between items-center mb-6">
            <div className="relative w-64">
              {/* <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              /> */}
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"


              />
            </div>

            <select
              className="px-4 py-2 border border-gray-300 rounded-lg"


            >
              <option value="">All main categories</option>
              <option value="1">Men</option>
              <option value="2">Women</option>
            </select>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">

            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="py-3 px-4 text-left">name</th>
                  <th className="py-3 px-4 text-left">Description</th>
                  <th className="py-3 px-4 text-left">brand</th>
                  <th className="py-3 px-4 text-left">base_price</th>
                  <th className="py-3 px-4 text-left">selling_price</th>
                  <th className="py-3 px-4 text-left">status</th>
                
                </tr>
              </thead>

              <tbody>
                {customer.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-4 text-gray-500">
                      No sub categories found.
                    </td>
                  </tr>
                ) : (
                  customer.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="py-4 px-4 font-medium">{item.name}</td>
                      <td className="py-4 px-4">{item.password}</td>
                      <td className="py-4 px-4">{item.email}</td>
                      <td className="py-4 px-4">{item.phone}</td>
                      <td className="py-4 px-4">{item.address}</td>
                    


                      {/* ---- FIXED MAIN CATEGORY DISPLAY ---- */}
                      <td className="py-4 px-4">
                        {item.MainName}
                      </td>

                      <td className="py-4 px-4">
                        <div className="flex gap-2">
                          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                            <Eye size={18} />
                          </button>

                          {/* <Link
                            to={`/categories/sub/edit/${item.id}`}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                          >
                            <Edit size={18} />
                          </Link> */}

                          <button
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                            onClick={() => handleDelete(item.id)}
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

          </div>


        </div>
      </Card>
    </div>
  );
};

export default Manage;