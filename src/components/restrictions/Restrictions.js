import ReactGa from 'react-ga';
import RestrictionsList from './RestrictionsList'
import { Jumbotron, Row, Col, Card } from 'react-bootstrap'

function Restrictions() {
    ReactGa.pageview(window.location.pathname);
    return (
        <Jumbotron fluid className="p-0">
            <Card border="light">
                <Card.Header>
                    <Card.Title className="m-0">
                        <Row className="text-center">
                            <Col>
                                Dokładny spis aktualnych zasad i ograniczeń znajdziesz na <a href="https://www.gov.pl/web/koronawirus/aktualne-zasady-i-ograniczenia"><b>gov.pl</b></a>
                            </Col>
                        </Row>
                    </Card.Title>
                </Card.Header>
            </Card>
            <RestrictionsList />
        </Jumbotron>
    );
}

export default Restrictions;
