import {useState} from "react";

export default function BadgerSaleItem(props) {
    const [num, setNum] = useState(0);

    return <div style={{backgroundColor: props.featured ? "red" : "white"}}>
        <h2>{props.name}</h2>
        <p>{props.description}</p>
        <div>
            <button className="inline" onClick={() => setNum(n => n - 1)} disabled={num <= 0}>-</button>
            <p className="inline">{num}</p>
            <button className="inline" onClick={() => setNum(n => n + 1)}>+</button>
        </div>
    </div>
}