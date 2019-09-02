import React from 'react';
import { Collapse, Modal, ModalBody } from 'reactstrap';
import Btn from '../button/btn';
import MovieStats from './movieStats';
import useBoolean from '../useBoolean';
import "./movieDetail.css";

const MovieDetail = ({ title, src, released, director, plot, onClick, messages }) => {

  // Amazon URL 
  const BASE_URL = "https://www.amazon.com/s?k=";
  const END_URL = "&ref=nb_sb_noss_2";

  // youtube URL
  const TRAILER_URL = "https://www.youtube.com/results?search_query=";

  // Toggle collapse functions
  const [isOpenStats, toggleStats] = useBoolean(false);
  const [isOpenDetails, toggleDetails] = useBoolean(false);

  return (
    <div className="moviesDiv">
      <div className="insideMovies text-center">
        <div>
          <Btn
            onClick={toggleStats}
            color="dark" size="sm"
            icon={<i className="fas fa-poll-h" />}
            name="Stats"
          />
          <Btn
            onClick={toggleDetails}
            color="dark"
            size="sm"
            icon={<i className="fas fa-info" />}
            name={
              isOpenDetails
                ? "Close"
                : "Details"}
          />
          <Btn
            onClick={onClick}
            color="dark"
            size="sm"
            icon={<i className="fas fa-film" />}
            name="Review"
          />
        </div>
        <div className="movieTitleDiv">
          <strong className="movieTitle">
            <span className="movieTitleSpan">
              {title}
            </span>
          </strong>
        </div>
        <Collapse className="details" isOpen={isOpenDetails}>
          <h6 className="amazonTitle">
            Amazon
            <p className="amazon">
              <a
                href={BASE_URL + title + " movie " + END_URL}
                rel="noopener noreferrer"
                target="_blank"
              >
                <i className="fab fa-amazon" /> View
                </a>
            </p>
          </h6>
          <h6 className="trailerTitle">
            Trailer
            <p className="trailer">
              <a
                href={TRAILER_URL + title + "trailer"}
                rel="noopener noreferrer"
                target="_blank"
              >
                <i className="fab fa-youtube" /> View
                </a>
            </p>
          </h6>
          <h6 className="releasedTitle">
            Released
            <p className="released">
              {released}
            </p>
          </h6>
          <h6 className="directorTitle">
            Director(s)
            <p className="director">
              {director}
            </p>
          </h6>
          <h6 className="plotTitle">
            Plot
            <p className="plot">
              {plot}
            </p>
          </h6>
        </Collapse>
        <Modal isOpen={isOpenStats} centered>
          <ModalBody>
              <MovieStats
                title={title}
                messages={messages}
              />
            <div className="closeDiv">
              <Btn
                color="dark"
                size="md"
                onClick={toggleStats}
                icon={<i className="fas fa-window-close" />}
                name="Close"
              />
            </div>
          </ModalBody>
        </Modal>
        <img
          alt={title}
          className="img-fluid"
          src={src}
          style={
            isOpenDetails
              ? { display: "none" }
              : { display: "block", margin: "0 auto" }}
        />
      </div>
    </div>
  );
}

export default MovieDetail;
