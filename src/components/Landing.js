import ReactGA from 'react-ga';
import { Jumbotron, Container, Row, Col, ProgressBar } from 'react-bootstrap'
import lastUpdateDate from '../data/lastUpdateDate.json'
import { newOrOld, percentageDifference, updateWarning, insertThinSpace } from './helpers'
import { FaTwitterSquare } from 'react-icons/fa';
import { useEffect } from 'react';
import DoomBar from './statistics/DoomBar'
import Vaccines from './Vaccines'

function Landing() {
    useEffect(() => {
        ReactGA.pageview(window.location.pathname + window.location.search);
    });

    return (
        <div>
            <Vaccines/>
            <Jumbotron className='p-0 m-2' >
                <div className="text-center">
                <h2>Zachorowania</h2>
                </div>
                <Container className="text-center pt-2" >
                    <Row>
                        <Col>
                            <p className='m-0'>Ostatnia aktualizacja: {lastUpdateDate.lastCases}</p>
                            <hr className='m-2' />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={{ span: 4, order: 1 }} xs={{ span: 6, order: 1 }} className='mb-3'>
                            <h6>Nowe zakażenia:</h6>
                            <h4 className='m-0'>{insertThinSpace(newOrOld('new_cases_today'))}</h4>
                            {updateWarning('new_cases_today')}
                            {percentageDifference('new_cases_today')}
                        </Col>
                        <Col md={{ span: 4, order: 2 }} xs={{ span: 12, order: 3 }} className='mb-3'>
                            <h6>Aktywne przypadki:</h6>
                            <h4 className='m-0'>{insertThinSpace(newOrOld('active_cases'))}</h4>
                            {updateWarning('active_cases')}
                            {percentageDifference('active_cases')}
                        </Col>
                        <Col md={{ span: 4, order: 3 }} xs={{ span: 6, order: 2 }} className='mb-3'>
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
                            <Row>
                                <Col>
                                    <h4 className='m-0'>{newOrOld('tests_done_today')}</h4>
                                    <p className='m-0 p-0'><small className='text-muted font-weight-normal'>{newOrOld('percent_positive')} pozytywnych</small></p>
                                    {updateWarning('tests_done_today')}
                                </Col>
                            </Row>
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
            <DoomBar />
            {/* <Jumbotron className='p-0 m-2' >
                <Container>
                    <Row className="text-center">
                        <Col>
                            <p className='m-0'>Aktualnie obowiązujące obostrzenia z dnia: {lastUpdateDate.lastRestrictions}</p>
                        </Col>
                    </Row>
                    <Row className='m-0'>
                        <Col className='p-0 m-2'>
                            <Button className='restrictions-button p-0' block><Link to="/restrictions"><p className='m-2 text-white'>Zobacz obostrzenia</p></Link></Button>
                        </Col>
                    </Row>
                </Container>
            </Jumbotron> */}
        </div >
    );
}

export default Landing;
