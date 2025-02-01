import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./createcomany";
import SalesEntryForm from "./sales";
import PurchasePreview from "./purchase";
import InventoryApp from "./inventory";
import SalesHistory from "./orderhistory";
import PurchaseHistory from "./purchasehistory";
import Dashboard from "./dashboard";
import Signup from "./signup";
import Login from "./login";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/" element={<h1>Welcome to the App</h1>} />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="sails" element={<SalesEntryForm />} />
        <Route path="purchse" element={<PurchasePreview />} />
        <Route path="createcompany" element={<Navbar />} />
        <Route path="inventory" element={<InventoryApp />} />
        <Route path="orderhistory" element={<SalesHistory />} />
        <Route path="purchasehistory" element={<PurchaseHistory />} />
      </Routes>
      {/* <div>{<Navbar />}</div>
      <div>{<SalesEntryForm />}</div> */}
    </>
  );
}

export default App;
