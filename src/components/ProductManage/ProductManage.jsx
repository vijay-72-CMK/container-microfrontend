import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Button, Modal, Form, Image, Carousel } from "react-bootstrap";
import axios from "axios";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./ProductManage.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdOutlineDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const ProductsTab = () => {
  const navigate = useNavigate();

  const [productsData, setProductsData] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [categories, setCategories] = useState([]);

  const [totalRows, setTotalRows] = useState(0);
  const [perPageSize, setPerPageSize] = useState(4);
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
    images: [],
    averageRating: 0,
  });

  const [newProduct, setNewProduct] = useState({
    name: "",
    brand: "",
    price: 0,
    availableQuantity: 0,
    images: [],
    categoryName: "",
    attributes: {},
    description: "",
    tags: [],
    averageRating: 0,
  });

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8081/api/category/all"
      );
      const categoriesData = response.data;
      const updatedCategories = categoriesData.map((category) => ({
        ...category,
        requiredAttributes: category.requiredAttributes || [],
      }));
      setCategories(updatedCategories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchProducts = async (page, pageSize) => {
    try {
      console.log(page, pageSize);
      const response = await axios.get(
        `http://localhost:8081/api/products/search`,
        { params: { page: page - 1, size: pageSize } }
      );
      const data = response.data;
      console.log(data.totalElements);
      setProductsData(data.content);
      setTotalRows(data.totalElements);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // if (selectedProduct) {
    //   setEditedProduct({ ...selectedProduct });
    // }
    fetchProducts(currentPage, perPageSize);
    fetchCategories();
  }, [perPageSize, currentPage]);

  const columns = [
    {
      name: "Images",
      width: "150px",
      cell: (row) => (
        <div style={{ maxWidth: "100px" }}>
          <Carousel variant="dark" interval={null}>
            {row.images.map((imageUrl, index) => (
              <Carousel.Item key={index} onClick={() => handleImageClick(row)}>
                <Image
                  src={imageUrl}
                  style={{
                    borderRadius: "50%",
                    width: "100px",
                    padding: "3px",
                  }}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      ),
    },
    {
      name: "Name",
      selector: (row) => (
        <OverlayTrigger overlay={<Tooltip>{row.name}</Tooltip>} placement="top">
          <div
            style={{
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              cursor: "pointer",
            }}
            onClick={() => navigate(`/products/${row.id}`)}
          >
            {row.name}
          </div>
        </OverlayTrigger>
      ),
      sortable: true,
    },
    {
      name: "Price",
      width: "100px",
      selector: (row) => row.price,
      sortable: true,
    },
    {
      name: "Brand",
      width: "100px",
      selector: (row) => row.brand,
      sortable: true,
    },
    {
      name: "Stock",
      width: "100px",
      selector: (row) => row.availableQuantity,
      sortable: true,
      center: true,
    },
    { name: "Category", width: "130px", selector: (row) => row.categoryName },
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
            onClick={() => handleDelete(row.id)}
            className="m-3"
          >
            <MdOutlineDeleteForever />
          </Button>
        </div>
      ),
    },
  ];

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setShowEditModal(true);
  };

  const handleDelete = async (productId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8081/api/products/remove-product/${productId}`,
        { withCredentials: true }
      );

      if (response.status === 200) {
        toast.success("Product deleted successfully!");
        setProductsData(
          productsData.filter((product) => product.id !== productId)
        );
      } else {
        toast.error("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("An error occurred, please check the console.");
    }
  };

  const handleUpdate = async () => {
    console.log("Update functionality - Implementation needed");
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePerRowsChange = async (pageSize, page) => {
    setPerPageSize(pageSize);
  };

  const handleImageClick = (product) => {
    setSelectedProduct(product);
    setShowImageModal(true);
  };

  const handleCreateProduct = async (event) => {
    event.preventDefault();
    const categoryName = newProduct.categoryName;
    const transformedAttributes = {};
    attributes.forEach((attr) => {
      transformedAttributes[attr.key] = attr.value;
    });
    const finalProduct = {
      ...newProduct,
      attributes: transformedAttributes,
    };
    try {
      const response = await axios.post(
        `http://localhost:8081/api/products/add-product/${categoryName}`,
        finalProduct,
        { withCredentials: true }
      );
      if (response.status === 200) {
        toast.success("Product created successfully!");
        setShowCreateModal(false);
      } else {
        toast.error("Failed to create product");
      }
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error("An error occurred, please check the console.");
    }
  };

  const handleChange = (event) => {
    let value = event.target.value;
    if (event.target.name === "tags" || event.target.name == "images") {
      value = value.split(/[\n,]+/).map((tag) => tag.trim());
    }
    setNewProduct({ ...newProduct, [event.target.name]: value });
  };

  const [attributes, setAttributes] = useState([{ key: "", value: "" }]);

  const handleAttributesChange = (index, event) => {
    const updatedAttributes = [...attributes];
    updatedAttributes[index][event.target.name] = event.target.value;
    setNewProduct({
      ...newProduct,
      attributes: updatedAttributes,
    });
  };

  const addAttributeFields = () => {
    setAttributes([...attributes, { key: "", value: "" }]);
  };
  const removeAttribute = (index) => {
    const updatedAttributes = [...attributes];
    updatedAttributes.splice(index, 1);
    setAttributes(updatedAttributes);
  };

  const handleCategoryChange = (event) => {
    const selectedCategoryName = event.target.value;
    const selectedCategory = categories.find(
      (category) => category.name === selectedCategoryName
    );

    setAttributes([]);

    if (selectedCategory) {
      const newAttributes = selectedCategory.requiredAttributes.map((key) => ({
        key,
        value: "",
        isMandatory: true,
      }));
      setAttributes(newAttributes);
    }
    setNewProduct({ ...newProduct, categoryName: selectedCategoryName });
  };

  return (
    <>
      <Button
        variant="primary"
        onClick={() => setShowCreateModal(true)}
        style={{ margin: "10px", float: "right" }}
      >
        Create Product
      </Button>
      <DataTable
        columns={columns}
        data={productsData}
        progressPending={loading}
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        paginationRowsPerPageOptions={[4, 8, 12]}
        paginationPerPage={4}
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
              value={editedProduct.tags.join(", ") || ""}
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

      <Modal
        show={showImageModal}
        onHide={() => setShowImageModal(false)}
        size="lg"
      >
        <Modal.Body>
          {selectedProduct && (
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

      <Modal
        show={showCreateModal}
        onHide={() => setShowCreateModal(false)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Create New Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => handleCreateProduct(e)}>
            <Form.Group controlId="formProductName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={newProduct.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formProductBrand">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                name="brand"
                value={newProduct.brand}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formProductPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={newProduct.price}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formProductDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={newProduct.description}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formProductQuantity">
              <Form.Label>Available Quantity</Form.Label>
              <Form.Control
                type="number"
                name="availableQuantity"
                value={newProduct.availableQuantity}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formProductImages">
              <Form.Label>Image URLs (One per line)</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="images"
                required
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formProductCategory">
              <Form.Label>Category</Form.Label>
              <Form.Select
                name="categoryName"
                onChange={handleCategoryChange}
                required
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="formProductTags">
              <Form.Label>Tags (Comma-separated)</Form.Label>
              <Form.Control
                type="text"
                name="tags"
                value={newProduct.tags}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <div id="attributes-container">
              <Form.Group controlId="formProductAttributes">
                <Form.Label className="label-bold">Attributes</Form.Label>
                {attributes.map((attr, index) => (
                  <div
                    key={index}
                    className={`attribute-pair ${
                      attr.isMandatory ? "mandatory" : ""
                    }`}
                  >
                    <Form.Control
                      type="text"
                      name="key"
                      placeholder="Key"
                      value={attr.key}
                      onChange={(event) => handleAttributesChange(index, event)}
                      disabled={attr.isMandatory}
                    />
                    <Form.Control
                      type="text"
                      name="value"
                      placeholder="Value"
                      value={attr.value}
                      onChange={(event) => handleAttributesChange(index, event)}
                    />
                    <Button
                      variant="danger"
                      size="sm"
                      className="remove-button"
                      onClick={() => removeAttribute(index)}
                      disabled={attr.isMandatory}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button
                  onClick={addAttributeFields}
                  variant="primary"
                  size="sm"
                  className="add-button"
                >
                  + Add Attribute
                </Button>
              </Form.Group>
            </div>
            <Modal.Footer>
              <Button variant="primary" type="submit">
                Create Product
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default ProductsTab;
