import {Button, Col, Container, Form, Row, Pagination} from "react-bootstrap";
import {useEffect, useState} from "react";
import Student from "./Student.jsx";

function normalizeSearchStr(str) {
    return str.trim().toLowerCase();
}

const Classroom = () => {
    const [students, setStudents] = useState([]);
    const [shownStudents, setShownStudents] = useState([]);
    const [nameSearched, setNameSearched] = useState("");
    const [majorSearched, setMajorSearched] = useState("");
    const [interestSearched, setInterestSearched] = useState("");
    const [pageItem, setPageItem] = useState([]);
    const [activeNum, setActiveNum] = useState(1);
    const [pageNum, setPageNum] = useState(0);
    const [changePagination, setChangePagination] = useState(false);

    useEffect(() => {
        fetch("https://cs571.org/api/s24/hw4/students", {
            headers: {
                "X-CS571-ID": "bid_7aa1690b9dabcac6bf2f5fbe49c240e522b2f17232ff01a835fdda35db5cf438"
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setStudents(data);
            })
    }, [])

    useEffect(() => {
        setShownStudents([]);

        for (let s of students) {
            let name = s.name.first.toLowerCase() + " " + s.name.last.toLowerCase();
            let major = s.major.toLowerCase();
            let interest = "";
            for (let i of s.interests) {
                interest += i.toLowerCase() + " ";
            }

            if (name.includes(nameSearched) && major.includes(majorSearched) && interest.includes(interestSearched)) {
                setShownStudents(shown => [...shown, s]);
            }
        }

        setActiveNum(1);
    }, [nameSearched, majorSearched, interestSearched, students])

    useEffect(() => {
        setPageItem([]);
        setPageNum(Math.ceil(shownStudents.length / 24));
        setChangePagination(prevState => !prevState);
    }, [shownStudents, activeNum])

    useEffect(() => {
        for (let i = 1; i <= pageNum; i++) {
            setPageItem(p => [...p,
                <Pagination.Item key={i} active={i === activeNum}
                                 onClick={() => setActiveNum(i)}>{i}</Pagination.Item>]);
        }
    }, [changePagination]);

    return <div>
        <h1>Badger Book</h1>
        <p>Search for students below!</p>
        <hr/>
        <Form>
            <Form.Label htmlFor="searchName">Name</Form.Label>
            <Form.Control id="searchName" onChange={(event) => {
                setNameSearched(normalizeSearchStr(event.target.value))
            }}/>
            <Form.Label htmlFor="searchMajor">Major</Form.Label>
            <Form.Control id="searchMajor" onChange={(event) => {
                setMajorSearched(normalizeSearchStr(event.target.value))
            }}/>
            <Form.Label htmlFor="searchInterest">Interest</Form.Label>
            <Form.Control id="searchInterest" onChange={(event) => {
                setInterestSearched(normalizeSearchStr(event.target.value))
            }}/>
            <br/>
            <Button variant="neutral" onClick={() => {
                setNameSearched("");
                setMajorSearched("");
                setInterestSearched("");
            }}>Reset Search</Button>
        </Form>

        <p>There are {shownStudents.length} student(s) matching your search.</p>

        <Container fluid>
            <Row>
                { /* Students go here! */
                    shownStudents.slice((activeNum - 1) * 24, activeNum * 24).map((s) => <Col key={s.id} xs={12} md={6} lg={4} xl={3}><Student {...s}/></Col>)
                }
            </Row>
        </Container>

        <Pagination>
            <Pagination.Prev onClick={() => setActiveNum(n => n - 1)} disabled={activeNum <= 1}>Previous</Pagination.Prev>
            {pageItem}
            <Pagination.Next onClick={() => setActiveNum(n => n + 1)} disabled={activeNum >= pageNum}>Next</Pagination.Next>
        </Pagination>
    </div>
}

export default Classroom;