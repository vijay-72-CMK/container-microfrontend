import React from "react";
import ReactDOM from "react-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { Suspense } from "react";
import UserProvider from "./contexts/UserContext";
import LoginForm from "./pages/Login/LoginForm";
import Profile from "./pages/Profile/Profile";
import Test from "./components/test";

const Product = React.lazy(() => import("product_frontend/Brouter"));

const App = () => (
  <Suspense fallback={<div>Loading..</div>}>
    <UserProvider>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products/*" element={<Product />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/myInfo" element={<Profile />} />
        <Route path="/test" element={<Test />} />
      </Routes>
      <Footer />
    </UserProvider>
  </Suspense>
);
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("app")
);
