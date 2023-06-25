import React, { useEffect, useState } from "react";
import { Form, Row, FormGroup, Label, Input, Col, Button } from "reactstrap";
import axios from "../axiosConfig";

const ConfirmationForm = (props) => {
  const [firstClassSeatCount, setFirstClassCount] = useState(0);
  const [businessClassSeatCount, setBusinessClassCount] = useState(0);
  const [economicClassSeatCount, setEconomicClassCount] = useState(0);

  const [F_count, setFcount] = useState(0);
  const [B_count, setBcount] = useState(0);
  const [E_count, setEcount] = useState(0);

  const [F_fair, setF_fair] = useState(0);
  const [B_fair, setB_fair] = useState(0);
  const [E_fair, setE_fair] = useState(0);

  const [totalFair, setTotalFair] = useState(0);
  const [bookedSeats, setBookedSeats] = useState([]);

  const minValue = 0;
  const FmaxValue = 12;
  const BmaxValue = 18;
  const EmaxValue = 30;

  const F_increaseValue = () => {
    if (firstClassSeatCount < FmaxValue) {
      setFirstClassCount((prevValue) => +prevValue + 1);
    } else return;
  };
  const B_increaseValue = () => {
    if (businessClassSeatCount < BmaxValue) {
      setBusinessClassCount((prevValue) => +prevValue + 1);
    } else return;
  };
  const E_increaseValue = () => {
    if (economicClassSeatCount < EmaxValue) {
      setEconomicClassCount((prevValue) => +prevValue + 1);
    } else return;
  };

  const F_decreaseValue = () => {
    if (firstClassSeatCount > minValue) {
      setFirstClassCount((prevValue) => +prevValue - 1);
    } else return;
  };
  const B_decreaseValue = () => {
    if (businessClassSeatCount > minValue) {
      setBusinessClassCount((prevValue) => +prevValue - 1);
    } else return;
  };
  const E_decreaseValue = () => {
    if (economicClassSeatCount > minValue) {
      setEconomicClassCount((prevValue) => +prevValue - 1);
    } else return;
  };

  const fSeatHandler = (event) => {
    if (event.target.value <= FmaxValue)
      setFirstClassCount(+event.target.value);
    else return;
  };
  const bSeatHandler = (event) => {
    if (event.target.value <= BmaxValue)
      setBusinessClassCount(+event.target.value);
    else return;
  };
  const eSeatHandler = (event) => {
    if (event.target.value <= EmaxValue)
      setEconomicClassCount(+event.target.value);
    else return;
  };

  useEffect(() => {
    axios
      .get("/view-flight-seats", {
        params: {
          flightNumber: props.ticket.flightNumber,
          bookingDate: props.ticket.selectedDate,
        },
      })
      .then((response) => {
        const seatDetails = response?.data;
        setFcount(seatDetails.firstClassSeat.length);
        setBcount(seatDetails.businessClassSeats.length);
        setEcount(seatDetails.economicClasssSeats.length);
        setF_fair(seatDetails.firstClassFair);
        setB_fair(seatDetails.businessClassFair);
        setE_fair(seatDetails.economicClassFair);
      });
  }, []);

  useEffect(() => {
    const firstClassAmount = parseInt(firstClassSeatCount) * parseInt(F_fair);
    const businessClassAmount =
      parseInt(businessClassSeatCount) * parseInt(B_fair);
    const economicClassAmount =
      parseInt(economicClassSeatCount) * parseInt(E_fair);
    const total =
      firstClassAmount +
      parseInt(businessClassAmount) +
      parseInt(economicClassAmount);
    setTotalFair(total);
  }, [firstClassSeatCount, businessClassSeatCount, economicClassSeatCount]);

  const submitHandler = (event) => {
    let arr = [];
    for (let i = F_count; i < F_count + firstClassSeatCount; i++)
      arr.push("F"+i);
    for (let i = B_count; i < B_count + businessClassSeatCount; i++)
      arr.push("B"+i);
    for (let i = E_count; i < E_count + economicClassSeatCount; i++)
    arr.push("E"+i);
    const finalTicket = {
      flightNumber: props.ticket.flightNumber,
      source: props.ticket.source,
      destination: props.ticket.destination,
      selectedDate: props.ticket.selectedDate,
      selectedTime: props.ticket.selectedTime,
      totalTicketFair: totalFair,
      seatNumber: arr,
    };
    props.onButtonClick(finalTicket);
  };
  return (
    <div style={{ margin: "2rem", textAlign: "left" }}>
      <Form onSubmit={(e) => e.preventDefault()}>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="fightNo">Flight Number</Label>
              <Input
                disabled={true}
                id="fightNo"
                name="select"
                type="text"
                value={props.ticket.flightNumber}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="source">Source</Label>
              <Input
                disabled={true}
                id="source"
                name="select"
                type="text"
                value={props.ticket.source}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="destiantion">Destination</Label>
              <Input
                disabled={true}
                id="destiantion"
                name="select"
                type="text"
                value={props.ticket.destination}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="exampleEmail">Date</Label>
              <Input
                id="exampleEmail"
                name="date"
                type="date"
                disabled={true}
                value={
                  new Date(props.ticket.selectedDate)
                    .toISOString()
                    .split("T")[0]
                }
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="time">Time</Label>
              <Input
                id="time"
                name="time"
                type="time"
                disabled={true}
                value={props.ticket.selectedTime + ":00"}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <FormGroup>
              <Label for="firstClass">First Class</Label>
              <div>
                <button type="button" onClick={F_decreaseValue}>
                  -
                </button>
                <input
                  id="firstClass"
                  type="number"
                  value={firstClassSeatCount}
                  min={minValue}
                  max={FmaxValue}
                  onChange={fSeatHandler}
                />
                <button onClick={F_increaseValue}>+</button>
              </div>
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label for="businessClass">Business Class</Label>
              <div>
                <button type="button" onClick={B_decreaseValue}>
                  -
                </button>
                <input
                  id="businessClass"
                  type="number"
                  value={businessClassSeatCount}
                  min={minValue}
                  max={BmaxValue}
                  onChange={bSeatHandler}
                />
                <button onClick={B_increaseValue}>+</button>
              </div>
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label for="economicClass">Economic Class</Label>
              <div>
                <button type="button" onClick={E_decreaseValue}>
                  -
                </button>
                <input
                  id="economicClass"
                  type="number"
                  value={economicClassSeatCount}
                  min={minValue}
                  max={EmaxValue}
                  onChange={eSeatHandler}
                />
                <button onClick={E_increaseValue}>+</button>
              </div>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Label for="fair">Total Fair</Label>
          <p id="fair">{totalFair}</p>
        </Row>
        <Button
          disabled={totalFair > 0 ? false : true}
          onClick={submitHandler}
          color="primary"
        >
          Confirm Booking
        </Button>
      </Form>
    </div>
  );
};

export default ConfirmationForm;
