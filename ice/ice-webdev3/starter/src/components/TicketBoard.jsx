import {useEffect, useState} from "react";
import {Container} from "react-bootstrap";

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
                    todo: ticketData, // Put the tickets in the 't o d o' lane!
                    inprogress: [],
                    done: []
                });
            })
    }, []);

    function move(start, destination, id) {
        if (start !== destination) {
            setTicketLanes(oldLanes => {
                let startLane = oldLanes[start];
                let destinationLane = oldLanes[destination];
                const aimTicket = startLane.find(t => t.id === id);

                const newLanes = {...oldLanes};
                newLanes[start] = startLane.filter(t => t.id !== id);
                newLanes[destination] = [...destinationLane, aimTicket];

                return newLanes;
            })
        }
    }

    return <div>
        <h1>Ticket Board</h1>
        <Container fluid>
            {
                /* Display the ticket lanes! */
                Object.keys(ticketLanes).map(tlName => <TicketLane key={tlName} status={tlName}
                                                                   tix={ticketLanes[tlName]} move={move}/>)
            }
        </Container>
    </div>
}

export default TicketBoard;