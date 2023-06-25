const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
  flightNumber : {
    type: Number,
    required : true,
  },
  source: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  availableDays: {
    type: [Number],
    required: true,
  },
  arrivalTime: {
    type: Date,
    required: true,
  },
  depatureTime: {
    type: Date,
    required: true,
  },
});

tripSchema.index({ source: 1, destination: 1 }, { unique: true });

const Trip = mongoose.model("Trip",tripSchema);

module.exports = Trip;
