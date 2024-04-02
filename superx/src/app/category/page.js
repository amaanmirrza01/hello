/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const [brandData, setBrandData] = useState([]);

  const router = useRouter();
  
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("categoryId");
  const categoryName = searchParams.get("category");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `/api/fetch-brands?categoryId=${categoryId}`
      );
      const result = await response.json();
      setBrandData(result);
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleBrandClick = (brandId) => {
    router.push(`/brandDetails?brandId=${brandId}&category=${categoryName}`);
  };
  return (
    <section
      className="heroSlider CategoryGrid"
      style={{ backgroundColor: "black" }}
    >
      <div className="heroHeadImg mt-5 pt-5 mb-5">
        <div className=" titleLine">
          <Link href="/" className="text-white backtoHome">
            <i className="fa-solid fa-arrow-left"></i>
          </Link>
          <h1 className="sectionHeading mb-3 text-center">
            {categoryName?.toLocaleUpperCase()}
          </h1>
        </div>

        <Link href="#">
          <img
            src="/assets/shark-tank.png"
            className="img-fluid"
            alt="category-logo"
          />
        </Link>
        <div className="d-flex align-content-end flex-wrap px-4 mb-5">
          {brandData.map((item, index) => {
            return (
              <div
                key={index}
                className="col-4 px-0 text-center CategoryBrandGrid"
              >
                <img
                  src={item?.brandlogo}
                  className="img-fluid"
                  alt="image"
                  onClick={() => handleBrandClick(item?.brandid)}
                />
                <h6 className="text-white">{item?.brandname}</h6>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
