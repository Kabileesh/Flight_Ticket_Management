const Flight = require("../model/flightModel");

const addFlight = async (req, res) => {
  if (req.user.isAdmin) {
    const {
      flightNumber,
      firstClassSeats,
      businessClassSeats,
      economicClassSeats,
      firstClassFair,
      businessClassFair,
      economicClassFair,
    } = req.body;
    try {
      const newFlight = new Flight({
        flightNumber: flightNumber,
        firstClassSeats: firstClassSeats,
        businessClassSeats: businessClassSeats,
        economicClassSeats: economicClassSeats,
        firstClasssFair: firstClassFair,
        businessClassFair: businessClassFair,
        economicClassFair: economicClassFair,
      });
      newFlight.save();
      res.send("New Flight Added successfully");
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  } else {
    res.status(401).json({"Unauthorized User": res.status});
  }
};

module.exports = addFlight;
