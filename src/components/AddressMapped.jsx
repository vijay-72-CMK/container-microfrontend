import React, { useContext, useState } from "react";
import { Button, Card, Modal, Form } from "react-bootstrap";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";

const AddressesMapped = () => {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const handleInputChange = (event) => {
    setNewAddress({
      ...newAddress,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/addresses  ",
        newAddress,
        {
          withCredentials: true,
        }
      );
      console.log("Address Added Successfully!", response);
      setUserInfo((prevUserInfo) => ({
        ...prevUserInfo,
        addressEntities: [...prevUserInfo.addressEntities, newAddress],
      }));
      setShowAddForm(false);
    } catch (error) {
      console.error("Error adding address:", error);
    }
  };

  return (
    <div>
      {userInfo.addressEntities.map((address, index) => (
        <Card key={index} className="mb-3">
          <Card.Body>
            <Card.Title>Address {index + 1}</Card.Title>
            <p className="address-info">
              {address.street}, {address.city}, {address.state}{" "}
              {address.zipCode}
            </p>
          </Card.Body>
        </Card>
      ))}

      <Button variant="primary" onClick={() => setShowAddForm(true)}>
        Add Address
      </Button>
      <Modal show={showAddForm} onHide={() => setShowAddForm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formAddressStreet">
              <Form.Label>Street</Form.Label>
              <Form.Control
                type="text"
                name="street"
                value={newAddress.street}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formAddressCity">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                name="city"
                value={newAddress.city}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formAddressState">
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                name="state"
                value={newAddress.state}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formAddressZipCode">
              <Form.Label>Zip Code</Form.Label>
              <Form.Control
                type="text"
                name="zipCode"
                value={newAddress.zipCode}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              Save Address
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AddressesMapped;
