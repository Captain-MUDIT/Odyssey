import React, { useState } from "react";
import { Plus, Search } from "lucide-react";

const PurchasePreview = () => {
  const [supplierName, setSupplierName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [availableProducts] = useState([
    { id: 100000001, name: "Samsung Galaxy S7 Edge - 32GB", rate: 800 },
    {
      id: 100000002,
      name: "Apple MacBook Pro M2B1611L Intel Core i5",
      rate: 900,
    },
    { id: 100000004, name: "Nikon D3500 - 24 MP SLR Camera", rate: 900 },
    { id: 100000006, name: "Xtouch Z1 Dual Sim - 16GB", rate: 858 },
  ]);

  const filteredProducts = availableProducts.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addProduct = (product) => {
    const existingItem = items.find((item) => item.id === product.id);
    if (existingItem) return;

    setItems([
      ...items,
      {
        ...product,
        quantity: 1,
        amount: product.rate,
      },
    ]);
    setSearchQuery("");
    setShowSuggestions(false);
  };

  const updateQuantity = (id, newQuantity) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          const quantity = Math.max(1, parseInt(newQuantity) || 1);
          return {
            ...item,
            quantity,
            amount: quantity * item.rate,
          };
        }
        return item;
      })
    );
  };

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const subtotal = items.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm mb-1">Supplier Name:</label>
            <input
              className="w-full p-2 border rounded"
              value={supplierName}
              onChange={(e) => setSupplierName(e.target.value)}
              placeholder="Enter supplier name"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Company Name:</label>
            <input
              className="w-full p-2 border rounded"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Enter company name"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Purchase Date:</label>
            <input
              className="w-full p-2 border rounded"
              type="date"
              value={purchaseDate}
              onChange={(e) => setPurchaseDate(e.target.value)}
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-4">
            <div className="relative mb-4">
              <div className="relative">
                <input
                  type="text"
                  className="w-full p-2 pl-10 border rounded"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  placeholder="Search products..."
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>

              {showSuggestions && (
                <div className="absolute z-10 w-full bg-white mt-1 rounded-md shadow-lg border max-h-60 overflow-auto">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="p-2 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
                      onClick={() => addProduct(product)}
                    >
                      <span>{product.name}</span>
                      <span className="text-gray-500">₹{product.rate}</span>
                    </div>
                  ))}
                  <div className="p-2 hover:bg-gray-100 cursor-pointer text-blue-600 flex items-center">
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Product
                  </div>
                </div>
              )}
            </div>

            <div className="border rounded-lg h-64 overflow-y-auto">
              <table className="w-full">
                <thead className="sticky top-0 bg-white border-b">
                  <tr>
                    <th className="text-left p-2">#</th>
                    <th className="text-left p-2">Bar Code</th>
                    <th className="text-left p-2">Item Name</th>
                    <th className="text-left p-2">Quantity</th>
                    <th className="text-left p-2">Purchase Rate</th>
                    <th className="text-left p-2">Total Amount</th>
                    <th className="text-left p-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr key={item.id} className="border-b">
                      <td className="p-2">{index + 1}</td>
                      <td className="p-2">{item.id}</td>
                      <td className="p-2">{item.name}</td>
                      <td className="p-2 w-24">
                        <input
                          type="number"
                          className="w-full p-2 border rounded"
                          min="1"
                          value={item.quantity}
                          onChange={(e) =>
                            updateQuantity(item.id, e.target.value)
                          }
                        />
                      </td>
                      <td className="p-2">{item.rate}</td>
                      <td className="p-2">{item.amount}</td>
                      <td className="p-2">
                        <button
                          className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                          onClick={() => removeItem(item.id)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {items.length > 0 && (
              <div className="text-right mt-4 font-medium">
                Total Items: {items.length} | Subtotal: ₹{subtotal}
              </div>
            )}
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">Sub Total</label>
              <input
                className="w-full p-2 border rounded bg-gray-50"
                value={`₹${subtotal}`}
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Discount %</label>
              <input className="w-full p-2 border rounded" defaultValue="0" />
            </div>
            <div>
              <label className="block text-sm mb-1">Payment</label>
              <input className="w-full p-2 border rounded" defaultValue="0" />
            </div>
            <div>
              <label className="block text-sm mb-1">Change</label>
              <input
                className="w-full p-2 border rounded bg-gray-50"
                defaultValue="0"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Net Payment</label>
              <input
                className="w-full p-2 border rounded bg-gray-50"
                defaultValue="0"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Due</label>
              <input
                className="w-full p-2 border rounded bg-gray-50"
                defaultValue="0"
                readOnly
              />
            </div>
          </div>

          <div className="mt-6 text-right">
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
              Create New Purchase
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchasePreview;
