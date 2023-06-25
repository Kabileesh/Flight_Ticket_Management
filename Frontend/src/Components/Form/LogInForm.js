import React, { useState } from "react";
import axios from "../axiosConfig";
import "../UI/LoginForm.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Form, Card, FormGroup, Label, Input, Button } from "reactstrap";

const LoginForm = () => {
  const [mail, setMail] = useState("");
  const [secret, setSecret] = useState("");
  const [authorizer, setAuthorizer] = useState(true);

  const navigate = useNavigate();

  const mailHandler = (event) => {
    setMail(event.target.value);
  };

  const secretHandler = (event) => {
    setSecret(event.target.value);
  };

  const FormHandler = async (event) => {
    event.preventDefault();
    const userData = {
      username: mail,
      password: secret,
    };
    try {
      const response = await axios.post("/login", userData);
      if (response.status === 200) {
        setAuthorizer(false);
        const accessToken = response.data.accessToken;
        if (accessToken) sessionStorage.setItem("accessToken", accessToken);
        navigate("/");
      } else if (response?.status === 401) {
        setAuthorizer(true);
      } else {
        console.log(response.status);
      }
    } catch (err) {
      console.log(err);
    }
  };
  if (window.sessionStorage.getItem("accessToken")) return <Navigate to="/" />;
  return (
    <div
      id="loginform"
      style={{
        maxWidth: "50%",
        display: "-ms-flexbox",
        marginLeft: "34%",
        paddingTop: "4%",
      }}
    >
      <Form onSubmit={FormHandler} style={{}}>
        <h2 id="headerTitle">Login</h2>
        <FormGroup floating>
          <Input
            id="exampleEmail"
            name="email"
            placeholder="Email"
            type="email"
            onChange={mailHandler}
            required
          />
          <Label for="exampleEmail">Email</Label>
        </FormGroup>
        <FormGroup floating>
          <Input
            id="examplePassword"
            name="password"
            placeholder="Password"
            type="password"
            onChange={secretHandler}
            required
          />
          <Label for="examplePassword">Password</Label>
        </FormGroup>
        <FormGroup style={{ marginLeft: "35%" }}>
          <Button style={{ marginBottom: "1rem" }}>Login</Button>
        </FormGroup>
        <FormGroup style={{ marginLeft: "28%" }}>
          <p>Doesn't have an Account ? </p>
          <Link to={"/register"}>Create an Account</Link>
        </FormGroup>
        {authorizer ? "" : <p style={{textAlign:"center", color:"red"}}>Invalid Credentials</p>}
      </Form>
    </div>
  );
};

export default LoginForm;
