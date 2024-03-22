import {useContext, useState} from "react";
import BadgerBudsDataContext from "../../../contexts/BadgerBudsDataContext.js";
import BadgerBudSummary from "../../BadgerBudSummary.jsx";
import {Col, Row} from "react-bootstrap";

export default function BadgerBudsAdoptable(props) {
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

    const [cats, setCats] = useState(allCats.filter(cat => savedCats[cat.id] !== undefined && !savedCats[cat.id]));

    function deleteCat(id) {
        let savedCats = sessionStorage.getItem("savedCatIds");
        if (savedCats) {
            savedCats = JSON.parse(savedCats);
        } else {
            savedCats = {};
            for (let c of cats) {
                savedCats[c.id] = false;
            }
        }
        savedCats[id] = true;

        setCats(cats.filter(cat => !savedCats[cat.id]));

        sessionStorage.setItem("savedCatIds", JSON.stringify(savedCats));
    }

    return <div>
        <h1>Available Badger Buds</h1>
        <p>The following cats are looking for a loving home! Could you help?</p>
        <Row>
            {cats.length === 0 ? <p>No buds are available for adoption!</p> : cats.map(cat => <Col key={cat.id} xs={12} md={6} lg={4} xl={3}><BadgerBudSummary {...cat}
                                                                                              deleteCat={deleteCat}/></Col>)}
        </Row>
    </div>
}