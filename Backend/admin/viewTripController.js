const Trip = require("../model/tripModel");

const viewTrip = async (req, res) => {
    try {
      const { source, destination } = req.query;
      const trips = await Trip.find({
        source: source,
        destination: destination,
      });
      res.send(trips);
    } catch (err) {
      console.log(err);
    }
};

module.exports = viewTrip;
