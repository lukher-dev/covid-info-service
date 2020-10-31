import { Nav, Navbar } from 'react-bootstrap'

function TopBar() {
    return (
        <Navbar bg="primary" variant="dark" >
            <Navbar.Brand href="#home">COVID</Navbar.Brand>
            <Nav className="w-100 justify-content-end">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/restrictions">Ograniczenia</Nav.Link>
                <Nav.Link href="/statistics">Statystyki</Nav.Link>
            </Nav>
        </Navbar>
    );
}

export default TopBar;
