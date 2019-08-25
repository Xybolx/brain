import React from 'react';
import './title.css';

const Title = ({ header }) => {
  return (
    <div className="titleDiv">
      <h4 id="titleHeader">
        <span className="fa-stack d-inline-block align-top">
          <span>
            <i className="fas fa-film fa-stack-2x" />
            <i className="fas fa-brain fa-stack-1x" />
          </span>
        </span>
        <span className="titleSpan">{header}</span>
        <span className="fa-stack d-inline-block align-top">
          <span>
            <i className="fas fa-film fa-stack-2x" />
            <i className="fas fa-brain fa-stack-1x" />
          </span>
        </span>
      </h4>
    </div>
  );
}

export default Title;