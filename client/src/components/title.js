import React from 'react';

const Title = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <h2 id="titleHeader">
        <span className="fa-stack fa-1x d-inline-block align-top">
          <span>
            <i className="fas fa-film fa-stack-2x"></i>
            <i className="fas fa-brain fa-stack-1x" style={{ color: "lightpink" }}></i>
          </span>
        </span>
        <span id="titleSpan">FilmBrains</span>
        <span className="fa-stack fa-1x d-inline-block align-top">
          <span>
            <i className="fas fa-film fa-stack-2x"></i>
            <i className="fas fa-brain fa-stack-1x" style={{ color: "lightpink" }}></i>
          </span>
        </span>
      </h2>
    </div>
  );
}

export default Title;