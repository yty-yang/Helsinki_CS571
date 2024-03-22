import {Button, Card, Carousel} from "react-bootstrap";
import {useState} from "react";


export default function BadgerBudSummary(props) {
    const [lessInfState, setLessInfState] = useState(true);

    function save() {
        alert(`${props.name} has been added to your basket!`);
        props.deleteCat(props.id);
    }

    const moreInf = <div>
        <Carousel>
            {props.imgIds.map(id => <Carousel.Item key={id}><img
                src={`https://raw.githubusercontent.com/CS571-S24/hw5-api-static-content/main/cats/${id}`}
                alt={`picture of ${props.name}`}/></Carousel.Item>)}
        </Carousel>
        <p>{props.name}</p>
        <p>{props.gender}</p>
        <p>{props.breed}</p>
        <p>{props.age}</p>
        <Button variant={"primary"} onClick={() => setLessInfState(true)}>show less</Button>
        <Button variant={"secondary"} onClick={save}>save</Button>
    </div>

    const lessInf = <div>
        <img src={`https://raw.githubusercontent.com/CS571-S24/hw5-api-static-content/main/cats/${props.imgIds[0]}`}
             alt={`picture of ${props.name}`}/>
        <h2>{props.name}</h2>
        <Button variant={"primary"} onClick={() => setLessInfState(false)}>show more</Button>
        <Button variant={"secondary"} onClick={save}>save</Button>
    </div>

    return <Card>
        {lessInfState ? lessInf : moreInf}
    </Card>
}