import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Discussion from './pages/discussion';
import Landing from './pages/landing';
import Registration from './pages/Registration';
import SignIn from './pages/signIn';
import Select_Discussion from './pages/select_discussion';


function App() {
  return (
    <Router>
      <Routes>
        
        <Route path='/' element={<Landing/>}/>
        <Route path='/registration' element={<Registration/>}/>
        <Route path='/signIn' element={<SignIn/>}/>
        <Route path='/discussion' element={<Discussion/>}/>
        <Route path='/select_discussion/:username' element={<Select_Discussion/>}/>
          
      </Routes>
    </Router>
  );
}

export default App;
