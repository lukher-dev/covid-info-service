import ReactGa from 'react-ga';
import RestrictionsList from './RestrictionsList'
import { Jumbotron, Row, Col, Alert, Container } from 'react-bootstrap'
import { FaTwitterSquare } from 'react-icons/fa';
import RestrictionsData from '../../data/restrictions.json'
import UpcomingRestrictionsData from '../../data/upcomingRestrictions.json'

function Restrictions() {
    ReactGa.pageview(window.location.pathname);
    return (
        <div>
            <Jumbotron fluid className="m-0 pt-0">
                <Alert className='p-0 m-0' variant='danger'><h4 className="text-center">Nadchodzące obostrzenia</h4></Alert>
                <Container className='p-0'>
                    <Row className="text-center">
                        <Col>
                            <small>Na podstawie <a href='https://twitter.com/MZ_GOV_PL'>{<FaTwitterSquare size={20} />}</a></small>
                        </Col>
                    </Row>
                </Container>
                <RestrictionsList restrictions={UpcomingRestrictionsData} />
            </Jumbotron>
            <Jumbotron fluid className="p-0 m-0">
                <Alert className='p-0 m-0' variant='info'><h4 className="text-center">Aktualne obostrzenia</h4></Alert>
                <Container className='p-0'>
                    <Row className="text-center">
                        <Col>
                            <small>Dokładny spis aktualnych zasad i ograniczeń znajdziesz na <a href="https://www.gov.pl/web/koronawirus/aktualne-zasady-i-ograniczenia"><b>gov.pl</b></a></small>
                        </Col>
                    </Row>
                </Container>
                <RestrictionsList restrictions={RestrictionsData} />
            </Jumbotron>
        </div>
    );
}

export default Restrictions;
