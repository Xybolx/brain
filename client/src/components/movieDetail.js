import React, { useState, useMemo } from 'react';
import { Collapse, Button } from 'reactstrap';
import MovieStats from './movieStats';
import API from '../utils/API';

const MovieDetail = props => {

  // State
  const [messages, setMessages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDetails, setIsOpenDetails] = useState(false);

  // Memo
  useMemo(() => ({ messages, setMessages }), [messages, setMessages]);

  // Amazon URL 
  const BASE_URL = "https://www.amazon.com/s?k=";
  const END_URL = "&ref=nb_sb_noss_2";

  // Load messages function
  const getMessages = () => {
    API.getMessages()
      .then(res => setMessages(res.data))
      .catch(err => console.log(err))
  };

  // Toggle collapse functions
  const toggle = () => {
    setIsOpen(!isOpen);
    getMessages();
  };

  const toggleDetails = () => {
    setIsOpenDetails(!isOpenDetails);
  };

  return (
    <div className="moviesDiv text-center">
      <div>
        <Button onClick={toggle} color="link"><i className="fas fa-poll-h" /><span style={{ marginLeft: 2 }}>{isOpen ? "Close" : "Stats"}</span></Button>
        <Button onClick={toggleDetails} color="link"><i className="fas fa-info" /><span style={{ marginLeft: 2 }}>{isOpenDetails ? "Close" : "Details"}</span></Button>
        <Button onClick={props.onClick} color="link"><i className="fas fa-film" /><span style={{ marginLeft: 2 }}>Review</span></Button>
      </div>
      <div className="movieTitleDiv">
        <strong className="movieTitle"><span className="movieTitleSpan">{props.title}</span></strong>
      </div>
      <div>
        <Collapse isOpen={isOpenDetails}>
          <h6 className="releasedTitle">Released<p className="released">{props.released}</p></h6>
          <h6 className="directorTitle">Director(s)<p className="director">{props.director}</p></h6>
          <h6 className="plotTitle">Plot<p className="plot">{props.plot}</p></h6>
          <h6 className="genreTitle">Genre<p className="genre">{props.genre}</p></h6>
          <h6 className="amazonTitle"><i className="fab fa-amazon" />mazon <p><span className="amazon"><a href={BASE_URL + props.title + END_URL} rel="noopener noreferrer" target="_blank"><i className="far fa-eye" /> View</a></span></p></h6>
        </Collapse>
      </div>
      <Collapse isOpen={isOpen}>
        <strong className="movieStrong">
          <MovieStats title={props.title} messages={messages} />
        </strong>
      </Collapse>
      <img alt={props.title} className="img-fluid" src={props.src} style={isOpen ? { display: "none", margin: "0 auto" } : isOpenDetails ? { display: "none", margin: "0 auto" } : { display: "block", margin: "0 auto" }} />
      <div className="movieTitleDiv" style={isOpenDetails ? { display: "none" } : { display: "block" }}>
        <strong className="movieTitle"><span className="movieTitleSpan"><i className="fas fa-star" /> Now Showing <i className="fas fa-star" /></span></strong>
      </div>
    </div>
  );
}

export default MovieDetail;
