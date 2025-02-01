import React, { useState } from "react";
import { Search, FileText, Download, ExternalLink } from "lucide-react";

const PurchaseHistory = () => {
  // Sample data - in a real app, this would come from your backend
  const [purchases] = useState([
    {
      purchaseId: "PO-2025-001",
      supplierName: "Tech Supplies Co.",
      date: "2025-01-25",
      deliveryDate: "2025-01-28",
      items: [
        {
          name: "Product A",
          quantity: 50,
          rate: 20.99,
          discount: 5,
          total: 997.03,
        },
        {
          name: "Product B",
          quantity: 30,
          rate: 35.99,
          discount: 2,
          total: 1057.71,
        },
      ],
      totalDiscount: 95.85,
      grandTotal: 2054.74,
      paidAmount: 2054.74,
      status: "Received",
      supplierContact: "+1 234-567-8901",
      email: "supplier@techsupplies.com",
      invoiceNumber: "INV-2025-123",
    },
    {
      purchaseId: "PO-2025-002",
      supplierName: "Office Essentials Ltd",
      date: "2025-01-28",
      deliveryDate: "2025-02-05",
      items: [
        {
          name: "Product C",
          quantity: 100,
          rate: 10.99,
          discount: 10,
          total: 989.1,
        },
      ],
      totalDiscount: 109.9,
      grandTotal: 989.1,
      paidAmount: 0,
      status: "Pending",
      supplierContact: "+1 234-567-8902",
      email: "orders@officeessentials.com",
      invoiceNumber: "INV-2025-456",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "received":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "ordered":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header Section */}
      <div className="bg-black text-white p-3 mb-4">
        <h2 className="text-xl font-semibold">PURCHASE HISTORY</h2>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search by PO or Supplier"
            className="w-full pl-10 pr-4 py-2 border rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div>
          <select className="w-full p-2 border rounded">
            <option value="">Filter by Status</option>
            <option value="received">Received</option>
            <option value="pending">Pending</option>
            <option value="ordered">Ordered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div>
          <input
            type="date"
            className="w-full p-2 border rounded"
            placeholder="From Date"
          />
        </div>

        <div>
          <input
            type="date"
            className="w-full p-2 border rounded"
            placeholder="To Date"
          />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-blue-800 font-semibold">Total Purchases</h3>
          <p className="text-2xl font-bold">$3,043.84</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-green-800 font-semibold">Received Orders</h3>
          <p className="text-2xl font-bold">1</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <h3 className="text-yellow-800 font-semibold">Pending Orders</h3>
          <p className="text-2xl font-bold">1</p>
        </div>
        <div className="bg-red-50 p-4 rounded-lg">
          <h3 className="text-red-800 font-semibold">Cancelled Orders</h3>
          <p className="text-2xl font-bold">0</p>
        </div>
      </div>

      {/* Purchases Table */}
      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-left">PO Number</th>
              <th className="px-4 py-3 text-left">Supplier Details</th>
              <th className="px-4 py-3 text-left">Order Date</th>
              <th className="px-4 py-3 text-left">Delivery Date</th>
              <th className="px-4 py-3 text-left">Invoice No.</th>
              <th className="px-4 py-3 text-right">Amount</th>
              <th className="px-4 py-3 text-center">Status</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {purchases.map((purchase) => (
              <tr
                key={purchase.purchaseId}
                className="border-t hover:bg-gray-50"
              >
                <td className="px-4 py-3 font-medium">{purchase.purchaseId}</td>
                <td className="px-4 py-3">
                  <div className="text-sm">
                    <div className="font-medium">{purchase.supplierName}</div>
                    <div className="text-gray-600">{purchase.email}</div>
                    <div className="text-gray-600">
                      {purchase.supplierContact}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">{purchase.date}</td>
                <td className="px-4 py-3">{purchase.deliveryDate}</td>
                <td className="px-4 py-3">{purchase.invoiceNumber}</td>
                <td className="px-4 py-3 text-right">
                  <div>${purchase.grandTotal.toFixed(2)}</div>
                  <div className="text-sm text-gray-600">
                    Paid: ${purchase.paidAmount.toFixed(2)}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      purchase.status
                    )}`}
                  >
                    {purchase.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-center gap-2">
                    <button
                      className="p-1 text-blue-600 hover:text-blue-800"
                      title="View Details"
                    >
                      <FileText size={20} />
                    </button>
                    <button
                      className="p-1 text-green-600 hover:text-green-800"
                      title="Download PO"
                    >
                      <Download size={20} />
                    </button>
                    <button
                      className="p-1 text-purple-600 hover:text-purple-800"
                      title="View Invoice"
                    >
                      <ExternalLink size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-gray-600">Showing 1 to 2 of 2 entries</div>
        <div className="flex gap-2">
          <button
            className="px-4 py-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
            disabled
          >
            Previous
          </button>
          <button
            className="px-4 py-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
            disabled
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseHistory;
