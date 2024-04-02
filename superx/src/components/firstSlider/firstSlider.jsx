/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import style from "./firstSlider.module.css";

const images = [
  "/assets/1-1.png",
  "/assets/1-2.png",
  "/assets/1-3.png",
  "/assets/1-4.png",
  "/assets/1-5.png",
  "/assets/1-6.png",
  "/assets/1-7.png",
  "/assets/1-8.png",
  "/assets/1-9.png",
];
function FirstSlider() {
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    swipeToSlide: true,
    centerMode: false,
  };

  return (
    <div>
      <Slider {...settings} className="topSlider slider1 carousel">
        {images.map((image, index) => {
          return (
            <div key={index} className="slide item">
              <Link href="brandDetails">
                <img src={image} className="img-fluid" alt="image" />
              </Link>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}

export default FirstSlider;
