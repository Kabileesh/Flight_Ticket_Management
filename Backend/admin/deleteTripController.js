const Trip = require("../model/tripModel");
const Booking = require("../model/bookingsModel");

const removeTrip = async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const { flightNumber, trip_id } = req.body;
      const removedTrip = await Trip.findOneAndDelete({
        flightNumber: flightNumber,
        _id: trip_id,
      });
      const todayDate = new Date().toISOString();
      const removedBookings = await Booking.deleteMany({
        trip_id: trip_id,
        bookingDate: { $gt: todayDate.split("T")[0] },
      });
      res.send({ "Removed trip : ": removedTrip });
    } catch (err) {
      console.log(err); 
    }
  } else {
    res.status(401).json({ "Unauthorized user": res.status });
  }
};

module.exports = removeTrip;
