import React, { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../img/logo/AttendIn-logo-square.png";
import "./Auth.css";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleEmail = (event) => {
    setEmail(event.target.value);
    console.log(email);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
    console.log(password);
  };
  return (
    <div
      className="d-flex justify-content-center"
      style={{ marginTop: "100px" }}
    >
      <Card className="shadow px-4">
        <Card.Body>
          <div className="d-flex justify-content-center">
            <Card.Img src={logo} className="m-2" style={{ width: "120px" }} />
          </div>
          <Form>
            <Form.Group className="my-3">
              <Form.Control
                type="email"
                value={email}
                placeholder="Email Address"
                onChange={handleEmail}
              />
            </Form.Group>
            <Form.Group className="my-3">
              <Form.Control
                type="password"
                value={password}
                placeholder="Password"
                onChange={handlePassword}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              {/* <Form.Control type="checkbox" style={{ width: "20px" }} /> */}
            </Form.Group>
            <div className="d-flex justify-content-center">
              <Button
                type="submit"
                style={{ borderColor: "#29a54d", backgroundColor: "#29a54d" }}
              >
                Login
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Auth;
