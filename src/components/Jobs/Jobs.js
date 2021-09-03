import { Container, Typography, } from "@material-ui/core";
import JobCard from '../JobCard/JobCard'
import { useEffect, useState } from "react";
import styles from './Jobs.module.css';
import * as JobApi from "../../api/Job";
import ConfirmDialog from "../ConfirmDialog/ConfirmDialog";

export default function Jobs({ className = "", ...rest }) {

    const [userJobs, setUserJobs] = useState([]);
    const [dialog, setDialog] = useState({ isOpen: false, data: { id: null } });
    const [isCanceling, setIsCanceling] = useState(false);
    const [retrieveJobs, setRetrieveJobs] = useState(false);

    useEffect(() => {
        JobApi.getJobs().then(jobs => {
            setUserJobs(jobs);
        });
    }, [retrieveJobs]);

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
            <Container className={`${className} ${styles.jobs_container}`} {...rest}>
                {
                    userJobs.length > 0 ?
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
            </Container>
        </>
    );
}