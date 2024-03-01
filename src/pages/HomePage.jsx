import React from "react";
import Header from "../components/Header/Header";
import CarouselPage from "../components/carousel/carousel";
import Footer from "../components/Footer/Footer";

const HomePage = () => {
  return (
    <div>
      <main className="flex-grow-1">
        <CarouselPage />
      </main>
    </div>
  );
};

export default HomePage;
