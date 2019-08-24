import React from 'react';

const PageLogo = ({ stackSize }) => {

    return (
        <span className={`fa-stack fa-${stackSize}x d-inline-block align-top`}>
            <span>
                <i className="fas fa-film fa-stack-2x" />
                <i className="fas fa-brain fa-stack-1x" />
            </span>
        </span>
    );
}

export default PageLogo;