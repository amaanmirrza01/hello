/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRouter } from "next/navigation";

function SliderComp({ categoryData }) {
  const [brandData, setBrandData] = useState([]);

  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `/api/fetch-brands?categoryId=${categoryData?.categoryid}`
      );
      const result = await response.json();
      setBrandData(result);
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const settings = {
    centerMode: true,
    dots: false,
    centerPadding: "60px",
    slidesToShow: 2,
    autoplay: false,
    autoplaySpeed: 1000,
    arrows: true,
    infinite: true,
  };
  const handleCategoryClick = (categoryId, categoryName) => {
    router.push(`/category?categoryId=${categoryId}&category=${categoryName}`);
  };
  const handleBrandClick = (brandId) => {
    router.push(
      `/brandDetails?brandId=${brandId}&category=${categoryData?.categoryname}`
    );
  };
  return (
    <section className="heroSlider">
      <div className="heroHeadImg mt-4">
        <h1 className="sectionHeading text-center m-0">
          {categoryData?.categoryname}
        </h1>
        <img
          src={categoryData?.categoryimage}
          className="img-fluid"
          alt="banner"
          onClick={() =>
            handleCategoryClick(
              categoryData?.categoryid,
              categoryData?.categoryname
            )
          }
        />
      </div>
      <Slider {...settings} className="slider2">
        {brandData &&
          brandData?.map((item, index) => {
            return (
              <div key={index} className="slide">
                <img
                  src={item?.brandlogo}
                  className="img-fluid"
                  alt="image"
                  onClick={() => handleBrandClick(item?.brandid)}
                />
                <h6>{item?.brandname}</h6>
              </div>
            );
          })}
      </Slider>
    </section>
  );
}

export default SliderComp;
