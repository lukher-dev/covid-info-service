import TopBar from './components/TopBar'
import RestrictionsList from './components/restrictions/RestrictionsList'
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
        <Route path="/">
          <RestrictionsList />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
