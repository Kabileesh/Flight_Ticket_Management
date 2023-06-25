import React, { useState } from "react";
import axios from "../axiosConfig";
import Bookings from "../Others/BookingComponent";
import { Form, Row, Label, Input, Col, Button, Spinner } from "reactstrap";

const ViewAllBookings = () => {
  const [flightNumber, setFlightNumber] = useState(0);
  const [depatureDate, setDepatureDate] = useState("");
  const [flightDetails, setFlightDetails] = useState([]);
  const [loading, setLoading] = useState(false);

  const FlightNumberHandler = (event) => {
    setFlightNumber(event.target.value);
  };

  const depatureDateHandler = (event) => {
    setDepatureDate(event.target.value);
  };

  const viewHandler = async () => {
    setLoading(true);
    const details = {
      flightNumber: flightNumber,
      selectedDate: depatureDate,
    };
    try {
      const response = await axios.get("/view-flights-booking", {
        params: details,
      });
      if (response.status === 200) {
        setFlightDetails(response.data);
        setLoading(false);
      } else {
        console.error("Error in Page: ", response.status);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Form
        style={{
          width: "50%",
          display: "-ms-flexbox",
          marginLeft: "20%",
          marginTop: "4%",
          textAlign: "center",
        }}
      >
        <Row className="row-cols-lg-auto g-3 align-items-center" style={{marginLeft:"20%", padding:"1%"}}>
          <Col>
            <Input
              id="flightNo"
              placeholder="Flight Number"
              type="number"
              onChange={FlightNumberHandler}
            />
            <Label for="flightNo">Flight Number</Label>
          </Col>
          <Col>
            <Input
              id="depature-date"
              placeholder="Depature Date"
              type="date"
              onChange={depatureDateHandler}
            />
            <Label for="depature">Date</Label>
          </Col>
        </Row>
        <Button disabled={(depatureDate && flightNumber ? false : true)} onClick={viewHandler} style={{ width: "auto" }}>
          View
        </Button>
      </Form>
      {loading ? (
        <Spinner style={{ marginLeft: "44%", marginTop:"2%"}}>Loading...</Spinner>
      ) : flightDetails.length === 0 ? (
        <p style={{ marginLeft: "35%", padding: "4%" }}>
          No Flights Booked in this Date
        </p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {flightDetails.map((flight) => (
            <Bookings
              key={flight.FlightNumber}
              detail={flight}
              title="booking"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewAllBookings;
