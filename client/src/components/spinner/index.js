import React from 'react';
import './spinner.css';

export const Spinner = ({ altMsg }) => {

    return (
        <h4>
            <span className="fa-stack fa-1x d-inline-block align-top">
                <span>
                    <i className="fas fa-film fa-stack-2x" />
                    <i className="fas fa-brain fa-stack-1x fa-spin" style={{ color: "lightpink" }} />
                </span>
            </span>
            <span className="spinnerSpan">{altMsg}</span>
        </h4>
    );
};