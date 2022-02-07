import React, { useEffect, useState } from "react";
import axios from "axios";

function SellerDashboard() {
  const [reservation, setReservation] = useState([]);
  let allReservation = [];
  useEffect(() => {
    axios.get("http://localhost:3001/reserve").then((response) => {
      response.data.map((e) => {
        e.tables.map((ele) => {
          if (ele.isAvailable == false) {
            allReservation.push(ele);
          }
        });
      });
      setReservation(allReservation);
      console.log(reservation);
    });
  }, []);
  return (
    <div className=" grid md:grid-cols-2 grid-cols-1 gap-5 m-8 justify-center items-center">
      {reservation.map((e, index) => {
        return (
          <div key={index} className="m-auto w-96">
            <div className="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-pink-600 shadow-lg">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {e.reservation.name}
              </h5>
              <p className="text-white">{e.reservation.email}</p>
              <p className="text-white">{e.reservation.phone}</p>
              <div className="flex mt-3 text-center">
                <p className="mb-3 font-normal text-gray-700 dark:text-white   flex-1">
                  Capacity: {e.capacity}
                </p>
                <p className="mb-3 font-normal max-w-[500px] text-gray-700 dark:text-white ">
                  Location: {e.location}
                </p>
                <p className="mb-3 font-normal text-gray-700 dark:text-white flex-1">
                  {e.name}
                </p>
              </div>
              <button className="py-2 px-4 rounded-xl bg-pink-500 text-white ronded">
                Delete
              </button>
              <button className="py-2 px-4 ml-2 rounded-xl bg-pink-500 text-white ronded">
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default SellerDashboard;
