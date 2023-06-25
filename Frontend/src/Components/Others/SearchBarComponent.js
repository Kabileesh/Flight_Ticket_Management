import React, { useEffect, useState } from "react";
import DropDownBox from "../Others/DropDownComponent";
import axios from "../axiosConfig";
import { Form, FormGroup, Row, Col, Label, Input, Button } from "reactstrap";

const SearchBar = (props) => {
  const [selectedDate, setDate] = useState("");
  const [selectedTime, setTime] = useState("");
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [sourceList, setSourceList] = useState([]);
  const [destList, setDestList] = useState([]);

  const [dateChecker, setDateChecker] = useState(false);
  const [timeChecker, setTimeChecker] = useState(false);

  const dateHandler = (event) => {
    // setDateChecker(true);
    setDate(event.target.value);
    setDateChecker(true);
  };

  const [from, setFrom] = useState("From");
  const [to, setTo] = useState("To");

  const timeHandler = (event) => {
    setTime(event.target.value);
    setTimeChecker(true);
  };

  const sourceSelector = (source) => {
    setSource(source);
    setFrom(source);
  };

  const destinationSelector = (destination) => {
    setDestination(destination);
    setTo(destination);
  };

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    if (month < 10) {
      month = `0${month}`;
    }
    if (day < 10) {
      day = `0${day}`;
    }

    return `${year}-${month}-${day}`;
  };

  const clickHandler = () => {
    const details = {
      inputDate: selectedDate,
      selectedTime,
      source,
      destination,
    };
    props.details(details);
  };

  useEffect(() => {
    axios.get("/get-source-destination").then((response) => {
      const sources = response?.data.sourceList;
      const destinations = response?.data.destList;
      setSource(sources[0]);
      setDestination(destinations[0]);
      setSourceList(sources);
      setDestList(destinations);
    });
  }, []);
  return (
    <Form
      onSubmit={(e) => e.preventDefault()}
      style={{
        textAlign: "center",
        width: "50%",
        display: "-ms-flexbox",
        marginLeft: "20%",
      }}
    >
      <h5 style={{ padding: "3%" }}>Search For Flight</h5>
      <Row>
        <Col>
          <Input
            id="bookingDate"
            placeholder="Need Ticket On"
            type="date"
            value={selectedDate}
            onChange={dateHandler}
            min={getCurrentDate()}
          />
          {dateChecker ? (
            ""
          ) : (
            <p style={{ color: "red" }}>please select the date</p>
          )}

          <Label for="bookingDate">Need Ticket On</Label>
        </Col>
        <Col>
          <Input
            id="bookingTime"
            placeholder="Departure Time"
            type="time"
            value={selectedTime}
            onChange={timeHandler}
          />
          {timeChecker ? (
            ""
          ) : (
            <p style={{ color: "red" }}>please select the time</p>
          )}
          <Label for="bookingTime">Departure Time</Label>
        </Col>
      </Row>
      <Row style={{ padding: "2%" }}>
        <Col>
          <DropDownBox
            id="source"
            title={from}
            detailList={sourceList}
            onSelect={sourceSelector}
          />
          <Label for="source">From</Label>
        </Col>
        <Col>
          <DropDownBox
            id="destiantion"
            title={to}
            detailList={destList}
            onSelect={destinationSelector}
          />
          <Label for="destiantion">To</Label>
        </Col>
      </Row>

      <Button disabled={(dateChecker && timeChecker ? false : true)} onClick={clickHandler} style={{ marginTop: "1%" }}>
        View Flights
      </Button>
    </Form>
  );
};

export default SearchBar;
