import React from "react";
import { Label } from "reactstrap";

const InputLabel = props => {

    return (
        <div>
            <Label 
                className="label"
            >
                {props.labelText}
            </Label>
        </div>
    );
}

export default InputLabel;