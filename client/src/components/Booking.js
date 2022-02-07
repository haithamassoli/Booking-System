import React, { useState, useEffect, Fragment } from "react";
import Table from "./Table";
import { useNavigate } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

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
        let res = await fetch("http://localhost:3001/availability", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
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
        console.log(tables);
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
      let res = await fetch("http://localhost:3001/reserve", {
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
        <Menu.Item>
          {({ active }) => (
            <button
              key={i}
              className={classNames(
                active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                "w-full block px-4 py-2 text-sm"
              )}
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
          )}
        </Menu.Item>
      );
    }
    return newSizes;
  };

  // Generate locations dropdown
  const getLocations = () => {
    let newLocations = [];
    locations.forEach((loc) => {
      newLocations.push(
        <Menu.Item>
          {({ active }) => (
            <button
              key={loc}
              className={classNames(
                active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                "w-full block px-4 py-2 text-sm"
              )}
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
          )}
        </Menu.Item>
      );
    });
    return newLocations;
  };

  // Generate Times dropdown
  const getTimes = () => {
    let newTimes = [];
    times.forEach((time) => {
      newTimes.push(
        <Menu.Item>
          {({ active }) => (
            <button
              key={time}
              className={classNames(
                active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                "w-full block px-4 py-2 text-sm"
              )}
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
          )}
        </Menu.Item>
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
    <>
      <div>
        <div className="text-center align-items-center mt-8">
          <div>
            <h1 className="text-5xl">
              {!selection.table.id ? "Book a Table" : "Confirm Reservation"}
              <i
                className={
                  !selection.table.id
                    ? "fas fa-chair text-pink-600 ml-3 text-5xl"
                    : "fas fa-clipboard-check text-pink-600 ml-3 text-5xl"
                }
              ></i>
            </h1>
            <p className="mt-6 text-3xl">
              {selection.table.id
                ? "You are booking table " + selection.table.name
                : null}
            </p>

            {reservationError ? (
              <p className="text-red-500 mt-3">
                * Please fill out all of the details.
              </p>
            ) : null}
          </div>
        </div>

        {!selection.table.id ? (
          <div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mx-8 text-center align-items-center">
              <input
                type="date"
                required="required"
                className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
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
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                    {selection.time === null ? "Select a Time" : selection.time}
                    <ChevronDownIcon
                      className="-mr-1 ml-2 h-5 w-5"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">{getTimes()}</div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                    {selection.location}
                    <ChevronDownIcon
                      className="-mr-1 ml-2 h-5 w-5"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">{getLocations()}</div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                    {selection.size === 0
                      ? "Select a Party Size"
                      : selection.size.toString()}
                    <ChevronDownIcon
                      className="-mr-1 ml-2 h-5 w-5"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">{getSizes()}</div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
            <div className="bg-pink-600 mt-20 mx-20 rounded-xl p-10 text-white">
              <div>
                {getEmptyTables() > 0 ? (
                  <p className="mb-5">{getEmptyTables()} available</p>
                ) : null}

                {selection.date && selection.time ? (
                  getEmptyTables() > 0 ? (
                    <div className="my-10">
                      <div className="text-white">
                        <span className="border border-white bg-red-600 rounded-full m-1 py-1 px-3"></span>
                        &nbsp; Available &nbsp;&nbsp;
                        <span className="border border-white bg-white rounded-full m-1 py-1 px-3"></span>
                        &nbsp; Unavailable &nbsp;&nbsp;
                      </div>
                      <div className="grid md:grid-cols-4 mt-6 sm:grid-cols-2 grid-cols-1 items-center justify-center">
                        {getTables()}
                      </div>
                    </div>
                  ) : (
                    <p className="p-5 text-center text-2xl text-white">
                      No Available Tables
                    </p>
                  )
                ) : (
                  <p className="p-5 text-center text-2xl text-white">
                    Please select a date and time for your reservation.
                  </p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="md:mx-auto max-w-2xl mx-6 mt-8">
              <div className="mb-6">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  bsSize="lg"
                  placeholder="Name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-black dark:focus:ring-pink-500 dark:focus:border-pink-500"
                  value={booking.name}
                  required
                  onChange={(e) => {
                    setBooking({
                      ...booking,
                      name: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="number"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                >
                  Your Number
                </label>
                <input
                  type="number"
                  bsSize="lg"
                  placeholder="Phone Number"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-black dark:focus:ring-pink-500 dark:focus:border-pink-500"
                  value={booking.phone}
                  required
                  onChange={(e) => {
                    setBooking({
                      ...booking,
                      phone: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  bsSize="lg"
                  placeholder="Email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-black dark:focus:ring-pink-500 dark:focus:border-pink-500"
                  value={booking.email}
                  required
                  onChange={(e) => {
                    setBooking({
                      ...booking,
                      email: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
            <div className="text-center">
              <div>
                <button
                  className="py-3 px-5 rounded-xl bg-pink-500 text-white ronded"
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
    </>
  );
}

export default Booking;
