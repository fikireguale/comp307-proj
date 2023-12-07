import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Discussion from './pages/discussion';
import Landing from './pages/landing';
import Registration from './pages/Registration';
import SignIn from './pages/signIn';
import Select_Discussion from './pages/select_discussion';
import Test from './pages/test'
import React, { useEffect } from 'react';

function App() {
  useEffect(() => {
    const viewportMeta = document.createElement('meta');
    viewportMeta.name = "viewport";
    viewportMeta.content = "width=device-width, initial-scale=1";
    document.head.appendChild(viewportMeta);
  }, []);

  return (
    <Router>
      <Routes>
        {/*remeber to changing this back to Landing */}
        <Route path='/' element={<Landing/>}/>
        <Route path='/registration' element={<Registration/>}/>
        <Route path='/signIn' element={<SignIn/>}/>
        <Route path='/discussion' element={<Discussion/>}/>
        <Route path='/select_discussion' element={<Select_Discussion/>}/>
          
      </Routes>
    </Router>
  );
}

export default App;
