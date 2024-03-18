import {Container} from "react-bootstrap";

export default function Hurricane(props) {
    const startDate = new Date(props.start_date).toLocaleString();
    const endDate = new Date(props.end_date).toLocaleString();

    return <div>
        <h2>{props.name}</h2>
        <p>Category {props.category}</p>
        <p>Started on {startDate}</p>
        <p>Ended on {endDate}</p>
    </div>
}