import React, { useEffect, useState } from "react";
import axios from "../axiosConfig";
import Bookings from "../Others/BookingComponent";
import { Spinner } from "reactstrap";

const ViewBookings = () => {
  const [prevBookings, setPrevBookings] = useState([]);
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("/view-bookings", { params: {} })
      .then((response) => {
        setPrevBookings(response.data.previous);
        setUpcomingBookings(response.data.current);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div>
        <h2>Previous Bookings: </h2>
        {loading ? (
          <Spinner style={{ marginLeft: "50%" }}>Loading...</Spinner>
        ) : prevBookings.length === 0 ? (
          <p> No Flights Booked </p>
        ) : (
          <div style={{ display: "flex", flexWrap:"wrap" }}>
            {prevBookings.map((booking) => (
              <Bookings title="booking" key={booking.FlightNumber} detail={booking} />
            ))}
          </div>
        )}
      </div>
      <div style={{ marginTop: "auto", paddingTop: "15%" }}>
        <h2>Current Bookings: </h2>
        {loading ? (
          <Spinner style={{ marginLeft: "50%" }}>Loading...</Spinner>
        ) : upcomingBookings.length === 0 ? (
          <p>No Flights Booked</p>
        ) : (
          <div style={{ display: "flex", flexWrap:"wrap" }}>
            {upcomingBookings.map((booking) => (
              <Bookings title="booking" key={booking.FlightNumber} detail={booking} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewBookings;
