import React, { useState, useEffect } from 'react';
import API from '../utils/API';
import Reviews from '../components/review/reviews';
import Review from '../components/review/review';
import Users from '../components/users/users';
import MovieSearch from '../components/movie/movieSearch';
import Movies from '../components/movie/movies';
import useSpeech from '../components/hooks/useSpeech';
import useBoolean from '../components/hooks/useBoolean';
import Btn from '../components/button/btn';
import { Row, Col, Collapse } from 'reactstrap';

const UserReviews = () => {

    // State
    const [items, setItems] = useState([]);
    const [messages, setMessages] = useState([]);
    const state = useSpeech("Welcome to film brains");

    // toggle collapse/getMessages functions
    const [isOpen, toggleCollapse] = useBoolean(false);

    const getMessages = () => {
        API.getMessages()
            .then(res => setMessages(res.data))
            .catch(err => console.log(err))
    };

    const getMovies = () => {
        API.getMovies()
            .then(res => setItems(res.data))
            .catch(err => console.log(err))
    };

    // Get and set state
    useEffect(() => {
        getMovies();
    }, []);

    useEffect(() => {
        getMessages();
    }, []);

    return (
        <div className="container-page">
            <pre style={{ display: "none" }}>{JSON.stringify(state, null, 2)}</pre>
            <Row>
                <Col
                    className="jumbotron jumbotron-fluid left"
                    md="6"
                >
                    <div style={
                        isOpen 
                            ? { display: "none" }
                            : { display: "block" }}
                    >
                        <Movies
                            messages={messages}
                            getMessages={getMessages}
                            items={items}
                            getMovies={getMovies}
                        />
                    </div>
                    <Collapse isOpen={isOpen}>
                        <div
                            style={
                                isOpen
                                    ? { display: "block" }
                                    : { display: "none" }}
                        >
                            <MovieSearch
                                toggleCollapse={toggleCollapse}
                            />
                        </div>
                    </Collapse>
                        <Btn
                            onClick={toggleCollapse}
                            color="dark"
                            size="md"
                            icon={<i className="fas fa-search" />}
                            name={isOpen ? "Close" : "Search"}
                        />
                </Col>
                <Col
                    className="jumbotron jumbotron-fluid right"
                    md="6"
                >
                    <Users
                        messages={messages}
                    />
                    <Review />
                    <Reviews
                        messages={messages}
                        getMessages={getMessages}
                    />
                </Col>
            </Row>
        </div>
    );
}

export default UserReviews;
