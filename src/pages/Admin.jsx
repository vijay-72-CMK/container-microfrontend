import React, { useState, useEffect } from "react";
import { Tabs, Tab } from "react-bootstrap";
import ProductsTab from "../components/ProductManage/ProductManage";
import "./Admin.css";
import UserManage from "../components/UserManage/UserManage";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("products");

  useEffect(() => {
    const storedRoles = localStorage.getItem("userRoles");
    const roles = storedRoles ? JSON.parse(storedRoles) : [];

    if (!roles.includes("Admin")) {
      navigate("/?needsAdmin=true");
    }
  }, []);

  return (
    <>
      <div className="admin-page">
        <h1>Admin Dashboard</h1>

        <Tabs activeKey={activeTab} onSelect={(key) => setActiveTab(key)}>
          <Tab eventKey="products" title="Products">
            <ProductsTab />
          </Tab>
          <Tab eventKey="users" title="Users">
            <UserManage />
          </Tab>
        </Tabs>
      </div>
      <ToastContainer position="bottom-right" autoClose={2000} />
    </>
  );
};

export default AdminPage;
