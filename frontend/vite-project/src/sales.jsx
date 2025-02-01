import React, { useState, useMemo } from "react";
import { X } from "lucide-react";

const SalesEntryForm = () => {
  // Previous code remains the same until the input fields
  const productCatalog = [
    {
      id: 1,
      name: "Samsung Galaxy S7 Edge - 32GB",
      stock: 237,
      rate: 110.0,
      category: "Mobile Phones",
    },
    {
      id: 2,
      name: "Apple MacBook Pro MD101LL-Int",
      stock: 326,
      rate: 210.0,
      category: "Laptops",
    },
    {
      id: 3,
      name: "Bata Men's Sports Shoes",
      stock: 15,
      rate: 305.0,
      category: "Footwear",
    },
    {
      id: 4,
      name: "iPhone 13 Pro - 256GB",
      stock: 45,
      rate: 999.0,
      category: "Mobile Phones",
    },
  ];

  const categories = useMemo(() => {
    return [...new Set(productCatalog.map((product) => product.category))];
  }, []);

  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    billingAddress: "",
    salesDate: "",
    dueDate: "",
  });

  const [items, setItems] = useState([
    {
      id: 1,
      category: "",
      productId: null,
      name: "",
      stock: 0,
      quantity: "", // Changed from 0 to empty string for better input handling
      rate: 0,
      gstPercentage: 18,
    },
  ]);

  // Previous calculation functions remain the same
  const calculateGrandTotal = () => {
    return items.reduce((sum, item) => {
      const subtotal = Number(item.quantity || 0) * item.rate;
      const gstAmount = (subtotal * item.gstPercentage) / 100;
      return sum + subtotal + gstAmount;
    }, 0);
  };

  const calculateTotalGST = () => {
    return items.reduce((sum, item) => {
      const subtotal = Number(item.quantity || 0) * item.rate;
      const gstAmount = (subtotal * item.gstPercentage) / 100;
      return sum + gstAmount;
    }, 0);
  };

  const handleCategorySelect = (index, category) => {
    const newItems = [...items];
    newItems[index] = {
      ...newItems[index],
      category: category,
      productId: null,
      name: "",
      stock: 0,
      rate: 0,
    };
    setItems(newItems);
  };

  const handleProductSelect = (index, productId) => {
    const selectedProduct = productCatalog.find(
      (p) => p.id === Number(productId)
    );
    const newItems = [...items];

    if (selectedProduct) {
      newItems[index] = {
        ...newItems[index],
        productId: selectedProduct.id,
        name: selectedProduct.name,
        stock: selectedProduct.stock,
        rate: selectedProduct.rate,
      };
    } else {
      newItems[index] = {
        ...newItems[index],
        productId: null,
        name: "",
        stock: 0,
        rate: 0,
      };
    }

    setItems(newItems);
  };

  const handleItemUpdate = (index, field, value) => {
    const newItems = [...items];

    if (field === "quantity") {
      // Allow empty string or numbers only
      if (value === "" || (!isNaN(value) && Number(value) >= 0)) {
        newItems[index][field] = value;
      }
    } else if (field === "gstPercentage") {
      // Allow empty string or numbers within 0-100 range
      if (
        value === "" ||
        (!isNaN(value) && Number(value) >= 0 && Number(value) <= 100)
      ) {
        newItems[index][field] = value;
      }
    } else {
      newItems[index][field] = value;
    }

    setItems(newItems);
  };

  const handleRemoveItem = (index) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const addNewItem = () => {
    setItems([
      ...items,
      {
        id: items.length + 1,
        category: "",
        productId: null,
        name: "",
        stock: 0,
        quantity: "", // Changed from 0 to empty string
        rate: 0,
        gstPercentage: 18,
      },
    ]);
  };

  const getProductsByCategory = (category) => {
    return productCatalog.filter((product) => product.category === category);
  };

  const [paidAmount, setPaidAmount] = useState(""); // New state for paid amount

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      {/* Previous basic information section remains the same */}
      <div className="bg-black text-white p-4 -mx-6 -mt-6 rounded-t-lg">
        <h2 className="text-lg font-semibold">BASIC INFORMATION</h2>
      </div>

      <div className="mt-6">
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div>
            <label className="block text-sm mb-1">Customer Name:</label>
            <input
              type="text"
              className="w-full border rounded p-2"
              value={customerInfo.name}
              onChange={(e) =>
                setCustomerInfo({ ...customerInfo, name: e.target.value })
              }
              placeholder="Enter customer name"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Phone Number:</label>
            <input
              type="tel"
              className="w-full border rounded p-2"
              value={customerInfo.phone}
              onChange={(e) =>
                setCustomerInfo({ ...customerInfo, phone: e.target.value })
              }
              placeholder="Enter phone number"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Email:</label>
            <input
              type="email"
              className="w-full border rounded p-2"
              value={customerInfo.email}
              onChange={(e) =>
                setCustomerInfo({ ...customerInfo, email: e.target.value })
              }
              placeholder="Enter email address"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Billing Address:</label>
            <textarea
              className="w-full border rounded p-2"
              value={customerInfo.billingAddress}
              onChange={(e) =>
                setCustomerInfo({
                  ...customerInfo,
                  billingAddress: e.target.value,
                })
              }
              placeholder="Enter billing address"
              rows={1}
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Sales Date:</label>
            <input
              type="date"
              className="w-full border rounded p-2"
              value={customerInfo.salesDate}
              onChange={(e) =>
                setCustomerInfo({ ...customerInfo, salesDate: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Due Date:</label>
            <input
              type="date"
              className="w-full border rounded p-2"
              value={customerInfo.dueDate}
              onChange={(e) =>
                setCustomerInfo({ ...customerInfo, dueDate: e.target.value })
              }
            />
          </div>
        </div>

        <div className="bg-green-100 p-3 mb-4 rounded">
          <h3 className="text-green-800">Select Products To Sale</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full mb-4">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left p-2">Category</th>
                <th className="text-left p-2">Select Item</th>
                <th className="text-left p-2">Stock/Qty</th>
                <th className="text-left p-2">Quantity</th>
                <th className="text-left p-2">Rate</th>
                <th className="text-left p-2">GST %</th>
                <th className="text-left p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={item.id} className="border-b">
                  <td className="p-2">
                    <select
                      className="w-full border rounded p-1"
                      value={item.category}
                      onChange={(e) =>
                        handleCategorySelect(index, e.target.value)
                      }
                    >
                      <option value="">Select a category</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="p-2">
                    <select
                      className="w-full border rounded p-1"
                      value={item.productId || ""}
                      onChange={(e) =>
                        handleProductSelect(index, e.target.value)
                      }
                      disabled={!item.category}
                    >
                      <option value="">Select a product</option>
                      {item.category &&
                        getProductsByCategory(item.category).map((product) => (
                          <option key={product.id} value={product.id}>
                            {product.name}
                          </option>
                        ))}
                    </select>
                  </td>
                  <td className="p-2">
                    <input
                      type="text"
                      className="w-full border rounded p-1 bg-gray-50"
                      value={item.stock}
                      readOnly
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="text"
                      className="w-full border rounded p-1"
                      value={item.quantity}
                      onChange={(e) =>
                        handleItemUpdate(index, "quantity", e.target.value)
                      }
                      placeholder="Enter quantity"
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="text"
                      className="w-full border rounded p-1 bg-gray-50"
                      value={item.rate}
                      readOnly
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="text"
                      className="w-full border rounded p-1"
                      value={item.gstPercentage}
                      onChange={(e) =>
                        handleItemUpdate(index, "gstPercentage", e.target.value)
                      }
                      placeholder="Enter GST %"
                    />
                  </td>
                  <td className="p-2">
                    <button
                      className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
                      onClick={() => handleRemoveItem(index)}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-start">
          <button
            className="bg-cyan-500 text-white px-4 py-2 rounded hover:bg-cyan-600"
            onClick={addNewItem}
          >
            Add New Item
          </button>

          <div className="space-y-2">
            <div className="flex justify-between gap-4">
              <span>Total GST:</span>
              <input
                type="text"
                className="border rounded p-1 w-32 bg-gray-50"
                value={`$${calculateTotalGST().toFixed(2)}`}
                readOnly
              />
            </div>
            <div className="flex justify-between gap-4">
              <span>Grand Total:</span>
              <input
                type="text"
                className="border rounded p-1 w-32 bg-gray-50"
                value={`$${calculateGrandTotal().toFixed(2)}`}
                readOnly
              />
            </div>
            <div className="flex justify-between gap-4">
              <span>Paid Amount:</span>
              <input
                type="text"
                className="border rounded p-1 w-32"
                value={paidAmount}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === "" || (!isNaN(value) && Number(value) >= 0)) {
                    setPaidAmount(value);
                  }
                }}
                placeholder="Enter amount"
              />
            </div>
            <div className="flex justify-between gap-4">
              <span>Due:</span>
              <input
                type="text"
                className="border rounded p-1 w-32 bg-gray-50"
                value={`$${(
                  calculateGrandTotal() - Number(paidAmount || 0)
                ).toFixed(2)}`}
                readOnly
              />
            </div>
          </div>
        </div>

        <div className="mt-4">
          <button className="bg-cyan-500 text-white px-4 py-2 rounded hover:bg-cyan-600">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default SalesEntryForm;
