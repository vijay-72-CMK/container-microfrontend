import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";

const AddressesMapped = ({ userInfo }) => {
  const [arrOfAddresses, setArrOfAddresses] = useState(
    userInfo.addressEntities || []
  );
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [address, setAddress] = useState({
    name: "",
    id: "",
    address: "",
    mobileNumber: "",
    pincode: "",
    city: "",
    state: "",
    country: "",
  });

  useEffect(() => {
    // Initialize addresses from userInfo when component mounts
    setArrOfAddresses(userInfo.addressEntities || []);
  }, [userInfo.addressEntities]);

  const handleInputChange = (event) => {
    setAddress({ ...address, [event.target.name]: event.target.value });
  };

  const addAddress = () => {
    const newAddress = {
      ...address,
      id: Date.now().toString(), // Simple ID generation (replace with a more robust solution in production)
    };
    setArrOfAddresses([...arrOfAddresses, newAddress]);
    setAddress({
      // Reset form after adding
      name: "",
      id: "",
      address: "",
      mobileNumber: "",
      pincode: "",
      city: "",
      state: "",
      country: "",
    });
    setShowAddressForm(false);
  };

  const deleteAddress = (item) => {
    setArrOfAddresses(arrOfAddresses.filter((addr) => addr.id !== item.id));
  };

  const editAddress = (item) => {
    setAddress(item);
    setShowAddressForm(true);
  };

  const updateAddress = () => {
    setArrOfAddresses(
      arrOfAddresses.map((addr) => (addr.id === address.id ? address : addr))
    );
    setAddress({
      // Reset form after update
      name: "",
      id: "",
      address: "",
      mobileNumber: "",
      pincode: "",
      city: "",
      state: "",
      country: "",
    });
    setShowAddressForm(false);
  };

  return (
    <>
      {arrOfAddresses.map((item) => (
        <div key={item.id} className="addreses-map">
          {/* ... (Display address details) ... */}
          <i
            className="fa-solid fa-pen address-edit address-icon"
            onClick={() => editAddress(item)}
          ></i>
          <i
            className="fa-solid fa-trash address-delete address-icon"
            onClick={() => deleteAddress(item)}
          ></i>
        </div>
      ))}
      <Button
        // ... (Button styling) ...
        onClick={() => setShowAddressForm(true)}
      >
        {/* ... (Button content) ... */}
      </Button>
      {showAddressForm && (
        <AddressForm
          address={address}
          setAddress={setAddress}
          setShowAddressForm={setShowAddressForm}
          addAddress={addAddress}
          updateAddress={updateAddress}
        />
      )}
    </>
  );
};

const AddressForm = ({
  address,
  setAddress,
  setShowAddressForm,
  addAddress,
  updateAddress,
}) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    if (address.id) {
      updateAddress();
    } else {
      addAddress();
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {/* ... (Form fields) ... */}
      {/* ... (Buttons) ... */}
    </Form>
  );
};

export { AddressesMapped, AddressForm };
