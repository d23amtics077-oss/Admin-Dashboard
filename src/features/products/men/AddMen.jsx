import React, { useRef, useState } from "react";
import Card from "../../../components/ui/Card";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddMen = () => {
  const nameRef = useRef();
  const brandRef = useRef();
  const basePriceRef = useRef();
  const sellingPriceRef = useRef();
  const subCategoryRef = useRef();
  const statusRef = useRef();
  const descRef = useRef();
  const imageRef = useRef();

  const [preview, setPreview] = useState(null);

  const nav = useNavigate();

  const addMen = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", nameRef.current.value);
    formData.append("brand", brandRef.current.value);
    formData.append("base_price", basePriceRef.current.value);
    formData.append("selling_price", sellingPriceRef.current.value);
    formData.append("sub_category_id", subCategoryRef.current.value);
    formData.append("status", statusRef.current.value);
    formData.append("description", descRef.current.value);
    formData.append("image", imageRef.current.value);

    if (imageRef.current.files[0]) {
      formData.append("image", imageRef.current.files[0]);
    }

    axios
      .post("http://localhost/apifolder/AddAPI/AddMensProducts.php", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        alert("Product Added Successfully");
        nav("/products/men/manage");
      })
      .catch((err) => {
        console.error(err);
        alert("Something went wrong");
      });
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Add Men's Product</h1>
        <p className="text-gray-600">Add new men's product to inventory</p>
      </div>

      <Card>
        <div className="p-6">
          <form className="space-y-6" onSubmit={addMen}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2">Product Name</label>
                <input
                  ref={nameRef}
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block mb-2">Brand Name</label>
                <input
                  ref={brandRef}
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block mb-2">Base Price</label>
                <input
                  ref={basePriceRef}
                  type="number"
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block mb-2">Selling Price</label>
                <input
                  ref={sellingPriceRef}
                  type="number"
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block mb-2">Sub Category</label>
                <select
                  ref={subCategoryRef}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                >
                  <option value="">Select</option>
                  <option value="1">T-Shirts</option>
                  <option value="2">Shirts</option>
                  <option value="3">Jeans</option>
                  <option value="4">Jackets</option>
                  <option value="5">Hoodies</option>
                </select>
              </div>

              <div>
                <label className="block mb-2">Status</label>
                <select
                  ref={statusRef}
                  className="w-full px-4 py-2 border rounded-lg"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block mb-2">Description</label>
              <textarea
                ref={descRef}
                rows="4"
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            {/* 🔥 IMAGE UPLOAD UI */}
            <div>
              <label className="block mb-2">Product Image</label>

              <div
                onClick={() => imageRef.current.click()}
                style={{
                  border: "2px dashed #cbd5e1",
                  borderRadius: "10px",
                  padding: "20px",
                  textAlign: "center",
                  cursor: "pointer",
                  background: "#f8fafc",
                }}
              >
                {preview ? (
                  <img
                    src={preview}
                    alt="preview"
                    style={{
                      width: "140px",
                      height: "140px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                ) : (
                  <>
                    <p className="font-medium">Click to upload image</p>
                    <small>JPG / PNG only</small>
                  </>
                )}
              </div>

              <input
                type="file"
                accept="image/*"
                ref={imageRef}
                hidden
                onChange={(e) =>
                  setPreview(URL.createObjectURL(e.target.files[0]))
                }
              />
            </div>

            <div className="flex justify-end gap-4">
              <button
                type="button"
                className="px-6 py-2 border rounded-lg"
                onClick={() => nav(-1)}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg"
              >
                Add Product
              </button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default AddMen;
