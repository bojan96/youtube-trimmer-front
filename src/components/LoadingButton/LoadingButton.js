import { Button, CircularProgress } from "@material-ui/core";

function LoadingButton({isBusy, spinnerProps, children, ...rest}) {

    return (
        <Button {...rest}>
            {isBusy ? <CircularProgress {...spinnerProps}/> : children}
        </Button>
    );
}

export default LoadingButton;