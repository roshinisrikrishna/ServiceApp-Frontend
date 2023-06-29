import React,{useState,useEffect} from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "../API/axios";
import {toast} from "react-toastify";
import Navigation from './Navigation';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';



const View = ()=>{
    const [user,setUser] = useState({});
    const {id}=useParams();
    console.log("view id",{id});

    useEffect(()=>{
        const VIEW_URL = `/user/get/${id}`;
        axios.get(VIEW_URL)
            .then((resp)=>setUser({...resp.data[0]}));
    },[id]);

    return(
        <div>
            <Navigation fixed="top"/>
            <br/>
            <br/>
            <Container>
                        <Card className="text-center" style={{ width: '70rem' }}>
                                <Card.Body>
                  {/* <ListGroup className="list-group-flush"> */}
               <Card.Title>VIEW {user.username} DETAILS</Card.Title>
               <br/>

               <Card.Title>EMAIL ID : </Card.Title>
               <br/>

        <Card.Subtitle>{user.email_id}</Card.Subtitle>
        <br/>

        <Card.Title>Designation : </Card.Title>
        <br/>

        <Card.Subtitle>{user.designation}</Card.Subtitle>
        <br/>

      {/* </ListGroup> */}
                <Link to="/users">
                <Button variant="dark">GO BACK</Button>
            </Link>
            </Card.Body>
            </Card>
            </Container>
            </div>

            
        
    )
}

export default View;