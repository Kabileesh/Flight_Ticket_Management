import React, { useState } from "react";
import { MDBBtn, MDBContainer, MDBCol, MDBRow } from "mdb-react-ui-kit";
import { Alert } from "reactstrap";
import FooterLayout from "./FooterLayout";
import { Link } from "react-router-dom";
import image from "../../bg-img.jpg";

const MainLayOut = ({ isLogged }) => {
  return (
    <React.Fragment>
      <div
        className="p-6 text-center bg-image"
        style={{
          backgroundImage: `url(${image})`,
          height: "400px",
        }}
      >
        <div className="mask" style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}>
          <div className="d-flex justify-content-center align-items-center h-100">
            <div className="text-white">
              <h1 className="mb-3">AirHub</h1>
              <h4 className="mb-3">Your Ultimate Wings to the World!</h4>
              <MDBBtn tag="a" outline size="lg">
                <Link to={"/book-ticket"}>Book a Trip</Link>
              </MDBBtn>
            </div>
          </div>
        </div>
      </div>
      <MDBContainer
        className="overflow-hidden"
        style={{ marginTop: "5%", marginBottom: "5%" }}
      >
        <MDBRow className="gy-5">
          <MDBCol size="6">
            <Alert>
              <h4 className="alert-heading">Easy Booking Process !</h4>
              <hr />
              <p>
                Book Your Flight in Minutes! Simple, Intuitive, and Hassle-Free
                Booking Process.
              </p>
            </Alert>
          </MDBCol>
          <MDBCol size="6">
            <Alert>
              <h4 className="alert-heading">Rewards !</h4>
              <hr />
              <p>
                Our Way of Saying Thanks! Exclusive Rewards for Our Loyal
                Customers - Earn Points, Unlock Benefits
              </p>
            </Alert>
          </MDBCol>
          <MDBCol size="6">
            <Alert>
              <h4 className="alert-heading">24/7 Support</h4>
              <hr />
              <p>
                We're Always Here for You! Round-the-Clock Customer Support -
                Anytime, Anywhere.
              </p>
            </Alert>
          </MDBCol>
          <MDBCol size="6">
            <Alert>
              <h4 className="alert-heading">Enjoy your Seating</h4>
              <hr />
              <p>
                Upgrade Your Experience! Indulge in Comfort with Premium Seats
                - Business Class and First Class Upgrades.
              </p>
            </Alert>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <FooterLayout />
    </React.Fragment>
  );
};

export default MainLayOut;
