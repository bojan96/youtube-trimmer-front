import styles from './Login.module.css';
import { useState } from 'react';
import { Container, TextField, Button, CircularProgress } from '@material-ui/core';
import LoadingButton from '../LoadingButton/LoadingButton';

function Login({onLoginClick = () => {}, isBusy, className}) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <Container className={className} maxWidth="xs">
            <form>
                <TextField label="Username" value={username} onChange={ev => setUsername(ev.target.value)} required fullWidth />
                <TextField label="Password" value={password} onChange={ev => setPassword(ev.target.value)} required fullWidth />
                <LoadingButton disabled={isBusy} isBusy={isBusy} onClick={() => onLoginClick(username, password)} variant="contained" color="primary" 
                fullWidth className={styles.login_button} spinnerProps={{className: styles.spinner}}>
                    Login
                </LoadingButton>
            </form>
        </Container>
    );
}

export default Login;
