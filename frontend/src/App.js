import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Discussion from './pages/discussion';
import Landing from './pages/landing';
import Registration from './pages/registration';
import SignIn from './pages/signIn';
import Navbar from './components/Navbar';

import './App.css';


function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        
        <Route path='/landing' element={<Landing/>}/>
        <Route path='/registration' element={<Registration/>}/>
        <Route path='/signIn' element={<SignIn/>}/>
      </Routes>
    </Router>
  );
}

export default App;
