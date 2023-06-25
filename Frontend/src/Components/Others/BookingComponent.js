import React from "react";
import axios from "../axiosConfig";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";

const Bookings = (props) => {
  return (
    <Card
      className="my-2"
      style={{
        width: "18rem",
      }}
    >
      <CardBody>
        <CardTitle tag="h5">Flight Number {props.detail.flightNumber}</CardTitle>
        {/* <CardText><b>Trip ID : </b>{props.detail.trip_id}</CardText> */}
        <CardText><b>Ticket ID : </b>{props.detail._id}</CardText>
        <CardText><b>Source : </b>{props.detail.source}</CardText>
        <CardText><b>Destination : </b>{props.detail.destination}</CardText>
        <CardText><b>Booking Date : </b>{props.detail.bookingDate.split("T")[0]}</CardText>
        {props.title === "booking" ? (
          <CardText><b>Total Fair : </b>{props.detail.totalTicketFair}</CardText>
        ) : (
          ""
        )}
      </CardBody>
    </Card>
  );
};

export default Bookings;
