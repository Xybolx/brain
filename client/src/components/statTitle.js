import React from 'react';

const StatTitle = ({ icon, header, badge }) => {

    return (
        <h6 className="statTitle">{icon} {header} {badge}</h6>
    );
}

export default StatTitle;