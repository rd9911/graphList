import { Link, Switch, Route } from 'react-router-dom';
import AddBooks from './components/AddBooks';
import Authors from './components/Authors';
import Books from './components/Books';
import { routeLink } from './styles/mainPage'



function App() {

  return (
    <div>
      <Link style={routeLink} to='/authors'>Authors</Link>
      <Link style={routeLink} to='/books'>Books</Link>
      <Link style={routeLink} to='/add-books'>Add book</Link>
      
      <Switch>
        <Route path='/authors'>
          <Authors />
        </Route>
        <Route path='/books'>
          <Books />
        </Route>
        <Route path='/add-books'>
          <AddBooks />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
