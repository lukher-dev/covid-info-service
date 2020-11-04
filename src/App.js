import TopBar from './components/TopBar'
import Restrictions from './components/restrictions/Restrictions'
import Landing from './components/Landing'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

console.log(process.env)
console.log(process.env.SITE_URL)

function App() {
  return (
    <Router>
      <TopBar />
      <Switch>
        <Route path={process.env.SITE_URL + '/restrictions'}>
          <Restrictions />
        </Route>
        <Route path={process.env.SITE_URL + '/statistics'}>
          <Landing />
        </Route>
        <Route path={process.env.SITE_URL + '/'}>
          <Landing />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
