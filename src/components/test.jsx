import React, { useState } from "react";
import axios from "axios";

const Test = () => {
  const [isDeleted, setIsDeleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const response = await axios.delete(
        "http://localhost:8081/api/products/remove-product/65df5b12b0ec927df104c6c9",
        { withCredentials: true }
      );

      if (response.status === 200 || response.status === 204) {
        setIsDeleted(true);
      } else {
        throw new Error("Deletion failed");
      }
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleDelete} disabled={isLoading || isDeleted}>
        {isLoading
          ? "Deleting..."
          : isDeleted
          ? "Product Deleted"
          : "Delete Product"}
      </button>
      {error && <p>Error deleting product: {error.message}</p>}
    </div>
  );
};

export default Test;
