import React from 'react';
import { Button } from 'reactstrap';

const Btn = ({ color, size, onClick, disabled, icon, name }) => {

    return (
        <Button
            color={color}
            size={size}
            onClick={onClick}
            disabled={disabled}
        >
            <span
                style={{ marginLeft: 2 }}
            >
                {icon} {name}
            </span>
        </Button>
    );
}

export default Btn;