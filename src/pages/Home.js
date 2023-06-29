import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../API/axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card } from 'react-bootstrap';
import Navigation from './Navigation';
import Container from 'react-bootstrap/Container';

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  console.log('length of data at home',data.length);

  const loadData = async () => {
    try {
      const HOME_URL = '/users';
      const response = await axios.get(HOME_URL);
      setData(response.data);
    } catch (error) {
      console.log("Error while loading data:", error);
    }
  };

  const deleteUser = async (id) => {
    if (window.confirm("Are you sure you want to DELETE the User?")) {
      try {
        const DELETE_URL = `/user/${id}/delete`;
        await axios.delete(DELETE_URL);
        toast.success("User deleted successfully");
        
        setData((prevData) => prevData.filter(item => item.id !== id));
      } catch (error) {
        console.log("Error while deleting user:", error);
      }
    }
  };
  

  return (
    <div>
      <Navigation fixed="top" />
      <Container>
        <br/>

        {data.length > 1 ? (
          <div>
            <h1>View Users</h1>
            <br/>
            
             <Link to={`/users/create`}>
                    {' '}<Button variant="dark">ADD USER</Button>{' '}
                  </Link>
                  <br/>
                  <br/>
            {data.map((item, index) => (
              <Card className="text-center" style={{ width: '70rem' }} key={item.id}>
                <Card.Body>
                  <Card.Title>{item.username}</Card.Title>
                  
                  <Link to={`/user/update/${item.id}`}>
                    {' '}<Button variant="outline-primary">Edit</Button>{' '}
                  </Link>
                  {' '}
                  <Button variant="outline-danger" onClick={() => deleteUser(item.id)}>Delete</Button>{' '}
                  <Link to={`/user/get/${item.id}`}>
                    {' '}<Button variant="outline-info">View</Button>{' '}
                  </Link>
                  <Link to={`/travel/${item.id}`}>
                    <Button variant="dark">Travel Details</Button>
                  </Link>
                </Card.Body>
              </Card>
            ))}
          </div>
        ) : (
          <div>
            {data.map((item, index) => (
              <Card className="text-center" style={{ width: '70rem' }} key={item.id}>
                <Card.Body>
                <br/>

                  <Card.Title>{item.username}</Card.Title>
                  
                  <Link to={`/user/update/${item.id}`}>
                    {' '}<Button variant="outline-primary">Edit</Button>{' '}
                  </Link>
                  {' '}
                  <Button variant="outline-danger" onClick={() => deleteUser(item.id)}>Delete</Button>{' '}
                  <Link to={`/user/get/${item.id}`}>
                    {' '}<Button variant="outline-info">View</Button>{' '}
                  </Link>
                  <Link to={`/travel/${item.id}`}>
                    <Button variant="dark">Travel Details</Button>
                  </Link>
                </Card.Body>
              </Card>
            ))}
          </div>
        )}
        
      </Container>
    </div>
  );
};

export default Home;
