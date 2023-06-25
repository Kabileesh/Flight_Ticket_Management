const Booking = require("../model/bookingsModel");

const viewFlightBookings = async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const { flightNumber, selectedDate } = req.query;
      const formattedDate = new Date(selectedDate).getTime();
      const flightBookings = await Booking.find({
        flightNumber: flightNumber,
        bookingDate: new Date(formattedDate).toISOString(),
      });
      res.send(flightBookings);
    } catch (err) {
      console.log(err);
    }
  } else {
    res.status(401).json({ "Unauthorized User": res.status });
  }
};

module.exports = viewFlightBookings;
