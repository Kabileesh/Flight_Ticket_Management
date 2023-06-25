const Bookings = require("../model/bookingsModel");
const mongoose = require("mongoose");
const Trip = require("../model/tripModel");
const Flight = require("../model/flightModel");

const bookTicket = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const opts = { session };
    const {
      selectedDate,
      selectedTime,
      source,
      destination,
      flightNumber,
      seatNumber,
      totalTicketFair
    } = req.body;

    const [hour, minute] = selectedTime?.split(":");
    const formattedDate = new Date(selectedDate).getTime();

    const Time = new Date();
    Time.setUTCHours(hour);
    Time.setUTCMinutes(minute);
    bookedTime = Time.toISOString();

    const selectedFlight = await Trip.find({
      flightNumber: flightNumber,
      source: source,
      destination: destination,
    });
    const ticketFairs = await Flight.find({flightNumber: flightNumber});

    const Fair = {"F" : ticketFairs.firstClassFair,"B":ticketFairs.businessClassFair, "E":ticketFairs.economicClassFair}

    const tripId = selectedFlight[0]._id;

    const bookedSeats = await Bookings.aggregate(
      [
        {
          $match: {
            $expr: {
              $and: [
                { $eq: [{ $hour: "$depatureTime" }, hour] },
                { $eq: [{ $minute: "$depatureTime" }, minute] },
              ],
            },
            flightNumber: flightNumber,
            bookingDate: new Date(formattedDate).toISOString(),
          },
        },
      ],
      { user_id: 0 }
    );

    const newBooking = new Bookings({
      user_id: req.user.id,
      trip_id: tripId,
      flightNumber: flightNumber,
      source: source,
      destination : destination,
      seatNumber: seatNumber,// ["F1"]
      bookingDate: new Date(formattedDate).toISOString(),
      depatureTime: bookedTime,
      totalTicketFair: totalTicketFair,
    });

    await newBooking.save(opts);
    let totalBooked;
    for (let seat in bookedSeats) {
      totalBooked += seat.seatNumber.length;
    }

    const totalSeats = selectedFlight.availableSeats;

    const availableSeats = totalSeats - totalBooked;

    if (availableSeats >= seatNumber.length) {
      throw new Error("No seats available");
    }

    await session.commitTransaction();
    session.endSession();

    res.send("Ticket booked successfully");
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    console.error("Failed to book ticket:", err);
  }
};

module.exports = bookTicket;
