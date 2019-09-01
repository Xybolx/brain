import React from 'react';

const StatTitle = ({ icon, header, badge, button }) => {

    return (
        <div className="text-center">
            <h6 className="statTitle"> {icon} {header} {badge}<span>{button}</span></h6>
        </div>
    );
}

export default StatTitle;