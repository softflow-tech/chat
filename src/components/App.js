import React from 'react'
import { BrowserRouter as Router, Switch , Route} from 'react-router-dom'

import { useStateValue } from "./StateProvider"

import Account from "./Account"
import Chat from "./Chat"
import Contacts from "./Contacts"
import Login from './Login'
import Sidebar from "./Sidebar"

import '../css/App.css'

function App() {

  const [{user}, dispatch ] = useStateValue();

  return(
   <div className='app'>
    { !user ? (
      <Login />
      ):(
      <div className='app__body'>
        <Router>
          <Switch>
            <Route path='/rooms/:roomId'>
              <Chat />
            </Route>
            <Route path='/account/:accountId'>
              <Account />
            </Route> 
            <Route path='/contacts'>
              <Contacts />
            </Route>
            <Route path='/'>
              <Account />
            </Route>          
          </Switch>
          <Sidebar />
        </Router>
      </div>
      )}
    </div>
  ) 
}

export default App;
