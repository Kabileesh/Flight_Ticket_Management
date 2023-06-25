import React, { useEffect, useState } from "react";
import axios from "../axiosConfig";
import Flight from "../Others/FlightComponent";
import { useNavigate } from "react-router-dom";
import { Label, Form, Row, Col, Button } from "reactstrap";
import DropDownBox from "../Others/DropDownComponent";

const DeleteTrip = () => {
  const [flights, setFlights] = useState([]);
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [sourceList, setSourceList] = useState([]);
  const [destList, setDestList] = useState([]);

  const [from, setFrom] = useState("From");
  const [to, setTo] = useState("To");

  const navigate = useNavigate();

  const sourceHandler = (value) => {
    setSource(value);
    setFrom(value);
  };

  const destinationHandler = (value) => {
    setDestination(value);
    setTo(value);
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

  const viewHandler = async () => {
    const filterData = {
      source: source,
      destination: destination,
    };
    axios
      .get("/view-trip", { params: filterData })
      .then((response) => {
        setFlights(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteHandler = async (flightNumber) => {
    try {
      const flightDetails = {
        flightNumber: flightNumber.flightNumber,
        trip_id: flightNumber._id,
      };
      const response = await axios.delete("/remove-trip", {
        data: flightDetails,
      });
      if (response.status === 200) {
        console.log("Trip deleted successfully");
        navigate("/");
      } else {
        console.error("Error in action:", response.status);
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        style={{
          width: "50%",
          display: "-ms-flexbox",
          marginLeft: "35%",
          marginTop: "4%",
          textAlign: "center",
        }}
      >
        <Row className="row-cols-lg-auto g-3 align-items-center">
          <Col style={{ padding: "2%" }}>
            <DropDownBox
              id="source"
              title={from}
              detailList={sourceList}
              onSelect={sourceHandler}
            />
            <Label for="source">Source</Label>
          </Col>
          <Col style={{ padding: "2%" }}>
            <DropDownBox
              id="destiantion"
              title={to}
              detailList={destList}
              onSelect={destinationHandler}
            />
            <Label for="destiantion">Destination</Label>
          </Col>
          <Col>
            <Button onClick={viewHandler}>View</Button>
          </Col>
        </Row>
      </Form>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          marginTop: "50px",
        }}
      >
        {flights.map((flight) => (
          <Flight
            key={flight.FlightNumber}
            flight={flight}
            bookingDate="1970-12-20"
            title="Delete"
            onButtonClick={() => deleteHandler(flight)}
          />
        ))}
      </div>
    </div>
  );
};

export default DeleteTrip;
