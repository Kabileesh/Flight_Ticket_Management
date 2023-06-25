const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  trip_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Trip",
    required: true
  },
  flightNumber: {
    type : Number,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  seatNumber: {
    type: [String],
    required: true,
  },
  bookingDate: {
    type: Date,
    required: true,
  },
  depatureTime:{
    type: Date,
    required: true,
  },
  totalTicketFair: {
    type: Number,
    required: true,
  },
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
