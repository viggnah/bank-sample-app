import { Col, Container, Form, Row, Button, Table, Alert } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { Hosts } from "../constants/config";

const ShareCapital = () => {

    const [date, setDate] = useState('');
    const [submittedDate, setSubmittedDate] = useState('');
    const [code, setCode] = useState('');
    const [additionSuccess, setAdditionSuccess] = useState(false);
    const [sharecapital, setSharecapital] = useState([]);
    const HOST = Hosts.host;

    useEffect(() => {
        axios.get(HOST + "/sharecapital/sc").then((responseData) => {
            setSharecapital(responseData.data);
        });
    }, [submittedDate, additionSuccess]);

    async function submitcode() {
        let data = { "reporting_date": date, "institute_code": code };
        const result = await axios.post(HOST + "/sharecapital/sc", data);

        try {
            if (result.status === 200 || result.status === 201) {
                setAdditionSuccess(true);
                setSubmittedDate(date);
            }
        } catch (e) {
            setAdditionSuccess(false);
        }
    }

    return (
        <Container>
            <Row>
                <Col>
                    <Container className="mt-5">
                        <Row>
                            <h1>Post Latest Share Capital</h1>
                            {
                                additionSuccess && <Alert variant="success">Data Posted Successfully For {submittedDate} </Alert>
                            }
                        </Row>
                        <Row className="mt-2">
                            <Col md="4">Reporting Date : </Col>
                            <Col md="5"><Form.Control size="sm" type="text" placeholder="Enter reporting date"
                                value={date} onChange={event => setDate(event.target.value)} /></Col>
                        </Row>
                        <Row>
                            <Col md="4" >Code : </Col>
                            <Col md="5" >
                                <Form.Control size="sm" type="text" placeholder="Enter code"
                                    value={code} onChange={event => setCode(event.target.value)} />
                            </Col>
                        </Row>
                        <Row className="mt-2" >
                            <Col md="4" />
                            <Col md="5" className="d-flex flex-row-reverse" >
                                <Button variant="dark" onClick={submitcode}>Post</Button>
                            </Col>
                        </Row>
                        <Row>
                            <Container className="mt-5">
                                <Row>
                                    <h1>Previously Submitted Data</h1>
                                </Row>
                                <Row>
                                    <Table striped>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Data</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {sharecapital.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>
                                                        <pre>{JSON.stringify(item, null, 4)}</pre>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </Row>
                            </Container>
                        </Row>
                    </Container>
                </Col>
            </Row>
        </Container>
    );
};

export default ShareCapital
