import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../API/axios";
import { toast } from "react-toastify";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form } from 'react-bootstrap';
import Navigation from './Navigation';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

const LOGIN_URL = '/';

const initialState = {
  username: "",
  password: "",
};

const Login = () => {
  const [state, setState] = useState(initialState);
  const { username, password } = state;
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(LOGIN_URL, {
      username,
      password,
    })
      .then(() => {
        setState({ username: "", password: "" });
        toast.success("User logged in successfully");
        setTimeout(() => navigate('/users'), 500);
      })
      .catch((err) => {
        console.log("Error at login.js:", err);
        toast.error("Failed to log in");
        setState({ username: "", password: "" });      
    });
  };
  axios.defaults.withCredentials = true;
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  return (
    <div>
      <Navigation fixed="top" />
      <Container>
        <Card className="text-center mb-3" variant="dark" style={{ width: '70rem' }}>
          <Card.Body>
            <Card.Header>LOGIN USER</Card.Header>
            <br />
            <br />
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="username">UserName</Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                  <Form.Control
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Username"
                    value={username}
                    onChange={handleInputChange}
                    required
                  />
                </InputGroup>
                <Form.Label htmlFor="password">Password</Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={handleInputChange}
                    required
                  />
                </InputGroup>
                <Button variant="dark" type="submit">LOGIN</Button>
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Login;
