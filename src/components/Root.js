import React from 'react'
import TopBar from './TopBar'
import Restrictions from './restrictions/Restrictions'
import Landing from './statistics/Landing'
import {
  HashRouter,
  Switch,
  Route
} from 'react-router-dom'

function Root() {

  return (
    <HashRouter basename='/'>
      <TopBar />
      <Switch>
        <Route path={process.env.PUBLIC_URL + '/restrictions'}>
          <Restrictions />
        </Route>
        <Route path={process.env.PUBLIC_URL + '/statistics'}>
          <Landing />
        </Route>
        <Route path={process.env.PUBLIC_URL + '/'}>
          <Landing />
        </Route>
      </Switch>
    </HashRouter>
  )
}

export default Root
