import React from "react";
import Card from "../../../components/ui/Card";
import axios from "axios";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const AddSubCategory = () => {
  const submainCatIdRef = useRef();
  const subNameRef = useRef();
  const subDescRef = useRef();

  const nav = useNavigate();

  const addSubCategory = () => {
    const formData = new FormData();

    formData.append("mainCatId", submainCatIdRef.current.value);
    formData.append("Name", subNameRef.current.value);
    formData.append("description", subDescRef.current.value);

    console.log(formData);

    axios
      .post("http://localhost/apifolder/AddAPI/addSubCategory.php", formData)
      .then((response) => {
        alert("data inserted");
        nav("/categories/sub/manage");
      });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Add Sub Category</h1>
        <p className="text-gray-500 mt-1">Create and manage sub categories</p>
      </div>

      {/* Card */}
      <Card>
        <div className="p-6 space-y-6">
          {/* Main Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Main Category
            </label>
            <select
              ref={submainCatIdRef}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">Select Main Category</option>
              <option value="1">Men Clothing</option>
              <option value="2">Women Clothing</option>
            </select>
          </div>

          {/* Sub Category Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sub Category Name
            </label>
            <input
              ref={subNameRef}
              type="text"
              placeholder="Eg. T-Shirts"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              ref={subDescRef}
              rows="4"
              placeholder="Write sub category description..."
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              className="px-6 py-2 border rounded-lg text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              onClick={addSubCategory}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Add Sub Category
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AddSubCategory;
