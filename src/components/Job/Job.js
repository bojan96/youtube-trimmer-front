import { Container, TextField } from "@material-ui/core";
import { useState } from 'react';
import LoadingButton from '../LoadingButton/LoadingButton';
import * as JobApi from '../../api/Job';
import styles from './Job.module.css'
import { useHistory } from "react-router-dom";


export default function Job(props) {

    const [videoUrl, setVideoUrl] = useState("");
    const [trimFrom, setTrimFrom] = useState(0);
    const [trimTo, setTrimTo] = useState(0);
    const [isBusy, setIsBusy] = useState(false);
    const history = useHistory();

    return (
        <Container maxWidth="xs" {...props}>
            <form onSubmit={ev => {
                ev.preventDefault();
                setIsBusy(true);
                JobApi.createJob({ trimFrom, trimTo, videoUrl })
                    .then(() => {
                        setIsBusy(false);
                        history.push("/job");
                    });

            }}>
                <TextField
                    value={videoUrl}
                    onChange={ev => setVideoUrl(ev.target.value)}
                    required
                    fullWidth
                    label="Youtube URL" />
                <Container
                    disableGutters={true}
                    className={styles.time_container}>
                    <TextField
                        inputProps={{ min: 0 }}
                        value={trimFrom}
                        onChange={ev => setTrimFrom(ev.target.value)}
                        label="From"
                        required
                        type="number" />
                    <TextField
                        inputProps={{ min: 0 }}
                        value={trimTo}
                        onChange={ev => setTrimTo(ev.target.value)}
                        label="To"
                        required
                        type="number" />
                </Container>
                <LoadingButton
                    spinnerProps={{
                        size: 25,
                        className: "loading_button_spinner"
                    }}
                    isBusy={isBusy}
                    disabled={isBusy}
                    className={styles.submit_button}
                    color="primary"
                    variant="contained"
                    type="submit"
                    fullWidth>Submit</LoadingButton>
            </form>
        </Container>
    );
}