import { Navbar } from 'react-bootstrap'

function TopBar() {
    return (
        <Navbar bg='primary' variant='dark' >
            <Navbar.Brand href='/'>info-covid.pl</Navbar.Brand>
            {/* <Nav className='w-100 justify-content-end'>
                <Link className='nav-link' to='/'>Statystyki</Link>
                <Link className='nav-link' to='/restrictions'>Obostrzenia</Link>
            </Nav> */}
        </Navbar>
    );
}

export default TopBar;
