import React from "react";
import ReactDOM from "react-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CarouselPage from "./components/carousel/carousel";
import HomePage from "./pages/HomePage";
import { Suspense } from "react";

const Product = React.lazy(() => import("product_frontend/Brouter"));
const App = () => (
  <Suspense fallback={<div>Loading..</div>}>
    <Header />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products/*" element={<Product />} />
    </Routes>

    <Footer />
  </Suspense>
);
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("app")
);
