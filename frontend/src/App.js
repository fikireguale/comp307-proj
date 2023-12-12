import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {Helmet} from "react-helmet";
import Discussion from './pages/discussion';
import Landing from './pages/landing';
import Registration from './pages/Registration';
import SignIn from './pages/signIn';
import Select_Discussion from './pages/select_discussion';
import UserManagement from './pages/userManagement';

import React, { useEffect } from 'react';

function App() {
  useEffect(() => {
    const viewportMeta = document.createElement('meta');
    viewportMeta.name = "viewport";
    viewportMeta.content = "width=device-width, initial-scale=1";
    document.head.appendChild(viewportMeta);
  }, []);

  return (
    <>
    <Helmet>
      <title>Perch</title>
      
    </Helmet>
   
    
    <Router>
      <Routes>
        
        {/*remeber to changing this back to Landing */}
        <Route path='/' element={<Landing/>}/>
        <Route path='/registration' element={<Registration/>}/>
        <Route path='/signIn' element={<SignIn/>}/>
        <Route path='/discussion/:username/:discussionName' element={<Discussion/>}/>
        <Route path='/select_discussion/:username' element={<Select_Discussion/>}/>
        <Route path='/userManagement/:username/:discussionName' element={<UserManagement />} />
          
      </Routes>
    </Router>
    </>
  );
}

export default App;
