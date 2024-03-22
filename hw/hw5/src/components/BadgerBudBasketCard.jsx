import {Button, Card} from "react-bootstrap";

export default function BadgerBudBasketCard(props) {
    function unselect() {
        alert(`${props.name} has been removed from your basket!`);
        props.addCat(props.id);
    }

    function adopt() {
        alert(`${props.name} has been adopted!`);
        props.deleteCat(props.id);
    }

    return <Card>
        <img src={`https://raw.githubusercontent.com/CS571-S24/hw5-api-static-content/main/cats/${props.imgIds[0]}`}
             alt={`picture of ${props.name}`}/>
        <h2>{props.name}</h2>
        <div>
            <Button variant={"secondary"} onClick={unselect}>Unselect</Button>
            <Button variant={"success"} onClick={adopt}>Adopt</Button>
        </div>
    </Card>
}