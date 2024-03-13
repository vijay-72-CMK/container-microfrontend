import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { MdOutlineDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Modal, Button } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import ConfirmDeleteModal from "../ConfirmOnDelete/ConfirmDelete";
import Select from "react-select";
import CustomButton from "../CustomButtonComponent/CustomButton";
const UserManage = () => {
  const navigate = useNavigate();
  const [usersData, setUsersData] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [rolesOptions, setRolesOptions] = useState([]);

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
      if (!error.response || error.response.status == 500) {
        navigate("/error", { replace: true });
      }
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
      roles: user.roles,
    }));
  };

  const handleRoleChange = (selectedOptions) => {
    setSelectedRoles(selectedOptions);
  };

  const handleEdit = (row) => {
    setSelectedUser(row);
    setSelectedRoles(
      row.roles.map((role) => ({ value: role.id, label: role.name }))
    );
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  const fetchRoles = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/users/roles",
        { withCredentials: true }
      );
      setRolesOptions(
        response.data.map((role) => ({ value: role.id, label: role.name }))
      );
    } catch (error) {
      console.error("Error fetching roles:", error);
      if (!error.response || error.response.status == 500) {
        navigate("/error", { replace: true });
      }
    }
  };

  const handleSubmit = async () => {
    try {
      const userId = selectedUser.id;
      const roles = selectedRoles.map((option) => ({
        id: option.value,
        name: option.label,
      }));

      const response = await axios.patch(
        `http://localhost:8080/api/users/edit-roles/${userId}`,
        roles,
        { withCredentials: true }
      );
      toast.success("Roles updated successfully!");
      const updatedUsersData = usersData.map((user) => {
        if (user.id === selectedUser.id) {
          return {
            ...user,
            roles: selectedRoles.map((option) => ({
              id: option.value,
              name: option.label,
            })),
          };
        } else {
          return user;
        }
      });
      setUsersData(updatedUsersData);
      handleClose();
    } catch (error) {
      console.error("Error updating roles:", error);
      toast.error("Failed to update roles. Please try again.");
    }
  };

  const columns = [
    { name: "ID", selector: (row) => row.id, sortable: true },
    { name: "Email", selector: (row) => row.email, sortable: true },
    { name: "Mobile Number", selector: (row) => row.mobile, sortable: true },
    { name: "Name", selector: (row) => row.name, sortable: true },
    { name: "Addresses", selector: (row) => row.addresses, sortable: true },
    {
      name: "Roles",
      selector: (row) => row.roles.map((role) => role.name).join(", "),
      sortable: true,
    },
    {
      name: "Actions",
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
    fetchRoles();
  }, []);
  const rowStyle = {
    headRow: {
      style: {
        color: "var(--accent)",
        backgroundColor: "var(--secondary)",
        border: "0",
        fontWeight: "600",
      },
    },
    rows: {
      style: {
        color: "var(--accent)",
        backgroundColor: "var(--secondary)",
        border: "0",
        paddingBlock: "1em",
      },
    },
    pagination: {
      style: {
        backgroundColor: "var(--secondary)",
      },
    },
  };
  return (
    <div>
      <DataTable
        columns={columns}
        data={usersData}
        keyField="id"
        customStyles={rowStyle}
        pagination
      />

      <ConfirmDeleteModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        itemType="user"
        itemId={userIdToDelete}
        onConfirmDelete={handleConfirmDelete}
      />

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Roles</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Select
            defaultValue={selectedRoles}
            options={rolesOptions}
            isMulti
            closeMenuOnSelect={false}
            onChange={handleRoleChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <CustomButton size="lg" type="submit" onClick={handleSubmit}>
            Submit
          </CustomButton>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserManage;
