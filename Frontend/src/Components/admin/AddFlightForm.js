import React, { useState } from "react";
import axios from "../axiosConfig";
import { useNavigate } from "react-router-dom";
import { Button, Row, Col, Input, Label, Form } from "reactstrap";
// import "../UI/BookTicket.css"

const AddFlightForm = () => {
  const [flightNumber, setFlightNumber] = useState(0);
  const [firstClassSeats, setFirstClassSeat] = useState(0);
  const [businessClassSeats, setBusinessClassSeat] = useState(0);
  const [economicClassSeats, setEconomicClassSeat] = useState(0);
  const [firstClassFair, setFirstClassFair] = useState(0);
  const [economicClassFair, setEconomicClassFair] = useState(0);
  const [businessClassFair, setBusniessClassFair] = useState(0);

  const navigate = useNavigate();

  const flightNumberHandler = (event) => {
    setFlightNumber(event.target.value);
  };

  const firstClassSeatsHandler = (event) => {
    setFirstClassSeat(event.target.value);
  };
  const businessClassSeatsHandler = (event) => {
    setBusinessClassSeat(event.target.value);
  };
  const economicClassSeatsHandler = (event) => {
    setEconomicClassSeat(event.target.value);
  };
  const firstClassFairHandler = (event) => {
    setFirstClassFair(event.target.value);
  };
  const economicFairHandler = (event) => {
    setEconomicClassFair(event.target.value);
  };
  const buisnessFairHandler = (event) => {
    setBusniessClassFair(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const newFlight = {
      flightNumber: flightNumber,
      firstClassSeats: firstClassSeats,
      businessClassSeats: businessClassSeats,
      economicClassSeats: economicClassSeats,
      firstClassFair: firstClassFair,
      businessClassFair: businessClassFair,
      economicClassFair: economicClassFair,
    };
    try {
      const response = await axios.post("/add-flight", newFlight);
      if (response.status === 200) {
        navigate("/");
      } else {
        console.error("Error Submitting Form:", response.status);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form
      onSubmit={submitHandler}
      style={{
        width: "50%",
        display: "-ms-flexbox",
        marginLeft: "20%",
        marginTop: "4%",
        textAlign:"center"
      }}
    >
      <Row
        className="row-cols-lg-auto g-3 align-items-center"
        style={{ padding: "0.8%", marginLeft: "33%" }}
      >
        <Col>
          <Input
            id="flightNumber"
            name="flightNo"
            placeholder="flight Number"
            type="Number"
            onChange={flightNumberHandler}
          />
        </Col>
      </Row>
      <Row style={{ padding: "0.8%" }}>
        <Col>
          <Input
            id="firstClassSeat"
            name="fSeats"
            placeholder="First Class Seats"
            type="Number"
            onChange={firstClassSeatsHandler}
          />
        </Col>
        <Col>
          <Input
            id="firstClassFair"
            name="fFair"
            placeholder="First Class Fair"
            type="Number"
            onChange={firstClassFairHandler}
          />
        </Col>
      </Row>
      <Row style={{ padding: "0.8%" }}>
        <Col>
          <Col>
            <Input
              id="businessClassSeat"
              name="bSeats"
              placeholder="Business Class Seats"
              type="Number"
              onChange={businessClassSeatsHandler}
            />
          </Col>
        </Col>
        <Col>
          <Input
            id="businessClassFair"
            name="bFair"
            placeholder="Business Class Fair"
            type="Number"
            onChange={buisnessFairHandler}
          />
        </Col>
      </Row>
      <Row style={{ padding: "0.8%" }}>
        <Col>
          <Col>
            <Input
              id="economicClassSeat"
              name="eSeats"
              placeholder="Economic Class Seats"
              type="Number"
              onChange={economicClassSeatsHandler}
            />
          </Col>
        </Col>
        <Col>
          <Input
            id="economicClassFair"
            name="eFair"
            placeholder="Economic Class Fair"
            type="Number"
            onChange={economicFairHandler}
          />
        </Col>
      </Row>
      <Button className="form-control" type="submit" style={{width:"auto",}}>
        Add
      </Button>
    </Form>
  );
};

export default AddFlightForm;
