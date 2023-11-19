import React from 'react'
import Navbar from './components/Navbar';
import {Router, Switch, Route} from 'react-router-dom';
import './App.css';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact />
        </Switch>
      </Router>
    </>
    //<div className="App">
      
      //</Navbar>
    //</div>
  );
}

export default App;
