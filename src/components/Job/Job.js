import { Container, TextField } from "@material-ui/core";
import { useState } from 'react';
import LoadingButton from '../LoadingButton/LoadingButton';
import * as JobApi from '../../api/Job';
import styles from './Job.module.css'
import { useHistory } from "react-router-dom";
import TimeInput from "../TimeInput/TimeInput";


function validateUrl(url) {
    try {
        const urlObj = new URL(url);
        const hostnameRegex = /^(www.)?youtube\.com$/;
        return hostnameRegex.test(urlObj.hostname)
            && urlObj.pathname === "/watch"
            && urlObj.searchParams.get("v") != null;
    }
    catch (e) {
        return false;
    }
}


function parseTime(time) {
    const parts = time.split(":");
    const hour = parseInt(parts[0]);
    const min = parseInt(parts[1]);
    const seconds = parseInt(parts[2]);

    return hour * 3600 + min * 60 + seconds;
}

export default function Job(props) {

    const timeRegex = /[0-9]{2}:[0-5][0-9]:[0-5][0-9]/
    const [videoUrl, setVideoUrl] = useState("");
    const [trimFrom, setTrimFrom] = useState("");
    const [trimTo, setTrimTo] = useState("");
    const [trimFromValidation, setTrimFromValidation] = useState(null);
    const [trimToValidation, setTrimToValidation] = useState(null);
    const [videoUrlValidation, setVideoUrlValidation] = useState(null);
    const [isBusy, setIsBusy] = useState(false);
    const history = useHistory();

    return (
        <Container maxWidth="xs" {...props}>
            <form onSubmit={ev => {
                ev.preventDefault();
                let formInvalid = false;

                if (trimFrom === "") {
                    setTrimFromValidation("Required");
                    formInvalid = true;
                }
                else if (!timeRegex.test(trimFrom)) {
                    setTrimFromValidation("Invalid time value");
                    formInvalid = true;
                }

                if (trimTo === "") {
                    setTrimToValidation("Required");
                    formInvalid = true;
                }
                else if (!timeRegex.test(trimTo)) {
                    setTrimToValidation("Invalid time value");
                    formInvalid = true;
                }
                else if(parseTime(trimFrom) >= parseTime(trimTo))
                {
                    setTrimToValidation("Must be greater than start time point");
                    formInvalid = true;
                }

                if (videoUrl === "") {
                    setVideoUrlValidation("Required");
                    formInvalid = true;
                }
                else if (!validateUrl(videoUrl)) {
                    setVideoUrlValidation("Invalid url")
                    formInvalid = true;
                }

                if (formInvalid) {
                    return;
                }
                setIsBusy(true);
                JobApi.createJob({ trimFrom: parseTime(trimFrom), trimTo: parseTime(trimTo), videoUrl })
                    .then(() => {
                        setIsBusy(false);
                        history.push("/job");
                    });

            }}>
                <TextField
                    value={videoUrl}
                    onChange={ev => {
                        setVideoUrlValidation(null);
                        setVideoUrl(ev.target.value);
                    }}
                    fullWidth
                    label="Youtube URL"
                    error={videoUrlValidation != null}
                    helperText={videoUrlValidation} />
                <Container
                    disableGutters={true}
                    className={styles.time_container}>
                    <TimeInput
                        value={trimFrom}
                        onChange={ev => {
                            setTrimFromValidation(null);
                            setTrimFrom(ev.target.value)
                        }}
                        label="From"
                        error={trimFromValidation != null}
                        helperText={trimFromValidation} />
                    <TimeInput
                        value={trimTo}
                        onChange={ev => {
                            setTrimToValidation(null);
                            setTrimTo(ev.target.value)
                        }}
                        label="To"
                        error={trimToValidation != null}
                        helperText={trimToValidation} />
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