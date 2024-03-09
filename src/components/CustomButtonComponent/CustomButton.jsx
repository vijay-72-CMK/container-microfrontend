import Button from "react-bootstrap/Button";
import "./CustomButton.css";

function CustomButton({ children, size, type }) {
  return (
    <>
      <Button
        type={type}
        variant="flat"
        size={size}
        className="d-flex justify-content-center"
      >
        {children}
      </Button>
    </>
  );
}

export default CustomButton;
