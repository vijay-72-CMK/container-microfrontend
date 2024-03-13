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
import ConfirmDeleteModal from "../ConfirmOnDelete/ConfirmDelete";
import { FaEdit } from "react-icons/fa";
import CustomButton from "../CustomButtonComponent/CustomButton";

const ProductsTab = () => {
  const navigate = useNavigate();

  const [productsData, setProductsData] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState({
    name: "",
    price: 0,
    availableQuantity: 0,
    description: "",
    images: [],
  });
  const [showEditModal, setShowEditModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState(null);

  const [totalRows, setTotalRows] = useState(0);
  const [perPageSize, setPerPageSize] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [editedProduct, setEditedProduct] = useState({
    name: "",
    price: 0,
    availableQuantity: 0,
    description: "",
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

  const handleDeleteClick = (productId) => {
    setProductIdToDelete(productId);
    setShowDeleteModal(true);
  };

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
      if (!error.response || error.response.status == 500) {
        navigate("/error", { replace: true });
      }
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
      if (!error.response || error.response.status == 500) {
        navigate("/error", { replace: true });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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
      sortFunction: (rowA, rowB) =>
        rowA.name.toLowerCase().localeCompare(rowB.name.toLowerCase()),
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
            onClick={() => handleDeleteClick(row.id)}
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

  const handleConfirmDelete = async (productId) => {
    setShowDeleteModal(false);
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

  const handleEditProduct = async (event) => {
    event.preventDefault();
    const id = selectedProduct.id;
    try {
      const response = await axios.patch(
        `http://localhost:8081/api/products/edit-product/${id}`,
        {
          name: selectedProduct.name,
          price: selectedProduct.price,
          availableQuantity: selectedProduct.availableQuantity,
          description: selectedProduct.description,
        },
        { withCredentials: true }
      );
      const updatedProducts = productsData.map((product) => {
        if (product.id === selectedProduct.id) {
          return {
            ...product,
            name: selectedProduct.name,
            price: selectedProduct.price,
            availableQuantity: selectedProduct.availableQuantity,
            description: selectedProduct.description,
          };
        } else {
          return product;
        }
      });
      setProductsData(updatedProducts);
      toast.success("Updated successfully!");
      setShowEditModal(false);
    } catch (error) {
      if (error.response) {
        const errorData = error.response.data;
        toast.error("Update failed: " + errorData.message);
      } else {
        toast.error("Update failed: Check your connection");
        console.error("Error submitting update:", error);
      }
    }
  };

  const handleChange = (event) => {
    let value = event.target.value;
    if (event.target.name === "tags" || event.target.name == "images") {
      value = value.split(/[\n,]+/).map((tag) => tag.trim());
    }
    setNewProduct({ ...newProduct, [event.target.name]: value });
  };

  const handleEditChange = (event) => {
    let value = event.target.value;
    setSelectedProduct({ ...selectedProduct, [event.target.name]: value });
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
    <div className="productManage">
      <div className="tab">
        <div className="negMargin">
          <CustomButton
            size="lg"
            onClick={() => {
              setShowCreateModal(true);
            }}
          >
            Create Product
          </CustomButton>
        </div>
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
          customStyles={rowStyle}
        />
      </div>
      <Modal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditProduct}>
            <Form.Group controlId="formProductName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={selectedProduct.name}
                onChange={handleEditChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formProductPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={selectedProduct.price}
                onChange={handleEditChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formProductQuantity">
              <Form.Label>Available Quantity</Form.Label>
              <Form.Control
                type="number"
                name="availableQuantity"
                value={selectedProduct.availableQuantity}
                onChange={handleEditChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formProductDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={selectedProduct.description}
                onChange={handleEditChange}
                required
              />
            </Form.Group>

            <Modal.Footer>
              <CustomButton size="lg" type="button" onClick={handleEditProduct}>
                Update
              </CustomButton>
            </Modal.Footer>
          </Form>
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
            <Form.Group controlId="formProductBrand">
              <Form.Label>Rating</Form.Label>
              <Form.Control
                type="text"
                name="averageRating"
                value={newProduct.averageRating}
                onChange={handleChange}
                required
              />
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
                    required
                  />
                  <Form.Control
                    type="text"
                    name="value"
                    placeholder="Value"
                    value={attr.value}
                    onChange={(event) => handleAttributesChange(index, event)}
                    required
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
              <CustomButton
                onClick={addAttributeFields}
                size="sm"
                className="add-button"
                outline={true}
                type="button"
              >
                + Add Attribute
              </CustomButton>
            </Form.Group>
            <Modal.Footer>
              <CustomButton size="lg" type="submit">
                Submit
              </CustomButton>
            </Modal.Footer>
          </Form>
        </Modal.Body>
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
      <ConfirmDeleteModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        itemType="product"
        itemId={productIdToDelete}
        onConfirmDelete={handleConfirmDelete}
      />
    </div>
  );
};

export default ProductsTab;
