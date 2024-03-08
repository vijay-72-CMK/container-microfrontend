import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { MdOutlineDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Button, Modal } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";

const UserManage = () => {
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
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user");
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

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this user?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => handleConfirmDelete(userIdToDelete)}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer position="bottom-right" autoClose={2000} />
    </div>
  );
};

export default UserManage;
