const Bookings = require("../model/bookingsModel");

const viewBookings = async (req, res) => {
  // need to check for altering of date as ISO Datee
  const todayDate = new Date().toISOString();
  const prevBookings = await Bookings.find(
    {
      user_id: req.user.id,
      bookingDate: { $lt: todayDate.split("T")[0] },
    },
    { user_id: 0 }
  );
  const currBookings = await Bookings.find(
    {
      user_id: req.user.id,
      bookingDate: { $gte: todayDate.split("T")[0] },
    },
    { user_id: 0 }
  );
  res.status(200).json({ previous: prevBookings, current: currBookings });
};

module.exports = viewBookings;
