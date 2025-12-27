import React, { useRef } from "react";
import Card from "../../../components/ui/Card";
import axios from "axios";

const AddMainCategory = () => {
  const catNameREf = useRef();
  const catDescRef = useRef();

  const addCategory = () => {
    const catNameValue = catNameREf.current.value;
    const catDescValue = catDescRef.current.value;

    const formData = new FormData();

    formData.append("categoryName", catNameValue);

    formData.append("CatDEscription", catDescValue);

    console.log(formData);

    axios
      .post("http://localhost/apifolder/AddAPI/addMainCAtegory.php", formData)
      .then((response) => {
        alert("walcoom");
      });
  };
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Add Main Category</h1>
        <p className="text-gray-600 mt-2">
          Create a new main category for products
        </p>
      </div>

      <Card>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                placeholder="Enter main category name"
                ref={catNameREf}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                placeholder="Enter slug"
                ref={catDescRef}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-blue-800 transition-colors"
              onClick={addCategory}
            >
              Add Main Category
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AddMainCategory;

