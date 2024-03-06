import React, { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import ProductsTab from "../components/ProductManage";
const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("products");

  return (
    <div className="admin-page">
      <h1>Admin Dashboard</h1>

      <Tabs activeKey={activeTab} onSelect={(key) => setActiveTab(key)}>
        <Tab eventKey="products" title="Products">
          <ProductsTab />
        </Tab>
        {/* Add more tabs as needed, e.g., */}
        {/* <Tab eventKey="users" title="Users">
            <UsersTab /> 
          </Tab> */}
      </Tabs>
    </div>
  );
};

export default AdminPage;
