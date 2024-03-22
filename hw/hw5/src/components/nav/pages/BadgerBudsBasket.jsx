import {useContext, useState} from "react";
import BadgerBudsDataContext from "../../../contexts/BadgerBudsDataContext.js";
import {Col, Row} from "react-bootstrap";
import BadgerBudSummary from "../../BadgerBudSummary.jsx";
import BadgerBudBasketCard from "../../BadgerBudBasketCard.jsx";

export default function BadgerBudsBasket(props) {
    const allCats = useContext(BadgerBudsDataContext);

    let savedCats = sessionStorage.getItem("savedCatIds");
    if (savedCats) {
        savedCats = JSON.parse(savedCats);
    } else {
        savedCats = {};
        for (let c of allCats) {
            savedCats[c.id] = false;
        }
    }

    const [cats, setCats] = useState(allCats.filter(cat => savedCats[cat.id]));

    function addCat(id) {
        let savedCats = JSON.parse(sessionStorage.getItem("savedCatIds"));
        savedCats[id] = false;

        setCats(allCats.filter(cat => savedCats[cat.id]))

        sessionStorage.setItem("savedCatIds", JSON.stringify(savedCats));
    }

    function deleteCat(id) {
        let deleteddCats = sessionStorage.getItem("adoptedCatIds");
        if (deleteddCats) {
            deleteddCats = JSON.parse(deleteddCats);
        } else {
            deleteddCats = {};
        }

        deleteddCats[id] = true;

        let savedCats = JSON.parse(sessionStorage.getItem("savedCatIds"));
        console.log(savedCats)
        console.log(id)
        console.log(savedCats[id])
        delete savedCats[id];
        console.log(savedCats)

        setCats(allCats.filter(cat => savedCats[cat.id]))

        sessionStorage.setItem("savedCatIds", JSON.stringify(savedCats));
        sessionStorage.setItem("adoptedCatIds", JSON.stringify(deleteddCats));
    }

    return <div>
        <h1>Badger Buds Basket</h1>
        <p>These cute cats could be all yours!</p>
        <Row>
            {cats.length === 0 ? <p>You have no buds in your basket!</p> : cats.map(cat => <Col key={cat.id} xs={12} md={6} lg={4} xl={3}><BadgerBudBasketCard {...cat} addCat={addCat} deleteCat={deleteCat}/></Col>)}
        </Row>
    </div>
}