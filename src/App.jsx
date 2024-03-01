import React from "react";
import ReactDOM from "react-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CarouselPage from "./components/carousel/carousel";
import HomePage from "./pages/HomePage";
const App = () => (
  <BrowserRouter>
    {/* <Header />
    <CarouselPage /> */}
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
    {/* <Footer /> */}
  </BrowserRouter>
);
ReactDOM.render(<App />, document.getElementById("app"));
