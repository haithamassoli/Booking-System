import React, { useState, useEffect } from "react";
import Table from "./Table";
import { useNavigate } from "react-router-dom";

function Booking() {
  let navigate = useNavigate();
  const [totalTables, setTotalTables] = useState([]);

  // User's selections
  const [selection, setSelection] = useState({
    table: {
      name: null,
      id: null,
    },
    date: new Date(),
    time: null,
    location: "Any Location",
    size: 0,
  });

  const [booking, setBooking] = useState({
    name: "",
    phone: "",
    email: "",
  });

  // List of potential locations
  const [locations] = useState(["Any Location", "Outside", "Inside", "Garden"]);
  const [times] = useState([
    "9AM",
    "10AM",
    "11AM",
    "12PM",
    "1PM",
    "2PM",
    "3PM",
    "4PM",
    "5PM",
  ]);
  // Basic reservation "validation"
  const [reservationError, setReservationError] = useState(false);

  const getDate = () => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const date =
      months[selection.date.getMonth()] +
      " " +
      selection.date.getDate() +
      " " +
      selection.date.getFullYear();
    let time = selection.time.slice(0, -2);
    time = selection.time > 12 ? time + 12 + ":00" : time + ":00";
    console.log(time);
    const datetime = new Date(date + " " + time);
    return datetime;
  };

  const getEmptyTables = (_) => {
    let tables = totalTables.filter((table) => table.isAvailable);
    return tables.length;
  };

  useEffect(() => {
    // Check availability of tables from DB when a date and time is selected
    if (selection.time && selection.date) {
      (async (_) => {
        let datetime = getDate();
        let res = await fetch("http://localhost:3005/availability", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            date: datetime,
          }),
        });
        res = await res.json();
        // Filter available tables with location and group size criteria
        let tables = res.tables.filter(
          (table) =>
            (selection.size > 0 ? table.capacity >= selection.size : true) &&
            (selection.location !== "Any Location"
              ? table.location === selection.location
              : true)
        );
        setTotalTables(tables);
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selection.time, selection.date, selection.size, selection.location]);

  // Make the reservation if all details are filled out
  const reserve = async () => {
    if (
      (booking.name.length === 0) |
      (booking.phone.length === 0) |
      (booking.email.length === 0)
    ) {
      console.log("Incomplete Details");
      setReservationError(true);
    } else {
      const datetime = getDate();
      let res = await fetch("http://localhost:3005/reserve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...booking,
          date: datetime,
          table: selection.table.id,
        }),
      });
      res = await res.text();
      console.log("Reserved: " + res);
      navigate("/success");
    }
  };

  // Clicking on a table sets the selection state
  const selectTable = (table_name, table_id) => {
    setSelection({
      ...selection,
      table: {
        name: table_name,
        id: table_id,
      },
    });
  };

  // Generate party size dropdown
  const getSizes = () => {
    let newSizes = [];

    for (let i = 1; i < 8; i++) {
      newSizes.push(
        <button
          key={i}
          className="booking-dropdown-item"
          onClick={(e) => {
            let newSel = {
              ...selection,
              table: {
                ...selection.table,
              },
              size: i,
            };
            setSelection(newSel);
          }}
        >
          {i}
        </button>
      );
    }
    return newSizes;
  };

  // Generate locations dropdown
  const getLocations = () => {
    let newLocations = [];
    locations.forEach((loc) => {
      newLocations.push(
        <button
          key={loc}
          className="booking-dropdown-item"
          onClick={() => {
            let newSel = {
              ...selection,
              table: {
                ...selection.table,
              },
              location: loc,
            };
            setSelection(newSel);
          }}
        >
          {loc}
        </button>
      );
    });
    return newLocations;
  };

  // Generate Times dropdown
  const getTimes = () => {
    let newTimes = [];
    times.forEach((time) => {
      newTimes.push(
        <button
          key={time}
          className="booking-dropdown-item"
          onClick={() => {
            let newSel = {
              ...selection,
              table: {
                ...selection.table,
              },
              time: time,
            };
            setSelection(newSel);
          }}
        >
          {time}
        </button>
      );
    });
    return newTimes;
  };

  // Generating tables from available tables state
  const getTables = () => {
    console.log("Getting tables");
    if (getEmptyTables() > 0) {
      let tables = [];
      totalTables.forEach((table) => {
        if (table.isAvailable) {
          tables.push(
            <Table
              key={table._id}
              id={table._id}
              chairs={table.capacity}
              name={table.name}
              empty
              selectTable={selectTable}
            />
          );
        } else {
          tables.push(
            <Table
              key={table._id}
              id={table._id}
              chairs={table.capacity}
              name={table.name}
              selectTable={selectTable}
            />
          );
        }
      });
      return tables;
    }
  };

  return (
    <div>
      <div noGutters className="text-center align-items-center pizza-cta">
        <div>
          <p className="looking-for-pizza">
            {!selection.table.id ? "Book a Table" : "Confirm Reservation"}
            <i
              className={
                !selection.table.id
                  ? "fas fa-chair pizza-slice"
                  : "fas fa-clipboard-check pizza-slice"
              }
            ></i>
          </p>
          <p className="selected-table">
            {selection.table.id
              ? "You are booking table " + selection.table.name
              : null}
          </p>

          {reservationError ? (
            <p className="reservation-error">
              * Please fill out all of the details.
            </p>
          ) : null}
        </div>
      </div>

      {!selection.table.id ? (
        <div id="reservation-stuff">
          <div noGutters className="text-center align-items-center">
            <div xs="12" sm="3">
              <input
                type="date"
                required="required"
                className="booking-dropdown"
                value={selection.date.toISOString().split("T")[0]}
                onChange={(e) => {
                  if (!isNaN(new Date(new Date(e.target.value)))) {
                    let newSel = {
                      ...selection,
                      table: {
                        ...selection.table,
                      },
                      date: new Date(e.target.value),
                    };
                    setSelection(newSel);
                  } else {
                    console.log("Invalid date");
                    let newSel = {
                      ...selection,
                      table: {
                        ...selection.table,
                      },
                      date: new Date(),
                    };
                    setSelection(newSel);
                  }
                }}
              ></input>
            </div>
            <div xs="12" sm="3">
              <div>
                <button color="none" caret className="booking-dropdown">
                  {selection.time === null ? "Select a Time" : selection.time}
                </button>
                <div right className="booking-dropdown-menu">
                  {getTimes()}
                </div>
              </div>
            </div>
            <div xs="12" sm="3">
              <div>
                <button color="none" caret className="booking-dropdown">
                  {selection.location}
                </button>
                <div right className="booking-dropdown-menu">
                  {getLocations()}
                </div>
              </div>
            </div>
            <div xs="12" sm="3">
              <div>
                <button color="none" caret className="booking-dropdown">
                  {selection.size === 0
                    ? "Select a Party Size"
                    : selection.size.toString()}
                </button>
                <div right className="booking-dropdown-menu">
                  {getSizes()}
                </div>
              </div>
            </div>
          </div>
          <div noGutters className="tables-display">
            <div>
              {getEmptyTables() > 0 ? (
                <p className="available-tables">{getEmptyTables()} available</p>
              ) : null}

              {selection.date && selection.time ? (
                getEmptyTables() > 0 ? (
                  <div>
                    <div className="table-key">
                      <span className="empty-table"></span> &nbsp; Available
                      &nbsp;&nbsp;
                      <span className="full-table"></span> &nbsp; Unavailable
                      &nbsp;&nbsp;
                    </div>
                    <div noGutters>{getTables()}</div>
                  </div>
                ) : (
                  <p className="table-display-message">No Available Tables</p>
                )
              ) : (
                <p className="table-display-message">
                  Please select a date and time for your reservation.
                </p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div id="confirm-reservation-stuff">
          <div
            noGutters
            className="text-center justify-center reservation-details-container"
          >
            <div xs="12" sm="3" className="reservation-details">
              <input
                type="text"
                bsSize="lg"
                placeholder="Name"
                className="reservation-input"
                value={booking.name}
                onChange={(e) => {
                  setBooking({
                    ...booking,
                    name: e.target.value,
                  });
                }}
              />
            </div>
            <div xs="12" sm="3" className="reservation-details">
              <input
                type="text"
                bsSize="lg"
                placeholder="Phone Number"
                className="reservation-input"
                value={booking.phone}
                onChange={(e) => {
                  setBooking({
                    ...booking,
                    phone: e.target.value,
                  });
                }}
              />
            </div>
            <div xs="12" sm="3" className="reservation-details">
              <input
                type="text"
                bsSize="lg"
                placeholder="Email"
                className="reservation-input"
                value={booking.email}
                onChange={(e) => {
                  setBooking({
                    ...booking,
                    email: e.target.value,
                  });
                }}
              />
            </div>
          </div>
          <div noGutters className="text-center">
            <div>
              <button
                color="none"
                className="book-table-btn"
                onClick={() => {
                  reserve();
                }}
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Booking;
