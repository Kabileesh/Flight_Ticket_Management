import React, { useState } from "react";
import axios from "../axiosConfig";
// import "../UI/LoginForm.css";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { Form, Row, Col, FormGroup, Input, Label, Button } from "reactstrap";

const RegisterForm = (props) => {
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [phone, setPhone] = useState(0);
  const [secret, setSecret] = useState("");
  const [phoneChecker, setPhoneChecker] = useState(true);

  const navigate = useNavigate();
  const [secretChecker, setSecretChecker] = useState(false);

  const nameHandler = (event) => {
    setName(event.target.value);
  };

  const mailHandler = (event) => {
    setMail(event.target.value);
  };
  const phoneHandler = (event) => {
    // setPhoneChecker(true);
    setPhone(event.target.value);
    if (phone.length === 10) setPhoneChecker(false);
    else setPhoneChecker(true);
  };
  const secretHandler = (event) => {
    setSecret(event.target.value);
    if (secret.length < 8) {
      setSecretChecker(false);
    } else setSecretChecker(true);
  };

  const formHandler = async (event) => {
    event.preventDefault();
    const userData = {
      name: name,
      username: mail,
      phone: phone,
      password: secret,
    };
    try {
      const response = await axios.post("/register", userData);
      if (response.status === 200) {
        const accessToken = response.accessToken;
        sessionStorage.setItem("accessToken", accessToken);
        navigate("/");
      } else {
        console.error(response.status);
      }
    } catch (err) {}
  };
  if (window.sessionStorage.getItem("accessToken")) return <Navigate to="/" />;

  return (
    <div
      id="loginform"
      style={{
        maxWidth: "60%",
        display: "block",
        marginLeft: "35%",
        paddingTop: "0.5%",
        borderBlockColor: "ButtonShadow",
      }}
    >
      <Form onSubmit={formHandler}>
        <h2 id="headerTitle">Register Here</h2>
        {/* <Col md={6}> */}
        <FormGroup>
          <Label for="name">Name</Label>
          <Input
            id="name"
            name="name"
            placeholder="Name"
            type="text"
            onChange={nameHandler}
            required
          />
        </FormGroup>
        {/* </Col> */}
        {/* <Col md={6}> */}
        <FormGroup>
          <Label for="exampleEmail">Email</Label>
          <Input
            id="exampleEmail"
            name="email"
            placeholder="Email"
            type="email"
            onChange={mailHandler}
            required
          />
        </FormGroup>
        {/* </Col> */}
        {/* <Col md={6}> */}
        <FormGroup>
          <Label for="mobileNumber">Mobile Number</Label>
          <Input
            id="mobileNumber"
            name="moblie"
            type="number"
            placeholder="Mobile Number"
            inputMode="numeric"
            onChange={phoneHandler}
            required
          />
          {phoneChecker ? (
            ""
          ) : (
            <p style={{ color: "red" }}>Invalid phone number</p>
          )}
        </FormGroup>
        {/* </Col> */}
        {/* <Col md={6}> */}
        <FormGroup>
          <Label for="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            onChange={secretHandler}
            required
          />
          {secretChecker ? (
            ""
          ) : (
            <p style={{ color: "red" }}>password should be minimum of 8 characters</p>
          )}
        </FormGroup>
        {/* </Col> */}
        <FormGroup>
          <Button
            disabled={secretChecker && phoneChecker ? false : true}
            type="submit"
            color="primary"
            style={{ marginLeft: "40%" }}
          >
            Sign up
          </Button>
        </FormGroup>
        <FormGroup>
          <Link to="/login" style={{ marginLeft: "40%" }}>
            Log in Instead
          </Link>
        </FormGroup>
      </Form>
    </div>
  );
};

export default RegisterForm;
