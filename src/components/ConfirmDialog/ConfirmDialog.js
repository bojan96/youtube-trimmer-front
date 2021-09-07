import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";
import LoadingButton from "../LoadingButton/LoadingButton";


export default function ConfirmDialog({ title, text, confirmBttnText, rejectBttnText, onClose, isBusy, ...rest }) {
    return (
        <Dialog onClose={(data, reason) => {
            if (isBusy) {
                return;
            }
            onClose(data, reason);
        }} {...rest}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{text}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button disabled={isBusy} onClick={() => onClose(null, "reject")} variant="contained" color="secondary">{rejectBttnText}</Button>

                <LoadingButton
                    disabled={isBusy}
                    onClick={() => onClose(null, "confirm")}
                    variant="contained"
                    color="primary"
                    spinnerProps={{
                        size: 25,
                        className: "loading_button_spinner"
                    }}>
                    {
                        confirmBttnText
                    }
                </LoadingButton>
            </DialogActions>
        </Dialog>);
}