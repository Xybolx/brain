import React, { useState, useMemo, useEffect } from 'react';
import API from '../utils/API';
import Reviews from '../components/reviews';
import Review from '../components/review';
import Users from '../components/users/users';
import MovieSearch from '../components/movie/movieSearch';
import Movies from '../components/movie/movies';
import useBoolean from '../components/useBoolean';
import Btn from '../components/button/btn';
import { Row, Col, Collapse } from 'reactstrap';

const UserReviews = () => {

    // State
    const [items, setItems] = useState([]);
    const [messages, setMessages] = useState([]);

    // toggle collapse/getMessages functions
    const showCollapse = useBoolean(false);

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
    }, [])

    useEffect(() => {
        getMessages();
    }, [])

    return (
        <div className="container-page" style={{ marginTop: 5 }}>
            <Row>
                <Col
                    className="jumbotron jumbotron-fluid left"
                    md="6"
                >
                    <div style={
                        showCollapse.value 
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
                    <Collapse isOpen={showCollapse.value}>
                        <div
                            style={
                                showCollapse.value
                                    ? { display: "block" }
                                    : { display: "none" }}
                        >
                            <MovieSearch
                                toggle={showCollapse.toggle}
                            />
                        </div>
                    </Collapse>
                    <div style={{ marginBottom: 20 }}>
                        <Btn
                            onClick={showCollapse.toggle}
                            color="dark"
                            size="md"
                            icon={<i className="fas fa-search" />}
                            name={showCollapse.value ? "Close" : "Search"}
                        />
                    </div>
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
