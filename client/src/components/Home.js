import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  let navigate = useNavigate();

  return (
    <div>
      <h1>If you're looking for great burger</h1>
      <button onClick={() => navigate("/booking")}>Booking Now</button>
      <img
        src="https://uploads.turbologo.com/uploads/design/hq_preview_image/965594/draw_svg20210507-22909-gc03x0.svg.png"
        alt=""
      />
    </div>
  );
}

export default Home;
