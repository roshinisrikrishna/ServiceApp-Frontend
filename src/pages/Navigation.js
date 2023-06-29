import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Navigation=()=> {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/users">Home</Navbar.Brand>
          <Nav className="me-auto">
            {/* <Nav.Link href="/addUser">Add User</Nav.Link> */}
            <Nav.Link href="/">Login</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      
    </>
  );
}

export default Navigation;