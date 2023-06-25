import { React, useEffect, useState } from "react";
import { Container } from "reactstrap";
import axios from "../axiosConfig";
import SeatButton from "../Others/Seat";

const ViewSeats = (props) => {
  const generateSeat = (row, count) => {
    let seats = [];
    for (let i = 1; i <= count; i++) {
      seats.push({ name: row + i, isSelected: false });
    }
    return seats;
  };
  let totalSeats = [];
  totalSeats = [...generateSeat("F", 12)];
  totalSeats = [...totalSeats, ...generateSeat("B", 18)];
  totalSeats = [...totalSeats, ...generateSeat("E", 30)];
  const [seatList, setSeatList] = useState(totalSeats);

  const [bookedSeats, setBookedSeats] = useState([]);

  const selectSeatHandler = (seatId) => {
    setSeatList((prevList) => {
      const selectedSeatIdx = [...prevList].findIndex(
        (item) => item.name === seatId
      );
      let selectedSeat = seatList[selectedSeatIdx];
      selectedSeat = { ...selectedSeat, isSelected: !selectedSeat.isSelected };
      let newSeatList = [...seatList];
      newSeatList[selectedSeatIdx] = selectedSeat;
      return newSeatList;
    });
  };
  const bookSeatsHandler =() =>{
     let selectedTickets = [...seatList].filter(seat=>seat.isSelected)
     let newTickets = selectedTickets.map(seat=>seat.name);
     props.submitHandler(newTickets);
  }
  useEffect(() => {
    const ticket = props.ticketDetails;
    axios
      .get("/view-flight-seats", {
        params: {
          flightNumber: ticket?.flightNumber,
          bookingDate: ticket.selectedDate,
        },
      })
      .then((response) => {
        setBookedSeats(response.data);
      });
  }, []);

  const selectedCount = seatList.filter((seat) => seat.isSelected).length;

  return (
    <div>
      <Container
        style={{ minWidth: "20rem", width: "30%", margin: "2rem auto" }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "auto auto auto auto auto auto",
            gridGap: "10px",
          }}
        >
          {seatList.map((seat, idx) => {
            return (
              <SeatButton
                disabled={selectedCount >= 5}
                selectHandler={selectSeatHandler}
                key={idx}
                title={seat.name}
                isSelected={seat.isSelected}
              />
            );
          })}
        </div>
      </Container>
      <button
            className="btn btn-primary"
            type="submit"
            onClick={bookSeatsHandler}
          >
            Book
          </button>
    </div>
  );
};

export default ViewSeats;
