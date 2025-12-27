import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../../../components/ui/Card";
import { Edit, Trash2, Eye, Plus } from "lucide-react";
import axios from "axios";

const ListMainCategory = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get("http://localhost/apifolder/maincategory.php")
            .then((response) => {
                if (response.status === 200) {
                    setCategories(response.data.data);
                }
            })
            .catch((err) => console.log("API Error:", err))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="p-6">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Main Categories</h1>
                    <p className="text-gray-600 mt-2">
                        View, edit, and manage main categories
                    </p>
                </div>

                <Link
                    to="/categories/main/add"
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-800 transition-colors"
                >
                    <Plus size={18} />
                    Add Main Category
                </Link>
            </div>

            <Card>
                <div className="p-6">
                    {/* Loading Text */}
                    {loading && (
                        <p className="text-gray-500 text-lg animate-pulse">
                            Loading categories...
                        </p>
                    )}

                    {/* Table */}
                    {!loading && (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        <th className="text-left py-3 px-4 font-medium text-gray-700">
                                            ID
                                        </th>
                                        <th className="text-left py-3 px-4 font-medium text-gray-700">
                                            Name
                                        </th>
                                        <th className="text-left py-3 px-4 font-medium text-gray-700">
                                            Description
                                        </th>
                                        <th className="text-left py-3 px-4 font-medium text-gray-700">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {categories.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan="4"
                                                className="p-4 text-center text-gray-500 italic"
                                            >
                                                No categories found.
                                            </td>
                                        </tr>
                                    ) : (
                                        categories.map((cat) => (
                                            <tr
                                                key={cat.id}
                                                className="border-b border-gray-100 hover:bg-gray-50"
                                            >
                                                <td className="py-4 px-4">{cat.id}</td>
                                                <td className="py-4 px-4 font-medium">{cat.MainName}</td>
                                                <td className="py-4 px-4">{cat.description}</td>

                                                <td className="py-4 px-4">
                                                    <div className="flex space-x-2">
                                                        <button
                                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                                                            title="View"
                                                        >
                                                            <Eye size={18} />
                                                        </button>

                                                        <Link
                                                            //   to={`/categories/main/edit/${cat.id}`}
                                                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                                                            title="Edit"
                                                        >
                                                            <Edit size={18} />
                                                        </Link>

                                                        <button
                                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                                            title="Delete"
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
                    )}


                </div>
            </Card>
        </div>
    );
};

export default ListMainCategory;
