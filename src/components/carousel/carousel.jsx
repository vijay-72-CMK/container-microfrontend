import Carousel from "react-bootstrap/Carousel";
import "./carousel.css";
function CarouselPage() {
  return (
    <div className="carousalContainer">
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block vh-75"
            src="https://i.ibb.co/T1cr6PX/IMG-0961.webp"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block  vh-75"
            src="https://i.ibb.co/rpss03Y/IMG-48801.webp"
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block  vh-75"
            src="landingKeyboard_2.jpg"
            alt="Third slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block vh-75"
            src="https://i.ibb.co/94FBFLW/AV3-shot-1.webp"
            alt=" slide"
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default CarouselPage;
