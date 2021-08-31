import './Login.css';
import { useState } from 'react';
import { Container, TextField, Button } from '@material-ui/core';

function Login({onLoginClick = () => {}}) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <Container className="login-form-container" maxWidth="xs">
            <form>
                <TextField label="Username" value={username} onChange={ev => setUsername(ev.target.value)} required fullWidth />
                <TextField label="Password" value={password} onChange={ev => setPassword(ev.target.value)} required fullWidth />
                <Button onClick={() => onLoginClick(username, password)} variant="contained" color="primary" fullWidth className="login-button">Login</Button>
            </form>
        </Container>
    );
}

export default Login;
