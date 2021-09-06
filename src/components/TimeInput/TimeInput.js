import { TextField } from "@material-ui/core";
import InputMask from 'inputmask';
import { useEffect } from "react";


InputMask.extendDefinitions({
    "5": {
        validator: "[0-5]"
    }
});

export default function TimeInput(props) {

    useEffect(() => {
        InputMask().mask(document.querySelectorAll("input[data-useinputmask]"));
    });

    return (
        <TextField {...props}
            inputProps={{
                "data-useinputmask": true,
                "data-inputmask-mask": "99:59:59"
            }}/>
    );
}