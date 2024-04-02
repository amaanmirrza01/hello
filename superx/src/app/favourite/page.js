/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
  const [favouriteData, setFavouriteData] = useState([]);

  useEffect(() => {
    const userId = 1;
    const fetchData = async () => {
      const response = await fetch(`/api/fetch-favourites?userId=${userId}`);
      const result = await response.json();
      setFavouriteData(result);
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <section
      className="heroSlider CategoryGrid"
      style={{ backgroundColor: "black" }}
    >
      <div className="heroHeadImg mt-5 pt-5">
        <div className="titleLine">
          <Link href="/" className="text-white backtoHome">
            <i className="fa-solid fa-arrow-left"></i>
          </Link>
          <h1 className="sectionHeading mb-3 text-center">Favourite</h1>
        </div>
        <div className="d-flex align-content-end flex-wrap px-4 mb-5">
          {favouriteData && favouriteData.map((item, index) => {
            return (
              <div
                key={index}
                className="col-4 px-0 text-center CategoryBrandGrid"
              >
                <Link href="brandDetails">
                  <img src={item?.brandlogo} className="img-fluid" alt="image" />
                </Link>
                <h6 className="text-white">{item?.brandname}</h6>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
