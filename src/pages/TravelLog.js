import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from '../API/axios';
import { Table, Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './Navigation';
import Container from 'react-bootstrap/Container';

const TravelLog = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const { id } = useParams();

  console.log('data ', data);

  const fetchData = async () => {
    try {
      const TRAVEL_URL = `/travel/${id}`;
      const response = await axios.get(TRAVEL_URL); // Replace with your API endpoint
      const responseData = response.data;
      setData(responseData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <>
      <Navigation fixed="top" />
      <Container>
        <br />
        <br />
        {data.length > 0 ? (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Start Time</th>
                <th>Initial Location</th>
                <th>End Time</th>
                <th>Final Location</th>
                <th>Distance</th>
                <th>Company</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.start_time}</td>
                  <td>{item.initial_location}</td>
                  <td>{item.end_time}</td>
                  <td>{item.final_location}</td>
                  <td>{item.distance}</td>
                  <td>{item.userId}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p>Loading travel log... <br /><br />No travel logs found...</p>
        )}
        <Link to="/users">
          <Button variant="outline-dark">GO BACK</Button>
        </Link>
      </Container>
    </>
  );
};

export default TravelLog;
