import './App.css';
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import Login from '../Login/Login';
import { useEffect, useState } from 'react';
import * as Auth from '../../api/Auth';
import { CircularProgress } from '@material-ui/core';


function requiresAuth(comp, isLoggedIn) {
  return isLoggedIn ? comp : <Redirect to="/login" />
}

function App() {
  const [auth, setAuth] = useState({ isBusy: true, isLoggedIn: false });

  useEffect(() => {
    Auth.isUserLoggedIn().then(val => {
      setAuth({ isBusy: false, isLoggedIn: val });
    });
  }, []);

  if (auth.isBusy) {
    return <CircularProgress />;
  }

  return (
    <Switch>
      <Route path="/login">
        {
          auth.isLoggedIn ?
            <Redirect to="" /> :
            <Login onLoginClick={(username, password) => {
              Auth
                .login(username, password)
                .then(isLoggedIn => setAuth({ isBusy: false, isLoggedIn }))
            }} />
        }
      </Route>
      <Route>
        {requiresAuth(<div>Hello World</div>, auth.isLoggedIn)}
      </Route>
    </Switch>
  );
}

export default App;
