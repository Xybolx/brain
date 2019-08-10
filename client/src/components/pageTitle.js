import React from 'react';

const PageTitle = props => {

    return (
        <h3><span>{props.icon}</span>{props.heading}</h3>
    );
}

export default PageTitle;