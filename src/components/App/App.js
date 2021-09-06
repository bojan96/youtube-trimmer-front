import styles from './App.module.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from '../Login/Login';
import { useEffect, useState } from 'react';
import * as Auth from '../../api/Auth';
import { CircularProgress, Backdrop } from '@material-ui/core';
import Main from '../Main/Main';


function requiresAuth(comp, isLoggedIn) {
  return isLoggedIn ? comp : <Redirect to="/login" />
}

function App() {
  const [auth, setAuth] = useState({ isBusy: true, isLoggedIn: false });
  const [loginBusy, setLoginBusy] = useState(false);

  useEffect(() => {
    Auth.isUserLoggedIn().then(val => {
      setAuth({ isBusy: false, isLoggedIn: val });
    });
  }, []);

  if (auth.isBusy) {
    return (
      <Backdrop open={auth.isBusy}>
        <CircularProgress />
      </Backdrop>);
  }

  return (
    <Switch>
      <Route path="/login">
        {
          auth.isLoggedIn ?
            <Redirect to="/job/create" /> :
            <Login className={styles.login} isBusy={loginBusy} onLoginClick={(username, password) => {
              setLoginBusy(true);
              Auth
                .login(username, password)
                .then(isLoggedIn => {
                  setLoginBusy(false);
                  setAuth({ isBusy: false, isLoggedIn })
                });
            }} />
        }
      </Route>
      <Route path="/job">
        {requiresAuth(<Main onLogout={() => setAuth({ isLoggedIn: false })} />, auth.isLoggedIn)}
      </Route>
      <Route>
        {requiresAuth(<Redirect to="/job/create" />, auth.isLoggedIn)}
      </Route>
    </Switch>
  );
}

export default App;
