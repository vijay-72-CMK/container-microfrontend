import React from "react";
import Header from "../components/Header/Header";
import CarouselPage from "../components/carousel/carousel";
import Footer from "../components/Footer/Footer";

const HomePage = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-grow-1">
        <CarouselPage />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
