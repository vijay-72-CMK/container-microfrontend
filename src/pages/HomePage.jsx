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
              <Link
                className="buttonLink"
                aria-label="Go to Products Page"
                to="/products/65f13a1ecf40f760cd7d9106"
              >
                <p className="imageCategory">Boomerang</p>
                <Image
                  src="https://kbdfans.com/cdn/shop/files/10_9ae61883-3bf9-4ef3-92d9-df08e09eeecf_720x.jpg?v=1701753050"
                  alt="Image 1"
                  rounded
                />
              </Link>
            </Col>
            <Col md={4} className="image-item mb-3">
              <Link
                className="buttonLink"
                aria-label="Go to Products Page"
                to="/products/65f13fa1cf40f760cd7d910c"
              >
                <p className="imageCategory">Starry Sky</p>
                <Image
                  src="https://kbdfans.com/cdn/shop/files/1_8b4bd7f8-5cd1-41cd-8c67-75f4f345d9a4_720x.jpg?v=1706686233"
                  alt="Image 2"
                  rounded
                />
              </Link>
            </Col>
            <Col md={4} className="image-item mb-3">
              <Link
                className="buttonLink"
                aria-label="Go to Products Page"
                to="/products/65f14132cf40f760cd7d910e"
              >
                <p className="imageCategory">Capybara</p>
                <Image
                  src="https://kbdfans.com/cdn/shop/files/1_9c844a3e-3adc-4449-b6d8-1a8a2ea3b9c0_720x.jpg?v=1704175154"
                  alt="Image 3"
                  rounded
                />
              </Link>
            </Col>
            <Col md={4} className="image-item mb-3">
              <Link
                className="buttonLink"
                aria-label="Go to Products Page"
                to="/products/65f02e72cf40f760cd7d9102"
              >
                <p className="imageCategory">Hospital</p>
                <Image
                  src="https://kbdfans.com/cdn/shop/files/2_6ba70a65-6fa4-4699-82b0-395a3dd629cd_720x.jpg?v=1706517428"
                  alt="Image 3"
                  rounded
                />
              </Link>
            </Col>
            <Col md={4} className="image-item mb-3">
              <Link
                className="buttonLink"
                aria-label="Go to Products Page"
                to="/products/65f13b6acf40f760cd7d9107"
              >
                <p className="imageCategory">Tofu</p>
                <Image
                  src="https://kbdfans.com/cdn/shop/files/4_b7894f2b-0a6a-4097-96f3-36a34ca86ba6_720x.jpg?v=1686101975"
                  alt="Image 3"
                  rounded
                />
              </Link>
            </Col>
            <Col md={4} className="image-item mb-3">
              <Link
                className="buttonLink"
                aria-label="Go to Products Page"
                to="/products/65f13764cf40f760cd7d9104"
              >
                <p className="imageCategory">Vior</p>
                <Image
                  src="https://kbdfans.com/cdn/shop/files/12_3e3b2413-c235-4450-a7b3-950c25749dbf_720x.jpg?v=1700308353"
                  alt="Image 3"
                  rounded
                />
              </Link>
            </Col>
          </Row>
        </Container>
        <ToastContainer position="bottom-right" autoClose={2000} />
      </main>
    </div>
  );
};

export default HomePage;
