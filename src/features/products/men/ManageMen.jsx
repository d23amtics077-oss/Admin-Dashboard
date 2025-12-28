import React, { useState, useEffect } from "react";
import Card from "../../../components/ui/Card";
import { Edit, Trash2, Eye } from "lucide-react";
import axios from "axios";

const ManageMen = () => {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    axios.get("http://localhost/apifolder/mensProduct.php").then((response) => {
      if (response.status === 200) {
        setProduct(response.data.data);
      }
    });
  }, []);
  function handleDelete(id) {
    const formData = new FormData();
    formData.append("id", id);
    axios
      .post(
        "http://localhost/apifolder/DeleteAPI/deleteMensProducts.php",
        formData
      )
      .then((response) => {
        const json = response.data;
        if (json.status === true) {
          alert(json.message);

          setProduct((prev) => prev.filter((item) => item.id !== id));
        } else {
          alert(json.message);
        }
      })
      .catch(() => alert("Failed to delete  men product."));
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sub Categories</h1>
          <p className="text-gray-600 mt-2">
            View, edit, and manage all sub categories.
          </p>
        </div>
      </div>

      <Card>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="py-3 px-4 text-left">Name</th>
                  <th className="py-3 px-4 text-left">Image</th>
                  <th className="py-3 px-4 text-left">Description</th>
                  <th className="py-3 px-4 text-left">Brand</th>
                  <th className="py-3 px-4 text-left">Base Price</th>
                  <th className="py-3 px-4 text-left">Selling Price</th>
                  <th className="py-3 px-4 text-left">Status</th>
                  <th className="py-3 px-4 text-left">Sub Category</th>
                  <th className="py-3 px-4 text-left">Action</th>
                </tr>
              </thead>

              <tbody>
                {product.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="text-center py-4 text-gray-500">
                      No sub categories found.
                    </td>
                  </tr>
                ) : (
                  product.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="py-4 px-4 font-medium">{item.name}</td>

                      <td className="py-4 px-4">
                        {item.image ? (
                          <img
                            src={`http://localhost/apifolder/uploads/mens/${item.image}`}
                            alt={item.name}
                            style={{
                              width: "60px",
                              height: "60px",
                              objectFit: "cover",
                              borderRadius: "6px",
                            }}
                          />
                        ) : (
                          <span>No Image</span>
                        )}
                      </td>

                      <td className="py-4 px-4">{item.description}</td>
                      <td className="py-4 px-4">{item.brand}</td>
                      <td className="py-4 px-4">{item.base_price}</td>
                      <td className="py-4 px-4">{item.selling_price}</td>
                      <td className="py-4 px-4">{item.status}</td>
                      <td className="py-4 px-4">{item.subcategory_name}</td>

                      <td className="py-4 px-4">
                        <div className="flex gap-2">
                          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                            <Eye size={18} />
                          </button>

                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
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

export default ManageMen;
