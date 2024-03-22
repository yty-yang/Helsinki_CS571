import {Col, Row} from "react-bootstrap"
import Ticket from "./Ticket";
import ticket from "./Ticket";

const TicketLane = (props) => {
    return <div>
        <Row>
            <h2>{props.status}</h2>
            {/* Display each of the tickets! */
                props.tix.map(t => <Col key={t.id} xs={6} md={4} lg={3} xl={2}><Ticket {...t} move={props.move}
                                                                                       status={props.status}/></Col>)}
        </Row>
        <br/>
    </div>
}

export default TicketLane;