import React, { useEffect, useState } from "react";
import axios from "../axiosConfig";
import { Link } from "react-router-dom";

const Flight = (props) => {
  const [firstClassSeatCount, setFirstClassCount] = useState(0);
  const [businessClassSeatCount, setBusinessClassCount] = useState(0);
  const [economicClassSeatCount, setEconomicClassCount] = useState(0);

  useEffect(() => {
    axios
      .get("/view-flight-seats", {
        params: {
          flightNumber: props.flight.flightNumber,
          bookingDate: props.bookingDate,
        },
      })
      .then((response) => {
        const firstClass = response?.data.firstClassSeat;
        const businessClass = response?.data.businessClassSeats;
        const economicClass = response?.data.economicClasssSeats;
        setFirstClassCount(firstClass.length);
        setBusinessClassCount(businessClass.length);
        setEconomicClassCount(economicClass.length);
      });
  }, []);
  const bookHander = (onButtonClick) => {
    const newBooking = {
      flightNumber: props.flightNumber,
      source: props.source,
      destination: props.destination,
      depatureTime: props.depatureTime,
      trip_id: props.flight._id
    };
    props.onButtonClick(newBooking);
  };

  const deleteHandler = (onButtonClick) => {
    const flightNumber = {
      flightNumber: props.flight.flightNumber,
      trip_id: props.flight._id,
    };
    props.onButtonClick(flightNumber);
  };

  return (
    <div className="row ">
      <div className="">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">
              Flight Number: {props.flight.flightNumber}
            </h5>
            <hr />
            {/* <h5>Trip ID : {props.flight._id}</h5> */}
            {props.flight.source === null ? (
              <p className="card-text">Source : {props.flight.source}</p>
            ) : (
              ""
            )}
            {props.flight.destination === null ? (
              <p className="card-text">
                Destination : {props.flight.destination}
              </p>
            ) : (
              ""
            )}
            {props.flight.depatureTime === null ? (
              <p className="card-text">
                Depature Time : {props.flight.depatureTime}
              </p>
            ) : (
              ""
            )}
            {firstClassSeatCount !== null ? (
              <p className="card-text">
                First Class Seats : {12 - firstClassSeatCount} / 12
              </p>
            ) : (
              ""
            )}
            {businessClassSeatCount !== null ? (
              <p className="card-text">
                Business Class Seats : {18 - businessClassSeatCount} / 18
              </p>
            ) : (
              ""
            )}
            {economicClassSeatCount !== null ? (
              <p className="card-text">
                Economic Class Seats : {30 - economicClassSeatCount} / 30
              </p>
            ) : (
              ""
            )}

            {/* <p className="card-text">Ticket Fair : {props.fair}</p> */}
            <button
              className="btn btn-primary"
              type="submit"
              onClick={props.title === "Book" ? bookHander : deleteHandler}
            >
              {props.title}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flight;
