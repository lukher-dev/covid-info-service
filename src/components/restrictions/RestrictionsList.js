import { Jumbotron, Card } from 'react-bootstrap'
import RestrictionsData from '../../data/restrictions.json'
import Restriction from './Restriction'

function RestrictionsList() {
    return (
        <Jumbotron fluid className="p-0">
            {
                RestrictionsData.map(category => {
                    return (
                        <Card border="light">
                            <Card.Header>
                                <Card.Title className="m-0">{category.title}</Card.Title>
                            </Card.Header>
                            <Card.Body className="p-1">
                                <ul className="pl-4">
                                    {category.restrictions.map(restriction => {
                                        return <Restriction content={restriction.content} details={restriction.details} />
                                    })}
                                </ul>
                            </Card.Body>
                        </Card>
                    )
                })
            }
        </Jumbotron>
    );
}

export default RestrictionsList;
