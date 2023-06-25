const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema({
  flightNumber: {
    type: Number,
    unique : true,
    required: true,
  },
  firstClassSeats: {
    type: Number,
    required: true,
  },
  businessClassSeats: {
    type : Number,
    required : true,
  },
  economicClassSeats: {
    type: Number,
    required: true,
  },
  firstClasssFair: {
    type: Number,
    required: true,
  },
  businessClassFair: {
    type: Number,
    required: true,
  },
  economicClassFair: {
    type: Number,
    required: true,
  }
});

const Flight = mongoose.model("Flight", flightSchema);

module.exports = Flight;
