const Booking = require("../model/bookingsModel");
const Flight = require("../model/flightModel");

const viewFlightSeats = async (req, res) => {
  try {
    const { flightNumber, bookingDate } = req.query;
    const formattedDate = new Date(bookingDate).getTime();
    const bookedSeats = await Booking.find(
      {
        flightNumber: flightNumber,
        bookingDate: new Date(formattedDate).toISOString(),
      },
      { seatNumber: 1, _id: 0 }
    );
    const seatList = bookedSeats.flatMap((obj) => obj.seatNumber);
    const firstClassSeats = seatList.filter((seat) => seat.startsWith("F"));
    const businessClassSeats = seatList.filter((seat) => seat.startsWith("B"));
    const economicClassSeats = seatList.filter((seat) => seat.startsWith("E"));

    const ticketFair = await Flight.findOne({ flightNumber: flightNumber });


    const seatDetails = {
      seatList: seatList,
      firstClassSeat: firstClassSeats,
      businessClassSeats: businessClassSeats,
      economicClasssSeats: economicClassSeats,
      firstClassFair: ticketFair.firstClasssFair,
      businessClassFair: ticketFair.businessClassFair,
      economicClassFair: ticketFair.economicClassFair,
    };
    res.send(seatDetails);
  } catch (err) {
    console.log(err);
  }
};

module.exports = viewFlightSeats;
