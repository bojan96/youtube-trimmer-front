import styles from './App.module.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from '../Login/Login';
import { useEffect, useState } from 'react';
import * as AuthApi from '../../api/Auth';
import { CircularProgress, Backdrop, Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import Main from '../Main/Main';


function requiresAuth(comp, isLoggedIn) {
  return isLoggedIn ? comp : <Redirect to="/login" />
}

function App() {
  const [auth, setAuth] = useState({ isBusy: true, isLoggedIn: false });
  const [loginBusy, setLoginBusy] = useState(false);
  const [invalidCredentialsOpen, setInvalidCredentialsOpen] = useState(false);


  function notLoggedInCompGroup() {
    return (
      <>
        <Snackbar
          autoHideDuration={5000}
          onClose={() => setInvalidCredentialsOpen(false)}
          open={invalidCredentialsOpen}
          anchorOrigin={{ horizontal: "center", vertical: "top" }}>
          <Alert severity="error" variant="filled">
            Invalid credentials
          </Alert>
        </Snackbar>
        <Login className={styles.login} isBusy={loginBusy} onLoginClick={(username, password) => {
          setLoginBusy(true);
          AuthApi
            .login(username, password)
            .then(isLoggedIn => {
              setLoginBusy(false);
              if (!isLoggedIn) {
                setInvalidCredentialsOpen(true);
              }
              setAuth({ isBusy: false, isLoggedIn })
            });
        }} />
      </>);
  }

  useEffect(() => {
    AuthApi.isUserLoggedIn().then(val => {
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
            <Redirect to="/job/create" /> : notLoggedInCompGroup()
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
