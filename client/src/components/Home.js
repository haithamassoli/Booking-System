import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  let navigate = useNavigate();

  return (
    <div className="flex justify-center text-center items-center flex-col">
      <h1 className="text-2xl sm:text-5xl my-5">
        If you're looking for great donut
      </h1>
      <button
        className="py-3 px-5 rounded-xl bg-pink-500 text-white ronded"
        onClick={() => navigate("/booking")}
      >
        Booking Now
      </button>
      <img
        src="https://uploads.turbologo.com/uploads/design/hq_preview_image/965594/draw_svg20210507-22909-gc03x0.svg.png"
        alt="donut"
      />
    </div>
  );
}

export default Home;
