import React from 'react';

const PageLogo = ({ stackSize }) => {

    return (
        <div className="page-logo">
            <div className={`fa-stack fa-${stackSize}x`}>
                <div>
                    <i className="fas fa-film fa-stack-2x" />
                    <i className="fas fa-brain fa-stack-1x" />
                </div>
            </div>
        </div>
    );
}

export default PageLogo;