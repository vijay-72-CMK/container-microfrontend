import { Container, Nav, Navbar } from "react-bootstrap";
import React from "react";
import { useEffect, useState, useContext } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { FaShoppingBag, FaUserCircle } from "react-icons/fa";
import { UserContext } from "../../contexts/UserContext";

const NavBar = () => {
  const [expand, setExpand] = useState(false);
  const { cartCount, setCartCount, userInfo } = useContext(UserContext);

  const isAdmin = () => {
    if (!userInfo || !userInfo.roles) return false;
    return userInfo.roles.some((role) => role.name === "Admin");
  };

  useEffect(() => {
    const handleCartChange = (event) => {
      console.log("Event received: cart-item-changed", event.detail);
      const updatedCount = cartCount + event.detail.quantity;
      localStorage.setItem("cartCount", updatedCount);
      console.log(updatedCount);
      setCartCount(updatedCount);
    };
    window.addEventListener("cart-change", handleCartChange);
    return () => {
      window.removeEventListener("cart-change", handleCartChange);
    };
  }, [cartCount]);
  console.log("hello, I am nav bar rendering once");
  return (
    <Navbar sticky="top" expand="md" className="navbar navbarSticky">
      <Container className="navbar-container">
        <Link
          aria-label="Go to Home Page"
          className="navbar-link"
          to="/"
          onClick={() => setExpand(false)}
        >
          <Navbar.Brand to="/">
            <FaShoppingBag
              color="var(--primary)"
              className="navbar-icon"
              size={48}
            />{" "}
            <h1 className="logo logoExpanded">Calfreezy Mechanical Keyboard</h1>
            <h1 className="logo logoSmall">CMK</h1>
          </Navbar.Brand>
        </Link>
        <div className="d-flex">
          <div className="media-cart">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentcolor"
              className="nav-icon"
            >
              <path
                fillRule="evenodd"
                d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                clipRule="evenodd"
              />
            </svg>
            <Link
              aria-label="Go to Cart Page"
              to="/cart"
              className="cart"
              data-num={0}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentcolor"
                className="nav-icon"
              >
                <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
              </svg>
            </Link>
          </div>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={() => {
              setExpand(expand ? false : "expanded");
            }}
          >
            <span></span>
            <span></span>
            <span></span>
          </Navbar.Toggle>
        </div>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="justify-content-end flex-grow-1 pe-3">
            {isAdmin() && (
              <Nav.Item>
                <Link
                  aria-label="Go to Admin Area"
                  className="navbar-link"
                  to="/admin"
                  onClick={() => setExpand(false)}
                >
                  <span className="nav-link-label">Admin</span>
                </Link>
              </Nav.Item>
            )}
            <Nav.Item>
              <Link
                aria-label="Go to Products Page"
                className="navbar-link"
                to="/products"
                onClick={() => setExpand(false)}
              >
                <span className="nav-link-label">Products</span>
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link
                aria-label="Go to Product category keyboard"
                className="navbar-link"
                to="/products"
                onClick={() => setExpand(false)}
                state={{ categoryName: "keyboards" }}
              >
                <span className="nav-link-label">Keyboards</span>
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link
                aria-label="Go to Products category keycaps"
                className="navbar-link"
                to="/products"
                onClick={() => setExpand(false)}
                state={{ categoryName: "keycaps" }}
              >
                <span className="nav-link-label">Keycaps</span>
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link
                aria-label="Go to Products category switches"
                className="navbar-link"
                to="/products"
                onClick={() => setExpand(false)}
                state={{ categoryName: "switches" }}
              >
                <span className="nav-link-label">Switches</span>
              </Link>
            </Nav.Item>
            <Nav.Item className="expanded-cart">
              <Link to="/login" aria-label="Go to Login Page">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentcolor"
                  className="nav-icon"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
              <Link
                aria-label="Go to Cart Page"
                to="/cart"
                className="cart"
                data-num={cartCount}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentcolor"
                  className="nav-icon"
                >
                  <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                </svg>
              </Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
