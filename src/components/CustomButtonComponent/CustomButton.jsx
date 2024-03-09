import Button from "react-bootstrap/Button";
import "./CustomButton.css";

function CustomButton({ children, size }) {
  return (
    <>
      <Button variant="flat" size={size}>
        {children}
      </Button>
    </>
  );
}

export default CustomButton;
