import React from "react";
import { useState } from "react";
import Modal from "./Modal";
import { use } from "react";

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <nav className="w-full bg-gradient-to-r from-red-500 to-orange-500 p-4 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white font-sans">
          Create Company
        </h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-white hover:bg-gray-100 text-red-500 font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
        >
          Create Company
        </button>
      </div>
      {showModal && <Modal onClose={() => setShowModal(false)} />}
    </nav>
  );
};

export default Navbar;
