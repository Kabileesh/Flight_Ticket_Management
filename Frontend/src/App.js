import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./Components/routes/PrivateRoute";
import LoginForm from "./Components/Form/LogInForm";
import RegisterForm from "./Components/Form/RegisterForm";
import Layout from "./Components/Layout";
import BookTicketForm from "./Components/Form/BookTicketForm";
import ViewSeats from "./Components/client/viewSeatsComponent";
import AddFlightForm from "./Components/admin/AddFlightForm";
import AddTripForm from "./Components/admin/AddTripForm";
import DeleteFlight from "./Components/admin/deleteFlightComponent";
import DeleteTrip from "./Components/admin/deleteTripComponent";
import MainLayOut from "./Components/Layout/MainLayout";
import ViewBookings from "./Components/client/viewBookingsComponent";
import ViewAllBookings from "./Components/admin/viewFlightBookings";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" Component={LoginForm} />
        <Route path="/register" Component={RegisterForm} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route index Component={MainLayOut}/>
          {/* Client side routes*/}
          <Route path="/book-ticket" Component={BookTicketForm} />
          <Route path="/view-seats" Component={ViewSeats} />
          <Route path="/view-bookings" Component={ViewBookings}/>
          {/* admin side routes*/}
          <Route path="/add-flight" Component={AddFlightForm} />
          <Route path="/add-trip" Component={AddTripForm} />
          <Route path="/remove-flight" Component={DeleteFlight} />
          <Route path="/remove-trip" Component={DeleteTrip} />
          <Route path="/view-flights-booking" Component={ViewAllBookings}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
