import { useEffect, useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";

// Dummy API Functions (replace with your backend)
const getOffers = async () => {
  return [
    {
      id: 1,
      title: "Winter Sale 50% OFF",
      description: "Get flat 50% off on all winter wear.",
      status: 1,
    },
    {
      id: 2,
      title: "Buy 1 Get 1 Free",
      description: "Special BOGO offer on selected items.",
      status: 0,
    },
  ];
};

export default function Offers() {
  const [offers, setOffers] = useState([]);
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    const data = await getOffers();
    setOffers(data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId) {
      setOffers(
        offers.map((o) =>
          o.id === editId ? { ...o, ...formData } : o
        )
      );
      setEditId(null);
    } else {
      const newOffer = {
        id: Date.now(),
        ...formData,
        status: 1,
      };
      setOffers([...offers, newOffer]);
    }

    setFormData({ title: "", description: "" });
  };

  const handleEdit = (offer) => {
    setEditId(offer.id);
    setFormData({ title: offer.title, description: offer.description });
  };

  const handleDelete = (id) => {
    setOffers(offers.filter((o) => o.id !== id));
  };

  const toggleStatus = (id) => {
    setOffers(
      offers.map((o) =>
        o.id === id ? { ...o, status: o.status ? 0 : 1 } : o
      )
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Offers Management</h1>

      {/* Offer Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-5 rounded-xl shadow mb-6 space-y-4"
      >
        <h2 className="text-xl font-semibold">{editId ? "Edit Offer" : "Add New Offer"}</h2>

        <input
          type="text"
          placeholder="Offer Title"
          className="w-full p-3 border rounded-lg"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />

        <textarea
          placeholder="Offer Description"
          className="w-full p-3 border rounded-lg"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus size={18} /> {editId ? "Update Offer" : "Add Offer"}
        </button>
      </form>

      {/* Offers Table */}
      <div className="bg-white p-5 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-3">All Offers</h2>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Description</th>
              <th className="p-3 text-center">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {offers.map((offer) => (
              <tr key={offer.id} className="border-b">
                <td className="p-3">{offer.title}</td>
                <td className="p-3">{offer.description}</td>
                <td className="p-3 text-center">
                  <span
                    onClick={() => toggleStatus(offer.id)}
                    className={`px-3 py-1 rounded text-white cursor-pointer ${
                      offer.status ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    {offer.status ? "Active" : "Inactive"}
                  </span>
                </td>

                <td className="p-3 text-center flex justify-center gap-3">
                  <button
                    onClick={() => handleEdit(offer)}
                    className="text-blue-600"
                  >
                    <Edit size={20} />
                  </button>

                  <button
                    onClick={() => handleDelete(offer.id)}
                    className="text-red-600"
                  >
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}