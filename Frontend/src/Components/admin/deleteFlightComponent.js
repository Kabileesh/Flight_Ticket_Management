import React, { useEffect, useState } from "react";
import axios from "../axiosConfig";
import Flight from "../Others/FlightComponent";
import { useNavigate } from "react-router-dom";

const DeleteFlight = () => {
  const [flights, setFlights] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/view-flights-admin")
      .then((response) => {
        console.log(response);
        setFlights(response?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const deleteHandler = async (flightNumber) => {
    try {
      const flightDetails = {
        flightNumber: flightNumber.flightNumber,
        trip_id: flightNumber.trip_id,
      };
      const response = await axios.delete("/remove-flight", {
        data: flightDetails,
      });
      if (response.status === 200) {
        navigate("/");
        console.log("Flight Deleted Successfully");
      } else {
        console.error("Error Occured: ", response.status);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
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
            bookingDate={"1970-12-20"}
            flight={flight}
            title="Delete"
            onButtonClick={deleteHandler}
          />
        ))}
      </div>
    </div>
  );
};

export default DeleteFlight;
