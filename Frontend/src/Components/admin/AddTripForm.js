import React, { useState } from "react";
import axios from "../axiosConfig";
import DaySelector from "../Others/DaysSelectorComponent";
import { Form, Row, Col, Input, FormGroup, Label, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";

const AddTripForm = () => {
  const [flightNumber, setFlightNumber] = useState(0);
  const [flightName, setFlightName] = useState("");
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [availableDays, setAvailableDays] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [depatureTime, setDepatureTime] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [fair, setFair] = useState(0);

  const Days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const navigate = useNavigate();

  const flightHandler = (event) => {
    setFlightNumber(event.target.value);
  };

  const flightNameHandler = (event) => {
    setFlightName(event.target.value);
  }
  const sourceSelector = (event) => {
    setSource(event.target.value);
  };
  const destinationSelector = (event) => {
    setDestination(event.target.value);
  };

  const depatureHandler = (event) => {
    setDepatureTime(event.target.value);
  };
  const arrivalHandler = (event) => {
    setArrivalTime(event.target.value);
  };

  const setDays = (index) => {
    const cList = availableDays;
    cList[index] = !cList[index];
    setAvailableDays(cList);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const selectedDays = [];
    availableDays.forEach((day, index) => {
      if (day) selectedDays.push(index);
    });

    const newTrip = {
      flightNumber: flightNumber,
      source: source,
      destination: destination,
      availableDays: selectedDays,
      depatureTime: depatureTime,
      arrivalTime: arrivalTime,
    };

    try {
      const response = await axios.post("/add-trip", newTrip);
      if (response.status === 200) {
        navigate("/");
      } else {
        console.error("Error in submitting form: ", response.status);
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
        textAlign: "center",
      }}
    >
      <Row
        className="row-cols-lg-auto g-3 align-items-center"
        style={{ padding: "0.8%" }}
      >
        <Col>
          <Input
            className="form-control"
            placeholder="Flight Number"
            arie-label="Flight Number"
            type="number"
            onChange={flightHandler}
          />
        </Col>
        <Col>
          <Input
            className="form-control"
            placeholder="Flight Name"
            arie-label="Flight Name"
            type="text"
            onChange={flightNameHandler}
          />
        </Col>
        <Col>
          <Input
            className="form-control"
            placeholder="Source"
            arie-label="Source"
            type="text"
            onChange={sourceSelector}
          />
        </Col>
        <Col>
          <Input
            className="form-control"
            placeholder="Destination"
            arie-label="Destination"
            type="text"
            onChange={destinationSelector}
          />
        </Col>
      </Row>
      <Row style={{ display: "flex", flexWrap: "wrap", padding: "0.8%" }}>
        {Days.map((day, index) => {
          return (
            <DaySelector
              key={index}
              value={index}
              title={day}
              onButtonSelect={setDays}
            />
          );
        })}
      </Row>
      <Row style={{ padding: "0.8%" }}>
        <Col>
          <Input
            id="depature-time"
            className="form-control"
            placeholder="Depature Time"
            arie-label="Depature Time"
            type="time"
            onChange={depatureHandler}
          />
          <Label for="depature-time">Depature Time</Label>
        </Col>
        <Col>
          <Input
            id="arrival-time"
            className="form-control"
            placeholder="Arrival Time"
            arie-label="Arrival Time"
            type="time"
            onChange={arrivalHandler}
          />
          <Label for="arrival-time">Arrival Time</Label>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button>Add</Button>
        </Col>
      </Row>
    </Form>
  );
};

export default AddTripForm;
