import React,{useState,useEffect} from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "../API/axios";
import {toast} from "react-toastify";
import Navigation from './Navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button,Alert,Breadcrumb,Form} from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';



// app.get("/user/get/:id",(req,res)=>{
// //     const {username,password,email_id,designation} = req.body;
//     const userUpdate="UPDATE users SET username = ?, password = ?, email_id = ?, designation = ? WHERE id = ?";
//     db.query(userUpdate,[username,password,email_id,designation,id]
// });
// app.put("/user/update/:id",(req,res)=>{
//    
// })


const initialState = {
    username:"",
    password:"",
    email_id:"",
    designation:"",
};
const EditUser = ()=>{
    const [state,setState]=useState(initialState);

    const {username,password,email_id,designation} = state;

    const navigate = useNavigate();

    const {id}=useParams();

    useEffect(()=>{
        const EDIT_URL = `/user/get/${id}`

        axios.get(EDIT_URL)
        .then((resp)=>setState({...resp.data[0] }));
    },[id]);

    const handleSubmit = (e) =>{
        e.preventDefault();
        if(!username || !email_id || !password || !designation)
        {
            toast.error("Please fill all the required fields");
        }
        else{
            axios
            .put(`http://localhost:5000/user/update/${id}`,{
                username,
                password,
                email_id,
                designation
            })
            .then(()=>{
                setState({username:"",password:"",email_id:"",designation:""})
            }).catch((err)=>toast.error(err.response.data));
            toast.success("User updated successfully");
            setTimeout(()=>navigate('/users'),500);
        }
    };

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
                            
                                <Card.Title>EDIT USER DETAILS</Card.Title>
            <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                {/* <Form.Label htmlFor="username">UserName</Form.Label> */}
                <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                {/* <label htmlFor="username">UserName</label> */}
                <Form.Control type="text" 
                id="username" 
                name="username" 
                placeholder="Username"
                value={username||""}
                onChange={handleInputChange}/>
                </InputGroup>
                {/* password */}
                <InputGroup className="mb-3">
                {/* <Form.Label htmlFor="password">Password</Form.Label> */}
                <Form.Control type="password" 
                id="password" 
                name="password" 
                placeholder="password"
                value={password||""}
                onChange={handleInputChange}/>
                </InputGroup>
                {/* email_id */}
                <InputGroup className="mb-3">

                {/* <Form.Label htmlFor="email_id">Email Id</Form.Label> */}
                <Form.Control type="text" 
                id="email_id" 
                name="email_id" 
                placeholder="email_id"
                value={email_id||""}
                onChange={handleInputChange}/>
                <InputGroup.Text id="basic-addon2">@gmail.com</InputGroup.Text>

                </InputGroup>
                {/* designation */}
                <InputGroup className="mb-3">

                {/* <Form.Label htmlFor="designation">Designation</Form.Label> */}
                <Form.Control type="text" 
                id="designation" 
                name="designation" 
                placeholder="designation"
                value={designation||""}
                onChange={handleInputChange}/>
                </InputGroup>
                
                <Button variant="dark" type="submit">UPDATE</Button>{' '}
           
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

export default EditUser; 