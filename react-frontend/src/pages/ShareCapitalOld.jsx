import axios from "axios";
import { Col, Container, Row, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Hosts } from "../constants/config";

const ShareCapital = () => {
    const [fetchData, setFetchData] = useState(true);
    const [sharecapital, setSharecapital] = useState([]);
    const HOST = Hosts.host;

    useEffect(() => {
        axios.get(HOST + "/sharecapital/sc").then(responseData => {
            console.log(responseData.data);
            // let responseEntries = Object.entries(responseData.data);
            setSharecapital(responseData.data);
        });
        setFetchData(false);
    }, [fetchData]);

    return (
        <Container className="mt-5">
            <Row className="mt-5" >
                <Col>
                    <Table striped>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Data</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {sharecapital.map((item, index) => (
                                <tr key={index}>
                                    <td>{index}</td>
                                    <td>{item.capitalCategory}</td>
                                </tr>
                            ))} */}
                            <tr key={1}>
                                <td>1</td>
                                <td>
                                    <pre>{JSON.stringify(sharecapital, null, 4)}</pre>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
};

export default ShareCapital;
