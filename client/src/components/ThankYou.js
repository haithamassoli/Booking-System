import React from "react";

function ThankYou() {
  return (
    <div>
      <h1 className="text-center text-5xl mt-10">
        Thank You!
        <img
          src="https://cdn-icons-png.flaticon.com/512/184/184549.png"
          alt="donut"
          width={50}
          className="inline ml-4"
        />
      </h1>

      <p className="text-center text-5xl mt-10">
        You should receive an email with the details of your reservation.
      </p>
    </div>
  );
}

export default ThankYou;
