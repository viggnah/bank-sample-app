import axios from "axios";
import { Col, Container, Row, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Hosts } from "../constants/config";

const DividendsPayable = () => {
    const [fetchData, setFetchData] = useState(true);

    const [dividends, setDividends] = useState([]);
    const HOST = Hosts.host;

    const headers = {
        headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
    };

    useEffect(() => {
        axios.get(HOST + "/sharecapitalinfo?reportingDate=2023-05-20", headers).then(responseData => {
            console.log(responseData.data);
            let responseEntries = Object.entries(responseData.data);
            setDividends(responseData.data);
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
                            {/* {dividends.map((item, index) => (
                                <tr key={index}>
                                    <td>{index}</td>
                                    <td>{item}</td>
                                </tr> */}
                            <tr key={1}>
                                <td>1</td>
                                <td>
                                    <pre>{JSON.stringify(dividends, null, 4)}</pre>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
};

export default DividendsPayable;
