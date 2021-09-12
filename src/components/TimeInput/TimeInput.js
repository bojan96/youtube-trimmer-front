import { TextField } from "@material-ui/core";
import InputMask from 'inputmask';
import { useEffect, useRef } from "react";


InputMask.extendDefinitions({
    "5": {
        validator: "[0-5]"
    }
});

export default function TimeInput(props) {

    const inputRef = useRef(null);

    useEffect(() => {
        InputMask({mask: "99:59:59", placeholder: "_", insertMode: false, insertModeVisual: false}).mask(inputRef.current);
    });

    return (
        <TextField {...props}
            inputRef={inputRef}
            inputProps={{
                "data-useinputmask": true
            }}/>
    );
}