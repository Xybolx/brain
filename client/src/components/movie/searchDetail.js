import React, { useState } from 'react';
import { Collapse } from 'reactstrap';
import Btn from '../button/btn';

const SearchDetail = ({ title, src, released, director, plot, onClick }) => {

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
                    <Btn onClick={toggle} color="dark" size="sm" icon={<i className="fas fa-info" />} name={isOpen ? "Close" : "Details"}></Btn>
                    <Btn onClick={onClick} color="dark" size="sm" icon={<i className="fas fa-film" />} name="Save"></Btn>
                </div>
                <div className="movieTitleDiv">
                    <strong className="movieTitle"><span className="movieTitleSpan">{title}</span></strong>
                </div>
                <div>
                    <Collapse isOpen={isOpen}>
                        <h6 className="releasedTitle">Released<p className="released">{released}</p></h6>
                        <h6 className="directorTitle">Director(s)<p className="director">{director}</p></h6>
                        <h6 className="plotTitle">Plot<p className="plot">{plot}</p></h6>
                    </Collapse>
                </div>
                <img alt={title} className="img-fluid" src={src} style={isOpen ? { display: "none", margin: "0 auto" } : { display: "block", margin: "0 auto" }} />
            </div>
        </div>
    );
}

export default SearchDetail;