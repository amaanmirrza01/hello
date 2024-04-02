/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const [expanded, setExpanded] = useState(false);
  const [brandData, setBrandData] = useState([]);
  const [socialLinks, setSocialLinks] = useState({});
  const [isFavourite, setIsFavourite] = useState({ status: false, data: {} });

  const searchParams = useSearchParams();
  const brandId = searchParams.get("brandId");
  const categoryName = searchParams.get("category");

  const fetchFavourite = async () => {
    const userId = 1;
    const response = await fetch(
      `/api/check-favourite?userId=${userId}&brandId=${brandId}`
    );
    const result = await response.json();
    if (result.length > 0) {
      setIsFavourite({ status: true, data: result[0] });
    } else {
      setIsFavourite({ status: false, data: {} });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `/api/fetch-brand-details?brandId=${brandId}`
      );
      const result = await response.json();
      setBrandData(result[0]);
      if (result[0]?.brandsociallinks) {
        setSocialLinks(JSON.parse(result[0].brandsociallinks));
      }
    };

    Promise.all([fetchData(), fetchFavourite()]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
  };

  const userId = 1;
  const handleFavouriteClick = async () => {
    if (isFavourite.status) {
      const response = await fetch(
        `/api/remove-favourites?favouriteId=${isFavourite?.data?.favoriteid}`
      );
      if (!response.ok) {
        window.alert("An error oocured.");
      } else {
        await fetchFavourite();
      }
    } else {
      const response = await fetch(
        `/api/add-favourites?brandId=${brandId}&userId=${userId}`
      );
      if (!response.ok) {
        window.alert("An error oocured.");
      } else {
        fetchFavourite();
      }
    }
  };
  return (
    <div
      className="homeContent pt-5 mt-3"
      style={{ width: "100%", maxWidth: "450px", backgroundColor: "black" }}
    >
      <Slider {...settings} className="top-slider bannerSlider ">
        {brandData?.brandimages &&
          brandData?.brandimages.split(",").map((item, index) => {
            return (
              <div key={index} className="slide">
                <Link href="brandDetails">
                  <img src={item} className="img-fluid" alt="image" />
                </Link>
              </div>
            );
          })}
      </Slider>
      <section className="brandAllDetails">
        <div className="brandDetailBanner">
          <div className="brandDetailBannerText">
            <p className="m-0">{categoryName?.toLocaleUpperCase()}</p>
            <h2>{brandData?.brandname}</h2>
          </div>
          <div className="favBtnIcn" onClick={handleFavouriteClick}>
            <i
              className="fa fa-heart"
              id="heart"
              style={isFavourite.status ? { color: "red" } : {}}
            ></i>
          </div>
        </div>
        <div className="sharingBrandsIcon px-3">
          <div className="share-buttons-container">
            <div className="share-list">
              <Link
                href={socialLinks?.facebook ? socialLinks?.facebook : "#"}
                className="fb-h"
                target="_blank"
              >
                <img
                  src="https://img.icons8.com/material-rounded/96/000000/facebook-f.png"
                  alt="beauty-image"
                />
              </Link>
              <Link
                href={socialLinks?.twitter ? socialLinks?.twitter : "#"}
                className="tw-h"
                target="_blank"
              >
                <img
                  src="https://img.icons8.com/material-rounded/96/000000/twitter-squared.png"
                  alt="beauty-image"
                />
              </Link>
              <Link
                href={socialLinks?.youtube ? socialLinks?.youtube : "#"}
                className="yt-h"
                target="_blank"
              >
                <img
                  src="https://img.icons8.com/material-rounded/96/000000/youtube.png"
                  alt="beauty-image"
                />
              </Link>
              <Link
                href={socialLinks?.whatsapp ? socialLinks?.whatsapp : "#"}
                className="wp-h"
                target="_blank"
              >
                <img
                  src="https://img.icons8.com/material-rounded/96/000000/whatsapp.png"
                  alt="beauty-image"
                />
              </Link>
            </div>
          </div>
        </div>
        <div className="brandtxt">
          <p className={`${expanded ? "expanded" : ""} brandtxtpara mb-0`}>
            {brandData?.branddescription}
          </p>
          <div className="text-end">
            <button
              className="read-more"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? "Read Less" : "Read more"}
            </button>
          </div>
          <div className="logoIconinBrandDetail">
            <Link href="#">
              <img
                src="assets/superX-New-Logo.png"
                className="img-fluid"
                alt="read-more-image"
              />
            </Link>
          </div>
          <div className="mt-3">
            <Link
              href={
                brandData?.brandwebsiteurl ? brandData?.brandwebsiteurl : "#"
              }
              className="VisiT"
              target="_blank"
            >
              Visit Website
            </Link>
            <Link href="#" className="poweredLink">
              Powered by superX
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
