"use client";
import { useEffect, useState } from "react";
import FirstSlider from "@/components/firstSlider/firstSlider";
import SliderComp from "@/components/Sllider/Slider";

export default function Home() {
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/fetch-categories");
      const result = await response.json();
      setCategoryData(result);
    };

    fetchData();
  }, []);
  return (
    <div
      className="bg-black homeContent"
      style={{ maxWidth: "450px", width: "100%", height: "100%" }}
    >
      <FirstSlider />
      {categoryData.map((item, index) => {
        return <SliderComp key={index} categoryData={item} />;
      })}
    </div>
  );
}
