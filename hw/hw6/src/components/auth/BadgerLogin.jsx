import React, {useContext, useRef} from 'react';
import {Button, Form} from "react-bootstrap";
import BadgerLoginStatusContext from "../contexts/BadgerLoginStatusContext.js";
import {useNavigate} from "react-router";

export default function BadgerLogin() {
    const usernameRef = useRef();
    const passwordRef = useRef();
    const [loginStatus, setLoginStatus] = useContext(BadgerLoginStatusContext);
    const navigate = useNavigate();
    // Create the login component.
    function login() {
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;

        if (!(username && password)) {
            alert("You must provide both a username and password!");
        } else {
            fetch("https://cs571.org/api/s24/hw6/login", {
                method: "POST",
                credentials: "include",
                headers: {
                    "X-CS571-ID": CS571.getBadgerId(),
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "username": username,
                    "password": password
                })
            }).then(ref => {
                if (ref.status === 401) {
                    alert("Incorrect username or password!");
                }
                if (ref.status === 200) {
                    setLoginStatus(true);
                    sessionStorage.setItem("loginStatus", true);
                    sessionStorage.setItem("username", username);
                    navigate("/");

                    alert("The login was successful.");
                }
            })
        }
    }

    return <>
        <h1>Login</h1>
        <Form>
            <Form.Label htmlFor={"loginusername"}>Username</Form.Label>
            <Form.Control ref={usernameRef} id={"loginusername"}></Form.Control>
            <br/>
            <Form.Label htmlFor={"loginpassword"}>Password</Form.Label>
            <Form.Control ref={passwordRef} type="password" id={"loginpassword"}></Form.Control>
            <br/>
            <Button variant="primary" onClick={login}>Login</Button>
        </Form>
    </>
}
