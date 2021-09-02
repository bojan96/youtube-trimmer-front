import styles from './Login.module.css';
import { useState } from 'react';
import { Container, TextField } from '@material-ui/core';
import LoadingButton from '../LoadingButton/LoadingButton';

function Login({ onLoginClick = () => { }, isBusy, className }) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <Container className={className} maxWidth="xs">
            <form onSubmit={ev => {
                ev.preventDefault();
                onLoginClick(username, password);
            }}>
                <TextField label="Username" value={username} onChange={ev => setUsername(ev.target.value)} required fullWidth />
                <TextField label="Password" value={password} onChange={ev => setPassword(ev.target.value)} required fullWidth />
                <LoadingButton type="submit" disabled={isBusy} isBusy={isBusy} variant="contained" color="primary"
                    fullWidth className={styles.login_button} spinnerProps={{ size: 25, className: styles.spinner }}>
                    Login
                </LoadingButton>
            </form>
        </Container>
    );
}

export default Login;
