import { Jumbotron, Container, Row, Col, ProgressBar } from 'react-bootstrap'
import { doomCounterValue } from './../helpers'
import { FaTwitterSquare } from 'react-icons/fa';

function DoomBar() {
    const [doomCounterValues, doomCounterlabels, average] = doomCounterValue()
    return (
        <Jumbotron className='p-0 m-2' >
            <Container className="text-center pt-2" >
                <Row>
                    <Col>
                        <h6>Etapy zasad bezpieczeństwa</h6>
                        <p className="font-weight-light">Średnia liczba nowych zakażeń przez ostatnie 7 dni na 100 tys mieszkańców: <b>{Math.round(average * 1000) / 1000}</b></p>
                        <ProgressBar className='doom-bar mt-5'>
                            <ProgressBar className="color-green" now={doomCounterValues[0]} />
                            <ProgressBar className="color-yellow" now={doomCounterValues[1]} />
                            <ProgressBar className="color-red" now={doomCounterValues[2]} />
                            <ProgressBar className="color-purple" now={doomCounterValues[3]} />
                            <ProgressBar className="color-black" now={doomCounterValues[4]} />
                        </ProgressBar>
                        <ProgressBar className='doom-light-bar'>
                            <ProgressBar className="color-light-green" now={10 / 0.80} label={doomCounterlabels[0]} />
                            <div>
                                <span className="tooltiptext">10</span>
                            </div>
                            <ProgressBar className="color-light-yellow" now={15 / 0.80} label={doomCounterlabels[1]} />
                            <div>
                                <span className="tooltiptext">25</span>
                            </div>
                            <ProgressBar className="color-light-red" now={25 / 0.80} label={doomCounterlabels[2]} />
                            <div>
                                <span className="tooltiptext">50</span>
                            </div>
                            <ProgressBar className="color-light-purple" now={20 / 0.80} label={doomCounterlabels[3]} />
                            <div>
                                <span className="tooltiptext">70</span>
                            </div>
                            <ProgressBar className="color-light-black" now={10 / 0.80} label={doomCounterlabels[4]} />
                        </ProgressBar>
                        <Row className='m-0'>
                            <div className='doom-bar-label d-md-inline d-lg-inline d-none' style={{ width: (10 / 0.80).toString() + '%', 'border-left-style': 'dashed' }}>
                                <small>Regionalny podział na strefy</small>
                            </div>
                            <div className='doom-bar-label d-md-inline d-lg-inline d-none' style={{ width: (15 / 0.80).toString() + '%' }}>
                                <small>Cała polska strefą żółtą, wybrane powiaty strefą czerwoną</small>
                            </div>
                            <div className='doom-bar-label d-md-inline d-lg-inline d-none' style={{ width: (25 / 0.80).toString() + '%' }}>
                                <small>Cała polska strefą czerwoną</small>
                            </div>
                            <div className='doom-bar-label d-md-inline d-lg-inline d-none' style={{ width: (20 / 0.80).toString() + '%' }}>
                                <small>Bezpiecznik</small>
                            </div>
                            <div className='doom-bar-label d-md-inline d-lg-inline d-none' style={{ width: (10 / 0.80).toString() + '%' }}>
                                <small>Kwarantanna narodowa</small>
                            </div>
                        </Row>
                        <hr className='m-2' />
                        <small>Więcej informacji o etapach zasad bezpieczeństwa:</small>
                        <p><a href='https://twitter.com/PremierRP/status/1323980694033489923/photo/1'>{<FaTwitterSquare size={20} />}Kancelaria Premiera</a></p>

                    </Col>
                </Row>
            </Container>
        </Jumbotron >
    )
}

export default DoomBar