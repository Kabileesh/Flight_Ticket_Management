import React from "react";
import { Button as Seat } from "reactstrap";
// import "../UI/SeatDesign.css";

const SeatButton = (props) => {
  return (
    <Seat
    outline
      disabled={!props.isSelected && props.disabled}
      onClick={()=>props.selectHandler(props.title)}
      color="primary"
      className={props.isSelected ? "active-single-seat" : "single-seat"}
    >
      {props.title}
    </Seat>
  );
};

export default SeatButton;
