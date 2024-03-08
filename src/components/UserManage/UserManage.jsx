import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { MdOutlineDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Button } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import ConfirmDeleteModal from "../ConfirmOnDelete/ConfirmDelete";

const UserManage = () => {
  const navigate = useNavigate();
  const [usersData, setUsersData] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);

  const handleDeleteClick = (userId) => {
    setUserIdToDelete(userId);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async (userId) => {
    console.log("Isnode confirm del");
    console.log(userId);
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/users/${userId}`,
        {
          withCredentials: true,
        }
      );
      toast.success("User deleted successfully!");
      setUsersData(usersData.filter((user) => user.id !== userId));
    } catch (error) {
      if (!error.response) {
        navigate("/error", { replace: true });
      }
    } finally {
      setShowDeleteModal(false);
      setUserIdToDelete(null);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/users/all", {
        withCredentials: true,
      });
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

  const columns = [
    { name: "ID", selector: (row) => row.id, sortable: true },
    { name: "Email", selector: (row) => row.email, sortable: true },
    { name: "Mobile Number", selector: (row) => row.mobile, sortable: true },
    { name: "Name", selector: (row) => row.name, sortable: true },
    { name: "Addresses", selector: (row) => row.addresses, sortable: true },
    { name: "Roles", selector: (row) => row.roles, sortable: true },
    {
      cell: (row) => (
        <div>
          <Button variant="secondary" size="sm" onClick={() => handleEdit(row)}>
            <FaEdit />
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => handleDeleteClick(row.id)}
            className="ms-3"
          >
            <MdOutlineDeleteForever />
          </Button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <DataTable columns={columns} data={usersData} keyField="id" pagination />

      <ConfirmDeleteModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        itemType="user"
        itemId={userIdToDelete}
        onConfirmDelete={handleConfirmDelete}
      />
      <ToastContainer position="bottom-right" autoClose={2000} />
    </div>
  );
};

export default UserManage;
