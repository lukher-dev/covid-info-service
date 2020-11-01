import RestrictionsList from './RestrictionsList'
import { Jumbotron } from 'react-bootstrap'

function Restrictions() {
    //TODO: link to restriction source and disclaimer
    return (
        <Jumbotron fluid className="p-0">
            <RestrictionsList />
        </Jumbotron>
    );
}

export default Restrictions;
