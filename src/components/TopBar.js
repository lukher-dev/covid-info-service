import {React} from 'react'
import { Navbar } from 'react-bootstrap'

function TopBar() {

  return (
    <Navbar bg='primary' variant='dark' >
      <Navbar.Brand href='/'>info-covid.pl</Navbar.Brand>
    </Navbar>
  )
}

export default TopBar
