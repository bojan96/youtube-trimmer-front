import { Card, CardActions, CardContent, CardHeader, CircularProgress, IconButton, Link, Tooltip, Typography } from "@material-ui/core";
import CancelIcon from '@material-ui/icons/Cancel';
import GetAppIcon from '@material-ui/icons/GetApp';
import styles from './JobCard.module.css';


function formatTime(sec) {
    const hours = Math.trunc(sec / 3600);
    const leftoverMin = sec % 3600;
    const minutes = Math.trunc(leftoverMin / 60);
    const seconds = leftoverMin % 60;

    const hoursStr = hours.toLocaleString("en", { minimumIntegerDigits: 2, useGrouping: false });
    const minutesStr = minutes.toLocaleString("en", { minimumIntegerDigits: 2, useGrouping: false });
    const secondsStr = seconds.toLocaleString("en", { minimumIntegerDigits: 2, useGrouping: false });

    return `${hours > 0 ? hoursStr + ":" : ""}${minutesStr}:${secondsStr}`;
}
const statusMap = {
    waiting_trim: "Waiting for trim",
    waiting_download: "Waiting for download",
    downloading: "Downloading video",
    trimming: "Trimming video",
    complete: "Trim complete"
}
export default function Jobs({ job, onCancelClick = () => { }, className = "", ...rest }) {

    return (
        <Card variant="outlined" className={`${styles.job_card} ${className}`}>
            <CardHeader title="Video Title"
                subheader={
                    <Link target="_blank" href={job.videoUrl}>Open video</Link>
                } action={
                    <Tooltip title="Cancel">
                        <span>
                            <IconButton
                                disabled={job.status === "complete"}
                                onClick={() => onCancelClick(job.id)}
                                size="small">
                                <CancelIcon />
                            </IconButton>
                        </span>
                    </Tooltip>}>
            </CardHeader>
            <CardContent>
                <div className={styles.job_card_times_container}>
                    <Typography>Start: {formatTime(job.trimFrom)}</Typography>
                    <Typography>End: {formatTime(job.trimTo)}</Typography>
                </div>
                <Typography>Job status: {statusMap[job.status]}</Typography>
            </CardContent>
            <CardActions>
                {
                    job.status === "complete" ?
                        <Tooltip title="Download">
                            <IconButton
                                className={styles.progress}
                                onClick={() => window.open(job.downloadUrl, "_blank")}>
                                <GetAppIcon />
                            </IconButton>
                        </Tooltip>
                        : <CircularProgress className={styles.job_download_button} />
                }
            </CardActions>
        </Card>
    );
}