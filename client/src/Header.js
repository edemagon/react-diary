import React from 'react';
import './index.css';
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import NavDropdown from "react-bootstrap/NavDropdown";
import {LinkContainer} from 'react-router-bootstrap'
import Nav from "react-bootstrap/Nav";


class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        return (
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">Life Diary.   </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <LinkContainer to="/home">
                                <Nav.Link>Home</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/computeRecipe">
                                <Nav.Link>Create a Recipe</Nav.Link>
                            </LinkContainer>
                            <NavDropdown title="Articles" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#showRecipes">Show Recipes</NavDropdown.Item>
                                <NavDropdown.Item href="#showarticle">Show articles</NavDropdown.Item>
                                <NavDropdown.Item href="#palette">Build your color palette</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#writeanarticle">Write an article</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        );
    }
}
export default Header;