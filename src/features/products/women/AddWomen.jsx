import React, { useRef, useState } from "react";
import Card from "../../../components/ui/Card";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddWomen = () => {
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

  const addWomen = (e) => {
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
 console.log("Name:", nameRef.current?.value);
    // ✅ IMAGE (ONLY ADDITION)
    if (imageRef.current.files[0]) {
      formData.append("image", imageRef.current.files[0]);
    }

    axios
      .post(
        "http://localhost/apifolder/AddAPI/AddWomensProducts.php",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then(() => {
        alert("Product Added Successfully");
        nav("/products/women/manage");
      })
      .catch(() => {
        alert("Something went wrong");
      });
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Add Women's Product
        </h1>
        <p className="text-gray-600 mt-2">
          Add new women's product to inventory
        </p>
      </div>

      <Card>
        <div className="p-6">
          <form className="space-y-6" onSubmit={addWomen}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Product Name
                </label>
                <input
                  ref={nameRef}
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Brand Name
                </label>
                <input
                  ref={brandRef}
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Base Price
                </label>
                <input
                  ref={basePriceRef}
                  type="number"
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Selling Price
                </label>
                <input
                  ref={sellingPriceRef}
                  type="number"
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Sub Category
                </label>
                <select
                  ref={subCategoryRef}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                >
                  <option value="">Select Sub Category</option>
                  <option value="6">Tops</option>
                  <option value="7">Kurtis</option>
                  <option value="8">Western Wear</option>
                  <option value="9">Jean's</option>
                  <option value="10">Dresses</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Status</label>
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
              <label className="block text-sm font-medium mb-2">
                Description
              </label>
              <textarea
                ref={descRef}
                rows="4"
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            {/* 🔥 IMAGE UPLOAD (SAME AS MEN, NO UI CHANGE) */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Product Image
              </label>

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
                className="px-6 py-2 bg-primary text-white rounded-lg"
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

export default AddWomen;
