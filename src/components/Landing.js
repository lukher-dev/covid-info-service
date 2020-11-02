import { Jumbotron, Container, Row, Col, Button } from 'react-bootstrap'
import {
    Link
} from "react-router-dom";
import lastUpdateDate from '../data/lastUpdateDate.json'
import statsData from '../data/statsData.json'

function RestrictionsList() {
    return (
        <div>
            <Jumbotron fluid className='p-1 m-2' >
                <Container fluid className="text-center" >
                    <Row>
                        <Col>
                            <p className='m-0 font-weight-light'>Dane z dnia {lastUpdateDate.lastCases}</p>
                            <hr className='m-2' />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h6>Nowe zakażenia:</h6>
                        </Col>
                        <Col>
                            <h6>Nowe zgony:</h6>
                        </Col>
                    </Row>
                    <Row className='mb-3'>
                        <Col>
                            <h4 className='text-danger'>+{statsData.new_cases_today}</h4>
                        </Col>
                        <Col>
                            <h4 className='text-danger'>+{parseInt(statsData.dead_covid_today) + parseInt(statsData.dead_intercurrent_today)}</h4>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h6>Liczba wykonanych testów</h6>
                        </Col>
                    </Row>
                    <Row className='mb-3'>
                        <Col>
                            <h4>{statsData.tests_done_today}</h4>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h6>Aktywne przypadki</h6>
                        </Col>
                        <Col>
                            <h6>Zgony Łącznie</h6>
                        </Col>
                    </Row>
                    <Row className='mb-3'>
                        <Col>
                            <h4>-</h4>
                        </Col>
                        <Col>
                            <h4>{statsData.dead_global}</h4>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h6>Zajęte respiratory</h6>
                        </Col>
                        <Col>
                            <h6>Zajęte łóżka</h6>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h4>-</h4>
                        </Col>
                        <Col>
                            <h4>-</h4>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <hr className='m-2' />
                        </Col>
                    </Row>
                </Container>
            </Jumbotron>
            <Jumbotron fluid className='p-1 m-2' >
                <Container>
                    <Row className="text-center">
                        <Col>
                            <p className='m-0'>Aktualnie obowiązujące obostrzenia z dnia: {lastUpdateDate.lastRestrictions}</p>
                        </Col>
                    </Row>
                    <Row className='m-0'>
                        <Col className='p-0 m-2'>
                            <Link to="/restrictions"><Button className='w-100'>Zobacz obostrzenia</Button></Link>
                        </Col>
                        {/* <Col className='p-0 m-2'>
                            <Link to="/statistics"><Button className='w-100'>Statystyki</Button></Link>
                        </Col> */}
                    </Row>
                </Container>
            </Jumbotron>
        </div>
    );
}

export default RestrictionsList;
