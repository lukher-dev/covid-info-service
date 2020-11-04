import ReactGA from 'react-ga';
import { Jumbotron, Container, Row, Col, Button, ProgressBar } from 'react-bootstrap'
import {
    Link
} from "react-router-dom";
import lastUpdateDate from '../data/lastUpdateDate.json'
import { newOrOld, percentageDifference, updateWarning, doomCounterValue, insertThinSpace } from './helpers'
import { FaTwitterSquare } from 'react-icons/fa';
import { useEffect } from 'react';

function Landing() {
    const [doomCounterValues, doomCounterActualValues, average] = doomCounterValue()
    useEffect(() => {
        ReactGA.pageview(window.location.pathname + window.location.search);
        console.log(window.location.pathname + window.location.search);
    });
    return (
        <div>
            <Jumbotron className='p-0 m-2' >
                <Container className="text-center" >
                    <Row>
                        <Col>
                            <p className='m-0'>Ostatnia aktualizacja: {lastUpdateDate.lastCases}</p>
                            <hr className='m-2' />
                        </Col>
                    </Row>
                    <Row>
                        <Col sm='4' xs={{ span: 6 }} className='mb-3'>
                            <h6>Nowe zakażenia:</h6>
                            <h4 className='m-0'>{insertThinSpace(newOrOld('new_cases_today'))}</h4>
                            {updateWarning('new_cases_today')}
                            {percentageDifference('new_cases_today')}
                        </Col>
                        <Col sm='4' xs={{ span: 12, order: 'last' }} className='mb-3'>
                            <h6>Aktywne przypadki:</h6>
                            <h4 className='m-0'>{insertThinSpace(newOrOld('active_cases'))}</h4>
                            {updateWarning('active_cases')}
                            {percentageDifference('active_cases')}
                        </Col>
                        <Col sm={{ span: 4, order: 'last' }} xs={{ span: 6 }} className='mb-3'>
                            <h6>Nowe zgony:</h6>
                            <h4 className='m-0'>{insertThinSpace(newOrOld('dead_all_today'))}</h4>
                            {updateWarning('dead_all_today')}
                            {percentageDifference('dead_all_today')}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <hr />
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={{ span: 3, order: 1 }} md={{ span: 6, order: 1 }} xs={{ span: 6, order: 1 }}>
                            <h6>Liczba testów:</h6>
                            <h4>{newOrOld('tests_done_today')}</h4>
                            {updateWarning('tests_done_today')}
                            <br />
                        </Col>
                        <Col lg={{ span: 3, order: 2 }} md={{ span: 6, order: 3 }} xs={{ span: 6, order: 3 }}>
                            <h6>Zajęte respiratory:</h6>
                            <h5>{insertThinSpace(newOrOld('occupied_respirator_count'))}/{insertThinSpace(newOrOld('respirator_count'))}</h5>
                            <ProgressBar variant="danger" animated
                                now={newOrOld('occupied_respirator_count') / newOrOld('respirator_count') * 100}
                                label={String(Math.floor(newOrOld('occupied_respirator_count') / newOrOld('respirator_count') * 100)) + '%'} />
                            {updateWarning('occupied_respirator_count')}
                        </Col>
                        <Col lg={{ span: 3, order: 3 }} md={{ span: 6, order: 4 }} xs={{ span: 6, order: 4 }}>
                            <h6>Zajęte łóżka:</h6>
                            <h5>{insertThinSpace(newOrOld('occupied_bed_count'))}/{insertThinSpace(newOrOld('bed_count'))}</h5>
                            <ProgressBar variant="danger" animated
                                now={newOrOld('occupied_bed_count') / newOrOld('bed_count') * 100}
                                label={String(Math.floor(newOrOld('occupied_bed_count') / newOrOld('bed_count') * 100)) + '%'} />
                            {updateWarning('occupied_bed_count')}
                        </Col>
                        <Col lg={{ span: 3, order: 4 }} md={{ span: 6, order: 2 }} xs={{ span: 6, order: 2 }}>
                            <h6>Zgony Łącznie:</h6>
                            <h4>{insertThinSpace(newOrOld('dead_global'))}</h4>
                            {updateWarning('dead_global')}
                            <br />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <hr className='m-2' />
                        </Col>
                    </Row>
                    <Row>
                        <Col className='mb-2'>
                            <small>Dane pobierane z <a href='https://twitter.com/MZ_GOV_PL'>{<FaTwitterSquare size={20} />}MZ_GOV_PL</a></small>
                        </Col>
                    </Row>
                </Container>
            </Jumbotron>
            <Jumbotron className='p-0 m-2' >
                <Container className="text-center" >
                    <Row>
                        <Col>
                            <h6>Etapy zasad bezpieczeństwa</h6>
                            <p className="font-weight-light">Średnia liczba nowych zakażeń przez ostatnie 7dni na 100 tyś. mieszkańców: <b>{Math.round(average * 1000) / 1000}</b></p>
                            <ProgressBar className='doom-bar'>
                                <ProgressBar className="color-green" now={doomCounterValues[0]} label={Math.floor(doomCounterActualValues[0]).toString() + '/10'} />
                                <ProgressBar className="color-yellow" now={doomCounterValues[1]} label={Math.floor(doomCounterActualValues[1]).toString() + '/25'} />
                                <ProgressBar className="color-red" now={doomCounterValues[2]} label={Math.floor(doomCounterActualValues[2]).toString() + '/50'} />
                                <ProgressBar className="color-purple" now={doomCounterValues[3]} label={Math.floor(doomCounterActualValues[3]).toString() + '/70'} />
                                <ProgressBar className="color-black" now={doomCounterValues[4]} label={Math.floor(doomCounterActualValues[4]).toString()} />
                            </ProgressBar>
                            <ProgressBar className='doom-light-bar'>
                                <ProgressBar className="color-light-green" now={10 / 0.75} />
                                <ProgressBar className="color-light-yellow" now={15 / 0.75} />
                                <ProgressBar className="color-light-red" now={25 / 0.75} />
                                <ProgressBar className="color-light-purple" now={20 / 0.75} />
                                <ProgressBar className="color-light-black" now={5 / 0.75} />
                            </ProgressBar>
                            <hr className='m-2' />
                            <small>Więcej informacji o etapach zasad bezpieczeństwa:</small>
                            <p><a href='https://twitter.com/PremierRP/status/1323980694033489923/photo/1'>{<FaTwitterSquare size={20} />}Kancelaria Premiera</a></p>
                        </Col>
                    </Row>
                </Container>
            </Jumbotron>
            <Jumbotron className='p-0 m-2' >
                <Container>
                    <Row className="text-center">
                        <Col>
                            <p className='m-0'>Aktualnie obowiązujące obostrzenia z dnia: {lastUpdateDate.lastRestrictions}</p>
                        </Col>
                    </Row>
                    <Row className='m-0'>
                        <Col className='p-0 m-2'>
                            <Button className='restrictions-button' block><Link to="/restrictions"><p className='m-0 text-white'>Zobacz obostrzenia</p></Link></Button>
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

export default Landing;
