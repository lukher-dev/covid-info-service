import ReactGa from 'react-ga';
import { Jumbotron, Container, Row, Col, Button, ProgressBar } from 'react-bootstrap'
import {
    Link
} from "react-router-dom";
import lastUpdateDate from '../data/lastUpdateDate.json'
import { newOrOld, percentageDifference, updateWarning } from './helpers'
import { FaTwitterSquare } from 'react-icons/fa';

function RestrictionsList() {
    ReactGa.pageview(window.location.pathname);
    return (
        <div>
            <Jumbotron fluid className='p-1 m-2' >
                <Container fluid className="text-center" >
                    <Row>
                        <Col>
                            <p className='m-0 font-weight-light'>Ostatnia aktualizacja: {lastUpdateDate.lastCases}</p>
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
                            <h4 className='m-0'>{newOrOld('new_cases_today')}</h4>
                            {updateWarning('new_cases_today')}
                            {percentageDifference('new_cases_today')}
                        </Col>
                        <Col>
                            <h4 className='m-0'>{newOrOld('dead_all_today')}</h4>
                            {updateWarning('dead_all_today')}
                            {percentageDifference('dead_all_today')}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h6>Aktywne przypadki:</h6>
                        </Col>
                    </Row>
                    <Row className='mb-3'>
                        <Col>
                            <h4 className='m-0'>{newOrOld('active_cases')}</h4>
                            {updateWarning('active_cases')}
                            {percentageDifference('active_cases')}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h6>Liczba testów:</h6>
                        </Col>
                        <Col>
                            <h6>Zgony Łącznie:</h6>
                        </Col>
                    </Row>
                    <Row className='mb-3'>
                        <Col>
                            <h4>{newOrOld('tests_done_today')}</h4>
                            {updateWarning('tests_done_today')}
                        </Col>
                        <Col>
                            <h4>{newOrOld('dead_global')}</h4>
                            {updateWarning('dead_global')}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h6>Zajęte respiratory:</h6>
                        </Col>
                        <Col>
                            <h6>Zajęte łóżka:</h6>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h5>{newOrOld('occupied_respirator_count')}/{newOrOld('respirator_count')}</h5>
                            <ProgressBar variant="danger" animated
                                now={newOrOld('occupied_respirator_count') / newOrOld('respirator_count') * 100}
                                label={String(Math.floor(newOrOld('occupied_respirator_count') / newOrOld('respirator_count') * 100)) + '%'} />
                            {updateWarning('occupied_respirator_count')}
                        </Col>
                        <Col>
                            <h5>{newOrOld('occupied_bed_count')}/{newOrOld('bed_count')}</h5>
                            <ProgressBar variant="danger" animated
                                now={newOrOld('occupied_bed_count') / newOrOld('bed_count') * 100}
                                label={String(Math.floor(newOrOld('occupied_bed_count') / newOrOld('bed_count') * 100)) + '%'} />
                            {updateWarning('occupied_bed_count')}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <hr className='m-2' />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <small>Dane pobierane z <a href='https://twitter.com/MZ_GOV_PL'>{<FaTwitterSquare size={20} />}</a></small>
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
        </div >
    );
}

export default RestrictionsList;
