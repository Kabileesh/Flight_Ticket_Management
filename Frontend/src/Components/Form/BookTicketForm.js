import React, { useState } from "react";
import axios from "../axiosConfig";
import Flight from "../Others/FlightComponent";
import SearchBar from "../Others/SearchBarComponent";
import { useNavigate } from "react-router-dom";
import ConfirmationForm from "./ConfirmationTicket";

const BookTicketForm = (props) => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [seatVisible, seatSeatVisible] = useState(false);
  const navigate = useNavigate();
  const [searchDetails,setSearchDetails] =useState({})
  const [bookingDate, setBookingDate] = useState("");
  const [ticket, setTicket] = useState({});

  const detailsHandler = async (detail) => {
    setSearchDetails(detail);
    
    try {
      setBookingDate(detail.inputDate);
      setLoading(true);
      const response = await axios.get("/view-trip", { params: detail });
      setFlights([...response.data]);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };


  const submitHandler = async (finalTicket) => {
    const response = await axios.post("/book-ticket", finalTicket);
    if (response?.status === 200) {
      navigate("/view-bookings");
    } else {
      console.error("Error submitting form:", response.status);
    }
  };
  const newBookHandler = (flight) =>{
    let newTicket = {
      flightNumber: flight.flightNumber,
      selectedDate: searchDetails.inputDate,
      selectedTime: searchDetails.selectedTime,
      source: flight.source,
      destination:flight.destination
    }
    setTicket(newTicket);
    seatSeatVisible(true);
  }
  
  return (
    <div>
      {seatVisible ? (
        <div>
          <ConfirmationForm ticket={ticket} onButtonClick={submitHandler}/>
        </div>
      ) : (
        <>
          <SearchBar details={detailsHandler} />
          {loading ? (
            <p style={{textAlign:"center", marginTop:"2%"}}>Loading...</p>
          ) : (
            <>
              {flights && flights.length > 0 ? (
                <ul>
                  {flights.map((flight) => (
                    <Flight
                      key={flight.FlightNumber}
                      flight={flight}
                      title="Book"
                      bookingDate={searchDetails.inputDate}
                      onButtonClick={()=>newBookHandler(flight)}
                    />
                  ))}
                </ul>
              ) : null}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default BookTicketForm;
