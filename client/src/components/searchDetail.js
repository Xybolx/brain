import React, { useState } from 'react';
import { Collapse, Button } from 'reactstrap';

const SearchDetail = ({ title, src, released, director, plot, genre, onClick }) => {

    // State
    const [isOpen, setIsOpen] = useState(false);

    // Toggle collapse functions
    const toggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="searchDiv text-center">
            <div className="insideSearch text-center">
                <div>
                    <Button onClick={toggle} color="link"><i className="fas fa-info" /><span style={{ marginLeft: 2 }}>{isOpen ? "Close" : "Details"}</span></Button>
                    <Button onClick={onClick} color="link"><i className="fas fa-film" /><span style={{ marginLeft: 2 }}>Save</span></Button>
                </div>
                <div className="movieTitleDiv">
                    <strong className="movieTitle"><span className="movieTitleSpan"><i className="fas fa-star" /> Now Showing <i className="fas fa-star" /></span></strong>
                </div>
                <div>
                    <Collapse isOpen={isOpen}>
                        <h6>Released<p className="text-muted">{released}</p></h6>
                        <h6>Director(s)<p className="text-muted">{director}</p></h6>
                        <h6>Plot<p className="plot text-muted">{plot}</p></h6>
                        <h6>Genre<p className="text-muted">{genre}</p></h6>
                    </Collapse>
                </div>
                <img alt={title} className="img-fluid" src={src} style={isOpen ? { display: "none", margin: "0 auto" } : { display: "block", margin: "0 auto" }} />
                <div className="movieTitleDiv" style={isOpen ? { display: "none", margin: "0 auto" } : { display: "block", margin: "0 auto" }}>
                    <strong className="movieTitle"><span className="movieTitleSpan">{title}</span></strong>
                </div>
            </div>
        </div>
    );
}

export default SearchDetail;