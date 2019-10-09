import React from 'react';
import {Route, Link} from 'react-router-dom';
import './App.css';

import Login from './components/login';
import Register from './components/register';
import CoachRegister from './components/coachRegister';
import CoachLogin from './components/coachLogin';

function App() {
  return (
    <div className="App">
      <div className='navigation-bar'>
        <Link to='/patient-login'>patient login</Link>
        <Link to='/patient-registration'>patient registration</Link>
        <Link to='/coach-login'>coach Login</Link>
        <Link to='/coach-registration'>coach registration</Link>
      </div>
      <Route path='/patient-login' component={Login} />
      <Route path='/patient-registration' component={Register} />
      <Route path='/coach-login' component={CoachLogin} />
      <Route path='/coach-registration' component={CoachRegister} />
    </div>
  );
}

export default App;
