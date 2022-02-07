import React from "react";

function Table(props) {
  const getRow1 = () => {
    let chairs = [];
    for (var i = 0; i < Math.ceil(props.chairs / 2); i++) {
      chairs.push(
        <span
          key={i}
          className={props.empty ? "empty-table" : "full-table"}
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
          className={props.empty ? "empty-table" : "full-table"}
        ></span>
      );
    }
    return chairs2;
  };

  return (
    <div className="table-container">
      <div
        className={props.empty ? "table selectable-table" : "table"}
        onClick={() => {
          props.empty
            ? props.selectTable(props.name, props.id)
            : console.log("Tried to select a full table");
        }}
      >
        <div noGutters className="table-row">
          <div className="text-center">{getRow1()}</div>
        </div>
        <div noGutters className="table-row">
          <div className="text-center">{getRow2()}</div>
        </div>

        <p className="text-center table-name">{props.name}</p>
      </div>
    </div>
  );
}

export default Table;
