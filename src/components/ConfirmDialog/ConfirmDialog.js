import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";


export default function ConfirmDialog({ title, text, confirmBttnText, rejectBttnText, onClose, isBusy, ...rest }) {
    return (
        <Dialog onClose={(data, reason) => {
            if(isBusy)
            {
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
                <Button disabled={isBusy} onClick={() => onClose(null, "confirm")} variant="contained" color="primary">
                    {
                        confirmBttnText
                    }
                    {isBusy ? <CircularProgress size={20} className="loading_button_spinner"/> : null} </Button>
            </DialogActions>
        </Dialog>);
}