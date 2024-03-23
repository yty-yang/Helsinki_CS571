import React, {useRef} from 'react';
import {Button, Form} from "react-bootstrap";

export default function BadgerRegister() {
    const usernameRef = useRef();
    const passwordRef = useRef();
    const password_rRef = useRef();

    // Create the register component.
    function register() {
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;
        const password_r = password_rRef.current.value;

        if (!(username && password)) {
            alert("You must provide both a username and password!");
        } else if (password !== password_r) {
            alert("Your passwords do not match!");
        } else {
            fetch("https://cs571.org/api/s24/hw6/register", {
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
                if (ref.status === 409) {
                    alert("That username has already been taken!");
                }
                if (ref.status === 413) {
                    alert("'username' must be 64 characters or fewer and 'password' must be 128 characters or fewer");
                }
                if (ref.status === 200) {
                    alert("The registration was successful.");
                }
            })
        }
    }

    return <>
        <h1>Register</h1>
        <Form>
            <Form.Label htmlFor={"registerusername"}>Username</Form.Label>
            <Form.Control ref={usernameRef} id={"registerusername"}></Form.Control>
            <br/>
            <Form.Label htmlFor={"registerpassword"}>Password</Form.Label>
            <Form.Control ref={passwordRef} type="password" id={"registerpassword"}></Form.Control>
            <br/>
            <Form.Label htmlFor={"register_r_password"}>Repeat Password</Form.Label>
            <Form.Control ref={password_rRef} type="password" id={"register_r_password"}></Form.Control>
            <br/>
            <Button variant="primary" onClick={register}>Register</Button>
        </Form>
    </>
}
