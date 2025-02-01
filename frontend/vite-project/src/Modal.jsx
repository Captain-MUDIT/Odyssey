import React, { useState } from "react";
import { X } from "lucide-react";

const Modal = ({ onClose }) => {
  const [companyData, setCompanyData] = useState({
    companyName: "",
    employeeCount: "",
    coFounderCount: 0,
    coFounderEmails: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCompanyData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Reset co-founder emails when count changes
    if (name === "coFounderCount") {
      setCompanyData((prev) => ({
        ...prev,
        coFounderEmails: Array(parseInt(value) || 0).fill(""),
      }));
    }
  };

  const handleEmailChange = (index, value) => {
    setCompanyData((prev) => {
      const newEmails = [...prev.coFounderEmails];
      newEmails[index] = value;
      return {
        ...prev,
        coFounderEmails: newEmails,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", companyData);
    // Add your submission logic here
    onClose?.();
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold">CREATE COMPANY</h1>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company Name
              </label>
              <input
                type="text"
                name="companyName"
                value={companyData.companyName}
                onChange={handleInputChange}
                className="w-full border rounded-md px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Number of Employees
              </label>
              <input
                type="number"
                name="employeeCount"
                value={companyData.employeeCount}
                onChange={handleInputChange}
                className="w-full border rounded-md px-3 py-2"
                min="1"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Number of Co-founders
              </label>
              <input
                type="number"
                name="coFounderCount"
                value={companyData.coFounderCount}
                onChange={handleInputChange}
                className="w-full border rounded-md px-3 py-2"
                min="0"
                required
              />
            </div>

            {companyData.coFounderEmails.map((email, index) => (
              <div key={index}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Co-founder {index + 1} Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => handleEmailChange(index, e.target.value)}
                  className="w-full border rounded-md px-3 py-2"
                  required
                />
              </div>
            ))}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Create Company
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
