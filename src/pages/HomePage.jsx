import React, { useEffect } from "react";
import Header from "../components/Header/Header";
import CarouselPage from "../components/carousel/carousel";
import { Row, Col, Image, Container } from "react-bootstrap";
import { useSearchParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HomePage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const needsAdmin = searchParams.get("needsAdmin");

    if (needsAdmin === "true") {
      toast.error("You need Admin privileges to access that page");
      navigate("/", { replace: true });
    }
  }, [searchParams]);

  return (
    <div>
      <main className="flex-grow-1">
        <CarouselPage />
        <Container className="py-5">
          <Row>
            <Col xs={12} className="text-center section-title mb-4">
              <h2>Get All This and More!</h2>
            </Col>
          </Row>
          <Row>
            <Col md={4} className="image-item mb-3">
              <Image
                src="https://kbdfans.com/cdn/shop/files/7_db8eb9f3-433b-4bde-940f-9d0ea3bdbd28_720x.jpg?v=1704947871"
                alt="Image 1"
                fluid
              />
            </Col>
            <Col md={4} className="image-item mb-3">
              <Image
                src="https://kbdfans.com/cdn/shop/files/12_251502e7-a74b-4e1a-b8d0-657312e9a9f9_720x.jpg?v=1701753302"
                alt="Image 2"
                fluid
              />
            </Col>
            <Col md={4} className="image-item mb-3">
              <Image
                src="https://kbdfans.com/cdn/shop/files/untitled.524_720x.png?v=1697623447"
                alt="Image 3"
                fluid
              />
            </Col>
          </Row>
        </Container>
        <ToastContainer position="bottom-right" autoClose={2000} />
      </main>
    </div>
  );
};

export default HomePage;
