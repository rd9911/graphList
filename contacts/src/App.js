import { Link, Switch, Route } from 'react-router-dom';
import Authors from './components/Authors';
import Books from './components/Books';
import { routeLink } from './styles/mainPage'



function App() {

  return (
    <div>
      <Link style={routeLink} to='/authors'>Authors</Link>
      <Link style={routeLink} to='/books'>Books</Link>
      <Switch>
        <Route path='/authors'>
          <Authors />
        </Route>
        <Route path='/books'>
          <Books />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
