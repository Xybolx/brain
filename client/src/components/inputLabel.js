import React from "react";
import { Label } from "reactstrap";

const InputLabel = ({ labelText }) => {

    return (
        <div>
            <Label 
                className="label"
            >
                {labelText}
            </Label>
        </div>
    );
}

export default InputLabel;