// You'll probably need these imports...

import {useEffect, useState} from "react"
import Hurricane from "./Hurricane";
import {Col, Container, Pagination, Row} from "react-bootstrap";

export default function AllHurricanes() {

    // 0. Create a state variable called "hurricanes".
    //    By default, it should be an empty array.
    // 1. Fetch data from https://cs571.org/api/s24/ice/hurricanes
    //    and save it to this state variable.
    // 2. Display a Hurricane component for each hurricane.
    // 3. Display the data for this hurricane.
    // 4. Make it responsive so that...
    //     - On XS devices, 1 column is displayed.
    //     - On MD devices, 2 columns are displayed.
    //     - On LG devices, 3 columns are displayed.
    // 5. Fix your key error!
    // 6. Paginate so that up to 6 elements are displayed on a page.

    const [hurricanes, setHurricanes] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetch("https://cs571.org/api/s24/ice/hurricanes", {
            headers: {
                "X-CS571-ID": "bid_7aa1690b9dabcac6bf2f5fbe49c240e522b2f17232ff01a835fdda35db5cf438"
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setHurricanes(data);
            })
    }, [])

    return <div>
        <h1>Hurricane Finder</h1>

        <Container>
            <Row>
                {
                    hurricanes.slice((page - 1) * 6, page * 6).map(h =>
                        <Col key={h.id} xs={12} md={6} lg={4}>
                            <Hurricane {...h}/>
                        </Col>
                    )
                }
            </Row>
        </Container>

        <Pagination>
            <Pagination.Item active={page === 1} onClick={() => setPage(1)}>1</Pagination.Item>
            <Pagination.Item active={page === 2} onClick={() => setPage(2)}>2</Pagination.Item>
            <Pagination.Item active={page === 3} onClick={() => setPage(3)}>3</Pagination.Item>
            <Pagination.Item active={page === 4} onClick={() => setPage(4)}>4</Pagination.Item>
        </Pagination>
    </div>
}