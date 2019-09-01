import React from 'react';

const ProgLogo = ({ color, className1, className2, header }) => {

    return (
        <h6 className="progDiv text-left">
            <span className="fa-stack">
                <span>
                    <i style={{color: `${color}`}} className={`${className1} fa-stack-1x`} />
                    <i className={`${className2} fa-stack-1x`} />
                </span>
            </span>
            {header}
        </h6>
    );
}

export default ProgLogo;