import Carousel from "react-bootstrap/Carousel";
import "./carousel.css";
function CarouselPage() {
  return (
    <div className="carousalContainer">
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block vh-75"
            src="https://kbdfans.com/cdn/shop/files/1_97f3a5eb-6dc8-4e93-a27a-b0e1dc82bb29_1024x1024.png?v=1708737421"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block  vh-75"
            src="https://kbdfans.com/cdn/shop/files/taco_banner_1024x1024.jpg?v=1688027745"
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block  vh-75"
            src="https://novelkeys.com/cdn/shop/files/Mandalorian_HERO_1950x.jpg?v=1630525236"
            alt="Third slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block vh-75"
            src="landingKeyboard_2.jpg"
            alt=" slide"
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default CarouselPage;
