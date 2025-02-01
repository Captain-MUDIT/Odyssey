import React, { useState } from "react";
import { Search, FileText, Download } from "lucide-react";

const SalesHistory = () => {
  // Sample data - in a real app, this would come from your backend
  const [orders] = useState([
    {
      orderId: "INV-2025-001",
      customerName: "John Smith",
      date: "2025-01-25",
      dueDate: "2025-02-25",
      items: [
        {
          name: "Product A",
          quantity: 2,
          rate: 29.99,
          discount: 5,
          total: 56.98,
        },
        {
          name: "Product B",
          quantity: 1,
          rate: 49.99,
          discount: 0,
          total: 49.99,
        },
      ],
      totalDiscount: 2.85,
      grandTotal: 106.97,
      paidAmount: 106.97,
      status: "Paid",
      phoneNumber: "+1 234-567-8901",
      email: "john@example.com",
    },
    {
      orderId: "INV-2025-002",
      customerName: "Sarah Johnson",
      date: "2025-01-28",
      dueDate: "2025-02-28",
      items: [
        {
          name: "Product C",
          quantity: 3,
          rate: 15.99,
          discount: 10,
          total: 43.17,
        },
      ],
      totalDiscount: 4.8,
      grandTotal: 43.17,
      paidAmount: 0,
      status: "Pending",
      phoneNumber: "+1 234-567-8902",
      email: "sarah@example.com",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "overdue":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header Section */}
      <div className="bg-black text-white p-3 mb-4">
        <h2 className="text-xl font-semibold">SALES HISTORY</h2>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search by Invoice ID or Customer Name"
            className="w-full pl-10 pr-4 py-2 border rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div>
          <select className="w-full p-2 border rounded">
            <option value="">Filter by Status</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>

        <div>
          <input
            type="date"
            className="w-full p-2 border rounded"
            placeholder="Filter by Date"
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-left">Invoice ID</th>
              <th className="px-4 py-3 text-left">Customer Details</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Due Date</th>
              <th className="px-4 py-3 text-right">Amount</th>
              <th className="px-4 py-3 text-center">Status</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.orderId} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{order.orderId}</td>
                <td className="px-4 py-3">
                  <div className="text-sm">
                    <div className="font-medium">{order.customerName}</div>
                    <div className="text-gray-600">{order.email}</div>
                    <div className="text-gray-600">{order.phoneNumber}</div>
                  </div>
                </td>
                <td className="px-4 py-3">{order.date}</td>
                <td className="px-4 py-3">{order.dueDate}</td>
                <td className="px-4 py-3 text-right">
                  <div>${order.grandTotal.toFixed(2)}</div>
                  <div className="text-sm text-gray-600">
                    Paid: ${order.paidAmount.toFixed(2)}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
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
                      title="Download Invoice"
                    >
                      <Download size={20} />
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

export default SalesHistory;
