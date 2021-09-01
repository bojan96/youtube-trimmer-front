import { Button, CircularProgress } from "@material-ui/core";

function LoadingButton({isBusy, spinnerProps, ...rest}) {

    return (
        <Button {...rest}>
            Login
            {isBusy ? <CircularProgress {...spinnerProps}/> : null}
        </Button>
    );
}

export default LoadingButton;