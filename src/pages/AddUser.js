import React,{useState,useEffect} from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "../API/axios";
import {toast} from "react-toastify";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button,Alert,Breadcrumb,Form} from 'react-bootstrap';
import Navigation from './Navigation';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

const ADD_USER_URL = '/users/create';


const initialState = {
    username:"",
    password:"",
    email_id:"",
    designation:"",
};
const AddUser = ()=>{
    const [state,setState]=useState(initialState);
    const {username,password,email_id,designation} = state;
    const navigate = useNavigate();
    const handleSubmit = (e) =>{
        e.preventDefault();
        if(!username || !email_id || !password || !designation)
        {
            toast.error("Please fill all the required fields");
        }
        else{
            axios.post(ADD_USER_URL,{
                username,
                password,
                email_id,
                designation
            }).then(()=>{
                setState({username:"",password:"",email_id:"",designation:""})
            }).catch((err)=>toast.error(err.response.data));
            toast.success("User created successfully");
            setTimeout(()=>navigate('/users'),500);
        }
    }
    const handleInputChange = (e)=>{
        const {name,value} = e.target;
        setState({...state,[name]:value});
    }
    return(
        <div>
                        <Navigation fixed="top"/>
                        <Container>
                        <Card className="text-center" style={{ width: '70rem' }}>
                                <Card.Body>
                            
                                <Card.Title>REGISTER USER</Card.Title>

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                {/* <Form.Label htmlFor="username">UserName</Form.Label> */}
                <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                <Form.Control type="text" 
                id="username" 
                name="username" 
                placeholder="Username"
                value={username}
                onChange={handleInputChange}/>
                </InputGroup>
                {/* password */}
                <InputGroup className="mb-3">
                {/* <Form.Label htmlFor="password">Password</Form.Label> */}
                <Form.Control type="password" 
                id="password" 
                name="password" 
                placeholder="Password"
                value={password}
                onChange={handleInputChange}/>
                </InputGroup>
                {/* email_id */}
                <InputGroup className="mb-3">
                {/* <Form.Label htmlFor="email_id">Email Id</Form.Label> */}
                <Form.Control type="text" 
                id="email_id" 
                name="email_id" 
                placeholder="Email Id"
                value={email_id}
                onChange={handleInputChange}/>
                <InputGroup.Text id="basic-addon2">@gmail.com</InputGroup.Text>
                </InputGroup>
                {/* designation */}
                <InputGroup className="mb-3">
                {/* <Form.Label htmlFor="designation">Designation</Form.Label> */}
                <Form.Control type="text" 
                id="designation" 
                name="designation" 
                placeholder="Designation"
                value={designation}
                onChange={handleInputChange}/>
                </InputGroup>
                <Button variant="dark" type="submit">CREATE</Button>{' '}
           
            <Link to="/users">
            {' '}<Button variant="dark">Go Back</Button>
            </Link>
            
            </Form.Group>
            </Form>
            </Card.Body>
            </Card>
</Container>
        </div>
    )
}

export default AddUser;