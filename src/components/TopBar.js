import { Nav, Navbar } from 'react-bootstrap'
import {
    Link
} from "react-router-dom";

function TopBar() {
    return (
        <Navbar bg="primary" variant="dark" >
            <Navbar.Brand href="#home">COVID</Navbar.Brand>
            <Nav className="w-100 justify-content-end">
                <Link className="nav-link" to="/">Home</Link>
                <Link className="nav-link" to="/restrictions">Obostrzenia</Link>
                <Link className="nav-link" to="/statistics">Statystyki</Link>
            </Nav>
        </Navbar>
    );
}

export default TopBar;
