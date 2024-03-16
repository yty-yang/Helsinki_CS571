import {Card, Button} from "react-bootstrap";
import {useState} from "react";

function Badger(props) {
    function sayName() {
        alert(`my name is ${props.name}`);
    }

    const [isHovering, setIsHovering] = useState(false);

    return <Card style={{margin: "0.5rem"}}>
        <h2>{props.name}</h2>
        <p>{props.email}</p>
        <Button
            variant={isHovering ? "success" : "primary"}
            onClick={sayName}  // same as: onClick={() => alert("my name is ...")}
            onMouseOver={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            Say Name
        </Button>
    </Card>
}

export default Badger;