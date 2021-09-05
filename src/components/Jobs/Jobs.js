import { Backdrop, CircularProgress, Container, Typography, } from "@material-ui/core";
import JobCard from '../JobCard/JobCard'
import { useEffect, useState } from "react";
import styles from './Jobs.module.css';
import * as JobApi from "../../api/Job";
import ConfirmDialog from "../ConfirmDialog/ConfirmDialog";
import { useRef } from "react";

export default function Jobs({ className = "", ...rest }) {

    const [userJobs, setUserJobs] = useState([]);
    const [loadingJobs, setLoadingJobs] = useState(true);
    const [dialog, setDialog] = useState({ isOpen: false, data: { id: null } });
    const [isCanceling, setIsCanceling] = useState(false);
    const [retrieveJobs, setRetrieveJobs] = useState(false);
    const subscription = useRef(null);

    useEffect(() => {
        setLoadingJobs(true);
        JobApi.getJobs().then(jobs => {
            setUserJobs(jobs);
            setLoadingJobs(false);
        });
    }, [retrieveJobs]);

    useEffect(() => {
        subscription.current = JobApi.subscribeJobEvents((jobEvent) => {

            setUserJobs(userJobs => {
                const userJobsCopy = Array.from(userJobs);
                const jobIndex = userJobsCopy.findIndex(job => job.id === jobEvent.id);
                if (jobIndex !== -1) {
                    const job = userJobsCopy[jobIndex];
                    const jobCopy = { ...job }
                    jobCopy.status = jobEvent.newStatus;
                    userJobsCopy[jobIndex] = jobCopy;
                    return userJobsCopy;
                }
                else {
                    return userJobs;
                }
            });
        });
        return () => {
            subscription.current.unsubscribe();
        }
    }, []);


    function renderBody()
    {
        return userJobs.length > 0 ?
                        userJobs.map(job =>
                            <JobCard
                                onCancelClick={id => {
                                    setDialog({ isOpen: true, data: { id } });
                                }}
                                job={job}
                                className={styles.job_card}
                                key={job.id} />)
                        : <Typography className={styles.no_jobs_text} variant="h4">No jobs</Typography>
    }

    return (
        <>
            <ConfirmDialog
                isBusy={isCanceling}
                open={dialog.isOpen}
                title="Are you sure you want to cancel the job"
                text="Are you sure you want to cancel the job"
                onClose={(data, reason) => {
                    if (reason === "confirm") {
                        setIsCanceling(true);
                        JobApi.cancelJob(dialog.data.id)
                            .then(() => {
                                setIsCanceling(false);
                                setDialog({ isOpen: false });
                                setRetrieveJobs(oldVal => !oldVal);
                            });
                    }
                    else {
                        setDialog({ isOpen: false });
                    }
                }}
                confirmBttnText="Yes"
                rejectBttnText="No" />

            <Backdrop className={styles.backdrop} open={loadingJobs}>
                <CircularProgress className={styles.backdrop_progress}/>
            </Backdrop>
            <Container className={`${className} ${styles.jobs_container}`} {...rest}>
                { !loadingJobs ? renderBody() : null }
            </Container>
        </>
    );
}