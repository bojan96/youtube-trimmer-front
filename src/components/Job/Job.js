import { Button, Container, TextField } from "@material-ui/core";
import styles from './Job.module.css'


export default function Job(props) {

    return (
        <Container maxWidth="xs" {...props}>
            <form>
                <TextField required fullWidth label="Youtube URL"/>
                <Container disableGutters={true} className={styles.time_container}>
                    <TextField label="From" required type="number"/>
                    <TextField label="To" required type="number"/>
                </Container>
                <Button className={styles.submit_button} color="primary" variant="contained" type="submit" fullWidth>Submit</Button>
            </form>
        </Container>
    );
}