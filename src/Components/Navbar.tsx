import React from 'react'
import { Navbar, Button , Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
export default function NavbarComponent() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        Notes 
        <Link to='/createNote'><Button>Create</Button></Link>
        
      </Container>
    </Navbar>
  )
}
