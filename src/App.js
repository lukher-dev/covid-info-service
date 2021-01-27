import TopBar from './components/TopBar'
import Restrictions from './components/restrictions/Restrictions'
import Landing from './components/Landing'
import {
  HashRouter,
  Switch,
  Route
} from "react-router-dom";

function App() {

  return (
    <HashRouter basename="/">
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
  );
}

export default App;
