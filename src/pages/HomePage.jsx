import React, { useEffect } from "react";
import Header from "../components/Header/Header";
import CarouselPage from "../components/carousel/carousel";
import { Row, Col, Image, Container, Button } from "react-bootstrap";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./HomePage.css";
import CustomButton from "../components/CustomButtonComponent/CustomButton";
import RightArrowIcon from "../components/RightArrowIconComponent/RightArrowIcon";

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
      <main className="flex-grow-1 homepageContainer">
        <Container className="heroContainer">
          <div>
            <h1>Elevate Your Typing Experience...</h1>
            <h3>
              Discover Precision-Crafted Mechanical Keyboards Engineered for
              Performance, Comfort, and Style
            </h3>
            <Link
              className="buttonLink"
              aria-label="Go to Products Page"
              to="/products"
            >
              <CustomButton className="heroButton" size="lg">
                <span>Start Shopping</span>
                <RightArrowIcon />
              </CustomButton>
            </Link>
          </div>
          <div className="heroImage">
            {/* <Image src="landingKeyboard_2.jpg" /> */}
            <CarouselPage />
          </div>
        </Container>
        {/* <CarouselPage /> */}
        <Container className="featuredSection">
          <Row>
            <Col xs={6} className="section-title mb-4">
              <h2>Pick Your Poison!</h2>
              <h3 className="subHeading">These are our featured products</h3>
            </Col>
            <Col xs={6} className="buttonContainer">
              <Link
                className="buttonLink"
                aria-label="Go to Products Page"
                to="/products"
              >
                <CustomButton size="lg">View All Products</CustomButton>
              </Link>
            </Col>
          </Row>
          <Row>
            <Col md={4} className="image-item mb-3">
              <p className="imageCategory">Keyboards</p>
              <Image
                src="https://kbdfans.com/cdn/shop/files/7_db8eb9f3-433b-4bde-940f-9d0ea3bdbd28_720x.jpg?v=1704947871"
                alt="Image 1"
                rounded
              />
            </Col>
            <Col md={4} className="image-item mb-3">
              <p className="imageCategory">Keycaps</p>
              <Image
                src="https://kbdfans.com/cdn/shop/files/12_251502e7-a74b-4e1a-b8d0-657312e9a9f9_720x.jpg?v=1701753302"
                alt="Image 2"
                rounded
              />
            </Col>
            <Col md={4} className="image-item mb-3">
              <p className="imageCategory">Switches</p>
              <Image
                src="https://kbdfans.com/cdn/shop/files/untitled.524_720x.png?v=1697623447"
                alt="Image 3"
                rounded
              />
            </Col>
            <Col md={4} className="image-item mb-3">
              <p className="imageCategory">Switches</p>
              <Image
                src="https://kbdfans.com/cdn/shop/files/untitled.524_720x.png?v=1697623447"
                alt="Image 3"
                rounded
              />
            </Col>
            <Col md={4} className="image-item mb-3">
              <p className="imageCategory">Switches</p>
              <Image
                src="https://kbdfans.com/cdn/shop/files/untitled.524_720x.png?v=1697623447"
                alt="Image 3"
                rounded
              />
            </Col>
            <Col md={4} className="image-item mb-3">
              <p className="imageCategory">Switches</p>
              <Image
                src="https://kbdfans.com/cdn/shop/files/untitled.524_720x.png?v=1697623447"
                alt="Image 3"
                rounded
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
