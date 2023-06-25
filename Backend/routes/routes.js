const express = require("express");
const passport = require("passport");
const { registerUser, loginUser } = require("../controllers/loginController");
const logOutUser = require("../controllers/logOutController");
const viewFlights = require("../controllers/viewFlightsController");
const bookTicket = require("../controllers/bookTicketsController");
const addFlight = require("../admin/addFlightController");
const removeFlight = require("../admin/deleteFlightController");
const viewBookings = require("../controllers/viewBookingsController");
const addTrip = require("../admin/addTripController");
const removeTrip = require("../admin/deleteTripController");
const viewFlightBookings = require("../admin/viewFlightBookingsController");
const viewAllFlights = require("../admin/viewFlightsController");
const viewTrip = require("../admin/viewTripController");
const { hashPassword } = require("../auth/passport");
const viewFlightSeats = require("../controllers/viewFlightSeatsController");
const verifyToken = require("../controllers/tokenVerifierController");
const viewSourceDest = require("../controllers/viewSourceDestController");
const router = express.Router();

router.post("/verify-token", verifyToken);

router.post("/add-flight", passport.authenticate('bearer', { session: false }), addFlight);
router.post("/add-trip", passport.authenticate('bearer', { session: false }), addTrip);
router.delete("/remove-flight", passport.authenticate('bearer', { session: false }), removeFlight);
router.delete("/remove-trip", passport.authenticate('bearer', { session: false }), removeTrip);
router.get("/view-flights-booking", passport.authenticate('bearer', { session: false }), viewFlightBookings);
router.get("/view-flights-admin", passport.authenticate('bearer', { session: false }),viewAllFlights);
router.get("/view-trip", passport.authenticate('bearer', { session: false }),viewTrip);

router.get("/view-flights", passport.authenticate('bearer', { session: false }), viewFlights);
router.post("/book-ticket", passport.authenticate('bearer', { session: false }), bookTicket);
router.get("/view-bookings", passport.authenticate('bearer', { session: false }), viewBookings);
router.get("/view-flight-seats",passport.authenticate('bearer', { session: false }), viewFlightSeats);
router.get("/get-source-destination", passport.authenticate('bearer', { session: false }), viewSourceDest);
router.post("/register", hashPassword, registerUser);
router.post("/login", loginUser);
router.post("/logout", logOutUser);
router.get("/", (req, res) => {
    res.json({ response : "Home Page"})
})

module.exports = router;