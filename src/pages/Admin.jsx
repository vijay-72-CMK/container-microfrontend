import React, { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import ProductsTab from "../components/ProductManage/ProductManage";
import "./Admin.css";
import UserManage from "../components/UserManage/UserManage";

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("products");

  return (
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
  );
};

export default AdminPage;
