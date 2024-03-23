import React, {useContext, useEffect, useState} from "react";
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {Link, Outlet} from "react-router-dom";

import crest from '../../assets/uw-crest.svg'
import BadgerLoginStatusContext from "../contexts/BadgerLoginStatusContext";
import {useCol} from "react-bootstrap/Col";

function BadgerLayout(props) {

    // @ Step 6:
    // You'll probably want to see if there is an existing
    // user in sessionStorage first. If so, that should
    // be your initial loginStatus state.
    if (sessionStorage.getItem("loginStatus") === null) {
        sessionStorage.setItem("loginStatus", false);
    }

    const [loginStatus, setLoginStatus] = useState(JSON.parse(sessionStorage.getItem("loginStatus")));
    const login = <>
        <Nav.Link as={Link} to="login">Login</Nav.Link>
        <Nav.Link as={Link} to="register">Register</Nav.Link>
    </>
    const logout = <Nav.Link as={Link} to="logout">Logout</Nav.Link>;

    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand as={Link} to="/">
                        <img
                            alt="BadgerChat Logo"
                            src={crest}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '}
                        BadgerChat
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        {loginStatus ? logout : login}
                        <NavDropdown title="Chatrooms">
                            {
                                /* Display a NavDropdown.Item for each chatroom that sends the user to that chatroom! */
                                props.chatrooms.map(room => <NavDropdown.Item key={room} as={Link}
                                                                              to={`chatrooms/${room}`}>{room}</NavDropdown.Item>)
                            }
                        </NavDropdown>
                    </Nav>
                </Container>
            </Navbar>
            <div style={{margin: "1rem"}}>
                <BadgerLoginStatusContext.Provider value={[loginStatus, setLoginStatus]}>
                    <Outlet/>
                </BadgerLoginStatusContext.Provider>
            </div>
        </div>
    );
}

export default BadgerLayout;