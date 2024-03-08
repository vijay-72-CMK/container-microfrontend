import React from "react";
import "./styles.css";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import {
  FaShoppingBag,
  FaInstagram,
  FaTwitter,
  FaFacebook,
} from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="bg-black py-4 text-white">
      <Container>
        <Row className="justify-content-center">
          <Col md={4} sm={6} className="text-center mb-4">
            <div className="logo d-flex align-items-center justify-content-center mb-3">
              <FaShoppingBag color="white" className="navbar-icon" />
              <h1 className="m-0 font-weight-bold">CMK</h1>
            </div>
            <p className="mb-0">
              Welcome to CMK, your ultimate destination for custom mechanical
              keyboards. Find the perfect keyboard to match your style and
              enhance your typing experience.
            </p>
          </Col>
          <Col md={3} sm={6} className="text-center mb-4">
            <h2 className="mb-3">Explore</h2>
            <ul className="list-unstyled">
              <li>
                <Link to="/" className="text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-white">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/myInfo" className="text-white">
                  My Info
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-white">
                  Cart
                </Link>
              </li>
            </ul>
          </Col>
          <Col md={3} sm={6} className="text-center mb-4">
            <h2 className="mb-3">Follow Us</h2>
            <div className="social-icons">
              <a href="https://www.instagram.com" className="text-white mr-2">
                <FaInstagram />
              </a>
              <a href="https://twitter.com" className="text-white mr-2">
                <FaTwitter />
              </a>
              <a href="https://www.facebook.com" className="text-white">
                <FaFacebook />
              </a>
            </div>
          </Col>
          <Col md={2} sm={6} className="text-center mb-4">
            <h2 className="mb-3">Contact Us</h2>
            <ul className="list-unstyled">
              <li>123 Random Street, City</li>
              <li>Email: cmk.help@gmail.com</li>
              <li>Phone: +1 1123 456 780</li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
export default Footer;
