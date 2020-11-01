import TopBar from './components/TopBar'
import RestrictionsList from './components/restrictions/RestrictionsList'
import Landing from './components/Landing'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <Router>
      <TopBar />
      <Switch>
        <Route path="/restrictions">
          <RestrictionsList />
        </Route>
        <Route path="/">
          <Landing />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
