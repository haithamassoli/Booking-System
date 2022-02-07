import React from "react";

function Table(props) {
  const getRow1 = () => {
    let chairs = [];
    for (var i = 0; i < Math.ceil(props.chairs / 2); i++) {
      chairs.push(
        <span
          key={i}
          className={
            props.empty
              ? "border bottom-2 border-white bg-red-600 rounded-full m-1 py-1 px-3"
              : "border bottom-2 border-white bg-white rounded-full m-1 py-1 px-3"
          }
        ></span>
      );
    }
    return chairs;
  };
  const getRow2 = () => {
    let chairs2 = [];
    for (var i = 0; i < Math.floor(props.chairs / 2); i++) {
      chairs2.push(
        <span
          key={i}
          className={
            props.empty
              ? "border bottom-2 border-white bg-red-600 rounded-full m-1 py-1 px-3"
              : "border bottom-2 border-white bg-white rounded-full m-1 py-1 px-3"
          }
        ></span>
      );
    }
    return chairs2;
  };

  return (
    <div className="grid items-center justify-center">
      <div
        className={
          props.empty
            ? "table bg-[#f5f6fa66] p-4 m-2 cursor-pointer rounded-xl"
            : "table text-left bg-[#f5f6fa66] p-4 m-2 rounded-xl "
        }
        onClick={() => {
          props.empty
            ? props.selectTable(props.name, props.id)
            : console.log("Tried to select a full table");
        }}
      >
        <div className="mb-1">
          <div className="text-center">{getRow1()}</div>
        </div>
        <div className="mb-1">
          <div className="text-center">{getRow2()}</div>
        </div>

        <p className="text-center text-white">{props.name}</p>
      </div>
    </div>
  );
}

export default Table;
