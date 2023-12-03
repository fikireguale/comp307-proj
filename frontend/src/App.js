import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Discussion from './pages/discussion';
import Landing from './pages/landing';
import Registration from './pages/Registration';
import SignIn from './pages/signIn';


function App() {
  return (
    <Router>
      <Routes>
        
        <Route path='/' element={<Landing/>}/>
        <Route path='/registration' element={<Registration/>}/>
        <Route path='/signIn' element={<SignIn/>}/>
      </Routes>
    </Router>
  );
}

export default App;
