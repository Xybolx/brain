import React from 'react';
import { Button } from 'reactstrap';

const Btn = ({ color, size, onClick, disabled, icon, name }) => {

    const BtnStyle = {
        marginLeft: 2
    };

    return (
        <Button
            color={color}
            size={size}
            onClick={onClick}
            disabled={disabled}
        >
            <span
                style={BtnStyle}
            >
                {icon} {name}
            </span>
        </Button>
    );
}

export default Btn;