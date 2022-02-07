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
    });
  }, []);
  return (
    <div>
      {reservation.map((e, index) => {
        return <div key={index}></div>;
      })}
    </div>
  );
}

export default SellerDashboard;
