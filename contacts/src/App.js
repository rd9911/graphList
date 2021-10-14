import { useEffect, useState } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import AddBooks from './components/AddBooks';
import Authors from './components/Authors';
import Books from './components/Books';
import Login from './components/Login';
import { routeLink } from './styles/mainPage'
import { useApolloClient, useQuery, useSubscription } from '@apollo/client'
import Recommendation from './components/Recommendation';
import { USER } from "./queries/userQueries";
import { ALL_BOOKS, BOOK_ADDED } from './queries/bookQueries';


function App() {
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState('')
  const [token, setToken] = useState('')
  const client = useApolloClient()
  const user = useQuery(USER)

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => {
      set.map(p => p.id).includes(object.id)
    }

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    console.log(dataInStore)
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) }
      })
      window.alert(`${addedBook.title} has added`)
      console.log(client.readQuery({ query: ALL_BOOKS }))
    }
  }
  
  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log(subscriptionData)
      const addedBook = subscriptionData.data.bookAdded
      console.log(addedBook)
      updateCacheWith(addedBook)
    }
  })

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

  if (user.loading) {
    return <div>Loading...</div>
  }

  

  return (
    <div>
      <div>
        <Link style={routeLink} to='/authors'>Authors</Link>
        <Link style={routeLink} to='/books'>Books</Link>
        {token ? 
          <div style={{display: "inline-block"}}>
            <Link style={routeLink} to='/add-books'>Add book</Link>
            <Link style={routeLink} to='/recommended-books'>Recommend</Link>
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
        <Route path='/recommended-books'>
          <Recommendation user={user.data.me} />
        </Route>
        <Route path='/add-books'>
          <AddBooks updateCacheWith={updateCacheWith} />
        </Route>
        <Route path='/login'>
          <Login setError={setError} setToken={setToken} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
