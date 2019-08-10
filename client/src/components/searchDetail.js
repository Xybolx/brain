import React, { useState, useMemo } from 'react';
import { Collapse, Button } from 'reactstrap';

const SearchDetail = props => {

  // State
  const [isOpen, setIsOpen] = useState(false);

  // Toggle collapse functions
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="searchDiv text-center">
      <div>
        <Button onClick={toggle} color="link"><i className="fas fa-info" /><span style={{ marginLeft: 2 }}>{isOpen ? "Close" : "Details"}</span></Button>
        <Button onClick={props.onClick} color="link"><i className="fas fa-film" /><span style={{ marginLeft: 2 }}>Save</span></Button>
      </div>
      <div className="movieTitleDiv">
        <strong className="movieTitle"><span className="movieTitleSpan"><i className="fas fa-star" /> Now Showing <i className="fas fa-star" /></span></strong>
      </div>
      <div>
        <Collapse isOpen={isOpen}>
          <h6>Released<p className="text-muted">{props.released}</p></h6>
          <h6>Director(s)<p className="text-muted">{props.director}</p></h6>
          <h6>Plot<p className="plot text-muted">{props.plot}</p></h6>
          <h6>Genre<p className="text-muted">{props.genre}</p></h6>
        </Collapse>
      </div>
      <img alt={props.title} className="img-fluid" src={props.src} style={isOpen ? { display: "none", margin: "0 auto" } : { display: "block", margin: "0 auto" }} />
      <div className="movieTitleDiv" style={isOpen ? { display: "none", margin: "0 auto" } : { display: "block", margin: "0 auto" }}>
        <strong className="movieTitle"><span className="movieTitleSpan">{props.title}</span></strong>
      </div>
    </div>
  );
}

export default SearchDetail;