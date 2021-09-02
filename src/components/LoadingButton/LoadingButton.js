import { Button, CircularProgress } from "@material-ui/core";

function LoadingButton({isBusy, spinnerProps, children, ...rest}) {

    return (
        <Button {...rest}>
            {children}
            {isBusy ? <CircularProgress {...spinnerProps}/> : null}
        </Button>
    );
}

export default LoadingButton;