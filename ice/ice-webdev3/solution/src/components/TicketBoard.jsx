import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

import TicketLane from './TicketLane'

const TicketBoard = (props) => {

    const [ticketLanes, setTicketLanes] = useState({
        todo: [],
        inprogress: [],
        done: [],
    })

    useEffect(() => {
        fetch('https://cs571.org/api/s24/ice/tickets', {
            headers: {
                "X-CS571-ID": "bid_7aa1690b9dabcac6bf2f5fbe49c240e522b2f17232ff01a835fdda35db5cf438"
            }
        })
        .then(res => res.json())
        .then(ticketData => {
            console.log(ticketData);
            setTicketLanes({
                todo: ticketData,
                inprogress: [],
                done: []
            });
        })
    }, []);

    const move = (from, to, tickId) => {

        console.log(`Moving ${tickId} from lane ${from} to lane ${to}!`)

        if (from === to) {
            return;
        }

        setTicketLanes(oldLanes => {
            // Be sure NOT to change oldLanes directly!
            let fromLane = oldLanes[from]; // this is just a reference copy! be sure not to change it!
            let toLane = oldLanes[to]; // this is just a reference copy! be sure not to change it!
            const ticketToMove = fromLane.find(tick => tick.id === tickId);

            const newLanes = {...oldLanes};
            newLanes[from] = fromLane.filter(tick => tick.id !== tickId); // remove ticket from old lane...
            newLanes[to] = [...toLane, ticketToMove]; // and place it in the new lane!

            return newLanes;
        })
    }

    return <div>
        <h1>Ticket Board</h1>
        <Container fluid>
            {
                Object.keys(ticketLanes).map(laneName => {
                    return <TicketLane
                        move={move}
                        key={laneName}
                        status={laneName}
                        tickets={ticketLanes[laneName]}
                    />
                })
            }
        </Container>
    </div>
}

export default TicketBoard;