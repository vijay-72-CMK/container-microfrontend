import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { MdOutlineDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import toast from "react-toastify";

const UserManage = () => {
  const [usersData, setUsersData] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/api/users");
      const formattedUsers = formatUserData(response.data);
      setUsersData(formattedUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to fetch users");
    }
  };

  const formatUserData = (users) => {
    return users.map((user) => ({
      id: user.id,
      email: user.email,
      mobile: user.mobileNumber,
      name: `${user.firstName} ${user.lastName}`,
      addresses: user.addressEntities
        .map((address) => `${address.street}, ${address.city}`)
        .join(", "),
      roles: user.roles.map((role) => role.name).join(", "),
    }));
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`/api/users/${userId}`);
      toast.success("User deleted successfully!");
      setUsersData(usersData.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user");
    }
  };

  const columns = [
    /* ... Column definitions from previous example ... */
  ];

  //   useEffect(() => {
  //     fetchUsers();
  //   }, []);

  return (
    <div>
      <h2>User Management</h2>
      <DataTable columns={columns} data={usersData} pagination />
    </div>
  );
};

export default UserManage;
