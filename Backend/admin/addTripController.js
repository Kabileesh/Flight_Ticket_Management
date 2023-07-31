const Trip = require("../model/tripModel");

const addTrip = async (req, res) => {
  if (req.user.isAdmin) {
    const {
      flightNumber,
      source,
      destination,
      arrivalTime,
      depatureTime,
      availableDays,
      flightName
    } = req.body;

    const setArrivalTime = new Date();
    const [arrivalHour, arrivalMinutes] = arrivalTime.split(":");
    setArrivalTime.setUTCHours(arrivalHour, arrivalMinutes, 0, 0);

    const setDepatureTime = new Date();
    const [depatureHour, depatureMinutes] = depatureTime.split(":");
    setDepatureTime.setUTCHours(depatureHour, depatureMinutes, 0, 0);
    try {
      const newTrip = new Trip({
        flightNumber: flightNumber,
        flightName: flightName,
        source: source,
        destination: destination,
        availableDays: availableDays,
        arrivalTime: setArrivalTime,
        depatureTime: setDepatureTime,
      });
      newTrip.save();
      res.send("Trip added succesfully");
    } catch (err) {
      console.log(err);
    }
  } else {
    res.status(401).json({ "Unauthorized User": res.status });
  }
};

module.exports = addTrip;
