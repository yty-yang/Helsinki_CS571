import {Button, Card} from "react-bootstrap";

const Ticket = (props) => {
    function moveTodo() {
        let destination = "todo";
        props.move(props.status, destination, props.id);
    }

    function moveInprogress() {
        let destination = "inprogress";
        props.move(props.status, destination, props.id);
    }

    function moveDone() {
        let destination = "done";
        props.move(props.status, destination, props.id);
    }

    return <Card>
        {/*<p>I am a ticket!</p>*/}
        {/*  Display data and buttons for moving the ticket to T O D O, InProgress, and Done! */}
        <strong>{props.name}</strong>
        <p>{props.author}</p>
        <p>{props.description}</p>
        <Button variant={"primary"} onClick={moveTodo}>MOVE TO TODO</Button>
        <Button variant={"success"} onClick={moveInprogress}>MOVE TO In Progress</Button>
        <Button variant={"secondary"} onClick={moveDone}>MOVE TO Done</Button>
    </Card>
}

export default Ticket;