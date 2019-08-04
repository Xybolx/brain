import React, { useState, useEffect } from 'react';
import { Container, Col, Badge, Progress, Collapse, Button } from 'reactstrap';
import API from '../utils/API';

const MovieDetail = props => {

  // State
  const [messages, setMessages] = useState([]);
  const [movieMessages, setMovieMessages] = useState([]);
  const [scoreTotal, setScoreTotal] = useState('');
  const [neutralTotal, setNeutralTotal] = useState('');
  const [positiveTotal, setPositiveTotal] = useState('');
  const [negativeTotal, setNegativeTotal] = useState('');
  const [neutralAvg, setNeutralAvg] = useState('');
  const [positiveAvg, setPositiveAvg] = useState('');
  const [negativeAvg, setNegativeAvg] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  // Amazon URL 
  const BASE_URL = "https://www.amazon.com/s?k=";
  const END_URL = "&ref=nb_sb_noss_2";

  // Toggle function
  const toggle = () => {
    setIsOpen(!isOpen);
    API.getMessages()
      .then(res => setMessages(res.data))
      .catch(err => console.log(err))
  };

  // Get and set state
  useEffect(() => {
    API.getMessages()
      .then(res => setMessages(res.data))
      .catch(err => console.log(err))
  }, []);

  useEffect(() => {
    const comments = messages.filter(message => message.movie === props.title);
    setMovieMessages(comments);
  }, [messages, props.title])

  useEffect(() => {
    const getScoreTotal = () => {
      let sum = 0;
      movieMessages.map(movieMessage => {
        sum = sum += movieMessage.result;
        console.log(scoreTotal);
        return setScoreTotal(sum);
      });
    }
    getScoreTotal();
  }, [scoreTotal, movieMessages])

  useEffect(() => {
    const getNeutralTotal = () => {
      const neutralMessages = movieMessages.filter(movieMessage => movieMessage.result === 0);
      setNeutralTotal(neutralMessages.length);
    }
    getNeutralTotal();
  }, [neutralTotal, movieMessages])

  useEffect(() => {
    const getPositiveTotal = () => {
      const positiveMessages = movieMessages.filter(movieMessage => movieMessage.result > 0);
      setPositiveTotal(positiveMessages.length);
    }
    getPositiveTotal();
  }, [positiveTotal, movieMessages])

  useEffect(() => {
    const getNegativeTotal = () => {
      const negativeMessages = movieMessages.filter(movieMessage => movieMessage.result < 0);
      setNegativeTotal(negativeMessages.length);
    }
    getNegativeTotal();
  }, [negativeTotal, movieMessages])

  useEffect(() => {
    const getNeutralAvg = () => {
      const neutralAverage = Math.round(neutralTotal / movieMessages.length * 100);
      setNeutralAvg(neutralAverage);
      console.log('neutral %' + neutralAverage);
    }
    getNeutralAvg();
  }, [neutralAvg, neutralTotal, movieMessages])

  useEffect(() => {
    const getPositiveAvg = () => {
      const positiveAverage = Math.round(positiveTotal / movieMessages.length * 100);
      setPositiveAvg(positiveAverage);
      console.log('positive %' + positiveAverage);
    }
    getPositiveAvg();
  }, [positiveAvg, positiveTotal, movieMessages])

  useEffect(() => {
    const getNegativeAvg = () => {
      const negativeAverage = Math.round(negativeTotal / movieMessages.length * 100);
      setNegativeAvg(negativeAverage);
      console.log('negative %' + negativeAverage);
    }
    getNegativeAvg();
  }, [negativeAvg, negativeTotal, movieMessages])

  return (
    <Container className="text-center">
      <strong className="movieTitle">{props.title}<Button onClick={toggle} type="button" color="link"><i className="fas fa-poll-h" /><span style={{ marginLeft: 2 }}>{isOpen ? "Close" : "Stats"}</span></Button>
      <Collapse isOpen={isOpen}>
        <Col sm="12" md={{ size: 6, offset: 3 }}>
          <div style={{ textAlign: "center" }}>
            <h6>Directed by<p><span className="text-muted">{props.director}</span></p></h6>
            <h6>Genre<p><span className="text-muted">{props.genre}</span></p></h6>
            <h6>Released<p><span className="text-muted">{props.released}</span></p></h6>
          </div>
        </Col>
        <h6><i className="fab fa-amazon" />mazon <p><span className="text-muted"><a href={BASE_URL + props.title + END_URL} rel="noopener noreferrer" target="_blank"><i className="far fa-eye" /> View</a></span></p></h6>
        <h6 style={scoreTotal === 0 || null ? { display: 'block' } : { display: 'none' }}>Overall Rating: <Badge color="warning" pill>Neutral {scoreTotal}</Badge></h6>
        <h6 style={scoreTotal > 0 ? { display: 'block' } : { display: 'none' }}>Overall Rating: <Badge color="success" pill>Positive {scoreTotal}</Badge></h6>
        <h6 style={scoreTotal < 0 ? { display: 'block' } : { display: 'none' }}>Overall Rating: <Badge color="danger" pill>Negative {scoreTotal}</Badge></h6>
        Average
        <Progress
          color="success"
          value={positiveAvg}
          max={100}
        >
          {isNaN(positiveAvg) ? `Positive: No Data` : `Positive ${positiveAvg}%`}
          </Progress>
        <Progress
          color="warning"
          value={neutralAvg}
          max={100}
        >
          {isNaN(neutralAvg) ? `Neutral: No Data` : `Neutral ${neutralAvg}%`}
          </Progress>
        <Progress
          color="danger"
          value={negativeAvg}
          max={100}
        >
          {isNaN(negativeAvg) ? `Negative: No Data` : `Negative ${negativeAvg}%`}
          </Progress>
        Totals
        <Progress
          color="success"
          value={positiveTotal}
          max={movieMessages.length}
        >
          Positive {positiveTotal}
        </Progress>
        <Progress
          color="warning"
          value={neutralTotal}
          aria-valuemin={0}
          max={movieMessages.length}
        >
          Neutral {neutralTotal}
        </Progress>
        <Progress
          color="danger"
          value={negativeTotal}
          aria-valuemin={0}
          max={movieMessages.length}
        >
          Negative {negativeTotal}
        </Progress>
      </Collapse>
      <img alt={props.title} className="img-fluid" src={props.src} style={isOpen ? { display: "none", margin: "0 auto" } : { display: "block", margin: "0 auto" }} />
      </strong>
    </Container>
  );
}

export default MovieDetail;
