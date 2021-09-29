import { useEffect, useState } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import AddBooks from './components/AddBooks';
import Authors from './components/Authors';
import Books from './components/Books';
import Login from './components/Login';
import { routeLink } from './styles/mainPage'
import { useApolloClient } from '@apollo/client'



function App() {
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState('')
  // eslint-disable-next-line no-unused-vars
  const [token, setToken] = useState('')
  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    client.resetStore()
    localStorage.clear()
  }

  useEffect(() => {
    if (!token) {
      const userToken = localStorage.getItem('userToken')
      if (userToken) {
        setToken(userToken)
      }
    }
    
  }, [token])

  return (
    <div>
      <div>
        <Link style={routeLink} to='/authors'>Authors</Link>
        <Link style={routeLink} to='/books'>Books</Link>
        {token ? 
          <div style={{display: "inline-block"}}>
            <Link style={routeLink} to='/add-books'>Add book</Link>
            <button type='submit' onClick={logout}>Logout</button>
          </div> 
          : <Link style={routeLink} to='/login'>Login</Link>}
        </div>
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
        <Route path='/login'>
          <Login setError={setError} setToken={setToken} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
