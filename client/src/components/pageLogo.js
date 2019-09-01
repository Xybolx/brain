import React from 'react';

const PageLogo = ({ stackSize, className }) => {

    return (
        <div className={className}>
        <span className={`fa-stack fa-${stackSize}x`}>
            <span>
                <i className="fas fa-film fa-stack-2x" />
                <i className="fas fa-brain fa-stack-1x" />
            </span>
        </span>
        </div>
    );
}

export default PageLogo;