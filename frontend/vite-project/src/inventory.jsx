import React, { useState } from "react";

const InventoryApp = () => {
  const [inventory, setInventory] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    categories: "",
    quantity: "",
    price: "",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStockLevel, setSelectedStockLevel] = useState("");

  // Get unique categories from all products
  const categories = [...new Set(inventory.flatMap((item) => item.categories))];

  // Filtered inventory based on search and filters
  const filteredInventory = inventory.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory
      ? item.categories.includes(selectedCategory)
      : true;

    let matchesStock = true;
    if (selectedStockLevel === "low") {
      matchesStock = item.quantity < 10;
    } else if (selectedStockLevel === "out") {
      matchesStock = item.quantity === 0;
    } else if (selectedStockLevel === "in") {
      matchesStock = item.quantity > 0;
    }

    return matchesSearch && matchesCategory && matchesStock;
  });

  const handleAddProduct = (e) => {
    e.preventDefault();
    const categoriesArray = newProduct.categories
      .split(",")
      .map((cat) => cat.trim())
      .filter((cat) => cat !== "");

    setInventory([
      ...inventory,
      {
        ...newProduct,
        id: Date.now(),
        lastUpdated: new Date().toLocaleDateString(),
        quantity: Number(newProduct.quantity),
        price: Number(newProduct.price).toFixed(2),
        categories: categoriesArray,
      },
    ]);
    setIsModalOpen(false);
    setNewProduct({ name: "", categories: "", quantity: "", price: "" });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 relative">
      {/* Add Product Modal - Updated for multiple categories */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-2xl transform transition-all duration-300 ease-in-out z-50">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-t-lg p-4 -m-6 mb-4">
              <h2 className="text-2xl font-bold text-white">Add New Product</h2>
            </div>
            <form onSubmit={handleAddProduct}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">
                    Product Name
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newProduct.name}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">
                    Categories (comma-separated)
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newProduct.categories}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        categories: e.target.value,
                      })
                    }
                    placeholder="e.g., Electronics, Gadgets"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">
                    Quantity
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newProduct.quantity}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, quantity: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    required
                    step="0.01"
                    min="0"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newProduct.price}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, price: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition duration-300"
                >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Rest of the UI remains intact with all original features */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          {inventory.length > 0
            ? "Inventory Dashboard"
            : "Welcome to your inventory dashboard!"}
        </h1>
        {inventory.length === 0 && (
          <>
            <p className="text-lg text-gray-600">
              Start adding products to manage your stock efficiently.
            </p>
            <img
              src="https://cdn-icons-png.flaticon.com/512/3344/3344376.png"
              alt="Empty Inventory"
              className="w-24 h-24 mx-auto mt-6"
            />
          </>
        )}
      </div>

      <div className="flex justify-center gap-4 mb-10">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition duration-300 flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          Add New Product
        </button>
      </div>

      {/* Search & Filter Section - Preserved with category filter working on multiple categories */}
      <div className="flex gap-4 my-6 z-0">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            disabled={inventory.length === 0}
            className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 absolute left-3 top-2.5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          disabled={inventory.length === 0}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <select
          value={selectedStockLevel}
          onChange={(e) => setSelectedStockLevel(e.target.value)}
          disabled={inventory.length === 0}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
        >
          <option value="">All Stock</option>
          <option value="low">Low Stock (&lt;10)</option>
          <option value="in">In Stock</option>
          <option value="out">Out of Stock</option>
        </select>
      </div>

      {/* Inventory Table - Updated to show multiple categories */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left">Product Name</th>
              <th className="px-6 py-3 text-left">Categories</th>
              <th className="px-6 py-3 text-left">Quantity</th>
              <th className="px-6 py-3 text-left">Price</th>
              <th className="px-6 py-3 text-left">Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {filteredInventory.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="px-6 py-4 text-center text-gray-500 italic"
                >
                  {inventory.length === 0
                    ? "No products added yet."
                    : "No matching products found."}
                </td>
              </tr>
            ) : (
              filteredInventory.map((item, index) => (
                <tr
                  key={item.id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-gray-100 transition duration-200`}
                >
                  <td className="px-6 py-4">{item.name}</td>
                  <td className="px-6 py-4">{item.categories.join(", ")}</td>
                  <td
                    className={`px-6 py-4 ${
                      item.quantity === 0
                        ? "text-red-500"
                        : item.quantity < 10
                        ? "text-yellow-600"
                        : "text-gray-700"
                    }`}
                  >
                    {item.quantity}
                  </td>
                  <td className="px-6 py-4">${item.price}</td>
                  <td className="px-6 py-4">{item.lastUpdated}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryApp;
