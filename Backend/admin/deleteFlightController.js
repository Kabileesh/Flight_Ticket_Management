const Flight = require("../model/flightModel");
const Trip = require("../model/tripModel");

const removeFlight = async (req, res) => {
  if(req.user.isAdmin){
    try {
      const flightNumber = req.body.flightNumber;
      const removedFlight = await Flight.findOneAndDelete({
        flightNumber: flightNumber,
      });
      const deletedTrip = await Trip.deleteMany({ flightNumber: flightNumber });
      res.send(removedFlight);
    } catch (err) {
      console.log(err);
    }
  }
  else{
    res.status(401).json({"Unauthorized User": res.status})
  }
};

module.exports = removeFlight;
