import { useState } from "react";
import { Button, Card } from "react-bootstrap";

function Badger(props) {

    const [isHovering, setIsHovering] = useState(false);

    function sayName() {
        alert("My name is " + props.name)
    }

    return <Card style={{margin: "0.5rem"}}>
        <h2>{props.name}</h2>
        <p>{props.email}</p>
        <Button
            onClick={sayName}
            variant={isHovering ? "success" : "primary"}
            onMouseOver={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >Say Name</Button>
    </Card>
}

export default Badger;