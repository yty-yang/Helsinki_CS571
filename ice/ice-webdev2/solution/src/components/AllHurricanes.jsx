import { useEffect, useState } from "react"
import Hurricane from "./Hurricane";
import { Col, Container, Pagination, Row } from "react-bootstrap";

export default function AllHurricanes() {

    const [hurricanes, setHurricanes] = useState([]);
    const [activePage, setActivePage] = useState(1);

    useEffect(() => {
        fetch("https://cs571.org/api/s24/ice/hurricanes", {
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            }
        })
            .then(res => {
                console.log(res.status);
                return res.json()
            })
            .then(data => {
                console.log(data)
                setHurricanes(data)
            })
    }, [])

    const buildPaginator = () => {
        let pages = [];
        const num_pages = Math.ceil(hurricanes.length / 6);
        for(let i = 1; i <= num_pages; i++) {
            pages.push(
                <Pagination.Item 
                    key={i}
                    active={activePage === i}
                    onClick={() => setActivePage(i)}
                >
                    {i}
                </Pagination.Item>
            )
        }
        return pages;
    }


    return <div>
        <h1>Hurricane Finder</h1>
        <p>It would be helpful to provide search functionality here!</p>
        <p>Maybe I could add controlled inputs...</p>
        <br/>
        <Container>
            <Row>
                {
                    hurricanes.slice(6 * (activePage - 1), 6 * activePage).map(h => <Col key={h.id} xs={12} md={6} lg={4}>
                        <Hurricane {...h}/>
                    </Col>)
                }
            </Row>
        </Container>
        <br/>
        <Pagination>
            {buildPaginator()}
        </Pagination>
    </div>
}