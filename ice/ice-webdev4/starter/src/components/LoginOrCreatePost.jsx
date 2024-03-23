import {useRef, useState} from "react";
import {Button, Form} from "react-bootstrap";

export default function LoginOrCreatePost(props) {
    const usernameRef = useRef();
    const passwordRef = useRef();
    const commentRef = useRef();

    // Note! You should use this in combination with sessionStorage.
    // Otherwise, when the user refreshes the page, it will go away!
    let state = sessionStorage.getItem("isLoggedIn");
    if (state === undefined) {
        sessionStorage.setItem("isLoggedIn", JSON.stringify(false));
    } else {
        state = JSON.parse(state);
    }

    const [isLoggedIn, setIsLoggedIn] = useState(state);

    function handleLoginSubmit(e) {
        e?.preventDefault();  // prevents default form submit action

        //  POST to https://cs571.org/api/s24/ice/login
        fetch("https://cs571.org/api/s24/ice/login", {
            method: "POST",
            credentials: "include",
            headers: {
                "X-CS571-ID": "bid_7aa1690b9dabcac6bf2f5fbe49c240e522b2f17232ff01a835fdda35db5cf438",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: usernameRef.current.value,
                password: passwordRef.current.value
            })
        }).then(ref => {
            console.log(ref.status);
            if (ref.status === 200) {
                sessionStorage.setItem("isLoggedIn", JSON.stringify(true));
                setIsLoggedIn(true);
            } else {
                alert("Your username/password is not correct!");
            }
        })
    }

    function handleCommentSubmit(e) {
        e?.preventDefault(); // prevents default form submit action

        console.log(commentRef.current.value);
        //  POST to https://cs571.org/api/s24/ice/comments
        fetch("https://cs571.org/api/s24/ice/comments", {
            method: "POST",
            headers: {
                "X-CS571-ID": "bid_7aa1690b9dabcac6bf2f5fbe49c240e522b2f17232ff01a835fdda35db5cf438",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                comment: commentRef.current.value
            }),
            credentials: "include"
        }).then(ref => {
            console.log(ref.status);
            if (ref.status === 200) {
                alert("Created your post!");
                props.refreshComments();
            } else {
                alert("There was an issue with your request.");
            }
        })
    }

    function handleLogout() {
        // POST to https://cs571.org/api/s24/ice/logout
        fetch("https://cs571.org/api/s24/ice/logout", {
            method: "POST",
            headers: {
                "X-CS571-ID": "bid_7aa1690b9dabcac6bf2f5fbe49c240e522b2f17232ff01a835fdda35db5cf438",
            },
            credentials: "include"
        }).then(ref => {
            console.log(ref.status);
            if (ref.status === 200) {
                alert("Logout successfully!");
                sessionStorage.setItem("isLoggedIn", JSON.stringify(false));
                setIsLoggedIn(false);
            } else {
                alert("There was an issue with your request.");
            }
        })
    }

    if (isLoggedIn) {
        return <>
            <Button variant="danger" onClick={handleLogout}>Logout</Button>
            <Form onSubmit={handleCommentSubmit}>
                <Form.Label htmlFor="commentInput">Your Comment</Form.Label>
                <Form.Control id="commentInput" ref={commentRef}></Form.Control>
                <br/>
                <Button type="submit" onClick={handleCommentSubmit}>Post Comment</Button>
            </Form>
        </>
    } else {
        return <Form onSubmit={handleLoginSubmit}>
            <Form.Label htmlFor="usernameInput">Username</Form.Label>
            <Form.Control id="usernameInput" ref={usernameRef}></Form.Control>
            <Form.Label htmlFor="passwordInput">Password</Form.Label>
            <Form.Control id="passwordInput" type="password" ref={passwordRef}></Form.Control>
            <br/>
            <Button type="submit" onClick={handleLoginSubmit}>Login</Button>
        </Form>
    }
}