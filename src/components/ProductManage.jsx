import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Button, Modal, Form, Image, Carousel } from "react-bootstrap";
import axios from "axios";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

let counter = 0;
const ProductsTab = () => {
  // State Variables
  const [productsData, setProductsData] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [editedProduct, setEditedProduct] = useState({
    name: "",
    brand: "",
    price: 0,
    availableQuantity: 0,
    categoryName: "",
    tags: [],
    description: "",
    attributes: {},
    images: [], // Add images array
    averageRating: 0, // Add averageRating
  });
  const fetchProducts = async (page, size = perPage) => {
    try {
      const response = await axios.get(
        `http://localhost:8081/api/products/search`,
        { params: { page: page - 1, size } }
      );
      const data = response.data;
      console.log(data);
      setProductsData(data.content);
      setTotalRows(data.totalElements);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false); // Ensure loading state is reset
    }
  };

  useEffect(() => {
    if (selectedProduct) {
      setEditedProduct({ ...selectedProduct });
    }
    fetchProducts(currentPage);
  }, [perPage, currentPage, selectedProduct]);

  // Product Columns
  const columns = [
    { name: "ID", selector: (row) => row.id, sortable: true },
    {
      name: "Name",
      selector: (row) => (
        <OverlayTrigger overlay={<Tooltip>{row.name}</Tooltip>} placement="top">
          <div
            style={{
              maxWidth: "300px",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            {row.name}
          </div>
        </OverlayTrigger>
      ),
      sortable: true,
    },
    { name: "Price", selector: (row) => row.price, sortable: true },
    { name: "Brand", selector: (row) => row.brand, sortable: true },
    {
      name: "Available Qty",
      selector: (row) => row.availableQuantity,
      sortable: true,
    },
    { name: "Category", selector: (row) => row.categoryName },
    { name: "Tags", cell: (row) => row.tags.join(", ") },
    {
      name: "Images",
      cell: (row) => (
        <div style={{ maxWidth: "200px" }}>
          <Carousel variant="dark" interval={null}>
            {row.images.map((imageUrl, index) => (
              <Carousel.Item key={index} onClick={() => handleImageClick(row)}>
                {" "}
                {/* Pass the whole product here */}
                <Image
                  src={imageUrl}
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    display: "block",
                    margin: "auto",
                  }}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      ),
    },
    {
      name: "Attributes",
      cell: (row) => (
        <div>
          {Object.entries(row.attributes).map(([key, value]) => (
            <div key={key}>
              {key}: {value}
            </div>
          ))}
        </div>
      ),
      expandableRows: true,
    },
    {
      name: "Description",
      cell: (row) => (
        <div style={{ maxHeight: "100px", overflowY: "auto" }}>
          {row.description}
        </div>
      ),
    },
    {
      name: "Avg. Rating",
      selector: (row) => row.averageRating || "N/A",
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div>
          <Button variant="secondary" size="sm" onClick={() => handleEdit(row)}>
            Edit
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => handleDelete(row.id)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  // Event Handlers
  const handleEdit = (product) => {
    setSelectedProduct(product);
    setShowEditModal(true);
  };

  const handleDelete = async (productId) => {
    console.log("Delete functionality - Implementation needed");
  };

  const handleUpdate = async () => {
    console.log("Update functionality - Implementation needed");
  };

  const handlePageChange = (page) => {
    console.log("Hey page changed is called " + page);
    fetchProducts(page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    console.log("Hey newPerpage changed is called " + page);
    setPerPage(newPerPage);
  };

  const handleImageClick = (product) => {
    setSelectedProduct(product);
    setShowImageModal(true);
  };

  const handleChange = () => {};

  console.log(totalRows + " count is:" + ++counter);
  return (
    <>
      <DataTable
        columns={columns}
        data={productsData}
        progressPending={loading}
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        paginationRowsPerPageOptions={[4, 8, 12]} // Example of rows per page options
      />

      <Modal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formProductName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={editedProduct.name || ""}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formProductBrand">
            <Form.Label>Brand</Form.Label>
            <Form.Control
              type="text"
              name="brand"
              value={editedProduct.brand || ""}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formProductPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={editedProduct.price || ""}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formProductQuantity">
            <Form.Label>Available Quantity</Form.Label>
            <Form.Control
              type="number"
              name="availableQuantity"
              value={editedProduct.availableQuantity || ""}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formProductCategory">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              name="categoryName"
              value={editedProduct.categoryName || ""}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formProductTags">
            <Form.Label>Tags</Form.Label>
            <Form.Control
              type="text"
              name="tags"
              value={editedProduct.tags.join(", ") || ""} // Pre-fill with comma-separated
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formProductDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={editedProduct.description || ""}
              onChange={handleChange}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleUpdate}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Image Zoom Modal */}
      <Modal
        show={showImageModal}
        onHide={() => setShowImageModal(false)}
        size="lg"
      >
        <Modal.Body>
          {selectedProduct && ( // Ensure product data exists
            <Carousel variant="dark" interval={null}>
              {selectedProduct.images.map((imageUrl, index) => (
                <Carousel.Item key={index}>
                  <Image src={imageUrl} fluid />
                </Carousel.Item>
              ))}
            </Carousel>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ProductsTab;
