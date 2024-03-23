import React, {useEffect, useRef, useState} from "react"
import {Button, Card, Col, Form, Pagination, Row} from "react-bootstrap";

export default function BadgerChatroom(props) {

    const [messages, setMessages] = useState([]);
    const [active, setActive] = useState(1);
    let status = sessionStorage.getItem("loginStatus");
    const titleRef = useRef();
    const contentRef = useRef();

    const loadMessages = () => {
        fetch(`https://cs571.org/api/s24/hw6/messages?chatroom=${props.name}&page=${active}`, {
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            }
        }).then(res => res.json()).then(json => {
            setMessages(json.messages)
        })
    };

    let pages = [];
    for (let i = 1; i <= 4; i++) {
        pages.push(
            <Pagination.Item key={i} active={i === active} onClick={() => setActive(i)}>{i}</Pagination.Item>
        )
    }

    // Why can't we just say []?
    // The BadgerChatroom doesn't unload/reload when switching
    // chatrooms, only its props change! Try it yourself.
    useEffect(loadMessages, [props, active]);

    function submit() {
        const title = titleRef.current.value;
        const content = contentRef.current.value;

        if (!(title && content)) {
            alert("You must provide both a title and content!");
        } else {
            fetch(`https://cs571.org/api/s24/hw6/messages?chatroom=${props.name}`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "X-CS571-ID": CS571.getBadgerId(),
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "title": title,
                    "content": content
                })
            }).then(res => {
                if (res.status === 413) {
                    alert("'title' must be 128 characters or fewer and 'content' must be 1024 characters or fewer");
                }
                if (res.status === 200) {
                    alert("Successfully posted!");
                    titleRef.current.value = "";
                    contentRef.current.value = "";
                    loadMessages();
                    setActive(1);
                }
            })
        }
    }

    function deletePost(id) {
        fetch(`https://cs571.org/api/s24/hw6/messages?id=${id}`, {
            method:"DELETE",
            credentials: "include",
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            }
        }).then(res => {
            if (res.status === 200) {
                loadMessages();
            }
        })
    }

    return <>
        <h1>{props.name} Chatroom</h1>
        {
            /* Allow an authenticated user to create a post. */
            status ?
                <Form>
                    <Form.Label htmlFor={"title"}>Post Title</Form.Label>
                    <Form.Control ref={titleRef} id={"title"}></Form.Control>
                    <br/>
                    <Form.Label htmlFor={"content"}>Post Content</Form.Label>
                    <Form.Control ref={contentRef} id={"content"}></Form.Control>
                    <br/>
                    <Button variant={"primary"} onClick={submit}>Create Post</Button>
                </Form>
                :
                <>
                    <p>You must be logged in to post!</p>
                </>
        }
        <hr/>
        {
            messages.length > 0 ?
                <>
                    <Row>
                        {
                            /*  Complete displaying of messages. */
                            messages.map(message => <Col key={message.id} xs={6} md={4} xl={3}>
                                    <Card>
                                        <h2>{message.title}</h2>
                                        <p>{`Posted on ${new Date(message.created).toLocaleString()}`}</p>
                                        <p>{message.poster}</p>
                                        <p>{message.content}</p>
                                        {
                                            sessionStorage.getItem("username") === message.poster ?
                                                <Button variant={"danger"} onClick={() => deletePost(message.id)}>Delete Post</Button>
                                                :
                                                <></>
                                        }
                                    </Card>
                                </Col>
                            )
                        }
                    </Row>
                </>
                :
                <>
                    <p>There are no messages on this page yet!</p>
                </>
        }
        <br/>
        <Pagination>
            {pages}
        </Pagination>
    </>
}
