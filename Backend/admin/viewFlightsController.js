const Flight = require("../model/flightModel");

const viewAllFlights = async (req, res) => {
  if (req.user.isAdmin) {
    try {
      // const { flightNumber } = req.query;
      const flights = await Flight.find({}, { __v: 0 });
      res.send(flights);
    } catch (err) {
      console.log(err);
    }
  } else {
    res.status(401).json({ "Unauthorized User": res.status });
  }
};

module.exports = viewAllFlights;
